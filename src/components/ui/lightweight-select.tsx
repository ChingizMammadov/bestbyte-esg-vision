import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightweightSelectOption {
  value: string;
  label: string;
}

interface LightweightSelectProps {
  options: LightweightSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
}

export function LightweightSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  disabled = false,
  label,
  error
}: LightweightSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  // Find the selected option label
  const selectedOption = options.find(option => option.value === value);
  
  // Filter options based on search term
  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return options.filter(option => 
      option.label.toLowerCase().includes(lowerSearchTerm)
    );
  }, [options, searchTerm]);
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Close dropdown when selecting an option
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-slate-700 dark:text-slate-300 font-medium">
          {label}
        </label>
      )}
      
      <div className="relative w-full" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          type="button"
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-lg border border-input px-4 py-3 text-sm",
            "hover:border-primary/20 hover:shadow-md transition-all duration-200",
            "dark:bg-slate-800/50 dark:border-slate-700 dark:hover:border-primary/30",
            "shadow-sm focus:outline-none",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
        >
          <span className={cn("truncate", !value && "text-muted-foreground/60")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
        
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 rounded-lg border bg-white dark:bg-slate-800 shadow-lg dark:border-slate-700 overflow-hidden">
            {/* Search Input */}
            {options.length > 5 && (
              <div className="p-2 border-b dark:border-slate-700">
                <input
                  type="text"
                  className="w-full h-8 px-3 py-1 text-sm border rounded dark:bg-slate-700 dark:border-slate-600"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoComplete="off"
                />
              </div>
            )}
            
            {/* Options List */}
            <div className="max-h-60 overflow-y-auto p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "relative flex w-full items-center rounded-md py-2 pl-8 pr-2 text-sm text-left",
                      "hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-150",
                      "focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-700/50",
                      option.value === value && "bg-slate-100 dark:bg-slate-700/50"
                    )}
                    onClick={() => handleSelect(option.value)}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      {option.value === value && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </span>
                    <span className="truncate">{option.label}</span>
                  </button>
                ))
              ) : (
                <div className="py-2 px-3 text-sm text-muted-foreground text-center">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="text-sm font-medium text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
