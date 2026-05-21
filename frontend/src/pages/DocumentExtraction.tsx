import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FileSearch, Upload, CheckCircle2, Loader2, FileText, Sparkles, X, Leaf, Zap, Users, Shield } from "lucide-react";

interface ExtractedField {
  label: string;
  value: string;
  category: "environmental" | "social" | "governance";
  confidence: number;
}

interface ExtractionResult {
  fileName: string;
  fields: ExtractedField[];
  summary: string;
}

const DEMO_RESULTS: Record<string, ExtractionResult> = {
  default: {
    fileName: "",
    summary: "AI extraction identified 12 ESG data points from this document. Review the fields below and click 'Import to Database' to save them.",
    fields: [
      { label: "Total GHG Emissions", value: "1,245 tCO₂e", category: "environmental", confidence: 94 },
      { label: "Renewable Energy Share", value: "34.2%", category: "environmental", confidence: 91 },
      { label: "Water Consumption", value: "2.4 ML", category: "environmental", confidence: 88 },
      { label: "Waste Recycling Rate", value: "68%", category: "environmental", confidence: 85 },
      { label: "Female Representation", value: "42%", category: "social", confidence: 97 },
      { label: "Employee Satisfaction", value: "4.1/5", category: "social", confidence: 82 },
      { label: "Training Hours per Employee", value: "38h", category: "social", confidence: 90 },
      { label: "Safety Incidents", value: "2", category: "social", confidence: 95 },
      { label: "Board Diversity", value: "40%", category: "governance", confidence: 93 },
      { label: "Compliance Rate", value: "99.6%", category: "governance", confidence: 89 },
      { label: "Anti-corruption Policies", value: "Yes", category: "governance", confidence: 96 },
      { label: "Third-party Audits", value: "3 completed", category: "governance", confidence: 78 },
    ],
  },
};

const SUPPORTED_FORMATS = [
  { ext: "PDF", desc: "Annual reports, sustainability disclosures" },
  { ext: "DOCX", desc: "Word documents, ESG questionnaires" },
  { ext: "XLSX", desc: "Spreadsheets, data templates" },
  { ext: "CSV", desc: "Raw data exports" },
];

function ConfidenceBadge({ value }: { value: number }) {
  const color =
    value >= 90 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
    value >= 75 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" :
    "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300";
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>{value}%</span>;
}

const CAT_ICON = {
  environmental: <Leaf className="w-3.5 h-3.5 text-emerald-500" />,
  social: <Users className="w-3.5 h-3.5 text-blue-500" />,
  governance: <Shield className="w-3.5 h-3.5 text-indigo-500" />,
};

const CAT_LABEL_COLOR = {
  environmental: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
  social: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30",
  governance: "text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30",
};

export default function DocumentExtraction() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [imported, setImported] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setResult(null);
    setImported(false);
    await new Promise(r => setTimeout(r, 2200 + Math.random() * 1000));
    setIsProcessing(false);
    setResult({ ...DEMO_RESULTS.default, fileName: file.name });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    processFile(files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleImport = async () => {
    setImported(true);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
          <DashboardHeader />
          <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-6 max-w-4xl mx-auto w-full">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl shadow-lg">
                <FileSearch className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Document Extraction Engine</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload ESG reports and let AI extract structured data automatically
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                AI-powered
              </div>
            </div>

            {/* Supported formats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SUPPORTED_FORMATS.map(({ ext, desc }) => (
                <Card key={ext} className="border-0 shadow-md rounded-2xl">
                  <CardContent className="p-4">
                    <div className="font-bold text-fuchsia-700 dark:text-fuchsia-300 text-sm">.{ext}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upload zone */}
            <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-gray-100">
                  <Upload className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                  Upload Document
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Drag & drop or click to upload an ESG document for AI extraction
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 hover:bg-fuchsia-50/50 dark:hover:bg-fuchsia-900/10"
                  }`}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.docx,.xlsx,.csv"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  {isProcessing ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-10 h-10 text-fuchsia-500 animate-spin" />
                      <p className="text-sm font-medium text-fuchsia-700 dark:text-fuchsia-300">AI is extracting ESG data...</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">Analyzing document structure and identifying metrics</p>
                    </div>
                  ) : (
                    <>
                      <FileText className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Drop your ESG document here</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PDF, DOCX, XLSX, CSV — up to 50 MB</p>
                      <Button variant="outline" className="mt-4 rounded-xl text-sm" onClick={(e) => e.stopPropagation()}>
                        <Upload className="w-4 h-4 mr-2" />
                        Browse files
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Extraction results */}
            {result && (
              <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800">
                <CardHeader className="p-5 pb-3 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/10 dark:to-pink-900/10 rounded-t-3xl">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-gray-100">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        Extraction Complete
                      </CardTitle>
                      <CardDescription className="dark:text-gray-400 mt-1 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        {result.fileName}
                      </CardDescription>
                    </div>
                    <button onClick={() => setResult(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{result.summary}</p>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-4">
                  {(["environmental", "social", "governance"] as const).map((cat) => {
                    const catFields = result.fields.filter(f => f.category === cat);
                    if (catFields.length === 0) return null;
                    return (
                      <div key={cat}>
                        <div className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2 ${CAT_LABEL_COLOR[cat]} px-2 py-1 rounded-lg w-fit`}>
                          {CAT_ICON[cat]}
                          {cat}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {catFields.map((field, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{field.label}</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{field.value}</div>
                              </div>
                              <ConfidenceBadge value={field.confidence} />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {imported ? (
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/30 px-4 py-3 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                      {result.fields.length} fields imported to your ESG database
                    </div>
                  ) : (
                    <Button
                      onClick={handleImport}
                      className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Import {result.fields.length} fields to Database
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
