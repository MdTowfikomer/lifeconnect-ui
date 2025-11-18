import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone, Clock, Bed, Activity, Navigation } from "lucide-react";

export default function HospitalDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/hospitals">
        <Button variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hospitals
        </Button>
      </Link>

      {/* Hospital Header */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
          <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center">
            <Activity className="w-10 h-10 text-primary" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">City General Hospital</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>123 Main St, Downtown</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
            </div>
            <Badge className="bg-success/10 text-success border-success/20">HIGH READINESS</Badge>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1">
              <Navigation className="w-4 h-4 mr-2" />
              Set as Destination
            </Button>
            <Button variant="outline" className="flex-1">Request Access</Button>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Location</h3>
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Interactive Map View</p>
            <p className="text-sm text-muted-foreground">2.3 km away • 8 mins drive</p>
          </div>
        </div>
      </Card>

      {/* Facilities */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Facilities & Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Emergency Room</p>
            <Badge variant="secondary">24/7</Badge>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">ICU</p>
            <Badge variant="secondary">Available</Badge>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Surgery</p>
            <Badge variant="secondary">Available</Badge>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Pharmacy</p>
            <Badge variant="secondary">24/7</Badge>
          </div>
        </div>
      </Card>

      {/* Bed Availability */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Real-Time Bed Availability</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Available</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Occupied</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-foreground">ICU Beds</td>
                <td className="text-center py-3 px-4 text-foreground">20</td>
                <td className="text-center py-3 px-4 font-semibold text-success">12</td>
                <td className="text-center py-3 px-4 text-foreground">8</td>
                <td className="text-right py-3 px-4">
                  <Badge className="bg-success/10 text-success border-success/20">Available</Badge>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-foreground">General Beds</td>
                <td className="text-center py-3 px-4 text-foreground">60</td>
                <td className="text-center py-3 px-4 font-semibold text-success">45</td>
                <td className="text-center py-3 px-4 text-foreground">15</td>
                <td className="text-right py-3 px-4">
                  <Badge className="bg-success/10 text-success border-success/20">Available</Badge>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-foreground">Ventilators</td>
                <td className="text-center py-3 px-4 text-foreground">15</td>
                <td className="text-center py-3 px-4 font-semibold text-success">8</td>
                <td className="text-center py-3 px-4 text-foreground">7</td>
                <td className="text-right py-3 px-4">
                  <Badge className="bg-success/10 text-success border-success/20">Available</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
