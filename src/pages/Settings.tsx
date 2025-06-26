
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";

export default function Settings() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Clean Professional Header */}
          <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 p-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-sm bg-white/95 px-4 py-2 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-900">Acme Corp</span>
                  <span className="ml-2 text-gray-600">Logged in as jane@acme.com</span>
                </div>
                <Button variant="outline" size="sm" className="bg-white/95 border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all duration-200">
                  Log Out
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 space-y-6" style={{ backgroundColor: '#F5F5F5' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Clean Page Header */}
              <div className="relative">
                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-slate-600 to-gray-600 p-3 rounded-2xl">
                        <SettingsIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent">
                        Settings
                      </h1>
                      <p className="text-gray-600 mt-2 font-medium text-lg">
                        Manage your account and application preferences
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Content */}
              <div className="space-y-6">
                <ProfileSettings />
                <NotificationSettings />
                <SecuritySettings />
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
