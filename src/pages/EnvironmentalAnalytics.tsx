import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Droplet, Wind, Trash } from "lucide-react";

export default function EnvironmentalAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-600/20 dark:to-green-600/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
              <div className="p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-800/60 rounded-lg sm:rounded-xl">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="truncate">Carbon Emissions</span>
            </CardTitle>
            <CardDescription className="text-emerald-700 dark:text-emerald-400 font-medium text-xs sm:text-sm">Monthly carbon footprint</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1 sm:gap-2">
              -15.2%
              <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-500 dark:text-emerald-400" />
            </div>
            <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-100 dark:bg-emerald-800/60 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              <span className="truncate">Below target threshold</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-600/20 dark:to-cyan-600/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-800/60 rounded-lg sm:rounded-xl">
                <Droplet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="truncate">Water Usage</span>
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-400 font-medium text-xs sm:text-sm">Water consumption metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-700 dark:text-blue-400 mb-2">
              -8.7%
            </div>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-800/60 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              <span className="truncate">Reduction from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 dark:from-purple-600/20 dark:to-violet-600/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
              <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-800/60 rounded-lg sm:rounded-xl">
                <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="truncate">Air Quality</span>
            </CardTitle>
            <CardDescription className="text-purple-700 dark:text-purple-400 font-medium text-xs sm:text-sm">Air quality index</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-purple-700 dark:text-purple-400 mb-2">
              94%
            </div>
            <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium bg-purple-100 dark:bg-purple-800/60 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              <span className="truncate">Excellent air quality</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 dark:bg-gray-800 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-700 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
            <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg sm:rounded-xl">
              <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            </div>
            <span className="truncate">Waste Management Analytics</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">Detailed breakdown of waste management and recycling efforts</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">76%</div>
              <div className="text-xs sm:text-sm text-green-600 dark:text-green-400 truncate">Recycling Rate</div>
            </div>
            <div className="p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-700 dark:text-yellow-400">-12%</div>
              <div className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400 truncate">Landfill Waste</div>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-400">+24%</div>
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 truncate">Composting</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
