
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { SignUpHeader } from "@/components/signup/SignUpHeader";
import { CompanyDetailsSection } from "@/components/signup/CompanyDetailsSection";
import { ContactInformationSection } from "@/components/signup/ContactInformationSection";
import { AccountSecuritySection } from "@/components/signup/AccountSecuritySection";
import { ESGPreferencesSection } from "@/components/signup/ESGPreferencesSection";
import { TermsSection } from "@/components/signup/TermsSection";
import { SuccessScreen } from "@/components/signup/SuccessScreen";
import { PremiumButton } from "@/components/signup/PremiumButton";
import { Shield, User } from "lucide-react";
import { PerformanceWrapper, LazySelectWrapper } from "@/components/ui/performance-wrapper";

const formSchema = z.object({
  companyName: z.string().min(1, {
    message: "Company name is required."
  }).regex(/^[a-zA-Z0-9\s.,'&_\-\p{L}]+$/u, {
    message: "Please enter a valid company name."
  }),
  industry: z.string().min(1, {
    message: "Please select an industry."
  }),
  otherIndustry: z.string().optional(),
  companySize: z.string().min(1, {
    message: "Please select a company size."
  }),
  otherCompanySize: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  countryId: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long."
  }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: "Password must include an uppercase letter, a lowercase letter, and a number."
  }),
  confirmPassword: z.string(),
  esgFocus: z.string().min(1, {
    message: "Please select your primary ESG focus area."
  }),
  reportingType: z.string().min(1, {
    message: "Please select your reporting type."
  }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions."
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ['confirmPassword']
}).refine(data => {
  if (data.industry === 'Other') {
    return !!data.otherIndustry && data.otherIndustry.trim().length > 0;
  }
  return true;
}, {
  message: "Please specify your industry.",
  path: ['otherIndustry']
}).refine(data => {
  if (data.companySize === 'Other') {
    return !!data.otherCompanySize && data.otherCompanySize.trim().length > 0;
  }
  return true;
}, {
  message: "Please specify your company size.",
  path: ['otherCompanySize']
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isIndustryPopoverOpen, setIndustryPopoverOpen] = useState(false);
  const [isCountryPopoverOpen, setCountryPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user } = useAuth();
  
  // Debounced popover state setters to prevent UI freezing
  const setIndustryPopoverOpenDebounced = React.useCallback((open: boolean) => {
    setTimeout(() => setIndustryPopoverOpen(open), 0);
  }, []);
  
  const setCountryPopoverOpenDebounced = React.useCallback((open: boolean) => {
    setTimeout(() => setCountryPopoverOpen(open), 0);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      companyName: "",
      industry: "",
      otherIndustry: "",
      companySize: "",
      otherCompanySize: "",
      email: "",
      countryId: "US",
      phone: "",
      password: "",
      confirmPassword: "",
      esgFocus: "",
      reportingType: "",
      agreeToTerms: false
    }
  });

  const watchedIndustry = form.watch("industry");
  const watchedCompanySize = form.watch("companySize");
  const watchedCountryId = form.watch("countryId");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Sign up form submitted:", values);
    try {
      const { error } = await signUp(values.email, values.password);
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account Created Successfully!",
          description: "Please check your email for verification before signing in."
        });
        setIsSuccess(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isSuccess) {
    return <SuccessScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-4 md:py-16 px-4 pb-4">
        <div className="w-full max-w-md">
          <div className="bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 p-4 md:p-8 transition-all duration-300">
            <SignUpHeader />

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CompanyDetailsSection
                  control={form.control}
                  watchedIndustry={watchedIndustry}
                  watchedCompanySize={watchedCompanySize}
                />

                <PerformanceWrapper delayMs={10}>
                  <ContactInformationSection
                    control={form.control}
                    watchedCountryId={watchedCountryId}
                    isCountryPopoverOpen={isCountryPopoverOpen}
                    setCountryPopoverOpen={setCountryPopoverOpenDebounced}
                  />
                </PerformanceWrapper>

                <AccountSecuritySection
                  control={form.control}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                />

                <LazySelectWrapper isOpen={true}>
                  <ESGPreferencesSection control={form.control} />
                </LazySelectWrapper>

                <TermsSection control={form.control} />

                {/* Premium CTA Button */}
                <PremiumButton 
                  type="submit" 
                  variant="primary"
                  icon={Shield}
                  glow
                  className="w-full animate-fade-in" 
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Creating Account..." : "Start Your ESG Journey"}
                </PremiumButton>

                {/* Enhanced Account Prompt */}
                <div className="text-center pt-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
                    <User className="w-4 h-4" />
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline underline-offset-4 transition-all duration-200 hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
