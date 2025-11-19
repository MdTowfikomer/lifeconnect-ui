import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, User, Lock, Search } from "lucide-react";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Mock patient data structure, similar to what's in localStorage
const MOCK_PATIENT_DETAILS = {
  dateOfBirth: "1990-01-01",
  bloodType: "O+",
  allergies: "None",
  medicalHistory: "N/A",
  emergencyContacts: [{ id: 1, name: "Jane Doe", relationship: "Spouse", phone: "555-555-5555" }],
};

export default function DoctorPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleGenerateQrCode = (patient: any) => {
    const criticalInfo = {
      name: patient.name,
      ...MOCK_PATIENT_DETAILS, // Use mock data for fields not in the list
    };
    const encodedData = btoa(JSON.stringify(criticalInfo));
    const publicProfileUrl = `${window.location.origin}/public-profile?data=${encodedData}`;
    
    setQrCodeData(publicProfileUrl);
    setSelectedPatient(patient);
    setIsQrModalOpen(true);
  };

  if (isLoggedIn) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Access patient records and manage consultations</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Find Patient</h3>
            <p className="text-sm text-muted-foreground">Search by name or ID</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border-emergency/20 bg-emergency/5">
            <div className="w-16 h-16 bg-emergency/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-emergency" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Emergency Override</h3>
            <p className="text-sm text-muted-foreground">Critical access without consent</p>
          </Card>
        </div>

        {/* Recent Patients */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg text-foreground mb-4">Recent Patients</h3>
          <div className="space-y-3">
            {[
              { name: "John Doe", id: "P-12345", lastVisit: "2 hours ago", status: "Active" },
              { name: "Sarah Johnson", id: "P-12346", lastVisit: "1 day ago", status: "Discharged" },
              { name: "Michael Chen", id: "P-12347", lastVisit: "3 days ago", status: "Follow-up" },
            ].map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4 cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{patient.lastVisit}</p>
                    <p className="text-sm font-medium text-primary">{patient.status}</p>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => handleGenerateQrCode(patient)}>
                    <QrCode className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* QR Code Modal */}
        <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Emergency QR Code for {selectedPatient?.name}</DialogTitle>
              <DialogDescription>
                This QR code links to a public profile with critical medical information.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center p-4 bg-white rounded-lg">
              {qrCodeData && <QRCode value={qrCodeData} size={256} />}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Share with authorized medical personnel only.
            </p>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Doctor Portal</h1>
          <p className="text-muted-foreground">Sign in to access patient records</p>
        </div>

        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="doctor@hospital.com"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password"
              className="mt-2"
            />
          </div>

          <Button 
            type="button" 
            className="w-full" 
            size="lg"
            onClick={() => setIsLoggedIn(true)}
          >
            Sign In
          </Button>

          <Button type="button" variant="link" className="w-full">
            Forgot password?
          </Button>
        </form>
      </Card>
    </div>
  );
}
