
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LightweightSelect, LightweightSelectOption } from '@/components/ui/lightweight-select';
import { Leaf } from 'lucide-react';

interface ESGPreferencesSectionProps {
  control: Control<any>;
}

// Convert arrays to option objects required by LightweightSelect
const esgFocusOptions: LightweightSelectOption[] = [
  { value: "Environmental Impact", label: "Environmental Impact" },
  { value: "Social Responsibility", label: "Social Responsibility" },
  { value: "Governance", label: "Governance" }
];

const reportingTypeOptions: LightweightSelectOption[] = [
  { value: "Basic ESG Reporting", label: "Basic ESG Reporting" },
  { value: "Comprehensive ESG Reporting", label: "Comprehensive ESG Reporting" },
  { value: "Regulatory ESG Reporting", label: "Regulatory ESG Reporting" }
];

export function ESGPreferencesSection({ control }: ESGPreferencesSectionProps) {
  // Memoize the options to prevent unnecessary re-renders
  const memoizedFocusOptions = React.useMemo(() => esgFocusOptions, []);
  const memoizedReportingOptions = React.useMemo(() => reportingTypeOptions, []);
  
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">ESG Preferences</h3>
      </div>
      
      <div className="space-y-4">
        <FormField 
          control={control} 
          name="esgFocus" 
          render={({ field, fieldState }) => (
            <FormItem>
              <LightweightSelect
                options={memoizedFocusOptions}
                value={field.value}
                onChange={(value) => {
                  // Use setTimeout to prevent UI freezes
                  setTimeout(() => field.onChange(value), 0);
                }}
                placeholder="Select ESG focus"
                label="Primary ESG Focus Area *"
                error={fieldState.error?.message}
              />
            </FormItem>
          )} 
        />

        <FormField 
          control={control} 
          name="reportingType" 
          render={({ field, fieldState }) => (
            <FormItem>
              <LightweightSelect
                options={memoizedReportingOptions}
                value={field.value}
                onChange={(value) => {
                  // Use setTimeout to prevent UI freezes
                  setTimeout(() => field.onChange(value), 0);
                }}
                placeholder="Select reporting type"
                label="ESG Reporting Type *"
                error={fieldState.error?.message}
              />
            </FormItem>
          )} 
        />
      </div>
    </div>
  );
}
