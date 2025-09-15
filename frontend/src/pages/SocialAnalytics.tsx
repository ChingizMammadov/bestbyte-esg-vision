import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, GraduationCap, LineChart } from "lucide-react";

export default function SocialAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-blue-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-blue-200">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg sm:rounded-xl">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="truncate">Workforce Diversity</span>
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300 font-medium text-xs sm:text-sm">Diversity metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-700 dark:text-blue-300 mb-2">
              42%
            </div>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 font-medium bg-blue-100 dark:bg-blue-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              <span className="truncate">Female representation</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-rose-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 dark:from-rose-500/5 dark:to-pink-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-rose-200">
              <div className="p-1.5 sm:p-2 bg-rose-100 dark:bg-rose-900/40 rounded-lg sm:rounded-xl">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <span className="truncate">Employee Wellbeing</span>
            </CardTitle>
            <CardDescription className="text-rose-700 dark:text-rose-300 font-medium text-xs sm:text-sm">Satisfaction score</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-rose-700 dark:text-rose-300 mb-2">
              4.2/5
            </div>
            <p className="text-xs sm:text-sm text-rose-600 dark:text-rose-300 font-medium bg-rose-100 dark:bg-rose-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              <span className="truncate">Average satisfaction rating</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-emerald-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-500/5 dark:to-green-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-emerald-200">
              <div className="p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg sm:rounded-xl">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="truncate">Training & Development</span>
            </CardTitle>
            <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium text-xs sm:text-sm">Learning metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-700 dark:text-emerald-300 mb-2">
              +28%
            </div>
            <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 font-medium bg-emerald-100 dark:bg-emerald-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              <span className="truncate">Training hours increase</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
            <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl">
              <LineChart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <span className="truncate">Community Impact</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">Overview of community engagement and social initiatives</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300">2.4M</div>
              <div className="text-xs sm:text-sm text-purple-600 dark:text-purple-300 truncate">Charitable Donations</div>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300">5,280</div>
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 truncate">Volunteer Hours</div>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 dark:text-green-300">12</div>
              <div className="text-xs sm:text-sm text-green-600 dark:text-green-300 truncate">Community Programs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
