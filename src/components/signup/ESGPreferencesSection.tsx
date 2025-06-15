
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { DarkSelect, DarkSelectContent, DarkSelectItem, DarkSelectTrigger, DarkSelectValue } from '@/components/ui/dark-select';
import { cn } from '@/lib/utils';
import { Leaf } from 'lucide-react';

interface ESGPreferencesSectionProps {
  control: Control<any>;
}

const esgFocusAreas = ["Environmental Impact", "Social Responsibility", "Governance"];
const reportingTypes = ["Basic ESG Reporting", "Comprehensive ESG Reporting", "Regulatory ESG Reporting"];

export function ESGPreferencesSection({ control }: ESGPreferencesSectionProps) {
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Primary ESG Focus Area *</FormLabel>
              <DarkSelect onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <DarkSelectTrigger className={cn(
                    !field.value && "text-muted-foreground/60"
                  )}>
                    <DarkSelectValue placeholder="Select ESG focus" />
                  </DarkSelectTrigger>
                </FormControl>
                <DarkSelectContent>
                  {esgFocusAreas.map((area) => (
                    <DarkSelectItem key={area} value={area}>
                      {area}
                    </DarkSelectItem>
                  ))}
                </DarkSelectContent>
              </DarkSelect>
              <FormMessage className="text-red-500 dark:text-red-400" />
            </FormItem>
          )} 
        />

        <FormField 
          control={control} 
          name="reportingType" 
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">ESG Reporting Type *</FormLabel>
              <DarkSelect onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <DarkSelectTrigger className={cn(
                    !field.value && "text-muted-foreground/60"
                  )}>
                    <DarkSelectValue placeholder="Select reporting type" />
                  </DarkSelectTrigger>
                </FormControl>
                <DarkSelectContent>
                  {reportingTypes.map((type) => (
                    <DarkSelectItem key={type} value={type}>
                      {type}
                    </DarkSelectItem>
                  ))}
                </DarkSelectContent>
              </DarkSelect>
              <FormMessage className="text-red-500 dark:text-red-400" />
            </FormItem>
          )} 
        />
      </div>
    </div>
  );
}
