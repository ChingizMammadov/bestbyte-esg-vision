
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { DarkInput } from '@/components/ui/dark-input';
import { DarkSelect, DarkSelectContent, DarkSelectItem, DarkSelectTrigger, DarkSelectValue } from '@/components/ui/dark-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CompanyDetailsSectionProps {
  control: Control<any>;
  watchedIndustry: string;
  watchedCompanySize: string;
  isIndustryPopoverOpen: boolean;
  setIndustryPopoverOpen: (open: boolean) => void;
}

const industries = ["Technology", "Finance & Banking", "Healthcare", "Manufacturing", "Retail", "Energy & Utilities", "Transportation", "Real Estate", "Other"];
const companySizes = ["1-10 employees", "11-50 employees", "51-200 employees", "201-1000 employees", "1000+ employees", "Other"];

export function CompanyDetailsSection({ 
  control, 
  watchedIndustry, 
  watchedCompanySize, 
  isIndustryPopoverOpen, 
  setIndustryPopoverOpen 
}: CompanyDetailsSectionProps) {
  const isMobile = useIsMobile();

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
          render={({ field }) => (
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
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-slate-700 dark:text-slate-300 font-medium py-[2px]">Industry *</FormLabel>
              {isMobile ? (
                <DarkSelect onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <DarkSelectTrigger className={cn(
                      !field.value && "text-muted-foreground/60"
                    )}>
                      <DarkSelectValue placeholder="Select industry" />
                    </DarkSelectTrigger>
                  </FormControl>
                  <DarkSelectContent className="max-h-60">
                    {industries.map((industry) => (
                      <DarkSelectItem key={industry} value={industry}>
                        {industry}
                      </DarkSelectItem>
                    ))}
                  </DarkSelectContent>
                </DarkSelect>
              ) : (
                <Popover open={isIndustryPopoverOpen} onOpenChange={setIndustryPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between h-12 text-sm text-left font-normal rounded-lg",
                          "dark:bg-slate-800/50 dark:border-slate-700 dark:hover:border-primary/30",
                          "hover:border-primary/20 hover:shadow-md",
                          "transition-all duration-200",
                          !field.value && "text-muted-foreground/60"
                        )}
                      >
                        <span className="truncate">
                          {field.value ? industries.find((industry) => industry === field.value) : "Select industry"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0 dark:bg-slate-800 dark:border-slate-700" align="start">
                    <Command className="dark:bg-slate-800">
                      <CommandInput placeholder="Search industry..." className="text-sm dark:bg-slate-800" />
                      <CommandList>
                        <CommandEmpty>No industry found.</CommandEmpty>
                        <CommandGroup>
                          {industries.map((industry) => (
                            <CommandItem
                              value={industry}
                              key={industry}
                              onSelect={() => {
                                field.onChange(industry);
                                setIndustryPopoverOpen(false);
                              }}
                              className="text-sm dark:hover:bg-slate-700/50"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4 text-primary",
                                  industry === field.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {industry}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
              <FormMessage className="text-red-500 dark:text-red-400" />
            </FormItem>
          )} 
        />

        {watchedIndustry === 'Other' && (
          <FormField 
            control={control} 
            name="otherIndustry" 
            render={({ field }) => (
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Company Size *</FormLabel>
              <DarkSelect onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <DarkSelectTrigger className={cn(
                    !field.value && "text-muted-foreground/60"
                  )}>
                    <DarkSelectValue placeholder="Select company size" />
                  </DarkSelectTrigger>
                </FormControl>
                <DarkSelectContent className="max-h-60">
                  {companySizes.map((size) => (
                    <DarkSelectItem key={size} value={size}>
                      {size}
                    </DarkSelectItem>
                  ))}
                </DarkSelectContent>
              </DarkSelect>
              <FormMessage className="text-red-500 dark:text-red-400" />
            </FormItem>
          )} 
        />
        
        {watchedCompanySize === 'Other' && (
          <FormField 
            control={control} 
            name="otherCompanySize" 
            render={({ field }) => (
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
