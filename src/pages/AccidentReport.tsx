import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertTriangle, MapPin, Camera, CheckCircle2, Phone, Navigation, Copy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAccidentReport, getLatestAccidentReport, AccidentReport as AccidentReportType } from "@/lib/localStorage";
import MapComponent, { MapMarker } from "@/components/MapComponent";

export default function AccidentReport() {
  const [reported, setReported] = useState(false);
  const [report, setReport] = useState<AccidentReportType | null>(null);
  const [formData, setFormData] = useState({
    location: "",
    emergencyType: "",
    notes: "",
    contact: ""
  });
  const [reportCoords, setReportCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const latestReport = getLatestAccidentReport();
    if (latestReport && latestReport.status !== "completed") {
      setReport(latestReport);
      setReported(true);
    }
  }, []);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setReportCoords({ lat: latitude, lng: longitude });
          setFormData({ ...formData, location: "Current GPS Location" });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleMapClick = (coords: { lat: number; lng: number }) => {
    setReportCoords(coords);
    setFormData({ ...formData, location: "Custom Location from Map" });
  };

  const handleSubmitReport = () => {
    if (!formData.emergencyType || !formData.contact) {
      alert("Please fill in emergency type and contact number");
      return;
    }

    const newReport = createAccidentReport({
      location: formData.location,
      injurySeverity: "moderate",
      injuryDescription: formData.notes,
      timestamp: new Date().toISOString(),
      status: "reported",
      nearestHospital: "Emergency Care Hospital",
      photos: []
    });

    setReport(newReport);
    setReported(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-emergency" />
          Report Accident / Emergency Nearby
        </h1>
        <p className="text-muted-foreground">Alert nearby hospitals and emergency services instantly</p>
      </div>

      {!reported ? (
        <>
          {/* Emergency Notice */}
          <Card className="p-4 bg-emergency/5 border-emergency/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-emergency flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">For immediate life-threatening emergencies, call 911 first</p>
                <p className="text-xs text-muted-foreground mt-1">Use this form to alert nearby hospitals and help coordinate response</p>
              </div>
            </div>
          </Card>

          {/* Report Form */}
          <Card className="p-6">
            <div className="space-y-6">
              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="location"
                    placeholder="Auto-detecting your location..."
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <Button variant="link" size="sm" className="mt-2 px-0" onClick={handleUseCurrentLocation}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current GPS Location
                </Button>
              </div>

              {/* Map Preview */}
              <div className="relative">
                {reportCoords ? (
                  <div className="h-48 rounded-lg overflow-hidden">
                    <MapComponent
                      markers={[{ name: 'Report Location', latitude: reportCoords.lat, longitude: reportCoords.lng, color: 'red' } as MapMarker]}
                      height="200px"
                      showInfo={false}
                      onMapClick={handleMapClick}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Location Map View</p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-background/80 p-1.5 rounded-md text-xs text-muted-foreground">
                  Click on the map to set a precise location
                </div>
              </div>

              {/* Emergency Type */}
              <div>
                <Label htmlFor="emergency-type">Emergency Type</Label>
                <Select value={formData.emergencyType} onValueChange={(value) => setFormData({...formData, emergencyType: value})}>
                  <SelectTrigger id="emergency-type" className="mt-2">
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road-accident">Road Accident</SelectItem>
                    <SelectItem value="injury">Severe Injury</SelectItem>
                    <SelectItem value="unconscious">Unconscious Person</SelectItem>
                    <SelectItem value="cardiac">Cardiac Emergency</SelectItem>
                    <SelectItem value="breathing">Breathing Difficulty</SelectItem>
                    <SelectItem value="other">Other Medical Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Photo Upload */}
              <div>
                <Label htmlFor="photo">Photo (Optional)</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or take photo</p>
                  <p className="text-xs text-muted-foreground mt-1">Helps emergency responders assess the situation</p>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes"
                  placeholder="Number of people affected, visible injuries, hazards, etc."
                  className="mt-2 min-h-24"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              {/* Contact Info */}
              <div>
                <Label htmlFor="contact">Your Contact Number</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="contact"
                    placeholder="(555) 123-4567"
                    className="pl-10"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button 
            size="lg" 
            className="w-full bg-emergency hover:opacity-90"
            onClick={handleSubmitReport}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Send Emergency Alert
          </Button>
        </>
      ) : report ? (
        /* Confirmation View */
        <div className="space-y-6">
          <Card className="p-8 text-center bg-success/5 border-success/20">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h3 className="font-bold text-2xl text-foreground mb-2">Alert Sent Successfully!</h3>
            <p className="text-muted-foreground">Emergency services have been notified</p>
          </Card>

          {/* Report Details */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">Report Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Report ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground font-mono">{report.id}</span>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="font-semibold text-foreground">{report.location}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Nearest Hospital</span>
                <span className="font-semibold text-foreground">{report.nearestHospital}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="font-semibold text-success capitalize">{report.status}</span>
              </div>
            </div>
          </Card>

          <Button variant="outline" className="w-full" onClick={() => setReported(false)}>
            Submit Another Report
          </Button>
        </div>
      ) : null}
    </div>
  );
}
