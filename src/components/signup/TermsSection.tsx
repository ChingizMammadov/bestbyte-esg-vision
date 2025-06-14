
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
    <>
      <FormField 
        control={control} 
        name="agreeToTerms" 
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
          </FormItem>
        )} 
      />

      <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
        <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-green-800">
          Your data is protected with enterprise-grade security and GDPR compliance.
        </p>
      </div>
    </>
  );
}
