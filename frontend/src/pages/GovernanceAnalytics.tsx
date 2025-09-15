import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Scale, BarChart } from "lucide-react";

export default function GovernanceAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-indigo-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-indigo-200">
              <div className="p-1.5 sm:p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg sm:rounded-xl">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="truncate">Risk Management</span>
            </CardTitle>
            <CardDescription className="text-indigo-700 dark:text-indigo-300 font-medium text-xs sm:text-sm">Risk assessment score</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-indigo-700 dark:text-indigo-300 mb-2">
              96%
            </div>
            <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-300 font-medium bg-indigo-100 dark:bg-indigo-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              <span className="truncate">Risk compliance score</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-amber-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-500/5 dark:to-yellow-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-amber-200">
              <div className="p-1.5 sm:p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg sm:rounded-xl">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="truncate">Incident Reports</span>
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300 font-medium text-xs sm:text-sm">Safety incidents</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-amber-700 dark:text-amber-300 mb-2">
              -35%
            </div>
            <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-300 font-medium bg-amber-100 dark:bg-amber-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              <span className="truncate">Reduction in incidents</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/40 dark:to-sky-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-blue-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-sky-500/10 dark:from-blue-500/5 dark:to-sky-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-blue-200">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg sm:rounded-xl">
                <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="truncate">Compliance Rate</span>
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300 font-medium text-xs sm:text-sm">Regulatory compliance</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-700 dark:text-blue-300 mb-2">
              99.8%
            </div>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 font-medium bg-blue-100 dark:bg-blue-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              <span className="truncate">Compliance rate</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
            <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl">
              <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <span className="truncate">Board Analytics</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">Key metrics about board composition and activities</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-300">45%</div>
              <div className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-300 truncate">Board Diversity</div>
            </div>
            <div className="p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-700 dark:text-emerald-300">98%</div>
              <div className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 truncate">Meeting Attendance</div>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300">12</div>
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 truncate">Board Meetings/Year</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
