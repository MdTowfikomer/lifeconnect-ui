import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, AlertTriangle, FileText, Upload, Plus, Sparkles, Loader2 } from "lucide-react";

// Hardcoded patient data for MVP
const patient = {
  name: "John Doe",
  id: "P-12345",
  age: 45,
  gender: "Male",
  bloodType: "A+",
  contact: "(555) 123-4567",
  status: "Active",
  allergies: "Penicillin, Peanuts, Latex",
  chronicConditions: [
    { name: "Type 2 Diabetes", diagnosed: "2018", managedWith: "Metformin" },
    { name: "Hypertension", diagnosed: "2020", managedWith: "Lisinopril" },
  ],
  surgeries: [
    { name: "Appendectomy", year: "2015", hospital: "City General Hospital" },
  ],
  reports: [
    { name: "Blood Test Results", date: "2024-01-12", type: "Lab" },
    { name: "Chest X-Ray", date: "2024-01-08", type: "Imaging" },
    { name: "ECG Report", date: "2023-12-15", type: "Cardiac" },
  ],
  medications: [
    { name: "Metformin", dose: "500mg", frequency: "Twice daily", prescribedBy: "Dr. Smith" },
    { name: "Lisinopril", dose: "10mg", frequency: "Once daily", prescribedBy: "Dr. Smith" },
    { name: "Aspirin", dose: "81mg", frequency: "Once daily", prescribedBy: "Dr. Johnson" },
  ],
  notes: [
    { date: "2024-01-15", doctor: "Dr. Robert Smith", note: "Patient showing good improvement with current diabetes management. Blood sugar levels stable. Continue current medication." },
    { date: "2023-12-20", doctor: "Dr. Sarah Johnson", note: "Annual physical completed. All vitals within normal range. Recommended continuing exercise routine." },
  ]
};

export default function PatientOverview() {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState("");

  const handleGenerateSummary = () => {
    setIsSummarizing(true);
    setSummary("");

    // Simulate AI processing time
    setTimeout(() => {
      const summaryText = `
Patient: ${patient.name}, Age ${patient.age}, Blood Type: ${patient.bloodType}.

Critical Alerts:
- Known Allergies: ${patient.allergies}.
- Potential drug interaction: NSAIDs may conflict with current medications.

Key Medical History:
- Diagnosed with ${patient.chronicConditions[0].name} in ${patient.chronicConditions[0].diagnosed}, managed with ${patient.chronicConditions[0].managedWith}.
- Diagnosed with ${patient.chronicConditions[1].name} in ${patient.chronicConditions[1].diagnosed}, controlled with ${patient.chronicConditions[1].managedWith}.

Current Medications:
- ${patient.medications.map(m => `${m.name} (${m.dose})`).join(', ')}.

Recent Activity:
- Last note from ${patient.notes[0].doctor} on ${patient.notes[0].date} indicates stable condition and continuation of current medication.
      `;
      setSummary(summaryText.trim());
      setIsSummarizing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">{patient.name}</h1>
                <p className="text-muted-foreground">Patient ID: {patient.id} • Age: {patient.age} • {patient.gender}</p>
                <p className="text-muted-foreground">Blood Group: {patient.bloodType} • Contact: {patient.contact}</p>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">{patient.status}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Assistant */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-foreground">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Generate a quick summary of the patient's report.</p>
          </div>
          <Button onClick={handleGenerateSummary} disabled={isSummarizing}>
            {isSummarizing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {isSummarizing ? "Generating..." : "Generate AI Summary"}
          </Button>
        </div>
        {summary && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
            <h4 className="font-semibold text-foreground mb-2">AI Summary</h4>
            <p className="text-sm text-foreground whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </Card>

      {/* Critical Alerts */}
      <Card className="p-4 bg-emergency/5 border-emergency/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-emergency flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">Critical Alerts</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Allergy</Badge>
                <span className="text-sm text-foreground">{patient.allergies}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Drug Interaction</Badge>
                <span className="text-sm text-foreground">NSAIDs may conflict with current medications</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Patient Data Tabs */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">Chronic Conditions</h3>
            <div className="space-y-2">
              {patient.chronicConditions.map((condition, idx) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">{condition.name}</span>
                  <p className="text-sm text-muted-foreground mt-1">Diagnosed: {condition.diagnosed} • Managed with {condition.managedWith}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">Past Surgeries</h3>
            <div className="space-y-2">
              {patient.surgeries.map((surgery, idx) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium text-foreground">{surgery.name}</span>
                  <p className="text-sm text-muted-foreground mt-1">{surgery.year} • {surgery.hospital}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Report
            </Button>
          </div>
          <Card className="p-6">
            <div className="space-y-3">
              {patient.reports.map((report, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date} • {report.type}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Prescribe Medication
            </Button>
          </div>
          <Card className="p-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">Current Medications</h3>
            <div className="space-y-3">
              {patient.medications.map((med, idx) => (
                <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{med.name} - {med.dose}</p>
                      <p className="text-sm text-muted-foreground mt-1">{med.frequency}</p>
                      <p className="text-xs text-muted-foreground mt-1">Prescribed by {med.prescribedBy}</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
          <Card className="p-6">
            <div className="space-y-4">
              {patient.notes.map((entry, idx) => (
                <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{entry.doctor}</p>
                      <p className="text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground">{entry.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
