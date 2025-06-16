
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import { ReportExtractor } from "@/components/reports/ReportExtractor";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download, Calendar, Filter } from "lucide-react";
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
      status: "Ready"
    },
    {
      title: "Carbon Footprint Analysis",
      description: "Detailed carbon emissions breakdown",
      date: "November 2024",
      status: "Ready"
    },
    {
      title: "Energy Consumption Report",
      description: "Monthly energy usage and efficiency metrics",
      date: "November 2024",
      status: "Ready"
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-sm text-gray-600">
                  <span className="font-medium">Acme Corp</span>
                  <span className="ml-2">Logged in as jane@acme.com</span>
                </div>
                <Button variant="outline" size="sm">
                  Log Out
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        ESG Reports
                      </h1>
                      <p className="text-gray-600 mt-1">
                        Generate and download sustainability reports
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Report Extractor Section */}
              <div className="mb-8">
                <ReportExtractor />
              </div>

              {/* Reports List */}
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {report.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {report.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {report.date}
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                {report.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button size="sm">
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
