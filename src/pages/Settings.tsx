import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon, User, Bell, Lock, Palette, Sparkles } from "lucide-react";
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
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="bg-gradient-to-r from-white/95 via-gray-50/95 to-slate-50/95 backdrop-blur-sm border-b border-gray-100/50 shadow-lg px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 p-2 rounded-xl hover:bg-gray-50">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-sm bg-white/80 px-4 py-2 rounded-xl border border-gray-100">
                  <span className="font-bold text-gray-900">Acme Corp</span>
                  <span className="ml-2 text-gray-600">Logged in as jane@acme.com</span>
                </div>
                <Button variant="outline" size="sm" className="bg-white/80 border-gray-200 hover:bg-gray-50 rounded-xl">
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
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-3xl blur"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-slate-500 rounded-2xl blur opacity-25"></div>
                      <div className="relative bg-gradient-to-r from-gray-500 to-slate-500 p-3 rounded-2xl">
                        <SettingsIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent flex items-center gap-2">
                        Settings
                        <Sparkles className="w-6 h-6 text-yellow-500" />
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
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      Profile Settings
                    </CardTitle>
                    <CardDescription className="text-blue-700 font-medium">
                      Update your personal information and company details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 bg-white/60">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Jane" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Smith" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="jane@acme.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" defaultValue="Acme Corp" />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-0 shadow-xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-emerald-100 rounded-xl">
                        <Bell className="w-5 h-5 text-emerald-600" />
                      </div>
                      Notifications
                    </CardTitle>
                    <CardDescription className="text-emerald-700 font-medium">
                      Configure how you receive updates and alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 bg-white/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications" className="text-sm font-medium">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-gray-600">
                          Receive notifications about important updates
                        </p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailReports" className="text-sm font-medium">
                          Email Reports
                        </Label>
                        <p className="text-sm text-gray-600">
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
                <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-0 shadow-xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-red-500/10 to-pink-500/10 pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-red-100 rounded-xl">
                        <Lock className="w-5 h-5 text-red-600" />
                      </div>
                      Security
                    </CardTitle>
                    <CardDescription className="text-red-700 font-medium">
                      Manage your password and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 bg-white/60">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Enable Two-Factor Authentication</Button>
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
