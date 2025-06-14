
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, LogOut, FileText, Download, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -100 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

export default function Reports() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 font-sans">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          <header className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between px-4 md:px-8 py-4">
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline font-medium">Back to Dashboard</span>
                </Link>
                <SidebarTrigger className="md:hidden" />
                <div className="hidden md:flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  <h1 className="text-xl font-bold text-gray-900">Reports</h1>
                </div>
              </div>

              <nav className="hidden lg:flex items-center text-sm text-gray-500">
                <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Reports</span>
              </nav>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">jane@acme.com</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Log Out</span>
                </Button>
              </div>
            </div>
          </header>

          <motion.main 
            className="flex-1 p-4 md:p-8"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-center py-20"
              >
                <FileText className="w-24 h-24 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">ESG Reports Center</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Generate comprehensive ESG reports, sustainability assessments, and compliance documentation. Advanced reporting features coming soon.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    View Dashboard Data
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/carbon-calculator')}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Calculate Emissions
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.main>

          <Footer />
          <ChatbotWidget />
        </div>
      </div>
    </SidebarProvider>
  );
}
