
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Settings() {
  const { user, signOut } = useAuth();
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
      <div className="flex w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Clean Professional Header */}
          <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="hidden md:block text-sm bg-white/95 dark:bg-gray-700/95 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600">
                  <span className="font-bold text-gray-900 dark:text-gray-100">Acme Corp</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Logged in as {user?.email}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm" className="bg-white/95 dark:bg-gray-700/95 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 rounded-xl transition-all duration-200">
                  Log Out
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 space-y-6 bg-slate-50 dark:bg-gray-900">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {/* Clean Page Header */}
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-slate-600 to-gray-600 dark:from-slate-500 dark:to-gray-500 p-3 rounded-2xl">
                        <SettingsIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-700 to-slate-700 dark:from-gray-300 dark:to-slate-300 bg-clip-text text-transparent">
                        Settings
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300 mt-2 font-medium text-lg">
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
