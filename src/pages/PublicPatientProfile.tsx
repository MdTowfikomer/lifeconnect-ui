import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

interface PatientInfo {
  name: string;
  dateOfBirth: string;
  bloodType: string;
  allergies: string;
  medicalHistory: string;
  emergencyContacts: EmergencyContact[];
}

export default function PublicPatientProfile() {
  const location = useLocation();
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encodedData = queryParams.get("data");

    if (encodedData) {
      try {
        const decodedData = atob(encodedData);
        const parsedData: PatientInfo = JSON.parse(decodedData);
        setPatientInfo(parsedData);
      } catch (e) {
        console.error("Error decoding or parsing patient data:", e);
        setError("Invalid patient data provided.");
      }
    } else {
      setError("No patient data found in the URL.");
    }
  }, [location.search]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </Card>
      </div>
    );
  }

  if (!patientInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-muted-foreground">Loading patient information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{patientInfo.name}</h1>
          <p className="text-muted-foreground">Emergency Medical Information</p>
        </div>
      </div>

      {/* Medical Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Blood Group */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-foreground">Blood Group</h3>
            <Badge variant="destructive" className="text-lg px-4 py-1">{patientInfo.bloodType}</Badge>
          </div>
        </Card>

        {/* Allergies */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-emergency" />
            <h3 className="font-semibold text-lg text-foreground">Allergies</h3>
          </div>
          <div className="space-y-2">
            {patientInfo.allergies.split(',').map((allergy, index) => (
              <Badge key={index} variant="outline" className="mr-2">{allergy.trim()}</Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Chronic Conditions */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Medical History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <span className="text-foreground whitespace-pre-wrap">{patientInfo.medicalHistory}</span>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          {patientInfo.emergencyContacts.map(contact => (
            <div key={contact.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">{contact.name} ({contact.relationship})</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}