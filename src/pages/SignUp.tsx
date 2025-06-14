import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState } from "react";
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

const industries = [
  "Technology", "Banking & Finance", "Healthcare", "Manufacturing", 
  "Retail", "Energy & Utilities", "Transportation", "Real Estate", "Other"
];

const companySizes = [
  "1-10 employees", "11-50 employees", "51-200 employees", 
  "201-1000 employees", "1000+ employees", "Other"
];

const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required." }).regex(/^[a-zA-Z0-9\s.,'&_\-\p{L}]+$/u, { message: "Please enter a valid company name." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  otherIndustry: z.string().optional(),
  companySize: z.string().min(1, { message: "Please select a company size." }),
  otherCompanySize: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { message: "Password must include an uppercase letter, a lowercase letter, and a number." }),
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [isIndustryPopoverOpen, setIndustryPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      phone: "",
      password: "",
    },
  });

  const watchedIndustry = form.watch("industry");
  const watchedCompanySize = form.watch("companySize");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Sign up form submitted:", values);
    // Here you would typically make an API call to create an account.
    // This requires backend integration, e.g., with Supabase.
    toast({
      title: "Account Created Successfully!",
      description: "Welcome to BestByte. Redirecting you now...",
    });
    setIsSuccess(true);
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
              <p className="text-gray-600 mb-6">Congratulations! Welcome to BestByte. You can now start your ESG journey.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/dashboard">Explore Dashboard</Link>
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
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your company name" {...field} />
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
                      <Popover open={isIndustryPopoverOpen} onOpenChange={setIndustryPopoverOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? industries.find(
                                    (industry) => industry === field.value
                                  )
                                : "Select your industry"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Search industry..." />
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
                          <Input placeholder="Your industry" {...field} />
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
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizes.map(size => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
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
                          <Input placeholder="e.g., 2500 employees" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-green-800">
                    Your data is protected with enterprise-grade security and GDPR compliance.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="text-center text-xs text-gray-600">
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
            </Form>
          </div>
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
