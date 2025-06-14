
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter, Globe } from "lucide-react";

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
    <Card className="bg-white border rounded-2xl shadow-lg w-full overflow-hidden">
      <CardContent className="p-2 sm:p-3 md:p-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full sm:w-32 h-8 sm:h-10 text-xs sm:text-sm">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full sm:w-40 h-8 sm:h-10 text-xs sm:text-sm">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
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
              className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm px-2 sm:px-4"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
