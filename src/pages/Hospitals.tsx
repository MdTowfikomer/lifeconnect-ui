import { useState } from "react";
import HospitalCard from "@/components/HospitalCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const hospitals = [
  {
    id: "1",
    name: "Aditya Hospital – Abids",
    address: "Abids, Hyderabad",
    distance: "0.6 km",
    eta: "~2 mins",
    icuBeds: 5,
    generalBeds: 20,
    ventilators: 2,
    onDutyDoctors: 25,
    readiness: "high" as const,
    specialists: "Cardiology, Neurology",
  },
  {
    id: "2",
    name: "Udai Omni Hospital",
    address: "Abids, Hyderabad",
    distance: "1.2 km",
    eta: "~4 mins",
    icuBeds: 8,
    generalBeds: 35,
    ventilators: 4,
    onDutyDoctors: 27,
    readiness: "high" as const,
    specialists: "Orthopaedics, Trauma",
  },
  {
    id: "3",
    name: "Kamineni Hospital King Koti",
    address: "King Koti, Hyderabad",
    distance: "1.8 km",
    eta: "~6 mins",
    icuBeds: 10,
    generalBeds: 50,
    ventilators: 6,
    onDutyDoctors: 0,
    readiness: "high" as const,
    specialists: "General Surgery, Critical Care",
  },
  {
    id: "4",
    name: "Hope Children's Hospital",
    address: "Abids, Hyderabad",
    distance: "2.0 km",
    eta: "~7 mins",
    icuBeds: 4,
    generalBeds: 15,
    ventilators: 1,
    onDutyDoctors: 47,
    readiness: "medium" as const,
    specialists: "Paediatrics, Neonatal ICU",
  },
  {
    id: "5",
    name: "CARE Hospital Malakpet",
    address: "Malakpet, Hyderabad",
    distance: "3.5 km",
    eta: "~10 mins",
    icuBeds: 12,
    generalBeds: 40,
    ventilators: 5,
    onDutyDoctors: 26,
    readiness: "medium" as const,
    specialists: "Multi-speciality, Ventilator Support",
  },
];

export default function Hospitals() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Find Hospitals</h1>
        <p className="text-muted-foreground">Search and compare nearby medical facilities</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search hospitals by name or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Readiness" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hospitals</SelectItem>
              <SelectItem value="high">High Readiness</SelectItem>
              <SelectItem value="medium">Medium Readiness</SelectItem>
              <SelectItem value="low">Low Readiness</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="beds">Available Beds</SelectItem>
              <SelectItem value="readiness">Readiness</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Showing hospitals near Downtown Area</span>
        </div>
      </div>

      {/* Hospital Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.id} {...hospital} />
        ))}
      </div>
    </div>
  );
}
