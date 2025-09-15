
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface PremiumButtonProps extends Omit<ButtonProps, 'variant'> {
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  glow?: boolean;
}

export function PremiumButton({ 
  children, 
  className, 
  icon: Icon,
  variant = 'primary',
  glow = false,
  ...props 
}: PremiumButtonProps) {
  return (
    <Button
      className={cn(
        "h-12 px-6 font-semibold rounded-lg transition-all duration-300 transform",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "active:scale-95 hover:scale-105",
        
        // Primary variant (green CTA)
        variant === 'primary' && [
          "bg-gradient-to-r from-emerald-600 to-green-600",
          "hover:from-emerald-500 hover:to-green-500",
          "text-white shadow-lg hover:shadow-xl",
          "focus:ring-emerald-500",
          "dark:from-emerald-600 dark:to-green-600",
          "dark:hover:from-emerald-500 dark:hover:to-green-500",
          glow && "hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
        ],
        
        // Secondary variant (muted)
        variant === 'secondary' && [
          "bg-slate-200 hover:bg-slate-300 text-slate-700",
          "dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200",
          "shadow-sm hover:shadow-md",
          "focus:ring-slate-400"
        ],
        
        // Hover animations
        "hover:-translate-y-0.5",
        
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );
}
