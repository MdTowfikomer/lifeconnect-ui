import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Eye, Download, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockFiles = {
  prescriptions: [
    { id: 1, name: "Monthly Medication - Dr. Smith", date: "2024-01-15", type: "PDF" },
    { id: 2, name: "Allergy Medication", date: "2024-01-10", type: "PDF" },
  ],
  reports: [
    { id: 3, name: "Blood Test Results", date: "2024-01-12", type: "PDF" },
    { id: 4, name: "Annual Physical Report", date: "2023-12-20", type: "PDF" },
  ],
  scans: [
    { id: 5, name: "Chest X-Ray", date: "2024-01-08", type: "IMAGE" },
    { id: 6, name: "MRI Scan - Brain", date: "2023-11-15", type: "IMAGE" },
  ],
  discharge: [
    { id: 7, name: "Hospital Discharge Summary", date: "2023-10-05", type: "PDF" },
  ],
  vaccination: [
    { id: 8, name: "COVID-19 Vaccination Record", date: "2023-09-01", type: "PDF" },
    { id: 9, name: "Flu Shot 2023", date: "2023-10-12", type: "PDF" },
  ],
};

export default function MedicalVault() {
  const [activeTab, setActiveTab] = useState("prescriptions");

  const FileCard = ({ file }: { file: any }) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground mb-1 truncate">{file.name}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{file.date}</span>
              <Badge variant="secondary" className="ml-2">{file.type}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <Button size="icon" variant="ghost">
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Medical Vault</h1>
          <p className="text-muted-foreground">Securely store and access your medical records</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Record
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="scans">Scans/X-rays</TabsTrigger>
          <TabsTrigger value="discharge">Discharge</TabsTrigger>
          <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
        </TabsList>

        <TabsContent value="prescriptions" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {mockFiles.prescriptions.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
          <Button variant="outline" className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Add Prescription
          </Button>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {mockFiles.reports.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
          <Button variant="outline" className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Add Report
          </Button>
        </TabsContent>

        <TabsContent value="scans" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {mockFiles.scans.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
          <Button variant="outline" className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Add Scan
          </Button>
        </TabsContent>

        <TabsContent value="discharge" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {mockFiles.discharge.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
          <Button variant="outline" className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Add Discharge Summary
          </Button>
        </TabsContent>

        <TabsContent value="vaccination" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {mockFiles.vaccination.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
          <Button variant="outline" className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Add Vaccination Record
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
