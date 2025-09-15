
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LightweightCountrySelect } from '@/components/ui/lightweight-country-select';

interface ContactInformationSectionProps {
  control: Control<FieldValues>;
  watchedCountryId: string;
  isCountryPopoverOpen?: boolean;
  setCountryPopoverOpen?: (open: boolean) => void;
}

export function ContactInformationSection({ 
  control, 
  watchedCountryId
}: ContactInformationSectionProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Contact Information</h3>
      
      <FormField 
        control={control} 
        name="email" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address *</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="yourname@company.com" 
                {...field} 
                autoComplete="email" 
                inputMode="email" 
                className="text-sm h-11 md:h-10" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />

      <div className="space-y-2">
        <FormLabel>Phone Number (Optional)</FormLabel>
        <div className="grid grid-cols-[110px_1fr] gap-2">
          <FormField 
            control={control} 
            name="countryId" 
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LightweightCountrySelect 
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={control} 
            name="phone" 
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="Phone number" 
                    {...field} 
                    autoComplete="tel" 
                    inputMode="tel" 
                    className="text-sm h-11 md:h-10" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
        </div>
      </div>
    </div>
  );
}
