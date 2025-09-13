import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
}

export const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const simulateFileUpload = (file: File) => {
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.type.includes('pdf') ? 'PDF' : 'Document',
      status: "uploading",
      progress: 0,
    };

    setFiles(prev => [...prev, newFile]);

    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles(prev => 
        prev.map(f => {
          if (f.id === newFile.id) {
            if (f.progress < 100) {
              return { ...f, progress: f.progress + 10 };
            } else if (f.status === "uploading") {
              return { ...f, status: "processing" };
            } else if (f.status === "processing") {
              return { ...f, status: "completed" };
            }
          }
          return f;
        })
      );
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      toast({
        title: "Document processed successfully",
        description: `${file.name} is ready for assessment generation.`,
      });
    }, 6000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(simulateFileUpload);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(simulateFileUpload);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload Learning Materials</h1>
        <p className="text-muted-foreground">Upload PDFs, documents, and texts to generate personalized assessments</p>
      </div>

      {/* Upload Area */}
      <Card className={`border-2 border-dashed transition-all duration-300 ${
        isDragOver 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50"
      }`}>
        <div
          className="p-12 text-center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Drop your files here, or click to browse
          </h3>
          <p className="text-muted-foreground mb-6">
            Support for PDF, DOC, TXT files up to 10MB
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
          </label>
        </div>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Uploaded Files</h3>
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">{file.name}</h4>
                    <Badge variant={
                      file.status === "completed" ? "default" :
                      file.status === "error" ? "destructive" :
                      "secondary"
                    }>
                      {file.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{file.type}</span>
                    <span>{file.size}</span>
                  </div>
                  
                  {(file.status === "uploading" || file.status === "processing") && (
                    <Progress value={file.progress} className="mt-2 h-2" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {file.status === "completed" && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                  {file.status === "error" && (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {files.some(f => f.status === "completed") && (
            <div className="mt-6 pt-4 border-t border-border">
              <Button className="bg-gradient-to-r from-accent to-success hover:from-accent/90 hover:to-success/90">
                Generate Assessments from Uploaded Content
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};