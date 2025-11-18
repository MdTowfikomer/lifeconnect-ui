import { MapPin, Clock, Bed, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

interface HospitalCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  eta: string;
  icuBeds: number;
  generalBeds: number;
  ventilators: number;
  readiness: "high" | "medium" | "low";
}

export default function HospitalCard({
  id,
  name,
  address,
  distance,
  eta,
  icuBeds,
  generalBeds,
  ventilators,
  readiness
}: HospitalCardProps) {
  const readinessColor = {
    high: "bg-success/10 text-success border-success/20",
    medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    low: "bg-destructive/10 text-destructive border-destructive/20"
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground mb-1">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{distance} • {eta}</span>
          </div>
        </div>
        <Badge className={readinessColor[readiness]}>
          {readiness.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Bed className="w-4 h-4 text-primary" />
            <p className="text-2xl font-bold text-foreground">{icuBeds}</p>
          </div>
          <p className="text-xs text-muted-foreground">ICU Beds</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Bed className="w-4 h-4 text-primary" />
            <p className="text-2xl font-bold text-foreground">{generalBeds}</p>
          </div>
          <p className="text-xs text-muted-foreground">General</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Activity className="w-4 h-4 text-primary" />
            <p className="text-2xl font-bold text-foreground">{ventilators}</p>
          </div>
          <p className="text-xs text-muted-foreground">Ventilators</p>
        </div>
      </div>

      <Link to={`/hospitals/${id}`}>
        <Button className="w-full">View Details</Button>
      </Link>
    </div>
  );
}
