import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Eye, Download, Calendar, Trash2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getMedicalFiles, getMedicalFilesByCategory, addMedicalFile, deleteMedicalFile, MedicalFile } from "@/lib/localStorage";

export default function MedicalVault() {
  const [activeTab, setActiveTab] = useState("prescriptions");
  const [files, setFiles] = useState<MedicalFile[]>(getMedicalFiles());
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingFile(file);
    }
  };

  const handleUploadFile = () => {
    if (!uploadingFile) {
      alert("Please select a file to upload");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      const newFile = addMedicalFile({
        name: uploadingFile.name,
        category: activeTab as MedicalFile["category"],
        type: uploadingFile.type.includes("pdf") ? "PDF" : "FILE",
        date: new Date().toISOString().split("T")[0],
        size: uploadingFile.size,
        data: base64Data
      });
      
      setFiles(getMedicalFiles());
      setUploadingFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(uploadingFile);
  };

  const handleDeleteFile = (fileId: string) => {
    deleteMedicalFile(fileId);
    setFiles(getMedicalFiles());
  };

  const FileCard = ({ file }: { file: MedicalFile }) => (
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
          <Button size="icon" variant="ghost" title="View file">
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" title="Download file">
            <Download className="w-4 h-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-destructive hover:text-destructive"
            onClick={() => handleDeleteFile(file.id)}
            title="Delete file"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const categoryFiles = getMedicalFilesByCategory(activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Medical Vault</h1>
          <p className="text-muted-foreground">Securely store and access your medical records</p>
        </div>
        <div className="flex gap-2">
          <input 
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
          {uploadingFile && (
            <Button onClick={handleUploadFile} className="bg-success hover:bg-success/90">
              Upload "{uploadingFile.name}"
            </Button>
          )}
        </div>
      </div>

      {uploadingFile && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{uploadingFile.name}</p>
              <p className="text-xs text-muted-foreground">{(uploadingFile.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        </Card>
      )}

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
            {categoryFiles.length > 0 ? (
              categoryFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No prescriptions uploaded yet</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {categoryFiles.length > 0 ? (
              categoryFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No reports uploaded yet</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="scans" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {categoryFiles.length > 0 ? (
              categoryFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No scans uploaded yet</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="discharge" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {categoryFiles.length > 0 ? (
              categoryFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No discharge summaries uploaded yet</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="vaccination" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {categoryFiles.length > 0 ? (
              categoryFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No vaccination records uploaded yet</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
