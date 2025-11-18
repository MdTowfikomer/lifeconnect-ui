import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Edit, Share2, Phone, AlertCircle } from "lucide-react";

export default function EmergencyCard() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Emergency Card</h1>
          <p className="text-muted-foreground">Quick access medical information for emergencies</p>
        </div>
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          Edit Info
        </Button>
      </div>

      {/* QR Code Section */}
      <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="inline-block p-6 bg-card rounded-2xl shadow-lg mb-4">
          <div className="w-48 h-48 bg-muted flex items-center justify-center rounded-lg">
            <QrCode className="w-32 h-32 text-primary" />
          </div>
        </div>
        <h3 className="font-bold text-xl text-foreground mb-2">Scan for Emergency Info</h3>
        <p className="text-muted-foreground mb-4">
          Emergency responders can scan this QR code to access your vital medical information
        </p>
        <div className="flex gap-3 justify-center">
          <Button>
            <QrCode className="w-4 h-4 mr-2" />
            Generate QR Code
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </Card>

      {/* Medical Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Blood Group */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-foreground">Blood Group</h3>
            <Badge variant="destructive" className="text-lg px-4 py-1">A+</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Compatible with: A+, AB+ recipients
          </p>
        </Card>

        {/* Allergies */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-emergency" />
            <h3 className="font-semibold text-lg text-foreground">Allergies</h3>
          </div>
          <div className="space-y-2">
            <Badge variant="outline" className="mr-2">Penicillin</Badge>
            <Badge variant="outline" className="mr-2">Peanuts</Badge>
            <Badge variant="outline">Latex</Badge>
          </div>
        </Card>
      </div>

      {/* Chronic Conditions */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Chronic Conditions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-foreground">Type 2 Diabetes</span>
            <Badge variant="secondary">Managed</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-foreground">Hypertension</span>
            <Badge variant="secondary">Under Treatment</Badge>
          </div>
        </div>
      </Card>

      {/* Current Medications */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Current Medications</h3>
        <div className="space-y-3">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-foreground">Metformin</span>
              <span className="text-sm text-muted-foreground">500mg</span>
            </div>
            <p className="text-sm text-muted-foreground">Twice daily with meals</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-foreground">Lisinopril</span>
              <span className="text-sm text-muted-foreground">10mg</span>
            </div>
            <p className="text-sm text-muted-foreground">Once daily in the morning</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-foreground">Aspirin</span>
              <span className="text-sm text-muted-foreground">81mg</span>
            </div>
            <p className="text-sm text-muted-foreground">Once daily</p>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Jane Doe (Spouse)</p>
              <p className="text-sm text-muted-foreground">Primary Contact</p>
            </div>
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Dr. Robert Smith</p>
              <p className="text-sm text-muted-foreground">Primary Physician</p>
            </div>
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Michael Doe (Brother)</p>
              <p className="text-sm text-muted-foreground">Secondary Contact</p>
            </div>
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
