
import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// This is a lightweight replacement for the Radix UI Select component
// It is optimized for performance and prevents UI freezing with large datasets

interface SelectOption {
  value: string;
  label: React.ReactNode;
}

// Root component
interface DarkSelectRootProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  name?: string;
  children?: React.ReactNode;
}

const DarkSelect = React.forwardRef<HTMLDivElement, DarkSelectRootProps>(
  ({ children, value, defaultValue, onValueChange, open, defaultOpen, onOpenChange, disabled, name }, ref) => {
    // Internal state for uncontrolled components
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const [isOpen, setIsOpen] = React.useState(defaultOpen || false);
    
    // Use controlled values if provided
    const currentValue = value !== undefined ? value : internalValue;
    const isCurrentlyOpen = open !== undefined ? open : isOpen;
    
    // Change handlers
    const handleValueChange = (newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    };
    
    const handleOpenChange = (newOpen: boolean) => {
      if (onOpenChange) {
        onOpenChange(newOpen);
      } else {
        setIsOpen(newOpen);
      }
    };
    
    // Parse SelectItems to get available options
    const options = React.useMemo(() => {
      const opts: SelectOption[] = [];
      
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        
        if (child.type === DarkSelectContent) {
          React.Children.forEach(child.props.children, (contentChild) => {
            if (!React.isValidElement(contentChild)) return;
            
            if (contentChild.type === DarkSelectItem) {
              const itemProps = contentChild.props as { value: string, children: React.ReactNode };
              opts.push({
                value: itemProps.value,
                label: itemProps.children
              });
            }
          });
        }
      });
      
      return opts;
    }, [children]);
    
    // Find currently selected option for display
    const selectedOption = options.find(opt => opt.value === currentValue);
    
    // Render trigger and content
    let triggerElement: React.ReactElement | null = null;
    let contentElement: React.ReactElement | null = null;
    
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      
      if (child.type === DarkSelectTrigger) {
        triggerElement = React.cloneElement(child, {
          onClick: () => handleOpenChange(!isCurrentlyOpen),
          selectedValue: currentValue,
          selectedLabel: selectedOption?.label
        });
      }
      
      if (child.type === DarkSelectContent) {
        contentElement = React.cloneElement(child, {
          isOpen: isCurrentlyOpen,
          onClose: () => handleOpenChange(false),
          onSelect: handleValueChange,
          selectedValue: currentValue
        });
      }
    });
    
    return (
      <div ref={ref} className="relative inline-block w-full" data-state={isCurrentlyOpen ? "open" : "closed"}>
        {triggerElement}
        {contentElement}
        {name && <input type="hidden" name={name} value={currentValue} />}
      </div>
    );
  }
);
DarkSelect.displayName = "DarkSelect";

// Empty group component for compatibility
const DarkSelectGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// Value component
interface DarkSelectValueProps {
  placeholder?: string;
  className?: string;
}

const DarkSelectValue = React.forwardRef<HTMLSpanElement, DarkSelectValueProps>(
  ({ placeholder }, ref) => {
    return <span ref={ref} className="truncate">{placeholder}</span>;
  }
);
DarkSelectValue.displayName = "DarkSelectValue";

// Trigger component
interface DarkSelectTriggerProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  selectedValue?: string;
  selectedLabel?: React.ReactNode;
  disabled?: boolean;
}

const DarkSelectTrigger = React.forwardRef<HTMLButtonElement, DarkSelectTriggerProps>(
  ({ className, children, onClick, selectedValue, selectedLabel, disabled, ...props }, ref) => {
    // Find SelectValue if it exists within children
    let valueNode = null;
    let otherChildren = null;
    
    React.Children.forEach(children, child => {
      if (React.isValidElement(child) && child.type === DarkSelectValue) {
        valueNode = child;
      } else {
        otherChildren = child;
      }
    });
    
    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background",
          "placeholder:text-muted-foreground/60",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200",
          "hover:border-primary/20 hover:shadow-md",
          "dark:bg-slate-800/50 dark:border-slate-700 dark:hover:border-primary/30",
          "dark:focus:ring-primary dark:focus:ring-offset-slate-900",
          "shadow-sm",
          "[&>span]:line-clamp-1",
          className
        )}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        data-state={selectedValue ? "open" : "closed"}
        {...props}
      >
        <span className="flex-1 text-left truncate">
          {selectedLabel || (valueNode ? valueNode.props.placeholder : "Select an option")}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    );
  }
);
DarkSelectTrigger.displayName = "DarkSelectTrigger";

// Content component
interface DarkSelectContentProps {
  className?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onSelect?: (value: string) => void;
  selectedValue?: string;
  position?: "popper" | "item-aligned";
}

const DarkSelectContent = React.forwardRef<HTMLDivElement, DarkSelectContentProps>(
  ({ className, children, isOpen, onClose, onSelect, selectedValue, position = "popper", ...props }, ref) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    
    // Close when clicking outside
    React.useEffect(() => {
      if (!isOpen) return;
      
      const handleOutsideClick = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
          onClose?.();
        }
      };
      
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen, onClose]);
    
    if (!isOpen) return null;
    
    // Clone children with onSelect handler
    const childrenWithProps = React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      
      if (child.type === DarkSelectItem) {
        return React.cloneElement(child, {
          onSelect,
          isSelected: child.props.value === selectedValue
        });
      }
      
      return child;
    });
    
    return (
      <div
        ref={contentRef}
        className={cn(
          "absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
          "dark:bg-slate-800 dark:border-slate-700",
          position === "popper" ? "mt-1" : "",
          className
        )}
        {...props}
      >
        <div ref={ref} className="max-h-96 overflow-auto p-1">
          {childrenWithProps}
        </div>
      </div>
    );
  }
);
DarkSelectContent.displayName = "DarkSelectContent";

// Item component
interface DarkSelectItemProps {
  className?: string;
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  isSelected?: boolean;
}

const DarkSelectItem = React.forwardRef<HTMLDivElement, DarkSelectItemProps>(
  ({ className, children, value, disabled, onSelect, isSelected, ...props }, ref) => {
    const handleClick = () => {
      if (disabled) return;
      onSelect?.(value);
    };
    
    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        data-disabled={disabled || undefined}
        data-selected={isSelected || undefined}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none",
          "focus:bg-accent focus:text-accent-foreground",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "dark:focus:bg-slate-700/50",
          "transition-colors duration-150",
          isSelected && "bg-accent/50",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4 text-primary" />}
        </span>
        <span className="truncate">{children}</span>
      </div>
    );
  }
);
DarkSelectItem.displayName = "DarkSelectItem";

export {
  DarkSelect,
  DarkSelectGroup,
  DarkSelectValue,
  DarkSelectTrigger,
  DarkSelectContent,
  DarkSelectItem,
}
