
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { ReportExtractor } from "@/components/reports/ReportExtractor";
import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, Calendar, Filter, Sparkles, Star, Loader2, Eye, Upload, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  uploadESGFile, 
  generateESGReport, 
  downloadPDFReport, 
  getUserReports, 
  downloadReportById,
  getSignedReportUrl,
  ReportMetadata 
} from "@/lib/api";

interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  priority: string;
  templateFile: string; // Path to Excel template file
  reportType: string; // Type of report for API generation
  reportId?: number; // Optional backend ID for user-generated reports
}

interface LoadingStates {
  [key: string]: boolean;
}

// Status constants
enum ReportStatus {
  READY = "Ready",
  GENERATING = "Generating",
  ERROR = "Error"
}

export default function Reports() {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});
  const [reportStatuses, setReportStatuses] = useState<{[key: string]: string}>({});
  const [isGeneratingMainReport, setIsGeneratingMainReport] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [userReports, setUserReports] = useState<ReportMetadata[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(false);
  const navigate = useNavigate();
  
  // Cache reports in localStorage for fast initial rendering
  useEffect(() => {
    // Load cached reports on initial render
    const cachedReports = localStorage.getItem('userReports');
    if (cachedReports) {
      try {
        const parsedReports = JSON.parse(cachedReports);
        setUserReports(parsedReports);
        console.log("Loaded reports from cache:", parsedReports.length);
      } catch (e) {
        console.error("Failed to parse cached reports:", e);
      }
    }
  }, []);
  
  // Fetch user reports when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchUserReports();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  
  // Save reports to localStorage when they change
  useEffect(() => {
    if (userReports.length > 0) {
      localStorage.setItem('userReports', JSON.stringify(userReports));
    }
  }, [userReports]);

  // No predefined template reports - we'll only use user-generated reports
  
  // Convert user reports to display format - only showing user-generated reports with memoization
  const reports = React.useMemo(() => {
    return Array.isArray(userReports) 
      ? userReports
        .filter(report => report && report.id && report.filename && report.created_at)
        .map(report => ({
          id: `user-${report.id}`,
          title: report.display_name || report.filename || `Report ${report.id}`,
          description: "Generated ESG report",
          date: new Date(report.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          status: ReportStatus.READY,
          priority: "high",
          templateFile: "",
          reportType: "custom",
          reportId: report.id
        }))
      : [];
  }, [userReports]);
  
  // Function to fetch user-specific reports
  const fetchUserReports = async () => {
    if (!user) {
      console.log("No user is logged in, cannot fetch reports");
      return;
    }
    
    console.log("Fetching reports for user:", user.id);
    setIsLoadingReports(true);
    try {
      const reports = await getUserReports();
      console.log("Reports fetched successfully:", reports);
      setUserReports(reports);
    } catch (error) {
      console.error('Failed to fetch user reports:', error);
      toast({
        title: "Error",
        description: "Failed to load your reports. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingReports(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Handle file selection for the main "Generate Report" button
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      toast({
        title: "File Selected",
        description: `${e.target.files[0].name} selected for report generation.`,
      });
    }
  };

  // Generate a report when the Generate Report button is clicked
  const handleGenerateMainReport = async () => {
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    // Check file size
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingMainReport(true);
    
    // Add progress indicator
    toast({
      title: "Generating Report",
      description: "Please wait while we generate your custom ESG report. This may take up to 60 seconds.",
    });
    
    // Create a timeout to show another progress message
    const timeoutId = setTimeout(() => {
      toast({
        title: "Still Working",
        description: "Your report is taking longer than expected. Please continue waiting...",
      });
    }, 15000); // Show after 15 seconds
    
    try {      
      console.log('Generating custom ESG report with file:', selectedFile.name);
      
      // Generate report using the API
      const response = await generateESGReport(selectedFile);
      
      // Clear the progress timeout
      clearTimeout(timeoutId);
      
      console.log('Report generation successful, downloading PDF');
      
      // Create a unique filename with date and time
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const filename = `ESG_Report_${timestamp}.pdf`;
      
      // Download the generated PDF
      await downloadPDFReport(response, filename);

      toast({
        title: "Report Generated Successfully",
        description: "Your ESG report has been generated and downloaded.",
      });
      
      // Refresh the user reports list after successful generation
      setTimeout(() => fetchUserReports(), 1000); // Small delay to ensure backend has finished processing
      
      // Clear the selected file
      setSelectedFile(null);
    } catch (error) {
      // Clear the progress timeout
      clearTimeout(timeoutId);
      
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
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        await downloadPDFReport(fallbackResponse, `ESG_Report_${timestamp}.pdf`);
        
        toast({
          title: "Report Downloaded",
          description: "Using example report due to API error.",
        });
      } catch (fallbackError) {
        console.error('Fallback download failed:', fallbackError);
      }
    } finally {
      setIsGeneratingMainReport(false);
    }
  };

  // Report download tracking - store IDs of reports that have been downloaded
  const [downloadedReports, setDownloadedReports] = useState<Set<string>>(() => {
    try {
      const cached = localStorage.getItem('downloadedReports');
      return cached ? new Set(JSON.parse(cached)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Download a user-generated report
  const handleDownload = async (report: Report) => {
    // Set loading state for this specific report
    setLoadingStates(prev => ({ ...prev, [report.id]: true }));
    setReportStatuses(prev => ({ ...prev, [report.id]: ReportStatus.GENERATING }));
    
    try {
      // Check if we've downloaded this before
      const isCached = downloadedReports.has(report.id);
      
      toast({
        title: "Preparing Download",
        description: `Preparing your ${report.title} for download.`,
      });
      
      console.log(`Downloading report: ${report.title} (${report.id})`);
      
      // Download user-generated report by ID
      const filename = `${report.title.replace(/\s+/g, '_')}.pdf`;
      await downloadReportById(report.reportId!, filename);
      
      // Add to downloaded reports tracking
      if (!isCached) {
        const updatedDownloads = new Set(downloadedReports);
        updatedDownloads.add(report.id);
        setDownloadedReports(updatedDownloads);
        localStorage.setItem('downloadedReports', JSON.stringify([...updatedDownloads]));
      }
      
      toast({
        title: "PDF Downloaded Successfully",
        description: `Your ${report.title} has been downloaded.`,
      });
      
      setReportStatuses(prev => ({ ...prev, [report.id]: ReportStatus.READY }));
    } catch (error) {
      console.error('Report download failed:', error);
      
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
      
      setReportStatuses(prev => ({ ...prev, [report.id]: ReportStatus.ERROR }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [report.id]: false }));
    }
  };

  // View a report in a new tab using the signed URL for better performance
  const handleViewReport = async (report: Report) => {
    try {
      console.log(`Viewing report: ${report.title} (${report.id})`);
      
      setLoadingStates(prev => ({ ...prev, [report.id]: true }));
      
      // Get a signed URL for direct file access
      const { url } = await getSignedReportUrl(report.reportId!);
      console.log(`Got signed URL: ${url}`);
      
      // Construct the full URL
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const fullUrl = url.startsWith('/') ? `${apiBaseUrl}${url}` : url;
      
      // Open in a new tab
      window.open(fullUrl, '_blank');
      
      toast({
        title: "Opening Report",
        description: `Opening ${report.title} in a new tab.`,
      });
    } catch (error) {
      console.error('Failed to open report:', error);
      
      toast({
        title: "Error",
        description: "Failed to open the report. Please try downloading instead.",
        variant: "destructive",
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [report.id]: false }));
    }
  };

  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-svh bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col transition-[margin] duration-200 ease-linear min-w-0">
          {/* Enhanced Header */}
          <header className="bg-gradient-to-r from-white/95 via-purple-50/95 to-pink-50/95 dark:from-gray-800/95 dark:via-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm border-b border-purple-100/50 dark:border-gray-700 shadow-lg px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <SidebarTrigger />
                <Link to="/dashboard" className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden xs:inline text-xs sm:text-sm font-medium">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <ThemeToggle />
                <div className="hidden md:block text-xs sm:text-sm bg-white/80 dark:bg-gray-700/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-purple-100 dark:border-purple-800">
                  <span className="font-bold text-gray-900 dark:text-gray-100">Acme Corp</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-300 truncate max-w-[150px] inline-block align-bottom">Logged in as {user?.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 dark:bg-gray-700/80 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/40 rounded-lg sm:rounded-xl text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 bg-slate-50 dark:bg-gray-900 overflow-x-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6"
            >
              {/* Enhanced Page Header */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-600/20 dark:to-pink-600/20 rounded-xl sm:rounded-2xl md:rounded-3xl blur"></div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-purple-100 dark:border-purple-900/50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-xl blur opacity-25"></div>
                        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2">
                          ESG Reports
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500" />
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 font-medium text-sm sm:text-base md:text-lg">
                          Generate and download sustainability reports
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-white/80 dark:bg-gray-700/80 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/40 rounded-lg sm:rounded-xl text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3"
                      >
                        <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span>Filter</span>
                      </Button>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".xlsx,.xls"
                        className="hidden"
                      />
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-500 dark:hover:to-pink-500 text-white rounded-lg sm:rounded-xl shadow-lg text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3 flex-1 sm:flex-auto"
                        onClick={handleGenerateMainReport}
                        disabled={isGeneratingMainReport}
                      >
                        {isGeneratingMainReport ? (
                          <>
                            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                            <span className="truncate">Generating...</span>
                          </>
                        ) : (
                          <>
                            {selectedFile ? <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" /> : <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />}
                            <span className="truncate">{selectedFile ? "Generate Report" : "Upload Data"}</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Navigation */}
              <div className="mb-4 sm:mb-6 grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4">
                <Link to="/reports/monthly" className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-center bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all dark:text-gray-200 dark:border dark:border-gray-700 text-xs sm:text-sm md:text-base font-medium">
                  <span className="truncate block">Monthly</span>
                </Link>
                <Link to="/reports/annual" className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-center bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all dark:text-gray-200 dark:border dark:border-gray-700 text-xs sm:text-sm md:text-base font-medium">
                  <span className="truncate block">Annual</span>
                </Link>
                <Link to="/reports/custom" className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-center bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all dark:text-gray-200 dark:border dark:border-gray-700 text-xs sm:text-sm md:text-base font-medium">
                  <span className="truncate block">Custom</span>
                </Link>
              </div>

              {useLocation().pathname === "/reports" ? (
                <>
                  {/* Report Extractor Section */}
                  <div>
                    <ReportExtractor />
                  </div>

                  {/* User Generated Reports Section */}
                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      Your Generated Reports
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Reports you've generated from uploaded data files will appear here.
                    </p>
                  </div>

                  {/* Enhanced Reports List */}
                  <div className="space-y-4">
                    {isLoadingReports ? (
                      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 dark:border dark:border-gray-700 shadow-xl rounded-xl overflow-hidden p-6 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-500" />
                        <p className="text-gray-600 dark:text-gray-300">Loading your reports...</p>
                      </Card>
                    ) : reports.length === 0 ? (
                      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 dark:border dark:border-gray-700 shadow-xl rounded-xl overflow-hidden p-6 text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                        <p className="text-gray-600 dark:text-gray-300 mb-2 font-semibold">No reports found</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Use the "Upload Data" button above to generate your first report.</p>
                        <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg max-w-md mx-auto">
                          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Getting Started</h4>
                          <ol className="text-xs text-left text-gray-600 dark:text-gray-300 space-y-1.5">
                            <li className="flex items-start gap-2">
                              <span className="flex bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 rounded-full w-4 h-4 text-[10px] items-center justify-center mt-0.5 flex-shrink-0">1</span>
                              <span>Click the "Upload Data" button and select your ESG data file (.xlsx)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="flex bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 rounded-full w-4 h-4 text-[10px] items-center justify-center mt-0.5 flex-shrink-0">2</span>
                              <span>Click "Generate Report" to analyze your data and create a PDF report</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="flex bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 rounded-full w-4 h-4 text-[10px] items-center justify-center mt-0.5 flex-shrink-0">3</span>
                              <span>Your generated report will appear here for future reference</span>
                            </li>
                          </ol>
                        </div>
                      </Card>
                    ) : reports.map((report: Report, index: number) => (
                  <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 dark:border dark:border-gray-700 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-3 sm:p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-600/20 dark:to-purple-600/20 rounded-xl blur"></div>
                          <div className="relative bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 p-2 sm:p-3 rounded-xl">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        
                        <div className="flex-1 w-full min-w-0">
                          <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base sm:text-lg truncate">
                              {report.title}
                            </h3>
                            {report.priority === 'high' && (
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current flex-shrink-0" />
                            )}
                          </div>
                          
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                            {report.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-2 text-[0.65rem] sm:text-xs mb-3 sm:mb-0">
                            <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span className="truncate max-w-[80px] sm:max-w-none">{report.date}</span>
                            </span>
                            
                            {reportStatuses[report.id] === ReportStatus.GENERATING ? (
                              <span className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                                <Loader2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin" />
                                <span className="truncate">Generating</span>
                              </span>
                            ) : reportStatuses[report.id] === ReportStatus.ERROR ? (
                              <span className="flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                                <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                <span className="truncate">Error</span>
                              </span>
                            ) : (
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium truncate">
                                {report.status}
                              </span>
                            )}
                            
                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium border truncate ${getPriorityColor(report.priority)}`}>
                              {report.priority} priority
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg sm:rounded-xl h-7 sm:h-8 px-2 sm:px-3 text-xs"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="truncate">View</span>
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 text-white rounded-lg sm:rounded-xl shadow-lg h-7 sm:h-8 px-2 sm:px-3 text-xs flex-1 sm:flex-auto"
                              onClick={() => handleDownload(report)}
                              disabled={loadingStates[report.id]}
                            >
                              {loadingStates[report.id] ? (
                                <>
                                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                  <span className="truncate">Downloading...</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                  <span className="truncate">Download</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
                    }
                  </div>
                </>
              ) : (
                <div className="mb-6">
                  <Outlet />
                </div>
              )}
            </motion.div>
          </main>

          <Footer />
        </div>
      </div>
      <ChatbotWidget />
    </SidebarProvider>
  );
}
