
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateESGReport, downloadPDFReport } from "@/lib/api";
import { responsiveText } from "@/utils/responsiveUtils";

export function ReportExtractor() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleExtractReport = async () => {
    // If no file is selected, prompt the user to select one
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating Report",
        description: "Please wait while we generate your ESG report. This may take a moment.",
      });
      
      console.log('Generating ESG report with file:', selectedFile.name);
      
      // Generate report using the API
      const response = await generateESGReport(selectedFile);
      
      console.log('Report generation successful, downloading PDF');
      
      // Download the generated PDF
      await downloadPDFReport(response, `ESG_Report_${new Date().toISOString().split('T')[0]}.pdf`);

      toast({
        title: "Report Generated Successfully",
        description: "Your ESG Report PDF has been generated and downloaded.",
      });
    } catch (error) {
      console.error('Report generation failed:', error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate report. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to static file if API call fails
      try {
        console.log('Using fallback PDF');
        const fallbackResponse = await fetch('/ESG_Report.pdf');
        await downloadPDFReport(fallbackResponse, `ESG_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        
        toast({
          title: "Report Downloaded",
          description: "Using fallback report due to API error.",
        });
      } catch (fallbackError) {
        console.error('Fallback download failed:', fallbackError);
        
        toast({
          title: "Error",
          description: "Could not download the report. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4 md:p-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-purple-100 dark:bg-purple-800/60 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
              ESG Report Generator
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Upload your data and generate a custom ESG report
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-5">
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base mb-1.5 sm:mb-2">ESG Report Details:</h4>
            <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-0.5 sm:space-y-1 grid grid-cols-1 sm:grid-cols-2">
              <li>• Executive Summary</li>
              <li>• Environmental Performance</li>
              <li>• Social Impact Analysis</li>
              <li>• Governance Framework</li>
              <li>• Data Visualizations</li>
              <li>• Strategic Initiatives</li>
            </ul>
          </div>
          
          {selectedFile ? (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 sm:p-3 rounded-lg border border-blue-100 dark:border-blue-800 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-300">Selected file:</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 truncate">{selectedFile.name}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedFile(null)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 ml-2 h-7 sm:h-8 px-2 sm:px-3 text-xs"
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-3 sm:p-4 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400 mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Upload your ESG data Excel file to generate a report
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-0.5 sm:mt-1">
                Click to browse or drag and drop
              </p>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls"
            className="hidden"
          />
          
          <Button 
            onClick={handleExtractReport}
            disabled={isGenerating}
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-semibold py-2 sm:py-3 h-auto text-xs sm:text-sm rounded-lg"
            size="default"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 animate-spin" />
                <span className="truncate">Generating Report...</span>
              </>
            ) : (
              <>
                {selectedFile ? <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" /> : <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />}
                <span className="truncate">{selectedFile ? "Generate & Download Report" : "Upload Excel File"}</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
