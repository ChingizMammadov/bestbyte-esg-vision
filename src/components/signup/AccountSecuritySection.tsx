
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

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
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Security</h3>
      
      <FormField 
        control={control} 
        name="password" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password *</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create password" 
                  {...field} 
                  autoComplete="new-password" 
                  className="text-sm h-11 md:h-10 pr-12" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />

      <FormField 
        control={control} 
        name="confirmPassword" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password *</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm password" 
                  {...field} 
                  autoComplete="new-password" 
                  className="text-sm h-11 md:h-10 pr-12" 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />
    </div>
  );
}
