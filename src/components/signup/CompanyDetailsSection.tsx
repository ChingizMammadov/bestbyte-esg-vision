
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { DarkInput } from '@/components/ui/dark-input';
import { Building } from 'lucide-react';
import { LightweightSelect, LightweightSelectOption } from '@/components/ui/lightweight-select';

interface CompanyDetailsSectionProps {
  control: Control<any>;
  watchedIndustry: string;
  watchedCompanySize: string;
}

// Convert arrays to option objects for LightweightSelect
const industryOptions: LightweightSelectOption[] = [
  { value: "Technology", label: "Technology" },
  { value: "Finance & Banking", label: "Finance & Banking" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Retail", label: "Retail" },
  { value: "Energy & Utilities", label: "Energy & Utilities" },
  { value: "Transportation", label: "Transportation" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Other", label: "Other" }
];

const companySizeOptions: LightweightSelectOption[] = [
  { value: "1-10 employees", label: "1-10 employees" },
  { value: "11-50 employees", label: "11-50 employees" },
  { value: "51-200 employees", label: "51-200 employees" },
  { value: "201-1000 employees", label: "201-1000 employees" },
  { value: "1000+ employees", label: "1000+ employees" },
  { value: "Other", label: "Other" }
];

export function CompanyDetailsSection({ 
  control, 
  watchedIndustry, 
  watchedCompanySize
}: CompanyDetailsSectionProps) {
  // Memoize options to prevent unnecessary re-renders
  const memoizedIndustryOptions = React.useMemo(() => industryOptions, []);
  const memoizedCompanySizeOptions = React.useMemo(() => companySizeOptions, []);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
      <div className="flex items-center gap-2 mb-4">
        <Building className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Company Details</h3>
      </div>
      
      <div className="space-y-4">
        <FormField 
          control={control} 
          name="companyName" 
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Company Name *</FormLabel>
              <FormControl>
                <DarkInput 
                  placeholder="Enter your company's official name" 
                  {...field} 
                  autoComplete="organization" 
                  inputMode="text" 
                />
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-400" />
            </FormItem>
          )} 
        />

        <FormField 
          control={control} 
          name="industry" 
          render={({ field, fieldState }) => (
            <FormItem>
              <LightweightSelect
                options={memoizedIndustryOptions}
                value={field.value}
                onChange={(value) => {
                  // Use setTimeout to prevent UI freezes
                  setTimeout(() => field.onChange(value), 0);
                }}
                placeholder="Select industry"
                label="Industry *"
                error={fieldState.error?.message}
              />
            </FormItem>
          )} 
        />

        {watchedIndustry === 'Other' && (
          <FormField 
            control={control} 
            name="otherIndustry" 
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Please specify your industry</FormLabel>
                <FormControl>
                  <DarkInput 
                    placeholder="Your industry" 
                    {...field} 
                    autoComplete="off" 
                    inputMode="text" 
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400" />
              </FormItem>
            )} 
          />
        )}

        <FormField 
          control={control} 
          name="companySize" 
          render={({ field, fieldState }) => (
            <FormItem>
              <LightweightSelect
                options={memoizedCompanySizeOptions}
                value={field.value}
                onChange={(value) => {
                  // Use setTimeout to prevent UI freezes
                  setTimeout(() => field.onChange(value), 0);
                }}
                placeholder="Select company size"
                label="Company Size *"
                error={fieldState.error?.message}
              />
            </FormItem>
          )} 
        />
        
        {watchedCompanySize === 'Other' && (
          <FormField 
            control={control} 
            name="otherCompanySize" 
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Please specify your company size</FormLabel>
                <FormControl>
                  <DarkInput 
                    placeholder="e.g., 2500 employees" 
                    {...field} 
                    autoComplete="off" 
                    inputMode="text" 
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400" />
              </FormItem>
            )} 
          />
        )}
      </div>
    </div>
  );
}
