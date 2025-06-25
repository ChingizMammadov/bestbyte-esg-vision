
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter, Globe, Sparkles } from "lucide-react";

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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-blue-200/50">
          <Filter className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            Filter Controls
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </h3>
          <p className="text-sm text-gray-600 font-medium">Customize your data view</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-200/50">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 bg-white border border-blue-200 focus:border-blue-400 rounded-xl">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-blue-100 rounded-xl">
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-50 rounded-lg border border-purple-200/50">
            <Globe className="w-4 h-4 text-purple-600" />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 bg-white border border-purple-200 focus:border-purple-400 rounded-xl">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-purple-100 rounded-xl">
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
          className="bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl font-semibold"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
