import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bed, Activity, Ambulance, Users } from "lucide-react";

export default function HospitalAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Hospital Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage hospital resources and emergency readiness</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Beds</p>
              <p className="text-3xl font-bold text-foreground">120</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bed className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Available</p>
              <p className="text-3xl font-bold text-success">65</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ambulances</p>
              <p className="text-3xl font-bold text-foreground">12</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Ambulance className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Staff On Duty</p>
              <p className="text-3xl font-bold text-foreground">45</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Bed Availability Management */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Update Bed Availability</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="icu-beds">ICU Beds Available</Label>
            <Input id="icu-beds" type="number" defaultValue="12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="general-beds">General Beds Available</Label>
            <Input id="general-beds" type="number" defaultValue="45" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ventilators">Ventilators Available</Label>
            <Input id="ventilators" type="number" defaultValue="8" />
          </div>
        </div>
        <Button className="mt-4">Update Availability</Button>
      </Card>

      {/* Emergency Readiness */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-lg text-foreground">Emergency Readiness Status</h3>
            <p className="text-sm text-muted-foreground mt-1">Toggle hospital readiness for emergency cases</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-success/10 text-success border-success/20">ACTIVE</Badge>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Accept ICU Transfers</span>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Accept Trauma Cases</span>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Cardiac Emergency Ready</span>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Surgical Team Available</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </Card>

      {/* Incoming Ambulances */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Incoming Ambulances</h3>
        <div className="space-y-3">
          {[
            { id: "AMB-2341", patient: "Emergency Patient", eta: "3 mins", status: "Critical" },
            { id: "AMB-1872", patient: "Cardiac Case", eta: "8 mins", status: "Urgent" },
            { id: "AMB-5523", patient: "Minor Injury", eta: "15 mins", status: "Stable" },
          ].map((ambulance) => (
            <div key={ambulance.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emergency/10 rounded-lg flex items-center justify-center">
                  <Ambulance className="w-6 h-6 text-emergency" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{ambulance.id}</p>
                  <p className="text-sm text-muted-foreground">{ambulance.patient}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">ETA: {ambulance.eta}</p>
                <Badge 
                  variant={ambulance.status === "Critical" ? "destructive" : ambulance.status === "Urgent" ? "default" : "secondary"}
                >
                  {ambulance.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Staff On Duty */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Staff On Duty</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-foreground">Emergency Physicians</span>
            <Badge variant="secondary">8 Available</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-foreground">Nurses</span>
            <Badge variant="secondary">22 Available</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-foreground">Paramedics</span>
            <Badge variant="secondary">10 Available</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-foreground">Surgeons</span>
            <Badge variant="secondary">5 Available</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
