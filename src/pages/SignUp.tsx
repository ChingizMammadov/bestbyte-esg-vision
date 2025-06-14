
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Shield } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    email: "",
    password: "",
    phone: ""
  });

  const industries = [
    "Technology", "Banking & Finance", "Healthcare", "Manufacturing", 
    "Retail", "Energy & Utilities", "Transportation", "Real Estate", "Other"
  ];

  const companySizes = [
    "1-10 employees", "11-50 employees", "51-200 employees", 
    "201-1000 employees", "1000+ employees"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up form submitted:", formData);
    // Handle sign up logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-8 md:py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="rounded-full bg-gradient-to-tr from-green-700 to-teal-400 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white text-lg md:text-xl font-bold">B</div>
                <span className="text-xl md:text-2xl font-bold text-primary">BestByte</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
              <p className="text-gray-600 text-sm md:text-base">Start your ESG journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm md:text-base"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Industry *</label>
                <select
                  required
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm md:text-base"
                >
                  <option value="">Select your industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size *</label>
                <select
                  required
                  value={formData.companySize}
                  onChange={(e) => handleInputChange("companySize", e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm md:text-base"
                >
                  <option value="">Select company size</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm md:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm md:text-base"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 pr-10 md:pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm md:text-base"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 md:top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs md:text-sm text-green-800">
                  Your data is protected with enterprise-grade security and GDPR compliance.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 md:py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 text-sm md:text-base"
              >
                Create Account
              </button>

              <div className="text-center text-xs md:text-sm text-gray-600">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-semibold hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
