import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ArrowUpDown, TrendingUp, Calendar } from "lucide-react";

export default function AnnualReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-0 shadow-xl rounded-3xl dark:border dark:border-blue-800/30">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5 pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-blue-200">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              Annual Performance
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300 font-medium">Year-over-year metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-black text-blue-700 dark:text-blue-300 mb-2">+24.5%</div>
            <p className="text-sm text-blue-600 dark:text-blue-300 font-medium bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full inline-block">
              Improved from last year
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40 border-0 shadow-xl rounded-3xl dark:border dark:border-emerald-800/30">
          <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-500/5 dark:to-green-500/5 pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-emerald-200">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl">
                <BarChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              ESG Score
            </CardTitle>
            <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">Overall sustainability rating</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300 mb-2">A+</div>
            <p className="text-sm text-emerald-600 dark:text-emerald-300 font-medium bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-full inline-block">
              Top tier performance
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40 border-0 shadow-xl rounded-3xl dark:border dark:border-purple-800/30">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 dark:from-purple-500/5 dark:to-violet-500/5 pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-purple-200">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              Report Period
            </CardTitle>
            <CardDescription className="text-purple-700 dark:text-purple-300 font-medium">Fiscal year overview</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-black text-purple-700 dark:text-purple-300 mb-2">2025</div>
            <p className="text-sm text-purple-600 dark:text-purple-300 font-medium bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-full inline-block">
              Current fiscal year
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-xl rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-gray-100">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <ArrowUpDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            Key Performance Indicators
          </CardTitle>
          <CardDescription className="dark:text-gray-400">Year-end summary of critical sustainability metrics</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">-32%</div>
              <div className="text-sm text-green-600 dark:text-green-300">Carbon Reduction</div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">87%</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Resource Efficiency</div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">92%</div>
              <div className="text-sm text-purple-600 dark:text-purple-300">Compliance Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
