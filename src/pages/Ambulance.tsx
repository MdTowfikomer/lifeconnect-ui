import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Ambulance as AmbulanceIcon, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAmbulanceBooking, getLatestAmbulanceBooking, AmbulanceBooking } from "@/lib/localStorage";
import MapComponent, { MapMarker } from "@/components/MapComponent";

// Basic hospital data with coordinates (placeholders, adjust as needed)
const hospitals = [
  { id: "1", name: "City General Hospital", distance: "2.3 km", eta: "8 mins", lat: 17.3850, lng: 78.4867 },
  { id: "2", name: "St. Mary's Medical Center", distance: "4.1 km", eta: "12 mins", lat: 17.3600, lng: 78.5000 },
  { id: "3", name: "Emergency Care Hospital", distance: "1.5 km", eta: "5 mins", lat: 17.4000, lng: 78.4800 },
];

export default function Ambulance() {
  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState<AmbulanceBooking | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    destinationHospital: "",
    ambulanceType: "icu",
    notes: ""
  });

  useEffect(() => {
    const latestBooking = getLatestAmbulanceBooking();
    if (latestBooking) {
      setBooking(latestBooking);
      setBooked(true);
    }
  }, []);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setFormData({ ...formData, pickupLocation: "Current Location" });
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

  const handleBookAmbulance = () => {
    if (!formData.destinationHospital) {
      alert("Please select a destination hospital");
      return;
    }

    const hospital = hospitals.find(h => h.id === formData.destinationHospital);
    if (!hospital) return;

    const newBooking = createAmbulanceBooking({
      pickupLocation: formData.pickupLocation,
      destinationHospital: hospital.name,
      hospitalId: hospital.id,
      timestamp: new Date().toISOString(),
      status: "pending",
      eta: hospital.eta,
      ambulanceId: `AMB-${Math.floor(Math.random() * 9000) + 1000}`,
      driverName: "Michael Johnson",
      driverPhone: "(555) 987-6543"
    });

    setBooking(newBooking);
    setBooked(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Book Ambulance</h1>
        <p className="text-muted-foreground">Emergency ambulance service at your location</p>
      </div>

      {!booked ? (
        <>
          {/* Booking Form */}
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="pickup">Pickup Location</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="pickup"
                    placeholder="Enter your current location"
                    className="pl-10"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                  />
                </div>
                <Button variant="link" size="sm" className="mt-2 px-0" onClick={handleUseCurrentLocation}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>

              <div>
                <Label htmlFor="destination">Destination Hospital</Label>
                <Select value={formData.destinationHospital} onValueChange={(value) => setFormData({...formData, destinationHospital: value})}>
                  <SelectTrigger id="destination" className="mt-2">
                    <SelectValue placeholder="Select destination hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        {hospital.name} - {hospital.distance}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Ambulance Type</Label>
                <Select value={formData.ambulanceType} onValueChange={(value) => setFormData({...formData, ambulanceType: value})}>
                  <SelectTrigger id="type" className="mt-2">
                    <SelectValue placeholder="Select ambulance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bls">Basic Life Support (BLS)</SelectItem>
                    <SelectItem value="icu">ICU Ambulance</SelectItem>
                    <SelectItem value="neonatal">Neonatal Ambulance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Input 
                  id="notes"
                  placeholder="Patient condition, special requirements, etc."
                  className="mt-2"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>
          </Card>

          {/* Map Preview */}
          {(formData.destinationHospital || userLocation) && (
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Route Preview</h3>
              {(() => {
                const selectedHospital = hospitals.find(h => h.id === formData.destinationHospital);
                const markers: MapMarker[] = [];

                if (userLocation) {
                  markers.push({
                    name: "Your Location",
                    latitude: userLocation.lat,
                    longitude: userLocation.lng,
                    color: 'blue',
                  });
                }

                if (selectedHospital) {
                  markers.push({
                    name: selectedHospital.name,
                    latitude: selectedHospital.lat,
                    longitude: selectedHospital.lng,
                    distance: selectedHospital.distance,
                    eta: selectedHospital.eta,
                    color: 'red',
                  });
                }

                return markers.length > 0 ? (
                  <MapComponent markers={markers} height="300px" showRoute={markers.length > 1} />
                ) : (
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Select a hospital to view route</p>
                    </div>
                  </div>
                );
              })()}
            </Card>
          )}

          {/* Booking Button */}
          <Button 
            size="lg" 
            className="w-full bg-emergency hover:opacity-90"
            onClick={handleBookAmbulance}
          >
            <AmbulanceIcon className="w-5 h-5 mr-2" />
            Confirm Ambulance Booking
          </Button>
        </>
      ) : booking ? (
        /* Tracking View */
        <div className="space-y-6">
          <Card className="p-6 bg-success/5 border-success/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AmbulanceIcon className="w-8 h-8 text-success animate-pulse" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-2">Ambulance On The Way!</h3>
              <p className="text-muted-foreground">ETA: {booking.eta}</p>
            </div>
          </Card>

          {/* Live Tracking */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Live Tracking</h3>
            {(() => {
              const selectedHospital = hospitals.find(h => h.id === booking?.hospitalId);
              const markers: MapMarker[] = [];

              if (booking) {
                // For demo purposes the ambulance marker is placed near the hospital
                markers.push({
                  name: "Ambulance (En Route)",
                  latitude: (selectedHospital?.lat) ? selectedHospital.lat - 0.002 : 17.3830,
                  longitude: (selectedHospital?.lng) ? selectedHospital.lng + 0.002 : 78.4887,
                  color: 'orange',
                });

                if (selectedHospital) {
                  markers.push({
                    name: selectedHospital.name,
                    latitude: selectedHospital.lat,
                    longitude: selectedHospital.lng,
                    distance: selectedHospital.distance,
                    eta: selectedHospital.eta,
                    color: 'red',
                  });
                }
              }

              return <MapComponent markers={markers} height="320px" showRoute={markers.length > 1} />;
            })()}
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Ambulance ID</span>
                <span className="font-semibold text-foreground">{booking.ambulanceId}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Driver Name</span>
                <span className="font-semibold text-foreground">{booking.driverName}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Contact</span>
                <span className="font-semibold text-foreground">{booking.driverPhone}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Destination</span>
                <span className="font-semibold text-foreground">{booking.destinationHospital}</span>
              </div>
            </div>
          </Card>

          <Button variant="outline" className="w-full" onClick={() => setBooked(false)}>
            Cancel Booking
          </Button>
        </div>
      ) : null}
    </div>
  );
}
