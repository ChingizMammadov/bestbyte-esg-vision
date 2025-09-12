
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calculator, 
  Zap, 
  Fuel, 
  Car, 
  Plane, 
  Trash2,
  TrendingDown,
  Lightbulb,
  Leaf,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function CarbonCalculator() {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    electricity: "",
    gas: "",
    vehicles: "",
    flights: "",
    waste: ""
  });
  const [emissions, setEmissions] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEmissions = () => {
    // Emission factors (approximate values for demonstration)
    const factors = {
      electricity: 0.0004, // tons CO2e per kWh
      gas: 0.0053, // tons CO2e per therm
      vehicles: 0.0004, // tons CO2e per mile
      flights: 0.0002, // tons CO2e per mile
      waste: 0.5 // tons CO2e per ton of waste
    };

    const totalEmissions = 
      (parseFloat(formData.electricity) || 0) * factors.electricity +
      (parseFloat(formData.gas) || 0) * factors.gas +
      (parseFloat(formData.vehicles) || 0) * factors.vehicles +
      (parseFloat(formData.flights) || 0) * factors.flights +
      (parseFloat(formData.waste) || 0) * factors.waste;

    setEmissions(totalEmissions);
    setShowResults(true);
  };

  const getEmissionLevel = (emissions: number) => {
    if (emissions < 10) return { level: "Low", color: "bg-green-500", percentage: 30 };
    if (emissions < 25) return { level: "Medium", color: "bg-yellow-500", percentage: 60 };
    return { level: "High", color: "bg-red-500", percentage: 90 };
  };

  const suggestions = [
    {
      icon: <Zap className="w-5 h-5 text-emerald-600" />,
      title: "Switch to Renewable Energy",
      description: "Estimated -20% emissions reduction",
      impact: "High"
    },
    {
      icon: <Car className="w-5 h-5 text-blue-600" />,
      title: "Optimize Transportation",
      description: "Use electric vehicles or public transport",
      impact: "Medium"
    },
    {
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      title: "Waste Reduction Program",
      description: "Implement recycling and composting",
      impact: "Medium"
    }
  ];

  
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
        <div className="flex-1 flex flex-col w-auto">
          {/* Header */}
          <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-slate-200 dark:border-gray-700 px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Back to Dashboard</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="hidden md:block text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-slate-800 dark:text-slate-100">Acme Corp</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">Logged in as {user?.email}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm" className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700">
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 p-3 rounded-xl shadow-lg">
                    <Calculator className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text">
                      Interactive Carbon Calculator
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      Calculate your company's carbon footprint and discover actionable insights
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculator Form */}
                <Card className="h-fit bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-slate-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                      <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Carbon Footprint Calculator
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      Enter your monthly consumption data to calculate emissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <TooltipProvider>
                      {/* Electricity Usage */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-1.5 rounded-lg">
                            <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <Label htmlFor="electricity" className="text-slate-700 dark:text-slate-200 font-medium">
                            Electricity Usage (kWh/month)
                          </Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 text-white border-slate-600">
                              <p>Monthly electricity consumption in kilowatt-hours</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="electricity"
                          type="number"
                          placeholder="e.g., 1200"
                          value={formData.electricity}
                          onChange={(e) => handleInputChange("electricity", e.target.value)}
                          className="text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>

                      {/* Gas Consumption */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg">
                            <Fuel className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <Label htmlFor="gas" className="text-slate-700 dark:text-slate-200 font-medium">
                            Gas Consumption (therms/month)
                          </Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 text-white border-slate-600">
                              <p>Monthly natural gas consumption in therms</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="gas"
                          type="number"
                          placeholder="e.g., 150"
                          value={formData.gas}
                          onChange={(e) => handleInputChange("gas", e.target.value)}
                          className="text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>

                      {/* Company Vehicles */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-slate-100 dark:bg-slate-700 p-1.5 rounded-lg">
                            <Car className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                          </div>
                          <Label htmlFor="vehicles" className="text-slate-700 dark:text-slate-200 font-medium">
                            Company Vehicles (miles/month)
                          </Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 text-white border-slate-600">
                              <p>Total miles driven by company vehicles per month</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="vehicles"
                          type="number"
                          placeholder="e.g., 5000"
                          value={formData.vehicles}
                          onChange={(e) => handleInputChange("vehicles", e.target.value)}
                          className="text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>

                      {/* Flight Travel */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-sky-100 dark:bg-sky-900/30 p-1.5 rounded-lg">
                            <Plane className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          </div>
                          <Label htmlFor="flights" className="text-slate-700 dark:text-slate-200 font-medium">
                            Flight Travel (miles/month)
                          </Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 text-white border-slate-600">
                              <p>Total flight miles for business travel per month</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="flights"
                          type="number"
                          placeholder="e.g., 2000"
                          value={formData.flights}
                          onChange={(e) => handleInputChange("flights", e.target.value)}
                          className="text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>

                      {/* Waste */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-1.5 rounded-lg">
                            <Trash2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          <Label htmlFor="waste" className="text-slate-700 dark:text-slate-200 font-medium">
                            Waste (tons/month)
                          </Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-800 text-white border-slate-600">
                              <p>Total waste generated by your company per month</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="waste"
                          type="number"
                          placeholder="e.g., 0.5"
                          value={formData.waste}
                          onChange={(e) => handleInputChange("waste", e.target.value)}
                          className="text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>
                    </TooltipProvider>

                    <Button 
                      onClick={calculateEmissions}
                      className="w-full h-12 text-base bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 dark:from-emerald-600 dark:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Emissions
                    </Button>
                  </CardContent>
                </Card>

                {/* Results Section */}
                {showResults && emissions !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Emissions Result */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-slate-200 dark:border-gray-700 shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-t-lg">
                        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                          <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          Emissions Result
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                            {emissions.toFixed(2)}
                          </div>
                          <div className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                            tons CO2e/month
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <Badge 
                              variant={getEmissionLevel(emissions).level === "Low" ? "default" : "destructive"}
                              className="text-sm"
                            >
                              {getEmissionLevel(emissions).level} Impact
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Suggestions */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-slate-200 dark:border-gray-700 shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-t-lg">
                        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                          <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                          Reduction Suggestions
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-300">
                          Actionable steps to reduce your carbon footprint
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {suggestions.map((suggestion, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors cursor-pointer shadow-sm hover:shadow-md"
                            >
                              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg flex-shrink-0 shadow-sm">
                                {suggestion.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-slate-800 dark:text-slate-100">
                                    {suggestion.title}
                                  </h4>
                                  <Badge 
                                    variant={suggestion.impact === "High" ? "default" : "secondary"}
                                    className="text-xs"
                                  >
                                    {suggestion.impact} Impact
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                  {suggestion.description}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
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
