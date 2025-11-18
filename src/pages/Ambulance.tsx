import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const hospitalsData = [
  {
    id: "1",
    name: "Aditya Hospital – Abids",
    address: "Abids, Hyderabad",
    phone: "(040) 1234-5678",
    distance: "0.6 km",
    eta: "2 mins",
    readiness: "high",
    icuBeds: 5,
    totalICUBeds: 5,
    generalBeds: 20,
    totalGeneralBeds: 20,
    ventilators: 2,
    totalVentilators: 2,
    specialists: "Cardiology, Neurology",
    lat: 17.3900,
    lng: 78.4800,
  },
  {
    id: "2",
    name: "Udai Omni Hospital",
    address: "Chapel Road, Abids, Hyderabad",
    phone: "(040) 2345-6789",
    distance: "1.2 km",
    eta: "4 mins",
    readiness: "high",
    icuBeds: 8,
    totalICUBeds: 8,
    generalBeds: 35,
    totalGeneralBeds: 35,
    ventilators: 4,
    totalVentilators: 4,
    specialists: "Orthopaedics, Trauma",
    lat: 17.3950,
    lng: 78.4750,
  },
  {
    id: "3",
    name: "Kamineni Hospital King Koti",
    address: "King Koti, Hyderabad",
    phone: "(040) 3456-7890",
    distance: "1.8 km",
    eta: "6 mins",
    readiness: "high",
    icuBeds: 10,
    totalICUBeds: 10,
    generalBeds: 50,
    totalGeneralBeds: 50,
    ventilators: 6,
    totalVentilators: 6,
    specialists: "General Surgery, Critical Care",
    lat: 17.3850,
    lng: 78.4867,
  },
  {
    id: "4",
    name: "Hope Children’s Hospital",
    address: "Lakdi-ka-pul, Hyderabad",
    phone: "(040) 4567-8901",
    distance: "2.0 km",
    eta: "7 mins",
    readiness: "medium",
    icuBeds: 4,
    totalICUBeds: 4,
    generalBeds: 15,
    totalGeneralBeds: 15,
    ventilators: 1,
    totalVentilators: 1,
    specialists: "Paediatrics, Neonatal ICU",
    lat: 17.3980,
    lng: 78.4650,
  },
  {
    id: "5",
    name: "CARE Hospital Malakpet",
    address: "Malakpet, Hyderabad",
    phone: "(040) 5678-9012",
    distance: "3.5 km",
    eta: "10 mins",
    readiness: "high",
    icuBeds: 12,
    totalICUBeds: 12,
    generalBeds: 40,
    totalGeneralBeds: 40,
    ventilators: 5,
    totalVentilators: 5,
    specialists: "Multi-speciality, Ventilator Support",
    lat: 17.3700,
    lng: 78.4900,
  }
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
  const location = useLocation();

  useEffect(() => {
    const latestBooking = getLatestAmbulanceBooking();
    if (latestBooking) {
      setBooking(latestBooking);
      setBooked(true);
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.hospitalName) {
      const hospital = hospitalsData.find(h => h.name === location.state.hospitalName);
      if (hospital) {
        setFormData(prevData => ({ ...prevData, destinationHospital: hospital.id }));
      }
    }
  }, [location.state]);

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

    const hospital = hospitalsData.find(h => h.id === formData.destinationHospital);
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
                    {hospitalsData.map((hospital) => (
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
                const selectedHospital = hospitalsData.find(h => h.id === formData.destinationHospital);
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
              const selectedHospital = hospitalsData.find(h => h.id === booking?.hospitalId);
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
