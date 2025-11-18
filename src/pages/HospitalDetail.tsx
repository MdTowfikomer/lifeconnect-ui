import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone, Clock, Activity, Navigation } from "lucide-react";

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
    specialists: "Cardiology, Neurology"
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
    specialists: "Orthopaedics, Trauma"
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
    specialists: "General Surgery, Critical Care"
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
    specialists: "Paediatrics, Neonatal ICU"
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
    specialists: "Multi-speciality, Ventilator Support"
  }
];


export default function HospitalDetail() {
  const { id } = useParams();
  const hospital = hospitalsData.find((h) => h.id === id);

  if (!hospital) {
    return (
      <div className="space-y-6">
        <Link to="/hospitals">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hospitals
          </Button>
        </Link>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-2">Hospital Not Found</h2>
          <p className="text-muted-foreground">The hospital you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const readinessColor = {
    high: "bg-success/10 text-success border-success/20",
    medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    low: "bg-destructive/10 text-destructive border-destructive/20"
  };

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
              <h1 className="text-3xl font-bold text-foreground mb-2">{hospital.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>{hospital.address}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Phone className="w-4 h-4" />
                <span>{hospital.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{hospital.distance} • {hospital.eta}</span>
              </div>
            </div>
            <Badge className={readinessColor[hospital.readiness]}>{hospital.readiness.toUpperCase()} READINESS</Badge>
          </div>
          <div className="flex gap-3">
            <Link to="/ambulance" state={{ hospitalName: hospital.name }} className="flex-1">
              <Button className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Set as Destination
              </Button>
            </Link>
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
            <p className="text-sm text-muted-foreground">{hospital.distance} away • {hospital.eta} drive</p>
          </div>
        </div>
      </Card>

      {/* Specialists */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Specialists on Duty</h3>
        <div className="flex flex-wrap gap-2">
          {hospital.specialists.split(", ").map((specialist, index) => (
            <Badge key={index} variant="secondary">{specialist}</Badge>
          ))}
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
                <td className="text-center py-3 px-4 text-foreground">{hospital.totalICUBeds}</td>
                <td className="text-center py-3 px-4 font-semibold text-success">{hospital.icuBeds}</td>
                <td className="text-center py-3 px-4 text-foreground">{hospital.totalICUBeds - hospital.icuBeds}</td>
                <td className="text-right py-3 px-4">
                  <Badge className="bg-success/10 text-success border-success/20">Available</Badge>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-foreground">General Beds</td>
                <td className="text-center py-3 px-4 text-foreground">{hospital.totalGeneralBeds}</td>
                <td className="text-center py-3 px-4 font-semibold text-success">{hospital.generalBeds}</td>
                <td className="text-center py-3 px-4 text-foreground">{hospital.totalGeneralBeds - hospital.generalBeds}</td>
                <td className="text-right py-3 px-4">
                  <Badge className="bg-success/10 text-success border-success/20">Available</Badge>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-foreground">Ventilators</td>
                <td className="text-center py-3 px-4 text-foreground">{hospital.totalVentilators}</td>
                <td className="text-center py-3 px-4 font-semibold text-success">{hospital.ventilators}</td>
                <td className="text-center py-3 px-4 text-foreground">{hospital.totalVentilators - hospital.ventilators}</td>
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
