
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [enable2FA, setEnable2FA] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted:", formData, { rememberMe, enable2FA });
    // Handle login logic here
    navigate("/dashboard");
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
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600 text-sm md:text-base">Sign in to access your ESG dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 pr-10 md:pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm md:text-base"
                    placeholder="Enter your password"
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={enable2FA}
                      onChange={(e) => setEnable2FA(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                    />
                    <span className="text-xs md:text-sm text-blue-800 font-medium">Enable Two-Factor Authentication</span>
                  </label>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs md:text-sm text-green-800">
                  Secure login with enterprise-grade encryption and GDPR compliance.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 md:py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 text-sm md:text-base"
              >
                Sign In Securely
              </button>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary font-semibold hover:underline">
                    Create one here
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
