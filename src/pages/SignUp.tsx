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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const industries = ["Technology", "Finance & Banking", "Healthcare", "Manufacturing", "Retail", "Energy & Utilities", "Transportation", "Real Estate", "Other"];
const companySizes = ["1-10 employees", "11-50 employees", "51-200 employees", "201-1000 employees", "1000+ employees", "Other"];
const esgFocusAreas = ["Environmental Impact", "Social Responsibility", "Governance"];
const reportingTypes = ["Basic ESG Reporting", "Comprehensive ESG Reporting", "Regulatory ESG Reporting"];

const countries = [
  { id: "AF", code: "+93", name: "Afghanistan", flag: "🇦🇫" },
  { id: "AL", code: "+355", name: "Albania", flag: "🇦🇱" },
  { id: "DZ", code: "+213", name: "Algeria", flag: "🇩🇿" },
  { id: "AD", code: "+376", name: "Andorra", flag: "🇦🇩" },
  { id: "AO", code: "+244", name: "Angola", flag: "🇦🇴" },
  { id: "AG", code: "+1268", name: "Antigua and Barbuda", flag: "🇦🇬" },
  { id: "AR", code: "+54", name: "Argentina", flag: "🇦🇷" },
  { id: "AM", code: "+374", name: "Armenia", flag: "🇦🇲" },
  { id: "AU", code: "+61", name: "Australia", flag: "🇦🇺" },
  { id: "AT", code: "+43", name: "Austria", flag: "🇦🇹" },
  { id: "AZ", code: "+994", name: "Azerbaijan", flag: "🇦🇿" },
  { id: "BS", code: "+1242", name: "Bahamas", flag: "🇧🇸" },
  { id: "BH", code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { id: "BD", code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { id: "BB", code: "+1246", name: "Barbados", flag: "🇧🇧" },
  { id: "BY", code: "+375", name: "Belarus", flag: "🇧🇾" },
  { id: "BE", code: "+32", name: "Belgium", flag: "🇧🇪" },
  { id: "BZ", code: "+501", name: "Belize", flag: "🇧🇿" },
  { id: "BJ", code: "+229", name: "Benin", flag: "🇧🇯" },
  { id: "BM", code: "+1441", name: "Bermuda", flag: "🇧🇲" },
  { id: "BT", code: "+975", name: "Bhutan", flag: "🇧🇹" },
  { id: "BO", code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { id: "BA", code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { id: "BW", code: "+267", name: "Botswana", flag: "🇧🇼" },
  { id: "BR", code: "+55", name: "Brazil", flag: "🇧🇷" },
  { id: "BN", code: "+673", name: "Brunei", flag: "🇧🇳" },
  { id: "BG", code: "+359", name: "Bulgaria", flag: "🇧🇬" },
  { id: "BF", code: "+226", name: "Burkina Faso", flag: "🇧🇫" },
  { id: "BI", code: "+257", name: "Burundi", flag: "🇧🇮" },
  { id: "KH", code: "+855", name: "Cambodia", flag: "🇰🇭" },
  { id: "CM", code: "+237", name: "Cameroon", flag: "🇨🇲" },
  { id: "CA", code: "+1", name: "Canada", flag: "🇨🇦" },
  { id: "CV", code: "+238", name: "Cape Verde", flag: "🇨🇻" },
  { id: "KY", code: "+1345", name: "Cayman Islands", flag: "🇰🇾" },
  { id: "CF", code: "+236", name: "Central African Republic", flag: "🇨🇫" },
  { id: "TD", code: "+235", name: "Chad", flag: "🇹🇩" },
  { id: "CL", code: "+56", name: "Chile", flag: "🇨🇱" },
  { id: "CN", code: "+86", name: "China", flag: "🇨🇳" },
  { id: "CO", code: "+57", name: "Colombia", flag: "🇨🇴" },
  { id: "KM", code: "+269", name: "Comoros", flag: "🇰🇲" },
  { id: "CG", code: "+242", name: "Congo", flag: "🇨🇬" },
  { id: "CR", code: "+506", name: "Costa Rica", flag: "🇨🇷" },
  { id: "HR", code: "+385", name: "Croatia", flag: "🇭🇷" },
  { id: "CU", code: "+53", name: "Cuba", flag: "🇨🇺" },
  { id: "CW", code: "+5999", name: "Curacao", flag: "🇨🇼" },
  { id: "CY", code: "+357", name: "Cyprus", flag: "🇨🇾" },
  { id: "CZ", code: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { id: "DK", code: "+45", name: "Denmark", flag: "🇩🇰" },
  { id: "DJ", code: "+253", name: "Djibouti", flag: "🇩🇯" },
  { id: "DM", code: "+1767", name: "Dominica", flag: "🇩🇲" },
  { id: "DO", code: "+1809", name: "Dominican Republic", flag: "🇩🇴" },
  { id: "TL", code: "+670", name: "East Timor", flag: "🇹🇱" },
  { id: "EC", code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { id: "EG", code: "+20", name: "Egypt", flag: "🇪🇬" },
  { id: "SV", code: "+503", name: "El Salvador", flag: "🇸🇻" },
  { id: "GQ", code: "+240", name: "Equatorial Guinea", flag: "🇬🇶" },
  { id: "ER", code: "+291", name: "Eritrea", flag: "🇪🇷" },
  { id: "EE", code: "+372", name: "Estonia", flag: "🇪🇪" },
  { id: "ET", code: "+251", name: "Ethiopia", flag: "🇪🇹" },
  { id: "FK", code: "+500", name: "Falkland Islands", flag: "🇫🇰" },
  { id: "FO", code: "+298", name: "Faroe Islands", flag: "🇫🇴" },
  { id: "FJ", code: "+679", name: "Fiji", flag: "🇫🇯" },
  { id: "FI", code: "+358", name: "Finland", flag: "🇫🇮" },
  { id: "FR", code: "+33", name: "France", flag: "🇫🇷" },
  { id: "GA", code: "+241", name: "Gabon", flag: "🇬🇦" },
  { id: "GM", code: "+220", name: "Gambia", flag: "🇬🇲" },
  { id: "GE", code: "+995", name: "Georgia", flag: "🇬🇪" },
  { id: "DE", code: "+49", name: "Germany", flag: "🇩🇪" },
  { id: "GH", code: "+233", name: "Ghana", flag: "🇬🇭" },
  { id: "GI", code: "+350", name: "Gibraltar", flag: "🇬🇮" },
  { id: "GR", code: "+30", name: "Greece", flag: "🇬🇷" },
  { id: "GL", code: "+299", name: "Greenland", flag: "🇬🇱" },
  { id: "GD", code: "+1473", name: "Grenada", flag: "🇬🇩" },
  { id: "GU", code: "+1671", name: "Guam", flag: "🇬🇺" },
  { id: "GT", code: "+502", name: "Guatemala", flag: "🇬🇹" },
  { id: "GN", code: "+224", name: "Guinea", flag: "🇬🇳" },
  { id: "GW", code: "+245", name: "Guinea-Bissau", flag: "🇬🇼" },
  { id: "GY", code: "+592", name: "Guyana", flag: "🇬🇾" },
  { id: "HT", code: "+509", name: "Haiti", flag: "🇭🇹" },
  { id: "HN", code: "+504", name: "Honduras", flag: "🇭🇳" },
  { id: "HK", code: "+852", name: "Hong Kong", flag: "🇭🇰" },
  { id: "HU", code: "+36", name: "Hungary", flag: "🇭🇺" },
  { id: "IS", code: "+354", name: "Iceland", flag: "🇮🇸" },
  { id: "IN", code: "+91", name: "India", flag: "🇮🇳" },
  { id: "ID", code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { id: "IR", code: "+98", name: "Iran", flag: "🇮🇷" },
  { id: "IQ", code: "+964", name: "Iraq", flag: "🇮🇶" },
  { id: "IE", code: "+353", name: "Ireland", flag: "🇮🇪" },
  { id: "IL", code: "+972", name: "Israel", flag: "🇮🇱" },
  { id: "IT", code: "+39", name: "Italy", flag: "🇮🇹" },
  { id: "JM", code: "+1876", name: "Jamaica", flag: "🇯🇲" },
  { id: "JP", code: "+81", name: "Japan", flag: "🇯🇵" },
  { id: "JO", code: "+962", name: "Jordan", flag: "🇯🇴" },
  { id: "KZ", code: "+7", name: "Kazakhstan", flag: "🇰🇿" },
  { id: "KE", code: "+254", name: "Kenya", flag: "🇰🇪" },
  { id: "KI", code: "+686", name: "Kiribati", flag: "🇰🇮" },
  { id: "KW", code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { id: "KG", code: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
  { id: "LA", code: "+856", name: "Laos", flag: "🇱🇦" },
  { id: "LV", code: "+371", name: "Latvia", flag: "🇱🇻" },
  { id: "LB", code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { id: "LS", code: "+266", name: "Lesotho", flag: "🇱🇸" },
  { id: "LR", code: "+231", name: "Liberia", flag: "🇱🇷" },
  { id: "LY", code: "+218", name: "Libya", flag: "🇱🇾" },
  { id: "LI", code: "+423", name: "Liechtenstein", flag: "🇱🇮" },
  { id: "LT", code: "+370", name: "Lithuania", flag: "🇱🇹" },
  { id: "LU", code: "+352", name: "Luxembourg", flag: "🇱🇺" },
  { id: "MO", code: "+853", name: "Macao", flag: "🇲🇴" },
  { id: "MK", code: "+389", name: "Macedonia", flag: "🇲🇰" },
  { id: "MG", code: "+261", name: "Madagascar", flag: "🇲🇬" },
  { id: "MW", code: "+265", name: "Malawi", flag: "🇲🇼" },
  { id: "MY", code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { id: "MV", code: "+960", name: "Maldives", flag: "🇲🇻" },
  { id: "ML", code: "+223", name: "Mali", flag: "🇲🇱" },
  { id: "MT", code: "+356", name: "Malta", flag: "🇲🇹" },
  { id: "MH", code: "+692", name: "Marshall Islands", flag: "🇲🇭" },
  { id: "MQ", code: "+596", name: "Martinique", flag: "🇲🇶" },
  { id: "MR", code: "+222", name: "Mauritania", flag: "🇲🇷" },
  { id: "MU", code: "+230", name: "Mauritius", flag: "🇲🇺" },
  { id: "MX", code: "+52", name: "Mexico", flag: "🇲🇽" },
  { id: "FM", code: "+691", name: "Micronesia", flag: "🇫🇲" },
  { id: "MD", code: "+373", name: "Moldova", flag: "🇲🇩" },
  { id: "MC", code: "+377", name: "Monaco", flag: "🇲🇨" },
  { id: "MN", code: "+976", name: "Mongolia", flag: "🇲🇳" },
  { id: "ME", code: "+382", name: "Montenegro", flag: "🇲🇪" },
  { id: "MS", code: "+1664", name: "Montserrat", flag: "🇲🇸" },
  { id: "MA", code: "+212", name: "Morocco", flag: "🇲🇦" },
  { id: "MZ", code: "+258", name: "Mozambique", flag: "🇲🇿" },
  { id: "MM", code: "+95", name: "Myanmar", flag: "🇲🇲" },
  { id: "NA", code: "+264", name: "Namibia", flag: "🇳🇦" },
  { id: "NR", code: "+674", name: "Nauru", flag: "🇳🇷" },
  { id: "NP", code: "+977", name: "Nepal", flag: "🇳🇵" },
  { id: "NL", code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { id: "KN", code: "+1869", name: "Nevis", flag: "🇰🇳" },
  { id: "NC", code: "+687", name: "New Caledonia", flag: "🇳🇨" },
  { id: "NZ", code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { id: "NI", code: "+505", name: "Nicaragua", flag: "🇳🇮" },
  { id: "NE", code: "+227", name: "Niger", flag: "🇳🇪" },
  { id: "NG", code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { id: "NU", code: "+683", name: "Niue", flag: "🇳🇺" },
  { id: "NF", code: "+6723", name: "Norfolk Island", flag: "🇳🇫" },
  { id: "MP", code: "+1670", name: "Northern Mariana Islands", flag: "🇲🇵" },
  { id: "NO", code: "+47", name: "Norway", flag: "🇳🇴" },
  { id: "OM", code: "+968", name: "Oman", flag: "🇴🇲" },
  { id: "PK", code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { id: "PW", code: "+680", name: "Palau", flag: "🇵🇼" },
  { id: "PS", code: "+970", name: "Palestine", flag: "🇵🇸" },
  { id: "PA", code: "+507", name: "Panama", flag: "🇵🇦" },
  { id: "PG", code: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
  { id: "PY", code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { id: "PE", code: "+51", name: "Peru", flag: "🇵🇪" },
  { id: "PH", code: "+63", name: "Philippines", flag: "🇵🇭" },
  { id: "PN", code: "+64", name: "Pitcairn Islands", flag: "🇵🇳" },
  { id: "PL", code: "+48", name: "Poland", flag: "🇵🇱" },
  { id: "PT", code: "+351", name: "Portugal", flag: "🇵🇹" },
  { id: "PR", code: "+1787", name: "Puerto Rico", flag: "🇵🇷" },
  { id: "QA", code: "+974", name: "Qatar", flag: "🇶🇦" },
  { id: "RO", code: "+40", name: "Romania", flag: "🇷🇴" },
  { id: "RU", code: "+7", name: "Russia", flag: "🇷🇺" },
  { id: "RW", code: "+250", name: "Rwanda", flag: "🇷🇼" },
  { id: "WS", code: "+685", name: "Samoa", flag: "🇼🇸" },
  { id: "SM", code: "+378", name: "San Marino", flag: "🇸🇲" },
  { id: "ST", code: "+239", name: "Sao Tome and Principe", flag: "🇸🇹" },
  { id: "SA", code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { id: "SN", code: "+221", name: "Senegal", flag: "🇸🇳" },
  { id: "RS", code: "+381", name: "Serbia", flag: "🇷🇸" },
  { id: "SC", code: "+248", name: "Seychelles", flag: "🇸🇨" },
  { id: "SL", code: "+232", name: "Sierra Leone", flag: "🇸🇱" },
  { id: "SG", code: "+65", name: "Singapore", flag: "🇸🇬" },
  { id: "SK", code: "+421", name: "Slovakia", flag: "🇸🇰" },
  { id: "SI", code: "+386", name: "Slovenia", flag: "🇸🇮" },
  { id: "SB", code: "+677", name: "Solomon Islands", flag: "🇸🇧" },
  { id: "SO", code: "+252", name: "Somalia", flag: "🇸🇴" },
  { id: "ZA", code: "+27", name: "South Africa", flag: "🇿🇦" },
  { id: "KR", code: "+82", name: "South Korea", flag: "🇰🇷" },
  { id: "SS", code: "+211", name: "South Sudan", flag: "🇸🇸" },
  { id: "ES", code: "+34", name: "Spain", flag: "🇪🇸" },
  { id: "LK", code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { id: "SD", code: "+249", name: "Sudan", flag: "🇸🇩" },
  { id: "SR", code: "+597", name: "Suriname", flag: "🇸🇷" },
  { id: "SJ", code: "+4779", name: "Svalbard", flag: "🇸🇯" },
  { id: "SZ", code: "+268", name: "Swaziland", flag: "🇸🇿" },
  { id: "SE", code: "+46", name: "Sweden", flag: "🇸🇪" },
  { id: "CH", code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { id: "SY", code: "+963", name: "Syria", flag: "🇸🇾" },
  { id: "TW", code: "+886", name: "Taiwan", flag: "🇹🇼" },
  { id: "TJ", code: "+992", name: "Tajikistan", flag: "🇹🇯" },
  { id: "TZ", code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { id: "TH", code: "+66", name: "Thailand", flag: "🇹🇭" },
  { id: "TG", code: "+228", name: "Togo", flag: "🇹🇬" },
  { id: "TK", code: "+690", name: "Tokelau", flag: "🇹🇰" },
  { id: "TO", code: "+676", name: "Tonga", flag: "🇹🇴" },
  { id: "TT", code: "+1868", name: "Trinidad and Tobago", flag: "🇹🇹" },
  { id: "TN", code: "+216", name: "Tunisia", flag: "🇹🇳" },
  { id: "TR", code: "+90", name: "Turkey", flag: "🇹🇷" },
  { id: "TM", code: "+993", name: "Turkmenistan", flag: "🇹🇲" },
  { id: "TC", code: "+1649", name: "Turks and Caicos Islands", flag: "🇹🇨" },
  { id: "TV", code: "+688", name: "Tuvalu", flag: "🇹🇻" },
  { id: "UG", code: "+256", name: "Uganda", flag: "🇺🇬" },
  { id: "UA", code: "+380", name: "Ukraine", flag: "🇺🇦" },
  { id: "AE", code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { id: "GB", code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { id: "US", code: "+1", name: "United States", flag: "🇺🇸" },
  { id: "UY", code: "+598", name: "Uruguay", flag: "🇺🇾" },
  { id: "UZ", code: "+998", name: "Uzbekistan", flag: "🇺🇿" },
  { id: "VU", code: "+678", name: "Vanuatu", flag: "🇻🇺" },
  { id: "VE", code: "+58", name: "Venezuela", flag: "🇻🇪" },
  { id: "VN", code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { id: "WF", code: "+681", name: "Wallis and Futuna", flag: "🇼🇫" },
  { id: "EH", code: "+212", name: "Western Sahara", flag: "🇪🇭" },
  { id: "YE", code: "+967", name: "Yemen", flag: "🇾🇪" },
  { id: "ZM", code: "+260", name: "Zambia", flag: "🇿🇲" },
  { id: "ZW", code: "+263", name: "Zimbabwe", flag: "🇿🇼" }
];

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
  const {
    toast
  } = useToast();
  const isMobile = useIsMobile();
  const {
    signUp,
    user
  } = useAuth();

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
  const selectedCountry = countries.find(country => country.id === watchedCountryId);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Sign up form submitted:", values);
    try {
      const {
        error
      } = await signUp(values.email, values.password);
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
    return <div className="flex flex-col min-h-screen bg-background font-sans">
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
      </div>;
  }
  return <div className="flex flex-col min-h-screen bg-background font-sans">
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
                  
                  <FormField control={form.control} name="companyName" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your company's official name" {...field} autoComplete="organization" inputMode="text" className="text-base md:text-sm h-12 md:h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="industry" render={({
                  field
                }) => <FormItem className="flex flex-col">
                        <FormLabel className="py-[2px]">Industry *</FormLabel>
                        {isMobile ? <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="text-base md:text-sm h-12 md:h-10 justify-between">
                                <SelectValue placeholder="Select the industry that best represents your business" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-60">
                              {industries.map(industry => <SelectItem key={industry} value={industry} className="text-base md:text-sm">
                                  {industry}
                                </SelectItem>)}
                            </SelectContent>
                          </Select> : <Popover open={isIndustryPopoverOpen} onOpenChange={setIndustryPopoverOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" role="combobox" className={cn("w-full justify-between h-12 md:h-10 text-base md:text-sm text-left font-normal", !field.value && "text-muted-foreground")}>
                                  <span className="truncate">
                                    {field.value ? industries.find(industry => industry === field.value) : "Select the industry"}
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
                                    {industries.map(industry => <CommandItem value={industry} key={industry} onSelect={() => {
                              form.setValue("industry", industry);
                              setIndustryPopoverOpen(false);
                            }} className="text-base md:text-sm">
                                        <Check className={cn("mr-2 h-4 w-4", industry === field.value ? "opacity-100" : "opacity-0")} />
                                        {industry}
                                      </CommandItem>)}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>}
                        <FormMessage />
                      </FormItem>} />

                  {watchedIndustry === 'Other' && <FormField control={form.control} name="otherIndustry" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Please specify your industry</FormLabel>
                          <FormControl>
                            <Input placeholder="Your industry" {...field} autoComplete="off" inputMode="text" className="text-base md:text-sm h-12 md:h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />}

                  <FormField control={form.control} name="companySize" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Company Size *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-base md:text-sm h-12 md:h-10 justify-between">
                              <SelectValue placeholder="Select your company's size based on employees" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {companySizes.map(size => <SelectItem key={size} value={size} className="text-base md:text-sm">
                                {size}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />
                  
                  {watchedCompanySize === 'Other' && <FormField control={form.control} name="otherCompanySize" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Please specify your company size</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2500 employees" {...field} autoComplete="off" inputMode="text" className="text-base md:text-sm h-12 md:h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />}
                </div>

                {/* Contact Information Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                  
                  <FormField control={form.control} name="email" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="yourname@company.com" {...field} autoComplete="email" inputMode="email" className="text-base md:text-sm h-12 md:h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <div className="space-y-2">
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <FormField control={form.control} name="countryId" render={({
                      field
                    }) => <FormItem>
                            <Popover open={isCountryPopoverOpen} onOpenChange={setCountryPopoverOpen}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button variant="outline" role="combobox" className="w-full justify-between h-12 md:h-10 text-base md:text-sm">
                                    <span className="truncate flex items-center gap-1">
                                      {selectedCountry?.flag}
                                      {selectedCountry?.code || "+1"}
                                    </span>
                                    <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[320px] p-0" align="start">
                                <Command>
                                  <CommandInput placeholder="Search country..." className="text-base md:text-sm" />
                                  <CommandList>
                                    <CommandEmpty>No country found.</CommandEmpty>
                                    <CommandGroup>
                                      {countries.map(country => <CommandItem value={`${country.name} ${country.code}`} key={country.id} onSelect={() => {
                                  form.setValue("countryId", country.id);
                                  setCountryPopoverOpen(false);
                                }} className="text-base md:text-sm">
                                          <Check className={cn("mr-2 h-4 w-4", country.id === watchedCountryId ? "opacity-100" : "opacity-0")} />
                                          <span className="mr-2">{country.flag}</span>
                                          <span className="flex-1">{country.name}</span>
                                          <span className="text-muted-foreground">{country.code}</span>
                                        </CommandItem>)}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={form.control} name="phone" render={({
                      field
                    }) => <FormItem>
                            <FormControl>
                              <Input type="tel" placeholder="51 702 3232" {...field} autoComplete="tel" inputMode="tel" className="text-base md:text-sm h-12 md:h-10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                    </div>
                  </div>
                </div>

                {/* Account Security Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Security</h3>
                  
                  <FormField control={form.control} name="password" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Password *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type={showPassword ? "text" : "password"} placeholder="Create a strong password" {...field} autoComplete="new-password" className="text-base md:text-sm h-12 md:h-10 pr-12" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1">
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="confirmPassword" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Confirm Password *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter your password" {...field} autoComplete="new-password" className="text-base md:text-sm h-12 md:h-10 pr-12" />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1">
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                {/* ESG Preferences Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">ESG Preferences</h3>
                  
                  <FormField control={form.control} name="esgFocus" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Primary ESG Focus Area *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-base md:text-sm h-12 md:h-10 justify-between">
                              <SelectValue placeholder="Which ESG category do you want to focus on?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {esgFocusAreas.map(area => <SelectItem key={area} value={area} className="text-base md:text-sm">
                                {area}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="reportingType" render={({
                  field
                }) => <FormItem>
                        <FormLabel>ESG Reporting Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-base md:text-sm h-12 md:h-10 justify-between">
                              <SelectValue placeholder="Select the type of ESG reporting your company needs" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {reportingTypes.map(type => <SelectItem key={type} value={type} className="text-base md:text-sm">
                                {type}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />
                </div>

                {/* Terms and Conditions */}
                <FormField control={form.control} name="agreeToTerms" render={({
                field
              }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
                    </FormItem>} />

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
    </div>;
}
