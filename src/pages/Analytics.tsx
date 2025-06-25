
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Download, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="bg-gradient-to-r from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-sm border-b border-blue-100/50 shadow-lg px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 p-2 rounded-xl hover:bg-blue-50">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-sm bg-white/80 px-4 py-2 rounded-xl border border-blue-100">
                  <span className="font-bold text-gray-900">Acme Corp</span>
                  <span className="ml-2 text-gray-600">Logged in as jane@acme.com</span>
                </div>
                <Button variant="outline" size="sm" className="bg-white/80 border-blue-200 hover:bg-blue-50 rounded-xl">
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
              className="max-w-6xl mx-auto space-y-6"
            >
              {/* Enhanced Page Header */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25"></div>
                        <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl">
                          <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                          ESG Analytics
                          <Sparkles className="w-6 h-6 text-yellow-500" />
                        </h1>
                        <p className="text-gray-600 mt-2 font-medium text-lg">
                          Comprehensive insights and trend analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" className="bg-white/80 border-blue-200 hover:bg-blue-50 rounded-xl">
                        <Calendar className="w-4 h-4 mr-2" />
                        Date Range
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-lg">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Analytics Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-emerald-100 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      </div>
                      Carbon Trends
                    </CardTitle>
                    <CardDescription className="text-emerald-700 font-medium">Monthly emissions analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-black text-emerald-700 mb-2 flex items-center gap-2">
                      -12.5%
                      <Target className="w-6 h-6 text-emerald-500" />
                    </div>
                    <p className="text-sm text-emerald-600 font-medium bg-emerald-100 px-3 py-1 rounded-full inline-block">
                      Reduction vs last quarter
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                      </div>
                      Energy Efficiency
                    </CardTitle>
                    <CardDescription className="text-blue-700 font-medium">Power consumption insights</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-black text-blue-700 mb-2">
                      89%
                    </div>
                    <p className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full inline-block">
                      Efficiency score
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-purple-100 rounded-xl">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                      </div>
                      Waste Management
                    </CardTitle>
                    <CardDescription className="text-purple-700 font-medium">Recycling and disposal rates</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-black text-purple-700 mb-2">
                      76%
                    </div>
                    <p className="text-sm text-purple-600 font-medium bg-purple-100 px-3 py-1 rounded-full inline-block">
                      Recycling rate
                    </p>
                  </CardContent>
                </Card>
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
