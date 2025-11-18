import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertTriangle, MapPin, Camera, CheckCircle2, Phone, Navigation } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AccidentReport() {
  const [reported, setReported] = useState(false);

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
                    defaultValue="Main Street & 5th Avenue"
                  />
                </div>
                <Button variant="link" size="sm" className="mt-2 px-0">
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current GPS Location
                </Button>
              </div>

              {/* Map Preview */}
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Location Map View</p>
                </div>
              </div>

              {/* Emergency Type */}
              <div>
                <Label htmlFor="emergency-type">Emergency Type</Label>
                <Select>
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
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button 
            size="lg" 
            className="w-full bg-emergency hover:opacity-90"
            onClick={() => setReported(true)}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Send Emergency Alert
          </Button>
        </>
      ) : (
        /* Confirmation View */
        <div className="space-y-6">
          <Card className="p-8 text-center bg-success/5 border-success/20">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h3 className="font-bold text-2xl text-foreground mb-2">Alert Sent Successfully!</h3>
            <p className="text-muted-foreground">Emergency services have been notified</p>
          </Card>

          {/* Notification Status */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Notifications Sent To:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-success/5 rounded-lg border border-success/20">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">City General Hospital</p>
                  <p className="text-sm text-muted-foreground">2.3 km away • Emergency team alerted</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-success/5 rounded-lg border border-success/20">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Regional Trauma Center</p>
                  <p className="text-sm text-muted-foreground">3.5 km away • Ambulance dispatched</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-success/5 rounded-lg border border-success/20">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Emergency Contacts</p>
                  <p className="text-sm text-muted-foreground">Family members notified via SMS</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => setReported(false)}>
              Report Another
            </Button>
            <Button>Track Ambulance</Button>
          </div>
        </div>
      )}
    </div>
  );
}
