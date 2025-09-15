import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountryOption {
  id: string;
  code: string;
  name: string;
}

// Subset of commonly used countries to reduce initial load
const popularCountries: CountryOption[] = [
  { id: "US", code: "+1", name: "United States" },
  { id: "GB", code: "+44", name: "United Kingdom" },
  { id: "CA", code: "+1", name: "Canada" },
  { id: "AU", code: "+61", name: "Australia" },
  { id: "DE", code: "+49", name: "Germany" },
  { id: "FR", code: "+33", name: "France" }
];

// Full list loaded on demand
const allCountries: CountryOption[] = [
  { id: "AF", code: "+93", name: "Afghanistan" },
  { id: "AL", code: "+355", name: "Albania" },
  { id: "DZ", code: "+213", name: "Algeria" },
  { id: "AD", code: "+376", name: "Andorra" },
  { id: "AO", code: "+244", name: "Angola" },
  { id: "AG", code: "+1", name: "Antigua" },
  { id: "AR", code: "+54", name: "Argentina" },
  { id: "AM", code: "+374", name: "Armenia" },
  { id: "AU", code: "+61", name: "Australia" },
  { id: "AT", code: "+43", name: "Austria" },
  { id: "AZ", code: "+994", name: "Azerbaijan" },
  { id: "BS", code: "+1", name: "Bahamas" },
  { id: "BH", code: "+973", name: "Bahrain" },
  { id: "BD", code: "+880", name: "Bangladesh" },
  { id: "BB", code: "+1", name: "Barbados" },
  { id: "BY", code: "+375", name: "Belarus" },
  { id: "BE", code: "+32", name: "Belgium" },
  { id: "BZ", code: "+501", name: "Belize" },
  { id: "BJ", code: "+229", name: "Benin" },
  { id: "BT", code: "+975", name: "Bhutan" },
  { id: "BO", code: "+591", name: "Bolivia" },
  { id: "BA", code: "+387", name: "Bosnia" },
  { id: "BW", code: "+267", name: "Botswana" },
  { id: "BR", code: "+55", name: "Brazil" },
  { id: "BN", code: "+673", name: "Brunei" },
  { id: "BG", code: "+359", name: "Bulgaria" },
  { id: "BF", code: "+226", name: "Burkina Faso" },
  { id: "BI", code: "+257", name: "Burundi" },
  { id: "KH", code: "+855", name: "Cambodia" },
  { id: "CM", code: "+237", name: "Cameroon" },
  { id: "CA", code: "+1", name: "Canada" },
  { id: "CV", code: "+238", name: "Cape Verde" },
  { id: "CF", code: "+236", name: "Central African Republic" },
  { id: "TD", code: "+235", name: "Chad" },
  { id: "CL", code: "+56", name: "Chile" },
  { id: "CN", code: "+86", name: "China" },
  { id: "CO", code: "+57", name: "Colombia" },
  { id: "KM", code: "+269", name: "Comoros" },
  { id: "CG", code: "+242", name: "Congo" },
  { id: "CR", code: "+506", name: "Costa Rica" },
  { id: "HR", code: "+385", name: "Croatia" },
  { id: "CU", code: "+53", name: "Cuba" },
  { id: "CY", code: "+357", name: "Cyprus" },
  { id: "CZ", code: "+420", name: "Czech Republic" },
  { id: "DK", code: "+45", name: "Denmark" },
  { id: "DJ", code: "+253", name: "Djibouti" },
  { id: "DM", code: "+1", name: "Dominica" },
  { id: "DO", code: "+1", name: "Dominican Republic" },
  { id: "EC", code: "+593", name: "Ecuador" },
  { id: "EG", code: "+20", name: "Egypt" },
  { id: "SV", code: "+503", name: "El Salvador" },
  { id: "GQ", code: "+240", name: "Equatorial Guinea" },
  { id: "ER", code: "+291", name: "Eritrea" },
  { id: "EE", code: "+372", name: "Estonia" },
  { id: "ET", code: "+251", name: "Ethiopia" },
  { id: "FJ", code: "+679", name: "Fiji" },
  { id: "FI", code: "+358", name: "Finland" },
  { id: "FR", code: "+33", name: "France" },
  { id: "GA", code: "+241", name: "Gabon" },
  { id: "GM", code: "+220", name: "Gambia" },
  { id: "GE", code: "+995", name: "Georgia" },
  { id: "DE", code: "+49", name: "Germany" },
  { id: "GH", code: "+233", name: "Ghana" },
  { id: "GI", code: "+350", name: "Gibraltar" },
  { id: "GR", code: "+30", name: "Greece" },
  { id: "GL", code: "+299", name: "Greenland" },
  { id: "GT", code: "+502", name: "Guatemala" },
  { id: "GN", code: "+224", name: "Guinea" },
  { id: "GW", code: "+245", name: "Guinea-Bissau" },
  { id: "GY", code: "+592", name: "Guyana" },
  { id: "HT", code: "+509", name: "Haiti" },
  { id: "HN", code: "+504", name: "Honduras" },
  { id: "HK", code: "+852", name: "Hong Kong" },
  { id: "HU", code: "+36", name: "Hungary" },
  { id: "IS", code: "+354", name: "Iceland" },
  { id: "IN", code: "+91", name: "India" },
  { id: "ID", code: "+62", name: "Indonesia" },
  { id: "IR", code: "+98", name: "Iran" },
  { id: "IQ", code: "+964", name: "Iraq" },
  { id: "IE", code: "+353", name: "Ireland" },
  { id: "IL", code: "+972", name: "Israel" },
  { id: "IT", code: "+39", name: "Italy" },
  { id: "JM", code: "+1", name: "Jamaica" },
  { id: "JP", code: "+81", name: "Japan" },
  { id: "JO", code: "+962", name: "Jordan" },
  { id: "KZ", code: "+7", name: "Kazakhstan" },
  { id: "KE", code: "+254", name: "Kenya" },
  { id: "KI", code: "+686", name: "Kiribati" },
  { id: "KP", code: "+850", name: "Korea, North" },
  { id: "KR", code: "+82", name: "Korea, South" },
  { id: "KW", code: "+965", name: "Kuwait" },
  { id: "KG", code: "+996", name: "Kyrgyzstan" },
  { id: "LA", code: "+856", name: "Laos" },
  { id: "LV", code: "+371", name: "Latvia" },
  { id: "LB", code: "+961", name: "Lebanon" },
  { id: "LS", code: "+266", name: "Lesotho" },
  { id: "LR", code: "+231", name: "Liberia" },
  { id: "LY", code: "+218", name: "Libya" },
  { id: "LI", code: "+423", name: "Liechtenstein" },
  { id: "LT", code: "+370", name: "Lithuania" },
  { id: "LU", code: "+352", name: "Luxembourg" },
  { id: "MO", code: "+853", name: "Macau" },
  { id: "MG", code: "+261", name: "Madagascar" },
  { id: "MW", code: "+265", name: "Malawi" },
  { id: "MY", code: "+60", name: "Malaysia" },
  { id: "MV", code: "+960", name: "Maldives" },
  { id: "ML", code: "+223", name: "Mali" },
  { id: "MT", code: "+356", name: "Malta" },
  { id: "MH", code: "+692", name: "Marshall Islands" },
  { id: "MR", code: "+222", name: "Mauritania" },
  { id: "MU", code: "+230", name: "Mauritius" },
  { id: "MX", code: "+52", name: "Mexico" },
  { id: "FM", code: "+691", name: "Micronesia" },
  { id: "MD", code: "+373", name: "Moldova" },
  { id: "MC", code: "+377", name: "Monaco" },
  { id: "MN", code: "+976", name: "Mongolia" },
  { id: "ME", code: "+382", name: "Montenegro" },
  { id: "MA", code: "+212", name: "Morocco" },
  { id: "MZ", code: "+258", name: "Mozambique" },
  { id: "MM", code: "+95", name: "Myanmar" },
  { id: "NA", code: "+264", name: "Namibia" },
  { id: "NR", code: "+674", name: "Nauru" },
  { id: "NP", code: "+977", name: "Nepal" },
  { id: "NL", code: "+31", name: "Netherlands" },
  { id: "NZ", code: "+64", name: "New Zealand" },
  { id: "NI", code: "+505", name: "Nicaragua" },
  { id: "NE", code: "+227", name: "Niger" },
  { id: "NG", code: "+234", name: "Nigeria" },
  { id: "NO", code: "+47", name: "Norway" },
  { id: "OM", code: "+968", name: "Oman" },
  { id: "PK", code: "+92", name: "Pakistan" },
  { id: "PW", code: "+680", name: "Palau" },
  { id: "PS", code: "+970", name: "Palestine" },
  { id: "PA", code: "+507", name: "Panama" },
  { id: "PG", code: "+675", name: "Papua New Guinea" },
  { id: "PY", code: "+595", name: "Paraguay" },
  { id: "PE", code: "+51", name: "Peru" },
  { id: "PH", code: "+63", name: "Philippines" },
  { id: "PL", code: "+48", name: "Poland" },
  { id: "PT", code: "+351", name: "Portugal" },
  { id: "QA", code: "+974", name: "Qatar" },
  { id: "RO", code: "+40", name: "Romania" },
  { id: "RU", code: "+7", name: "Russia" },
  { id: "RW", code: "+250", name: "Rwanda" },
  { id: "KN", code: "+1", name: "Saint Kitts and Nevis" },
  { id: "LC", code: "+1", name: "Saint Lucia" },
  { id: "VC", code: "+1", name: "Saint Vincent" },
  { id: "WS", code: "+685", name: "Samoa" },
  { id: "SM", code: "+378", name: "San Marino" },
  { id: "ST", code: "+239", name: "Sao Tome" },
  { id: "SA", code: "+966", name: "Saudi Arabia" },
  { id: "SN", code: "+221", name: "Senegal" },
  { id: "RS", code: "+381", name: "Serbia" },
  { id: "SC", code: "+248", name: "Seychelles" },
  { id: "SL", code: "+232", name: "Sierra Leone" },
  { id: "SG", code: "+65", name: "Singapore" },
  { id: "SK", code: "+421", name: "Slovakia" },
  { id: "SI", code: "+386", name: "Slovenia" },
  { id: "SB", code: "+677", name: "Solomon Islands" },
  { id: "SO", code: "+252", name: "Somalia" },
  { id: "ZA", code: "+27", name: "South Africa" },
  { id: "ES", code: "+34", name: "Spain" },
  { id: "LK", code: "+94", name: "Sri Lanka" },
  { id: "SD", code: "+249", name: "Sudan" },
  { id: "SR", code: "+597", name: "Suriname" },
  { id: "SZ", code: "+268", name: "Swaziland" },
  { id: "SE", code: "+46", name: "Sweden" },
  { id: "CH", code: "+41", name: "Switzerland" },
  { id: "SY", code: "+963", name: "Syria" },
  { id: "TW", code: "+886", name: "Taiwan" },
  { id: "TJ", code: "+992", name: "Tajikistan" },
  { id: "TZ", code: "+255", name: "Tanzania" },
  { id: "TH", code: "+66", name: "Thailand" },
  { id: "TL", code: "+670", name: "Timor-Leste" },
  { id: "TG", code: "+228", name: "Togo" },
  { id: "TO", code: "+676", name: "Tonga" },
  { id: "TT", code: "+1", name: "Trinidad and Tobago" },
  { id: "TN", code: "+216", name: "Tunisia" },
  { id: "TR", code: "+90", name: "Turkey" },
  { id: "TM", code: "+993", name: "Turkmenistan" },
  { id: "TV", code: "+688", name: "Tuvalu" },
  { id: "UG", code: "+256", name: "Uganda" },
  { id: "UA", code: "+380", name: "Ukraine" },
  { id: "AE", code: "+971", name: "United Arab Emirates" },
  { id: "GB", code: "+44", name: "United Kingdom" },
  { id: "US", code: "+1", name: "United States" },
  { id: "UY", code: "+598", name: "Uruguay" },
  { id: "UZ", code: "+998", name: "Uzbekistan" },
  { id: "VU", code: "+678", name: "Vanuatu" },
  { id: "VA", code: "+39", name: "Vatican City" },
  { id: "VE", code: "+58", name: "Venezuela" },
  { id: "VN", code: "+84", name: "Vietnam" },
  { id: "YE", code: "+967", name: "Yemen" },
  { id: "ZM", code: "+260", name: "Zambia" },
  { id: "ZW", code: "+263", name: "Zimbabwe" },
];

