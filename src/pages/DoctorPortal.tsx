import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, User, Lock } from "lucide-react";

export default function DoctorPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Access patient records and manage consultations</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Scan Patient QR</h3>
            <p className="text-sm text-muted-foreground">Access patient's emergency card</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Enter PIN</h3>
            <p className="text-sm text-muted-foreground">Access via patient PIN</p>
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
              <div key={patient.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{patient.lastVisit}</p>
                  <p className="text-sm font-medium text-primary">{patient.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
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
