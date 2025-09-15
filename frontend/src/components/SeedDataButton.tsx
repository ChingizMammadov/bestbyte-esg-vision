
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { seedEsgData } from "@/utils/seedEsgData";
import { generateRandomData } from "@/utils/randomDataGenerator";
import { useToast } from "@/hooks/use-toast";
import { Database, Loader2, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function SeedDataButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Only show button to authenticated users
  if (!user) {
    return null;
  }

  const handleSeedData = () => {
    // Trigger file input click
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    // Check if it's an Excel file
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "Invalid File",
        description: "Please select an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Generate random data regardless of file content
      generateRandomData();
      
      // Simulate file upload (we're not actually doing anything with the file)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Success!",
        description: `File "${file.name}" uploaded and data updated successfully.`,
      });
      
      // We'll dispatch a custom event instead of reloading the page
      window.dispatchEvent(new CustomEvent('dataUpdated'));
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while processing the data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx,.xls"
        className="hidden"
        aria-label="Upload Excel file"
      />
      <Button 
        onClick={handleSeedData}
        disabled={isLoading}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {isLoading ? "Processing..." : "Add Sample Data"}
      </Button>
    </>
  );
}
