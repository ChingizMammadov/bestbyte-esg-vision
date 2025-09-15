
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import React, { useState, useEffect } from "react";
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
  Info,
  TreeDeciduous,
  Building,
  BarChart,
  PieChart,
  RefreshCcw
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

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(155, 155, 155, 0.7);
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(200, 200, 200, 0.3);
  }
`;

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
  // State for temporary input values, only applied to formData when Calculate is clicked
  const [inputValues, setInputValues] = useState({
    electricity: "",
    gas: "",
    vehicles: "",
    flights: "",
    waste: ""
  });
  const [emissions, setEmissions] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  
  // Initialize inputValues with formData values
  useEffect(() => {
    setInputValues({...formData});
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field when user types
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Reset all input fields to empty values
  const handleReset = () => {
    setInputValues({
      electricity: "",
      gas: "",
      vehicles: "",
      flights: "",
      waste: ""
    });
    setValidationErrors({});
  };

  const calculateEmissions = () => {
    // Validate inputs first
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Check each field
    Object.entries(inputValues).forEach(([field, value]) => {
      // Empty check - require at least "0" if empty
      if (value === "") {
        newErrors[field] = "Please enter a value (use 0 if none)";
        isValid = false;
      } 
      // Make sure it's a valid number
      else if (isNaN(parseFloat(value))) {
        newErrors[field] = "Please enter a valid number";
        isValid = false;
      }
      // Make sure it's not negative
      else if (parseFloat(value) < 0) {
        newErrors[field] = "Value cannot be negative";
        isValid = false;
      }
    });

    // If validation fails, set errors and return
    if (!isValid) {
      setValidationErrors(newErrors);
      return;
    }

    // Apply input values to formData (only on successful validation)
    setFormData({...inputValues});

    // Emission factors (approximate values for demonstration)
    const factors = {
      electricity: 0.0004, // tons CO2e per kWh
      gas: 0.0053, // tons CO2e per therm
      vehicles: 0.0004, // tons CO2e per mile
      flights: 0.0002, // tons CO2e per mile
      waste: 0.5 // tons CO2e per ton of waste
    };

    // Use the validated inputValues to calculate emissions
    const totalEmissions = 
      (parseFloat(inputValues.electricity) || 0) * factors.electricity +
      (parseFloat(inputValues.gas) || 0) * factors.gas +
      (parseFloat(inputValues.vehicles) || 0) * factors.vehicles +
      (parseFloat(inputValues.flights) || 0) * factors.flights +
      (parseFloat(inputValues.waste) || 0) * factors.waste;

    setEmissions(totalEmissions);
    setShowResults(true);
    setValidationErrors({});
  };

  const getEmissionLevel = (emissions: number) => {
    if (emissions < 10) return { level: "Low", color: "bg-green-500", percentage: 30 };
    if (emissions < 25) return { level: "Medium", color: "bg-yellow-500", percentage: 60 };
    return { level: "High", color: "bg-red-500", percentage: 90 };
  };

  // Generate tailored suggestions based on user inputs and emission results
  const getSuggestions = () => {
    if (!emissions) return [];

    const parsedValues = {
      electricity: parseFloat(formData.electricity) || 0,
      gas: parseFloat(formData.gas) || 0,
      vehicles: parseFloat(formData.vehicles) || 0,
      flights: parseFloat(formData.flights) || 0,
      waste: parseFloat(formData.waste) || 0
    };

    // Calculate contribution percentages
    const factors = {
      electricity: 0.0004, // tons CO2e per kWh
      gas: 0.0053, // tons CO2e per therm
      vehicles: 0.0004, // tons CO2e per mile
      flights: 0.0002, // tons CO2e per mile
      waste: 0.5 // tons CO2e per ton of waste
    };

    const contributions = {
      electricity: (parsedValues.electricity * factors.electricity) / emissions * 100,
      gas: (parsedValues.gas * factors.gas) / emissions * 100,
      vehicles: (parsedValues.vehicles * factors.vehicles) / emissions * 100,
      flights: (parsedValues.flights * factors.flights) / emissions * 100,
      waste: (parsedValues.waste * factors.waste) / emissions * 100
    };

    // Calculate which category is the highest contributor
    const highestContributor = Object.entries(contributions).reduce(
      (max, [key, value]) => value > max.value ? { key, value } : max, 
      { key: '', value: 0 }
    );

    const suggestionList = [];

    // Energy suggestions (electricity + gas)
    if (contributions.electricity > 20 || contributions.gas > 20) {
      suggestionList.push({
        icon: <Zap className="w-5 h-5 text-emerald-600" />,
        title: parsedValues.electricity > 1000 
          ? "High Energy Usage Detected" 
          : "Switch to Renewable Energy",
        description: parsedValues.electricity > 1000 
          ? "Consider energy audit and efficient lighting/equipment upgrades" 
          : "Estimated 20-30% emissions reduction with renewable sources",
        impact: "High"
      });
    }

    // Transportation suggestions (vehicles)
    if (contributions.vehicles > 15) {
      suggestionList.push({
        icon: <Car className="w-5 h-5 text-blue-600" />,
        title: parsedValues.vehicles > 3000 
          ? "Significant Vehicle Emissions" 
          : "Optimize Transportation",
        description: parsedValues.vehicles > 3000 
          ? "Consider fleet electrification and route optimization" 
          : "Implement remote work policies and encourage carpooling",
        impact: parsedValues.vehicles > 3000 ? "High" : "Medium"
      });
    }

    // Air travel suggestions
    if (contributions.flights > 10) {
      suggestionList.push({
        icon: <Plane className="w-5 h-5 text-sky-600" />,
        title: parsedValues.flights > 5000 
          ? "High Air Travel Impact" 
          : "Reduce Business Flights",
        description: parsedValues.flights > 5000 
          ? "Replace with virtual meetings and train for shorter trips" 
          : "Consolidate business trips and offset necessary flights",
        impact: parsedValues.flights > 5000 ? "High" : "Medium"
      });
    }

    // Waste management suggestions
    if (contributions.waste > 5) {
      suggestionList.push({
        icon: <Trash2 className="w-5 h-5 text-orange-600" />,
        title: parsedValues.waste > 1 
          ? "Significant Waste Generation" 
          : "Implement Waste Reduction",
        description: parsedValues.waste > 1 
          ? "Develop comprehensive waste audit and circular economy approach" 
          : "Start recycling program and reduce single-use materials",
        impact: parsedValues.waste > 1 ? "High" : "Medium"
      });
    }

    // Add a focused suggestion based on the highest contributor
    if (highestContributor.value > 30) {
      // Add specialized suggestion for the highest contributor
      switch (highestContributor.key) {
        case 'electricity':
          suggestionList.push({
            icon: <Building className="w-5 h-5 text-indigo-600" />,
            title: "Building Energy Management System",
            description: "Implement smart building controls and energy monitoring to reduce electricity by 15-25%",
            impact: "High"
          });
          break;
        case 'gas':
          suggestionList.push({
            icon: <Fuel className="w-5 h-5 text-purple-600" />,
            title: "Heating System Upgrade",
            description: "Convert to electric heat pumps or optimize boiler efficiency to reduce gas consumption by 30%",
            impact: "High"
          });
          break;
        case 'vehicles':
          suggestionList.push({
            icon: <BarChart className="w-5 h-5 text-green-600" />,
            title: "Fleet Management Program",
            description: "Implement fleet tracking and driver training to reduce fuel usage by up to 20%",
            impact: "High"
          });
          break;
        case 'flights':
          suggestionList.push({
            icon: <PieChart className="w-5 h-5 text-blue-600" />,
            title: "Travel Policy Revision",
            description: "Set carbon budgets for business travel and implement a carbon fee for non-essential flights",
            impact: "High"
          });
          break;
        case 'waste':
          suggestionList.push({
            icon: <TreeDeciduous className="w-5 h-5 text-green-600" />,
            title: "Zero Waste Initiative",
            description: "Develop a full circular economy approach to eliminate landfill waste within 2 years",
            impact: "High"
          });
          break;
      }
    }

    // General suggestions based on overall emissions
    if (emissions > 20) {
      suggestionList.push({
        icon: <Lightbulb className="w-5 h-5 text-yellow-600" />,
        title: "Develop Comprehensive ESG Strategy",
        description: "Set science-based targets and implement company-wide initiatives",
        impact: "High"
      });
    } else if (emissions < 10) {
      suggestionList.push({
        icon: <Leaf className="w-5 h-5 text-green-600" />,
        title: "Maintain Your Progress",
        description: "Consider carbon offsetting to achieve net-zero emissions",
        impact: "Low"
      });
    }

    // Ensure we have at least 3 suggestions
    if (suggestionList.length < 3) {
      // Add general suggestions based on emission level
      if (emissions > 15) {
        suggestionList.push({
          icon: <Building className="w-5 h-5 text-slate-600" />,
          title: "Sustainability Certification",
          description: "Pursue LEED, Energy Star or ISO 14001 certification for your facilities",
          impact: "Medium"
        });
      } else {
        suggestionList.push({
          icon: <Leaf className="w-5 h-5 text-green-600" />,
          title: "Waste Reduction Program",
          description: "Implement recycling and composting initiatives",
          impact: "Medium"
        });
      }
    }

    return suggestionList.slice(0, 4); // Limit to max 4 suggestions
  };

  const suggestions = getSuggestions();

  
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
      {/* Add custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
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
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-slate-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
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
                        <div className="space-y-1">
                          <Input
                            id="electricity"
                            type="number"
                            placeholder="e.g., 1200"
                            value={inputValues.electricity}
                            onChange={(e) => handleInputChange("electricity", e.target.value)}
                            className={`text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 ${validationErrors.electricity ? "border-red-500 dark:border-red-500" : ""}`}
                          />
                          {validationErrors.electricity && (
                            <p className="text-xs text-red-500">{validationErrors.electricity}</p>
                          )}
                        </div>
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
                        <div className="space-y-1">
                          <Input
                            id="gas"
                            type="number"
                            placeholder="e.g., 150"
                            value={inputValues.gas}
                            onChange={(e) => handleInputChange("gas", e.target.value)}
                            className={`text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 ${validationErrors.gas ? "border-red-500 dark:border-red-500" : ""}`}
                          />
                          {validationErrors.gas && (
                            <p className="text-xs text-red-500">{validationErrors.gas}</p>
                          )}
                        </div>
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
                        <div className="space-y-1">
                          <Input
                            id="vehicles"
                            type="number"
                            placeholder="e.g., 5000"
                            value={inputValues.vehicles}
                            onChange={(e) => handleInputChange("vehicles", e.target.value)}
                            className={`text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 ${validationErrors.vehicles ? "border-red-500 dark:border-red-500" : ""}`}
                          />
                          {validationErrors.vehicles && (
                            <p className="text-xs text-red-500">{validationErrors.vehicles}</p>
                          )}
                        </div>
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
                        <div className="space-y-1">
                          <Input
                            id="flights"
                            type="number"
                            placeholder="e.g., 2000"
                            value={inputValues.flights}
                            onChange={(e) => handleInputChange("flights", e.target.value)}
                            className={`text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 ${validationErrors.flights ? "border-red-500 dark:border-red-500" : ""}`}
                          />
                          {validationErrors.flights && (
                            <p className="text-xs text-red-500">{validationErrors.flights}</p>
                          )}
                        </div>
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
                        <div className="space-y-1">
                          <Input
                            id="waste"
                            type="number"
                            placeholder="e.g., 0.5"
                            value={inputValues.waste}
                            onChange={(e) => handleInputChange("waste", e.target.value)}
                            className={`text-slate-800 dark:text-slate-100 bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 h-12 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 ${validationErrors.waste ? "border-red-500 dark:border-red-500" : ""}`}
                          />
                          {validationErrors.waste && (
                            <p className="text-xs text-red-500">{validationErrors.waste}</p>
                          )}
                        </div>
                      </div>
                    </TooltipProvider>

                    <div className="space-y-4">
                      <div>
                        <Button 
                          onClick={calculateEmissions}
                          className="w-full h-12 text-base bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 dark:from-emerald-600 dark:to-green-600 dark:hover:from-emerald-700 dark:hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                          size="lg"
                        >
                          <Calculator className="w-4 h-4 mr-2" />
                          Calculate Emissions
                        </Button>
                        <Button
                          onClick={handleReset}
                          className="text-white bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 dark:from-red-600 dark:to-rose-600 dark:hover:from-red-700 dark:hover:to-rose-700 mt-4 w-full h-12 text-base border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm hover:shadow transition-all duration-300"
                          size="lg"
                        >
                          <RefreshCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                      
                      {/* Calculation formula explanation */}
                      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm">
                        <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1">
                          <BarChart className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          Calculation Method
                        </h4>
                        <div className="space-y-2 text-slate-600 dark:text-slate-400">
                          <p>Total Emissions = Sum of all sources:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Electricity: kWh × 0.0004 tons CO₂e/kWh</li>
                            <li>Gas: therms × 0.0053 tons CO₂e/therm</li>
                            <li>Vehicles: miles × 0.0004 tons CO₂e/mile</li>
                            <li>Flights: miles × 0.0002 tons CO₂e/mile</li>
                            <li>Waste: tons × 0.5 tons CO₂e/ton</li>
                          </ul>
                          <p className="text-xs mt-2 italic">Note: Emission factors are approximations for demonstration purposes.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results Section */}
                {showResults && emissions !== null ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-6 h-full flex flex-col"
                  >
                    {/* Emissions Result */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-slate-200 dark:border-gray-700 shadow-xl flex-1 flex flex-col">
                      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-t-lg">
                        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                          <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          Emissions Analysis
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-300">
                          Detailed breakdown of your carbon footprint
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="text-center flex-1 flex flex-col">
                          <div className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                            {emissions.toFixed(2)}
                          </div>
                          <div className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                            tons CO2e/month
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-6">
                            <Badge 
                              variant={getEmissionLevel(emissions).level === "Low" ? "default" : getEmissionLevel(emissions).level === "Medium" ? "secondary" : "destructive"}
                              className="text-sm py-1"
                            >
                              {getEmissionLevel(emissions).level} Impact
                            </Badge>
                          </div>
                          
                          {/* Contribution Breakdown */}
                          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                            <h4 className="font-medium text-sm text-slate-800 dark:text-slate-100 mb-3">
                              Emission Sources
                            </h4>
                            <div className="space-y-3">
                              {(() => {
                                // Calculate all emission values and total them first
                                const sources = {
                                  electricity: {
                                    label: "Electricity",
                                    factor: 0.0004,
                                    icon: <Zap className="w-3 h-3" />,
                                    color: "bg-yellow-500"
                                  },
                                  gas: {
                                    label: "Natural Gas",
                                    factor: 0.0053,
                                    icon: <Fuel className="w-3 h-3" />,
                                    color: "bg-blue-500"
                                  },
                                  vehicles: {
                                    label: "Vehicles",
                                    factor: 0.0004,
                                    icon: <Car className="w-3 h-3" />,
                                    color: "bg-slate-500"
                                  },
                                  flights: {
                                    label: "Air Travel",
                                    factor: 0.0002,
                                    icon: <Plane className="w-3 h-3" />,
                                    color: "bg-sky-500"
                                  },
                                  waste: {
                                    label: "Waste",
                                    factor: 0.5,
                                    icon: <Trash2 className="w-3 h-3" />,
                                    color: "bg-orange-500"
                                  }
                                };
                                
                                // Calculate raw emission values for each source
                                const emissionValues = Object.entries(sources).map(([key, source]) => {
                                  const value = parseFloat(formData[key]) || 0;
                                  return {
                                    key,
                                    source,
                                    value,
                                    emission: value * source.factor
                                  };
                                });
                                
                                // Filter out negligible sources
                                const significantEmissions = emissionValues.filter(item => 
                                  (item.emission / emissions) * 100 >= 1
                                );
                                
                                // Calculate the sum of all significant emissions
                                const totalSignificantEmissions = significantEmissions.reduce(
                                  (sum, item) => sum + item.emission, 0
                                );
                                
                                // Now normalize percentages to ensure they add up to 100%
                                return significantEmissions.map(item => {
                                  // Calculate normalized percentage 
                                  const normalizedPercentage = (item.emission / totalSignificantEmissions) * 100;
                                  
                                  return (
                                    <div key={item.key} className="space-y-1">
                                      <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                                          <span className={`p-1 rounded-full text-white ${item.source.color}`}>
                                            {item.source.icon}
                                          </span>
                                          <span>{item.source.label}</span>
                                        </div>
                                        <div className="font-medium text-slate-900 dark:text-slate-100">
                                          {normalizedPercentage.toFixed(1)}%
                                        </div>
                                      </div>
                                      <Progress 
                                        value={normalizedPercentage} 
                                        className={`h-1.5 ${item.source.color}`} 
                                      />
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Suggestions */}
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-slate-200 dark:border-gray-700 shadow-xl flex-1 flex flex-col">
                      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-t-lg">
                        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                          <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                          Tailored Reduction Suggestions
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-300">
                          {emissions && emissions > 20 
                            ? "High-priority actions to reduce your significant emissions" 
                            : emissions && emissions > 10 
                              ? "Recommended actions based on your emission profile"
                              : "Steps to further reduce your carbon footprint"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        {/* Scrollable container with fixed height to show 2 items */}
                        <div 
                          className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1" 
                          style={{ 
                            maxHeight: "320px", // Height for approximately 2 items
                            scrollbarWidth: "thin",
                            scrollbarColor: "rgba(155, 155, 155, 0.5) transparent"
                          }}
                        >
                          {suggestions.length > 0 ? suggestions.map((suggestion, index) => {
                            // Dynamic styling based on impact
                            let borderColor = "border-slate-200 dark:border-gray-700";
                            let bgHoverColor = "hover:bg-slate-50 dark:hover:bg-gray-700";
                            
                            if (suggestion.impact === "High") {
                              borderColor = "border-red-200 dark:border-red-800";
                              bgHoverColor = "hover:bg-red-50 dark:hover:bg-red-900/20";
                            } else if (suggestion.impact === "Medium") {
                              borderColor = "border-yellow-200 dark:border-yellow-800";
                              bgHoverColor = "hover:bg-yellow-50 dark:hover:bg-yellow-900/20";
                            } else {
                              borderColor = "border-green-200 dark:border-green-800";
                              bgHoverColor = "hover:bg-green-50 dark:hover:bg-green-900/20";
                            }

                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`flex items-start gap-3 p-4 rounded-lg border ${borderColor} ${bgHoverColor} transition-colors cursor-pointer shadow-sm hover:shadow-md`}
                              >
                                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg flex-shrink-0 shadow-sm">
                                  {suggestion.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-medium text-slate-800 dark:text-slate-100">
                                      {suggestion.title}
                                    </h4>
                                    <Badge 
                                      variant={
                                        suggestion.impact === "High" 
                                          ? "destructive" 
                                          : suggestion.impact === "Medium"
                                            ? "default"
                                            : "outline"
                                      }
                                      className="text-xs"
                                    >
                                      {suggestion.impact} Impact
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                                    {suggestion.description}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          }) : (
                            <div className="text-center p-6">
                              <p className="text-slate-600 dark:text-slate-300">
                                Enter your data and calculate emissions to see tailored suggestions.
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {emissions && emissions > 0 && (
                          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              <span className="font-medium">Priority focus:</span> {
                                emissions > 20
                                  ? "High emissions detected. Focus on major reductions in your largest impact areas."
                                  : emissions > 10 
                                    ? "Moderate emissions. Balance cost-effective reductions across all areas."
                                    : "Low emissions. Fine-tune your approach and consider carbon offsetting."
                              }
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  // Empty placeholder to maintain grid layout when results aren't showing
                  <div className="h-full lg:block hidden"></div>
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
