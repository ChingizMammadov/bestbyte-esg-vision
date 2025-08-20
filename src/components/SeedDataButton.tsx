
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { seedEsgData } from "@/utils/seedEsgData";
import { useToast } from "@/hooks/use-toast";
import { Database, Loader2, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SeedDataButton({ onUploadSuccess }: { onUploadSuccess: (data: any) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const handleSeedData = async () => {
    setIsLoading(true);
    try {
      const result = await seedEsgData();
      
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: `Failed to seed data: ${result.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while seeding data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} is ready for processing.`,
      });
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/uploadfile/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onUploadSuccess(data);
        toast({
          title: "Analysis Complete",
          description: "Your report has been successfully analyzed.",
        });
        // Optionally, refresh or update data on success
        // window.location.reload(); 
      } else {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        toast({
          title: "Analysis Failed",
          description: errorData.detail || "An error occurred during analysis.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please check the console.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Database className="w-4 h-4" />
          Add Sample Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Upload Your ESG Report</DialogTitle>
          <DialogDescription>
            Upload your company's latest ESG report in PDF or CSV format. Our AI will analyze it and populate your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="esg-report">ESG Report File</Label>
            <Input id="esg-report" type="file" onChange={handleFileUpload} accept=".pdf,.csv,.xlsx" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase" style={{marginTop: "10%"}}>
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button 
            onClick={handleSeedData}
            disabled={isLoading}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {isLoading && !selectedFile ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Database className="w-4 h-4" />
            )}
            {isLoading && !selectedFile ? "Seeding..." : "Use Sample Data"}
          </Button>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleUploadAndAnalyze}
            disabled={isLoading || !selectedFile}
          >
            {isLoading && selectedFile ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isLoading && selectedFile ? "Analyzing..." : "Upload and Analyze"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
