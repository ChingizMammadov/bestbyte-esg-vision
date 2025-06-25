
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { ReportExtractor } from "@/components/reports/ReportExtractor";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download, Calendar, Filter, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const reports = [
    {
      title: "Monthly ESG Report",
      description: "Comprehensive monthly sustainability metrics",
      date: "December 2024",
      status: "Ready",
      priority: "high"
    },
    {
      title: "Carbon Footprint Analysis",
      description: "Detailed carbon emissions breakdown",
      date: "November 2024",
      status: "Ready",
      priority: "medium"
    },
    {
      title: "Energy Consumption Report",
      description: "Monthly energy usage and efficiency metrics",
      date: "November 2024",
      status: "Ready",
      priority: "low"
    }
  ];

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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="bg-gradient-to-r from-white/95 via-purple-50/95 to-pink-50/95 backdrop-blur-sm border-b border-purple-100/50 shadow-lg px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 p-2 rounded-xl hover:bg-purple-50">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-sm bg-white/80 px-4 py-2 rounded-xl border border-purple-100">
                  <span className="font-bold text-gray-900">Acme Corp</span>
                  <span className="ml-2 text-gray-600">Logged in as jane@acme.com</span>
                </div>
                <Button variant="outline" size="sm" className="bg-white/80 border-purple-200 hover:bg-purple-50 rounded-xl">
                  Log Out
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Enhanced Page Header */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25"></div>
                        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                          ESG Reports
                          <Sparkles className="w-6 h-6 text-yellow-500" />
                        </h1>
                        <p className="text-gray-600 mt-2 font-medium text-lg">
                          Generate and download sustainability reports
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" className="bg-white/80 border-purple-200 hover:bg-purple-50 rounded-xl">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg">
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Extractor Section */}
              <div>
                <ReportExtractor />
              </div>

              {/* Enhanced Reports List */}
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur"></div>
                            <div className="relative bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-2xl">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-gray-900 text-lg">
                                {report.title}
                              </h3>
                              {report.priority === 'high' && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                              {report.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                                <Calendar className="w-3 h-3" />
                                {report.date}
                              </span>
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                                {report.status}
                              </span>
                              <span className={`px-3 py-1 rounded-full font-medium border ${getPriorityColor(report.priority)}`}>
                                {report.priority} priority
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button variant="outline" size="sm" className="bg-white border-gray-200 hover:bg-gray-50 rounded-xl">
                            View
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-lg">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </main>

          <Footer />
        </div>
      </div>
      <ChatbotWidget />
    </SidebarProvider>
  );
}
