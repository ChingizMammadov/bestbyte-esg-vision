
import React from 'react';
import { Control } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield } from 'lucide-react';

interface TermsSectionProps {
  control: Control<any>;
}

export function TermsSection({ control }: TermsSectionProps) {
  return (
    <div className="space-y-4">
      <FormField 
        control={control} 
        name="agreeToTerms" 
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox 
                checked={field.value} 
                onCheckedChange={field.onChange}
                className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm text-slate-700 dark:text-slate-300">
                I agree to the{" "}
                <Link 
                  to="/terms" 
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link 
                  to="/privacy" 
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>
                , and confirm GDPR compliance for data protection. *
              </FormLabel>
              <FormMessage className="text-red-500 dark:text-red-400" />
            </div>
          </FormItem>
        )} 
      />

      <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50 transition-colors duration-300">
        <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            Your data is secure
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            GDPR compliant • Enterprise-grade encryption • SOC 2 certified
          </p>
        </div>
      </div>
    </div>
  );
}
