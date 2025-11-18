import { useState } from "react";
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

export default function Ambulance() {
  const [booked, setBooked] = useState(false);

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
                    defaultValue="123 Main Street, Downtown"
                  />
                </div>
                <Button variant="link" size="sm" className="mt-2 px-0">
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>

              <div>
                <Label htmlFor="destination">Destination Hospital</Label>
                <Select>
                  <SelectTrigger id="destination" className="mt-2">
                    <SelectValue placeholder="Select destination hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city-general">City General Hospital - 2.3 km</SelectItem>
                    <SelectItem value="st-mary">St. Mary's Medical Center - 4.1 km</SelectItem>
                    <SelectItem value="metro">Metro Emergency Care - 5.8 km</SelectItem>
                    <SelectItem value="regional">Regional Trauma Center - 3.5 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Ambulance Type</Label>
                <Select>
                  <SelectTrigger id="type" className="mt-2">
                    <SelectValue placeholder="Select ambulance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Life Support (BLS)</SelectItem>
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
                />
              </div>
            </div>
          </Card>

          {/* Map Preview */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Route Preview</h3>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive Route Map</p>
                <p className="text-sm text-muted-foreground">ETA: 8 minutes</p>
              </div>
            </div>
          </Card>

          {/* Booking Button */}
          <Button 
            size="lg" 
            className="w-full bg-emergency hover:opacity-90"
            onClick={() => setBooked(true)}
          >
            <AmbulanceIcon className="w-5 h-5 mr-2" />
            Confirm Ambulance Booking
          </Button>
        </>
      ) : (
        /* Tracking View */
        <div className="space-y-6">
          <Card className="p-6 bg-success/5 border-success/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AmbulanceIcon className="w-8 h-8 text-success animate-pulse" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-2">Ambulance On The Way!</h3>
              <p className="text-muted-foreground">ETA: 6 minutes</p>
            </div>
          </Card>

          {/* Live Tracking */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Live Tracking</h3>
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-emergency/10 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                  <AmbulanceIcon className="w-8 h-8 text-emergency" />
                </div>
                <p className="text-muted-foreground">Live ambulance location</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Ambulance ID</span>
                <span className="font-semibold text-foreground">AMB-2341</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Driver Name</span>
                <span className="font-semibold text-foreground">Michael Johnson</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Contact</span>
                <span className="font-semibold text-foreground">(555) 987-6543</span>
              </div>
            </div>
          </Card>

          <Button variant="outline" className="w-full" onClick={() => setBooked(false)}>
            Cancel Booking
          </Button>
        </div>
      )}
    </div>
  );
}
