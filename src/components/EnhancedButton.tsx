
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  premium?: boolean;
  glow?: boolean;
}

export function EnhancedButton({ 
  children, 
  className, 
  premium = false, 
  glow = false, 
  ...props 
}: EnhancedButtonProps) {
  return (
    <Button
      className={cn(
        "transition-all duration-300 transform",
        premium && "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105",
        glow && "hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        "active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
