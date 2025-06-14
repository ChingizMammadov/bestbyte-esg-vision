
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ESGPreferencesSectionProps {
  control: Control<any>;
}

const esgFocusAreas = ["Environmental Impact", "Social Responsibility", "Governance"];
const reportingTypes = ["Basic ESG Reporting", "Comprehensive ESG Reporting", "Regulatory ESG Reporting"];

export function ESGPreferencesSection({ control }: ESGPreferencesSectionProps) {
  return (
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">ESG Preferences</h3>
      
      <FormField 
        control={control} 
        name="esgFocus" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary ESG Focus Area *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="text-sm h-11 md:h-10 justify-between">
                  <SelectValue placeholder="Select ESG focus" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {esgFocusAreas.map((area) => (
                  <SelectItem key={area} value={area} className="text-sm">
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} 
      />

      <FormField 
        control={control} 
        name="reportingType" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>ESG Reporting Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="text-sm h-11 md:h-10 justify-between">
                  <SelectValue placeholder="Select reporting type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {reportingTypes.map((type) => (
                  <SelectItem key={type} value={type} className="text-sm">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} 
      />
    </div>
  );
}