interface LightweightCountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  error?: boolean;
}

/**
 * A highly optimized lightweight country select component that doesn't freeze the UI
 * Used as a replacement for Radix UI Select which causes performance issues with large datasets
 */
export function LightweightCountrySelect({
  value,
  onChange,
  disabled = false,
  className = "",
  error = false
}: LightweightCountrySelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loadedAllCountries, setLoadedAllCountries] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Determine which countries to display - start with popular, load all on demand
  const countries = React.useMemo(() => {
    return loadedAllCountries ? allCountries : popularCountries;
  }, [loadedAllCountries]);
  
  // Get selected country 
  const selectedCountry = React.useMemo(() => {
    // Find in all countries to ensure we always show the right country code
    return allCountries.find(country => country.id === value) || allCountries.find(country => country.id === 'US');
  }, [value]);

  // Filter countries by search query
  const filteredCountries = React.useMemo(() => {
    if (!searchQuery) return countries;
    
    const query = searchQuery.toLowerCase();
    return countries.filter(country => 
      country.name.toLowerCase().includes(query) || 
      country.code.toLowerCase().includes(query)
    );
  }, [countries, searchQuery]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        
        const currentIndex = filteredCountries.findIndex(country => country.id === value);
        let nextIndex;
        
        if (event.key === "ArrowDown") {
          nextIndex = currentIndex < filteredCountries.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : filteredCountries.length - 1;
        }
        
        onChange(filteredCountries[nextIndex].id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, filteredCountries, value, onChange]);

  // Focus input on open
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    
    // Use setTimeout to prevent UI freezing
    setTimeout(() => {
      setIsOpen(prev => !prev);
      
      // Load all countries when opening the dropdown
      if (!loadedAllCountries) {
        setLoadedAllCountries(true);
      }
    }, 0);
  };

  const handleSelect = (selectedValue: string) => {
    // Use setTimeout to prevent UI freezing
    setTimeout(() => {
      onChange(selectedValue);
      setIsOpen(false);
      setSearchQuery("");
    }, 0);
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border px-3 py-2 text-sm",
          "transition-all duration-200",
          "shadow-sm focus:outline-none",
          disabled && "opacity-50 cursor-not-allowed",
          error 
            ? "border-red-500 dark:border-red-500" 
            : "border-input hover:border-primary/20 hover:shadow-md dark:bg-slate-800/50 dark:border-slate-700 dark:hover:border-primary/30",
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedCountry ? selectedCountry.code : "+1"}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 opacity-50 transition-transform duration-200",
          isOpen && "transform rotate-180"
        )} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className={cn(
          "absolute z-50 mt-1 w-[300px] rounded-lg border border-slate-200 bg-white shadow-lg",
          "dark:bg-slate-800 dark:border-slate-700",
          "max-h-60 overflow-auto"
        )}>
          {/* Search input */}
          <div className="sticky top-0 bg-white dark:bg-slate-800 p-2 border-b border-slate-100 dark:border-slate-700">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full px-3 py-2 text-sm rounded-md",
                "border border-slate-200 dark:border-slate-700",
                "bg-transparent",
                "focus:outline-none focus:ring-1 focus:ring-primary"
              )}
            />
          </div>
          
          <div role="listbox" className="py-1">
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                role="option"
                aria-selected={value === country.id}
                onClick={() => handleSelect(country.id)}
                className={cn(
                  "flex items-center px-3 py-2 text-sm cursor-pointer",
                  "hover:bg-slate-100 dark:hover:bg-slate-700/50",
                  "transition-colors duration-150",
                  value === country.id && "bg-slate-100 dark:bg-slate-700/30"
                )}
              >
                <span className="w-5 flex-shrink-0">
                  {value === country.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </span>
                <span className="ml-2 truncate">{country.code}</span>
                <span className="ml-2 text-xs text-muted-foreground truncate">{country.name}</span>
              </div>
            ))}
            
            {filteredCountries.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No countries match your search
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
