
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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

export default function CarbonCalculator() {
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
      icon: <Zap className="w-5 h-5" />,
      title: "Switch to Renewable Energy",
      description: "Estimated -20% emissions reduction",
      impact: "High"
    },
    {
      icon: <Car className="w-5 h-5" />,
      title: "Optimize Transportation",
      description: "Use electric vehicles or public transport",
      impact: "Medium"
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Waste Reduction Program",
      description: "Implement recycling and composting",
      impact: "Medium"
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Calculator className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Interactive Carbon Calculator
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Calculate your company's carbon footprint and discover actionable insights
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculator Form */}
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Carbon Footprint Calculator
                    </CardTitle>
                    <CardDescription>
                      Enter your monthly consumption data to calculate emissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <TooltipProvider>
                      {/* Electricity Usage */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <Label htmlFor="electricity">Electricity Usage (kWh/month)</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
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
                          className="text-base h-12"
                        />
                      </div>

                      {/* Gas Consumption */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Fuel className="w-4 h-4 text-blue-500" />
                          <Label htmlFor="gas">Gas Consumption (therms/month)</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
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
                          className="text-base h-12"
                        />
                      </div>

                      {/* Company Vehicles */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-gray-700" />
                          <Label htmlFor="vehicles">Company Vehicles (miles/month)</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
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
                          className="text-base h-12"
                        />
                      </div>

                      {/* Flight Travel */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Plane className="w-4 h-4 text-sky-500" />
                          <Label htmlFor="flights">Flight Travel (miles/month)</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
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
                          className="text-base h-12"
                        />
                      </div>

                      {/* Waste */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4 text-orange-500" />
                          <Label htmlFor="waste">Waste (tons/month)</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
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
                          className="text-base h-12"
                        />
                      </div>
                    </TooltipProvider>

                    <Button 
                      onClick={calculateEmissions}
                      className="w-full h-12 text-base"
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
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingDown className="w-5 h-5 text-green-600" />
                          Emissions Result
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            {emissions.toFixed(2)}
                          </div>
                          <div className="text-lg text-gray-600 mb-4">
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
                          <div className="max-w-xs mx-auto">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Carbon Footprint</span>
                              <span>{getEmissionLevel(emissions).percentage}%</span>
                            </div>
                            <Progress 
                              value={getEmissionLevel(emissions).percentage} 
                              className="h-3"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Suggestions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-yellow-500" />
                          Reduction Suggestions
                        </CardTitle>
                        <CardDescription>
                          Actionable steps to reduce your carbon footprint
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {suggestions.map((suggestion, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                                {suggestion.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-gray-900">
                                    {suggestion.title}
                                  </h4>
                                  <Badge 
                                    variant={suggestion.impact === "High" ? "default" : "secondary"}
                                    className="text-xs"
                                  >
                                    {suggestion.impact} Impact
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">
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
