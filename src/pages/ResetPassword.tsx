import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Shield, CheckCircle, AlertCircle, Lock, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordResetComplete, setPasswordResetComplete] = useState(false);
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: ""
  });

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    return Math.min(score, 100);
  };

  const getStrengthText = (score: number) => {
    if (score < 30) return { text: "Weak", color: "text-red-500" };
    if (score < 60) return { text: "Medium", color: "text-yellow-500" };
    if (score < 80) return { text: "Strong", color: "text-blue-500" };
    return { text: "Very Strong", color: "text-green-500" };
  };

  const getStrengthFeedback = (score: number) => {
    if (score < 50) return "Your password is weak. Please use a mix of letters, numbers, and symbols.";
    if (score < 80) return "Good strength. You can make it stronger with more symbols or length.";
    return "Excellent strength! This is a very secure password.";
  };

  const passwordStrength = calculatePasswordStrength(formData.password);
  const strengthInfo = getStrengthText(passwordStrength);
  const strengthFeedback = getStrengthFeedback(passwordStrength);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: ""
    };

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (passwordStrength < 50) {
      newErrors.password = "Password is too weak. Please include numbers, symbols, and mixed case letters";
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "The passwords you entered do not match. Please try again.";
    }

    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // The Supabase client automatically extracts the token from the URL hash
      // We don't need to manually pass any token, just the new password
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) {
        console.error("Password reset error:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setPasswordResetComplete(true);
        toast({
          title: "Success!",
          description: "Your password has been reset successfully",
        });
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Unexpected error during password reset:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the URL hash contains auth parameters
  useEffect(() => {
    // Supabase sends tokens in the URL hash fragment, not query params
    // The library automatically handles this, but we can check if we're on a valid reset URL
    const isValidResetURL = window.location.hash.includes('type=recovery');
    
    // If URL doesn't include the recovery type hash, it's not a valid reset link
    if (!isValidResetURL) {
      setIsLinkInvalid(true);
      toast({
        title: "Invalid Link",
        description: "This password reset link is invalid or has expired.",
        variant: "destructive",
      });
    } else {
      // If hash exists, let Supabase handle it automatically
      console.log("Valid recovery URL detected");
    }
  }, [toast]);

  if (isLinkInvalid) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 font-sans transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-8 md:py-16 px-4">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
            >
            <div className="bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-8 transition-all duration-300 text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Oops! The password reset link has expired.
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mb-4">
                        For your security, reset links are only valid for a short period of time.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/forgot-password"
                        className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                    >
                        Request a new link
                    </Link>
                </div>
            </div>
            </motion.div>
        </main>
        <ChatbotWidget />
        <Footer />
    </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-8 md:py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-8 transition-all duration-300">
            {!passwordResetComplete ? (
              <>
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="rounded-full bg-gradient-to-tr from-emerald-700 to-emerald-500 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white text-lg md:text-xl font-bold">B</div>
                    <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">BestByte</span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Reset Your Password
                  </h1>
                   <p className="text-center text-slate-600 dark:text-slate-300 text-sm md:text-base mb-4">
                    We’re here to help you get back on track. Just enter a new password below and you’re all set!
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
                    This is a secure page where you can set a new password for your account.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      <span>New Password *</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="ml-1.5 align-middle">
                            <Info size={14} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Use at least 8 characters, including a mix of letters, numbers, and symbols.</p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition text-sm md:text-base bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 ${
                          errors.password ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                        }`}
                        placeholder="Enter your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                passwordStrength < 30 ? "bg-red-500" :
                                passwordStrength < 60 ? "bg-yellow-500" :
                                passwordStrength < 80 ? "bg-blue-500" : "bg-green-500"
                              }`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${strengthInfo.color}`}>
                            {strengthInfo.text}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {strengthFeedback}
                        </p>
                      </motion.div>
                    )}
                    
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 dark:text-red-400 text-xs mt-2"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition text-sm md:text-base bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 ${
                          errors.confirmPassword ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                        }`}
                        placeholder="Re-enter your new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, x: 0 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          x: errors.confirmPassword === "The passwords you entered do not match. Please try again." ? [-5, 5, -5, 5, 0] : 0,
                        }}
                        transition={{ duration: 0.4 }}
                        className="text-red-500 dark:text-red-400 text-xs mt-2"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-2"
                      >
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-xs text-green-600 dark:text-green-400">Passwords match</span>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs md:text-sm text-emerald-800 dark:text-emerald-300">
                      This page is protected by enterprise-grade security and SSL encryption to keep your data safe.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || passwordStrength < 50 || formData.password !== formData.confirmPassword}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base"
                  >
                    {isLoading ? "Resetting Password..." : "Reset My Password"}
                  </button>
                </form>
                
                {/* Help Section */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Still having trouble?
                  </p>
                  <a
                    href="mailto:support@bestbyte.com"
                    className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Contact our support team
                  </a>
                </div>
              </>
            ) : (
              /* Success Message */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Password Reset Successfully!
                  </h1>
                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mb-4">
                    Your password has been reset successfully. You can now log in with your new password.
                  </p>
                </div>

                <div className="space-y-4">
                  <Link
                    to="/login"
                    className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                  >
                    Go to Login
                  </Link>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Redirecting automatically in 3 seconds...
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
