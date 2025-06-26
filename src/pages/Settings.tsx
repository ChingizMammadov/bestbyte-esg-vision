
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon, User, Bell, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailReports, setEmailReports] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50/50 via-white to-gray-50/50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200/60 px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 p-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-sm bg-white/90 px-4 py-2 rounded-xl border border-gray-200/60">
                  <span className="font-bold text-gray-900">Acme Corp</span>
                  <span className="ml-2 text-gray-600">Logged in as jane@acme.com</span>
                </div>
                <Button variant="outline" size="sm" className="bg-white/90 border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all duration-200">
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
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/60 hover:border-gray-300/60 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-gray-500 to-slate-500 p-3 rounded-2xl border border-gray-200/30">
                        <SettingsIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
                        Settings
                      </h1>
                      <p className="text-gray-600 mt-2 font-medium text-lg">
                        Manage your account and application preferences
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Settings Content */}
              <div className="space-y-6">
                {/* Profile Settings */}
                <Card className="bg-white/90 border border-blue-200/60 hover:border-blue-300/60 rounded-2xl overflow-hidden transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 pb-4 border-b border-blue-200/40">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-blue-100/80 rounded-xl border border-blue-200/50">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      Profile Settings
                    </CardTitle>
                    <CardDescription className="text-blue-700/80 font-medium">
                      Update your personal information and company details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 bg-white/80">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                        <Input 
                          id="firstName" 
                          defaultValue="Jane" 
                          className="bg-white border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                        <Input 
                          id="lastName" 
                          defaultValue="Smith" 
                          className="bg-white border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="jane@acme.com" 
                        className="bg-white border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-700 font-medium">Company Name</Label>
                      <Input 
                        id="company" 
                        defaultValue="Acme Corp" 
                        className="bg-white border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl border border-blue-600 hover:border-blue-700 transition-all duration-200">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="bg-white/90 border border-emerald-200/60 hover:border-emerald-300/60 rounded-2xl overflow-hidden transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 pb-4 border-b border-emerald-200/40">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-emerald-100/80 rounded-xl border border-emerald-200/50">
                        <Bell className="w-5 h-5 text-emerald-600" />
                      </div>
                      Notifications
                    </CardTitle>
                    <CardDescription className="text-emerald-700/80 font-medium">
                      Configure how you receive updates and alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 bg-white/80">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200/60 hover:border-gray-300/60 bg-white/60 transition-all duration-200">
                      <div>
                        <Label htmlFor="notifications" className="text-sm font-medium text-gray-900">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Receive notifications about important updates
                        </p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200/60 hover:border-gray-300/60 bg-white/60 transition-all duration-200">
                      <div>
                        <Label htmlFor="emailReports" className="text-sm font-medium text-gray-900">
                          Email Reports
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Get monthly ESG reports delivered to your email
                        </p>
                      </div>
                      <Switch
                        id="emailReports"
                        checked={emailReports}
                        onCheckedChange={setEmailReports}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Security */}
                <Card className="bg-white/90 border border-red-200/60 hover:border-red-300/60 rounded-2xl overflow-hidden transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-red-50/80 to-rose-50/80 pb-4 border-b border-red-200/40">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-red-100/80 rounded-xl border border-red-200/50">
                        <Lock className="w-5 h-5 text-red-600" />
                      </div>
                      Security
                    </CardTitle>
                    <CardDescription className="text-red-700/80 font-medium">
                      Manage your password and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 bg-white/80">
                    <Button 
                      variant="outline" 
                      className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all duration-200"
                    >
                      Change Password
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all duration-200"
                    >
                      Enable Two-Factor Authentication
                    </Button>
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
