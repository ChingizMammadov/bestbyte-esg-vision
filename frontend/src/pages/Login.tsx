
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: ""
    };

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Logged in successfully!",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-8 md:py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-8 transition-all duration-300">
            <div className="text-center mb-6 md:mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="rounded-full bg-gradient-to-tr from-emerald-700 to-emerald-500 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white text-lg md:text-xl font-bold">B</div>
                <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">BestByte</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                Sign in to access your ESG dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition text-sm md:text-base bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 ${
                    errors.email ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 pr-10 md:pr-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition text-sm md:text-base bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 ${
                      errors.password ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 md:top-3.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors duration-200 hover:underline underline-offset-4"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs md:text-sm text-emerald-800 dark:text-emerald-300">
                  Secure authentication with enterprise-grade encryption and GDPR compliance.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-2.5 md:py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base"
              >
                {isLoading ? "Signing In..." : "Sign In Securely"}
              </button>

              <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline underline-offset-4 transition-all duration-200 hover:text-emerald-700 dark:hover:text-emerald-300"
                  >
                    Create your account here
                  </Link>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Our sign-up process collects company details to provide you with tailored ESG reporting.
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
