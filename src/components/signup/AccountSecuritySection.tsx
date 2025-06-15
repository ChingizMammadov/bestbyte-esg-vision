
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { DarkInput } from '@/components/ui/dark-input';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface AccountSecuritySectionProps {
  control: Control<any>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

export function AccountSecuritySection({ 
  control, 
  showPassword, 
  setShowPassword, 
  showConfirmPassword, 
  setShowConfirmPassword 
}: AccountSecuritySectionProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Account Security</h3>
      </div>
      
      <div className="space-y-4">
        <FormField 
          control={control} 
          name="password" 
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <DarkInput 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create a strong password" 
                    {...field} 
                    autoComplete="new-password" 
                    className="pr-12" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-md transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-400" />
            </FormItem>
          )} 
        />

        <FormField 
          control={control} 
          name="confirmPassword" 
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Confirm Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <DarkInput 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm your password" 
                    {...field} 
                    autoComplete="new-password" 
                    className="pr-12" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-md transition-colors duration-200"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-400" />
            </FormItem>
          )} 
        />
      </div>
    </div>
  );
}
