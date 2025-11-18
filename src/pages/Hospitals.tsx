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
    name: "City General Hospital",
    address: "123 Main St, Downtown",
    distance: "2.3 km",
    eta: "8 mins",
    icuBeds: 12,
    generalBeds: 45,
    ventilators: 8,
    readiness: "high" as const,
  },
  {
    id: "2",
    name: "St. Mary's Medical Center",
    address: "456 Oak Avenue, Westside",
    distance: "4.1 km",
    eta: "12 mins",
    icuBeds: 5,
    generalBeds: 32,
    ventilators: 4,
    readiness: "medium" as const,
  },
  {
    id: "3",
    name: "Metro Emergency Care",
    address: "789 Pine Road, Eastside",
    distance: "5.8 km",
    eta: "15 mins",
    icuBeds: 2,
    generalBeds: 18,
    ventilators: 2,
    readiness: "low" as const,
  },
  {
    id: "4",
    name: "Regional Trauma Center",
    address: "321 Elm Street, Northside",
    distance: "3.5 km",
    eta: "10 mins",
    icuBeds: 20,
    generalBeds: 60,
    ventilators: 15,
    readiness: "high" as const,
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
