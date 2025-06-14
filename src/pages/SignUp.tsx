
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, Check, ChevronsUpDown, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const industries = [
  "Technology", "Finance & Banking", "Healthcare", "Manufacturing", 
  "Retail", "Energy & Utilities", "Transportation", "Real Estate", "Other"
];

const companySizes = [
  "1-10 employees", "11-50 employees", "51-200 employees", 
  "201-1000 employees", "1000+ employees", "Other"
];

const esgFocusAreas = [
  "Environmental Impact", "Social Responsibility", "Governance"
];

const reportingTypes = [
  "Basic ESG Reporting", "Comprehensive ESG Reporting", "Regulatory ESG Reporting"
];

const countries = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { code: "+36", name: "Hungary", flag: "🇭🇺" },
  { code: "+994", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
];

const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required." }).regex(/^[a-zA-Z0-9\s.,'&_\-\p{L}]+$/u, { message: "Please enter a valid company name." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  otherIndustry: z.string().optional(),
  companySize: z.string().min(1, { message: "Please select a company size." }),
  otherCompanySize: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  countryCode: z.string().optional(),
  phone: z.string().optional(),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { message: "Password must include an uppercase letter, a lowercase letter, and a number." }),
  confirmPassword: z.string(),
  esgFocus: z.string().min(1, { message: "Please select your primary ESG focus area." }),
  reportingType: z.string().min(1, { message: "Please select your reporting type." }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ['confirmPassword'],
}).refine(data => {
    if (data.industry === 'Other') {
        return !!data.otherIndustry && data.otherIndustry.trim().length > 0;
    }
    return true;
}, {
    message: "Please specify your industry.",
    path: ['otherIndustry'],
}).refine(data => {
  if (data.companySize === 'Other') {
      return !!data.otherCompanySize && data.otherCompanySize.trim().length > 0;
  }
  return true;
}, {
  message: "Please specify your company size.",
  path: ['otherCompanySize'],
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isIndustryPopoverOpen, setIndustryPopoverOpen] = useState(false);
  const [isCountryPopoverOpen, setCountryPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { signUp, user } = useAuth();

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
      countryCode: "+1",
      phone: "",
      password: "",
      confirmPassword: "",
      esgFocus: "",
      reportingType: "",
      agreeToTerms: false,
    },
  });

  const watchedIndustry = form.watch("industry");
  const watchedCompanySize = form.watch("companySize");
  const watchedCountryCode = form.watch("countryCode");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Sign up form submitted:", values);
    
    try {
      const { error } = await signUp(values.email, values.password);
      
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created Successfully!",
          description: "Please check your email for verification before signing in.",
        });
        setIsSuccess(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-background font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-8 md:py-16 px-4">
          <div className="w-full max-w-md text-center">
            <div className="bg-white rounded-2xl shadow-xl border p-6 md:p-8">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h1>
              <p className="text-gray-600 mb-6">
                Congratulations! Your account has been created successfully. 
                Please check your email for a verification link before signing in.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link to="/login">Go to Login</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <ChatbotWidget />
        <Footer />
      </div>
    );
  }

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

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Company Details Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your company's official name" 
                            {...field}
                            autoComplete="organization"
                            inputMode="text"
                            className="text-base md:text-sm h-12 md:h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Industry *</FormLabel>
                        {isMobile ? (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="text-base md:text-sm h-12 md:h-10 justify-between">
                                <SelectValue placeholder="Select the industry that best represents your business" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-60">
                              {industries.map(industry => (
                                <SelectItem key={industry} value={industry} className="text-base md:text-sm">
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Popover open={isIndustryPopoverOpen} onOpenChange={setIndustryPopoverOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between h-12 md:h-10 text-base md:text-sm text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <span className="truncate">
                                    {field.value
                                      ? industries.find(
                                          (industry) => industry === field.value
                                        )
                                      : "Select the industry"}
                                  </span>
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                              <Command>
                                <CommandInput placeholder="Search industry..." className="text-base md:text-sm" />
                                <CommandList>
                                  <CommandEmpty>No industry found.</CommandEmpty>
                                  <CommandGroup>
                                    {industries.map((industry) => (
                                      <CommandItem
                                        value={industry}
                                        key={industry}
                                        onSelect={() => {
                                          form.setValue("industry", industry);
                                          setIndustryPopoverOpen(false);
                                        }}
                                        className="text-base md:text-sm"
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            industry === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {industry}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchedIndustry === 'Other' && (
                    <FormField
                      control={form.control}
                      name="otherIndustry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please specify your industry</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your industry" 
                              {...field}
                              autoComplete="off"
                              inputMode="text"
                              className="text-base md:text-sm h-12 md:h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-base md:text-sm h-12 md:h-10 justify-between">
                              <SelectValue placeholder="Select your company's size based on employees" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {companySizes.map(size => (
                              <SelectItem key={size} value={size} className="text-base md:text-sm">
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {watchedCompanySize === 'Other' && (
                    <FormField
                      control={form.control}
                      name="otherCompanySize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please specify your company size</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 2500 employees" 
                              {...field}
                              autoComplete="off"
                              inputMode="text"
                              className="text-base md:text-sm h-12 md:h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Contact Information Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="yourname@company.com" 
                            {...field}
                            autoComplete="email"
                            inputMode="email"
                            className="text-base md:text-sm h-12 md:h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                          <FormItem>
                            <Popover open={isCountryPopoverOpen} onOpenChange={setCountryPopoverOpen}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className="w-full justify-between h-12 md:h-10 text-base md:text-sm"
                                  >
                                    <span className="truncate">
                                      {watchedCountryCode || "+1"}
                                    </span>
                                    <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[280px] p-0" align="start">
                                <Command>
                                  <CommandInput placeholder="Search country..." className="text-base md:text-sm" />
                                  <CommandList>
                                    <CommandEmpty>No country found.</CommandEmpty>
                                    <CommandGroup>
                                      {countries.map((country) => (
                                        <CommandItem
                                          value={`${country.name} ${country.code}`}
                                          key={`${country.name}-${country.code}`}
                                          onSelect={() => {
                                            form.setValue("countryCode", country.code);
                                            setCountryPopoverOpen(false);
                                          }}
                                          className="text-base md:text-sm"
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              country.code === watchedCountryCode
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          <span className="mr-2">{country.flag}</span>
                                          <span className="flex-1">{country.name}</span>
                                          <span className="text-muted-foreground">{country.code}</span>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="51 702 3232" 
                                {...field}
                                autoComplete="tel"
                                inputMode="tel"
                                className="text-base md:text-sm h-12 md:h-10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Account Security Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Security</h3>
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              {...field}
                              autoComplete="new-password"
                              className="text-base md:text-sm h-12 md:h-10 pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Re-enter your password"
                              {...field}
                              autoComplete="new-password"
                              className="text-base md:text-sm h-12 md:h-10 pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ESG Preferences Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">ESG Preferences</h3>
                  
                  <FormField
                    control={form.control}
                    name="esgFocus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary ESG Focus Area *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-base md:text-sm h-12 md:h-10 justify-between">
                              <SelectValue placeholder="Which ESG category do you want to focus on?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {esgFocusAreas.map(area => (
                              <SelectItem key={area} value={area} className="text-base md:text-sm">
                                {area}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reportingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ESG Reporting Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-base md:text-sm h-12 md:h-10 justify-between">
                              <SelectValue placeholder="Select the type of ESG reporting your company needs" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {reportingTypes.map(type => (
                              <SelectItem key={type} value={type} className="text-base md:text-sm">
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Terms and Conditions */}
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                          {" "}and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                          , and confirm GDPR compliance for data protection. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-green-800">
                    Your data is protected with enterprise-grade security and GDPR compliance.
                  </p>
                </div>

                <Button type="submit" className="w-full h-12 text-base md:text-sm" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating Account..." : "Start Your ESG Journey"}
                </Button>

                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-semibold hover:underline">
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
