
import * as React from "react"
import { cn } from "@/lib/utils"

const DarkInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200",
          "hover:border-primary/20",
          "dark:bg-slate-800/50 dark:border-slate-700 dark:hover:border-primary/30",
          "dark:focus-visible:ring-primary dark:focus-visible:ring-offset-slate-900",
          "shadow-sm hover:shadow-md focus-visible:shadow-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
DarkInput.displayName = "DarkInput"

export { DarkInput }
