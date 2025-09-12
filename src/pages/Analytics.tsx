
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Download, Sparkles, Target, GanttChart } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Analytics() {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
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
          <header className="bg-gradient-to-r from-white/95 via-blue-50/95 to-purple-50/95 dark:from-gray-800/95 dark:via-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm border-b border-blue-100/50 dark:border-gray-700 shadow-lg px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <SidebarTrigger />
                <Link to="/dashboard" className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden xs:inline text-xs sm:text-sm font-medium">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <ThemeToggle />
                <div className="hidden md:block text-xs sm:text-sm bg-white/80 dark:bg-gray-700/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-blue-100 dark:border-blue-800">
                  <span className="font-bold text-gray-900 dark:text-gray-100">Acme Corp</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-300 truncate max-w-[150px] inline-block align-bottom">Logged in as {user?.email}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm" className="bg-white/80 dark:bg-gray-700/80 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg sm:rounded-xl text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 h-auto">
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
              className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6"
            >
              {/* Enhanced Page Header */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-600/20 dark:to-purple-600/20 rounded-xl sm:rounded-2xl md:rounded-3xl blur"></div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-blue-100 dark:border-blue-900/50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-xl blur opacity-25"></div>
                        <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                          <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2">
                          ESG Analytics
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500" />
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 font-medium text-sm sm:text-base md:text-lg">
                          Comprehensive insights and trend analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-white/80 dark:bg-gray-700/80 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg sm:rounded-xl text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3"
                      >
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="truncate">Date Range</span>
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 text-white rounded-lg sm:rounded-xl shadow-lg text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3 flex-1 sm:flex-auto"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                        <span className="truncate">Export</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Navigation */}
              <div className="mb-4 sm:mb-6 grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4">
                <Link to="/analytics/environmental" className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-center bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all dark:text-gray-200 dark:border dark:border-gray-700 text-xs sm:text-sm md:text-base font-medium">
                  <span className="truncate block">Environmental</span>
                </Link>
                <Link to="/analytics/social" className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-center bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all dark:text-gray-200 dark:border dark:border-gray-700 text-xs sm:text-sm md:text-base font-medium">
                  <span className="truncate block">Social</span>
                </Link>
                <Link to="/analytics/governance" className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-center bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all dark:text-gray-200 dark:border dark:border-gray-700 text-xs sm:text-sm md:text-base font-medium">
                  <span className="truncate block">Governance</span>
                </Link>
              </div>

              {/* Analytics Content */}
              {useLocation().pathname === "/analytics" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 border-0 dark:border dark:border-emerald-800/50 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
                    <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
                      <div className="p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg sm:rounded-xl">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="truncate">Carbon Trends</span>
                    </CardTitle>
                    <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium text-xs sm:text-sm">Monthly emissions analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1 sm:gap-2">
                      -12.5%
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-500 dark:text-emerald-300" />
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 font-medium bg-emerald-100 dark:bg-emerald-900/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
                      <span className="truncate">Reduction vs last quarter</span>
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-0 dark:border dark:border-blue-800/50 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
                    <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
                      <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg sm:rounded-xl">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="truncate">Energy Efficiency</span>
                    </CardTitle>
                    <CardDescription className="text-blue-700 dark:text-blue-300 font-medium text-xs sm:text-sm">Power consumption insights</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-700 dark:text-blue-400 mb-2">
                      89%
                    </div>
                    <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 font-medium bg-blue-100 dark:bg-blue-900/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
                      <span className="truncate">Efficiency score</span>
                    </p>
                  </CardContent>
                </Card>

                                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-0 dark:border dark:border-purple-800/50 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
                    <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
                      <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg sm:rounded-xl">
                        <GanttChart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="truncate">Project Milestones</span>
                    </CardTitle>
                    <CardDescription className="text-purple-700 dark:text-purple-300 font-medium text-xs sm:text-sm">ESG implementation progress</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-purple-700 dark:text-purple-400 mb-2">
                      76%
                    </div>
                    <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-300 font-medium bg-purple-100 dark:bg-purple-900/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
                      <span className="truncate">Completion rate</span>
                    </p>
                  </CardContent>
                </Card>
              </div>
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
