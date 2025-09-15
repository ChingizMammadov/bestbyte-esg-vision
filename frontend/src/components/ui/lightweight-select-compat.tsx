import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface LightweightSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  error?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
}

interface SelectTriggerProps {
  className?: string;
  children?: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

interface SelectContentProps {
  className?: string;
  children?: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * A highly optimized lightweight select component that's API-compatible with Radix UI Select
 * but doesn't freeze the UI with large datasets
 */
export const LightweightSelect = ({ 
  value, 
  onValueChange, 
  placeholder = "Select an option",
  disabled = false,
  className,
  children 
}: LightweightSelectProps) => {
  // We'll parse the children to extract options
  const [options, setOptions] = React.useState<SelectOption[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [triggerNode, setTriggerNode] = React.useState<React.ReactNode>(null);
  const [contentClassName, setContentClassName] = React.useState("");
  const [triggerClassName, setTriggerClassName] = React.useState("");
  const selectRef = React.useRef<HTMLDivElement>(null);

  // Extract options from SelectItem children
  React.useEffect(() => {
    if (!children) return;
    
    const opts: SelectOption[] = [];
    let trigger: React.ReactNode = null;
    
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      
      // Handle SelectTrigger
      if (child.type === SelectTrigger) {
        trigger = child.props.children;
        setTriggerClassName(child.props.className || "");
      }
      
      // Handle SelectContent
      if (child.type === SelectContent) {
        setContentClassName(child.props.className || "");
        
        // Extract items from content
        React.Children.forEach(child.props.children, (contentChild) => {
          if (!React.isValidElement(contentChild)) return;
          
          if (contentChild.type === SelectItem) {
            const itemProps = contentChild.props as { value: string, children: string };
            opts.push({
              value: itemProps.value,
              label: itemProps.children
            });
          }
        });
      }
    });
    
    setOptions(opts);
    setTriggerNode(trigger);
  }, [children]);

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
        
        const currentIndex = options.findIndex(option => option.value === value);
        let nextIndex;
        
        if (event.key === "ArrowDown") {
          nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        }
        
        onValueChange(options[nextIndex].value);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, options, value, onValueChange]);

  const handleToggle = () => {
    if (disabled) return;
    
    // Use setTimeout to prevent UI freezing
    setTimeout(() => {
      setIsOpen(prev => !prev);
    }, 0);
  };

  const handleSelect = (selectedValue: string) => {
    // Use setTimeout to prevent UI freezing
    setTimeout(() => {
      onValueChange(selectedValue);
      setIsOpen(false);
    }, 0);
  };

  // Find the selected option label
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={cn("relative w-full", className)} ref={selectRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm",
          "transition-all duration-200",
          "shadow-sm focus:outline-none",
          disabled && "opacity-50 cursor-not-allowed",
          triggerClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : (
            triggerNode || placeholder
          )}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 opacity-50 transition-transform duration-200",
          isOpen && "transform rotate-180"
        )} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className={cn(
          "absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg",
          "dark:bg-slate-800 dark:border-slate-700",
          "max-h-60 overflow-auto",
          contentClassName
        )}>
          <div role="listbox" className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "flex items-center px-2 py-1.5 text-sm cursor-pointer",
                  "hover:bg-slate-100 dark:hover:bg-slate-700/50",
                  "transition-colors duration-150",
                  value === option.value && "bg-slate-100 dark:bg-slate-700/30"
                )}
              >
                <span className="w-5 flex-shrink-0">
                  {value === option.value && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </span>
                <span className="ml-2 truncate">{option.label}</span>
              </div>
            ))}
            
            {options.length === 0 && (
              <div className="px-2 py-1.5 text-sm text-gray-500 dark:text-gray-400">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// These components are just used to parse the children properly
export const SelectTrigger = ({ className, children }: SelectTriggerProps) => {
  return <>{children}</>; // This doesn't actually render, just for structure
};

export const SelectValue = ({ placeholder }: SelectValueProps) => {
  return <>{placeholder}</>; // This doesn't actually render, just for structure
};

export const SelectContent = ({ className, children }: SelectContentProps) => {
  return <>{children}</>; // This doesn't actually render, just for structure
};

export const SelectItem = ({ value, children, className }: SelectItemProps) => {
  return <>{children}</>; // This doesn't actually render, just for structure
};
