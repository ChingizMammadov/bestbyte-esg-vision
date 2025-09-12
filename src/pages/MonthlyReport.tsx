import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Target, Clock, Activity } from "lucide-react";

export default function MonthlyReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border-0 shadow-xl rounded-3xl dark:border dark:border-rose-800/30">
          <CardHeader className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 dark:from-rose-500/5 dark:to-pink-500/5 pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-rose-200">
              <div className="p-2 bg-rose-100 dark:bg-rose-900/40 rounded-xl">
                <LineChart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              Monthly Trends
            </CardTitle>
            <CardDescription className="text-rose-700 dark:text-rose-300 font-medium">Performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-black text-rose-700 dark:text-rose-300 mb-2">+12.3%</div>
            <p className="text-sm text-rose-600 dark:text-rose-300 font-medium bg-rose-100 dark:bg-rose-900/40 px-3 py-1 rounded-full inline-block">
              Growth this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border-0 shadow-xl rounded-3xl dark:border dark:border-amber-800/30">
          <CardHeader className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-500/5 dark:to-yellow-500/5 pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-amber-200">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl">
                <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              Goal Progress
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300 font-medium">Monthly objectives tracking</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-black text-amber-700 dark:text-amber-300 mb-2">82%</div>
            <p className="text-sm text-amber-600 dark:text-amber-300 font-medium bg-amber-100 dark:bg-amber-900/40 px-3 py-1 rounded-full inline-block">
              On track to target
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-950/40 dark:to-sky-950/40 border-0 shadow-xl rounded-3xl dark:border dark:border-cyan-800/30">
          <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-sky-500/10 dark:from-cyan-500/5 dark:to-sky-500/5 pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-cyan-200">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/40 rounded-xl">
                <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              Time Period
            </CardTitle>
            <CardDescription className="text-cyan-700 dark:text-cyan-300 font-medium">Current reporting month</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-black text-cyan-700 dark:text-cyan-300 mb-2">Sep</div>
            <p className="text-sm text-cyan-600 dark:text-cyan-300 font-medium bg-cyan-100 dark:bg-cyan-900/40 px-3 py-1 rounded-full inline-block">
              2025
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-xl rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-gray-100">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            Monthly Metrics
          </CardTitle>
          <CardDescription className="dark:text-gray-400">Detailed breakdown of this month's performance</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">95%</div>
              <div className="text-sm text-emerald-600 dark:text-emerald-300">Sustainability Index</div>
            </div>
            <div className="p-4 bg-violet-50 dark:bg-violet-900/30 rounded-xl">
              <div className="text-2xl font-bold text-violet-700 dark:text-violet-300">-18%</div>
              <div className="text-sm text-violet-600 dark:text-violet-300">Energy Usage</div>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">+28%</div>
              <div className="text-sm text-orange-600 dark:text-orange-300">Green Initiatives</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
