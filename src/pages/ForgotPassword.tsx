
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email address is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Ensure the redirect URL is absolute and does not include any query parameters
      // Supabase will add the necessary auth hash to the URL
      const resetUrl = new URL("/reset-password", window.location.origin).toString();
      
      console.log("Reset redirect URL:", resetUrl);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: resetUrl,
      });

      if (error) {
        setError(error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setEmailSent(true);
        toast({
          title: "Email Sent",
          description: "Check your email for password reset instructions",
        });
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-8 transition-all duration-300">
            {/* Back to Login Link */}
            <div className="mb-6">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>

            {!emailSent ? (
              <>
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="rounded-full bg-gradient-to-tr from-emerald-700 to-emerald-500 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white text-lg md:text-xl font-bold">B</div>
                    <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">BestByte</span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Forgot Your Password?
                  </h1>
                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                    Enter your email address and we'll send you a secure link to reset your password
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent outline-none transition text-sm md:text-base bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 ${
                          error ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 dark:text-red-400 text-xs mt-2"
                      >
                        {error}
                      </motion.p>
                    )}
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      We'll send you a secure link to reset your password
                    </p>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs md:text-sm text-emerald-800 dark:text-emerald-300">
                      For your security, the reset link will expire after 30 minutes
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base"
                  >
                    {isLoading ? "Sending Recovery Link..." : "Send Recovery Link"}
                  </button>
                </form>
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
                    Check Your Email
                  </h1>
                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mb-4">
                    We've sent password recovery instructions to
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {email}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                      <strong>What's next?</strong>
                    </p>
                    <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 text-left">
                      <li>• Check your email inbox (and spam folder)</li>
                      <li>• Click the secure reset link in the email</li>
                      <li>• Create your new password</li>
                      <li>• Log in with your new credentials</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setEmailSent(false);
                      setEmail("");
                      setError("");
                    }}
                    className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    Try a different email address
                  </button>
                </div>
              </motion.div>
            )}

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
          </div>
        </motion.div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
