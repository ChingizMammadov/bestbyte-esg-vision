
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LightweightSelect as Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/lightweight-select-compat";
import { Calendar, Filter, Globe, Sparkles } from "lucide-react";
import { responsiveText } from "@/utils/responsiveUtils";

interface FilterControlsProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

export function FilterControls({ 
  selectedPeriod, 
  setSelectedPeriod, 
  selectedRegion, 
  setSelectedRegion 
}: FilterControlsProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
      {/* Title Section */}
      <div className="flex items-center gap-3 mb-2 md:mb-0">
        <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
          <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 text-sm sm:text-base">
            Filter Controls
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 dark:text-yellow-400" />
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Customize your data view</p>
        </div>
      </div>
      
      {/* Controls Section - Full width on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:flex-1">
        <div className="flex items-center gap-2 w-full">
          <div className="p-1.5 bg-blue-50 dark:bg-blue-900/40 rounded-lg border border-blue-200/50 dark:border-blue-700/50 flex-shrink-0">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 focus:border-blue-400 dark:focus:border-blue-500 rounded-xl text-xs sm:text-sm">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-700 rounded-xl">
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="p-1.5 bg-purple-50 dark:bg-purple-900/40 rounded-lg border border-purple-200/50 dark:border-purple-700/50 flex-shrink-0">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 focus:border-purple-400 dark:focus:border-purple-500 rounded-xl text-xs sm:text-sm">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-700 rounded-xl">
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setSelectedPeriod("monthly");
            setSelectedRegion("global");
          }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-xl font-medium text-xs sm:text-sm h-full"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
