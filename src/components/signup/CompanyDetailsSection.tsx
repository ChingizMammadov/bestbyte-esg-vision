
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
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
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Details</h3>
      
      <FormField 
        control={control} 
        name="companyName" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name *</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your company's official name" 
                {...field} 
                autoComplete="organization" 
                inputMode="text" 
                className="text-sm h-11 md:h-10" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />

      <FormField 
        control={control} 
        name="industry" 
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="py-[2px]">Industry *</FormLabel>
            {isMobile ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-sm h-11 md:h-10 justify-between">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry} className="text-sm">
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Popover open={isIndustryPopoverOpen} onOpenChange={setIndustryPopoverOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between h-11 md:h-10 text-sm text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <span className="truncate">
                        {field.value ? industries.find((industry) => industry === field.value) : "Select industry"}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search industry..." className="text-sm" />
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
                            className="text-sm"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
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
            <FormMessage />
          </FormItem>
        )} 
      />

      {watchedIndustry === 'Other' && (
        <FormField 
          control={control} 
          name="otherIndustry" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify your industry</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your industry" 
                  {...field} 
                  autoComplete="off" 
                  inputMode="text" 
                  className="text-sm h-11 md:h-10" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
      )}

      <FormField 
        control={control} 
        name="companySize" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Size *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="text-sm h-11 md:h-10 justify-between">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-60">
                {companySizes.map((size) => (
                  <SelectItem key={size} value={size} className="text-sm">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} 
      />
      
      {watchedCompanySize === 'Other' && (
        <FormField 
          control={control} 
          name="otherCompanySize" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify your company size</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., 2500 employees" 
                  {...field} 
                  autoComplete="off" 
                  inputMode="text" 
                  className="text-sm h-11 md:h-10" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
      )}
    </div>
  );
}
