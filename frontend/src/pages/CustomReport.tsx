import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Filter, FileSpreadsheet, Sliders } from "lucide-react";

export default function CustomReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40 border-0 shadow-xl rounded-3xl dark:border dark:border-violet-800/30">
          <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-500/5 dark:to-purple-500/5 pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-violet-200">
              <div className="p-2 bg-violet-100 dark:bg-violet-900/40 rounded-xl">
                <Settings className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              Report Settings
            </CardTitle>
            <CardDescription className="text-violet-700 dark:text-violet-300 font-medium">Customize report parameters</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-black text-violet-700 dark:text-violet-300 mb-2">12</div>
            <p className="text-sm text-violet-600 dark:text-violet-300 font-medium bg-violet-100 dark:bg-violet-900/40 px-3 py-1 rounded-full inline-block">
              Available templates
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 border-0 shadow-xl rounded-3xl dark:border dark:border-teal-800/30">
          <CardHeader className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5 pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-teal-200">
              <div className="p-2 bg-teal-100 dark:bg-teal-900/40 rounded-xl">
                <Filter className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              Data Filters
            </CardTitle>
            <CardDescription className="text-teal-700 dark:text-teal-300 font-medium">Select metrics to include</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-black text-teal-700 dark:text-teal-300 mb-2">25+</div>
            <p className="text-sm text-teal-600 dark:text-teal-300 font-medium bg-teal-100 dark:bg-teal-900/40 px-3 py-1 rounded-full inline-block">
              Customizable metrics
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40 border-0 shadow-xl rounded-3xl dark:border dark:border-orange-800/30">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5 pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-orange-200">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-xl">
                <FileSpreadsheet className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              Export Options
            </CardTitle>
            <CardDescription className="text-orange-700 dark:text-orange-300 font-medium">Available file formats</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-black text-orange-700 dark:text-orange-300 mb-2">5</div>
            <p className="text-sm text-orange-600 dark:text-orange-300 font-medium bg-orange-100 dark:bg-orange-900/40 px-3 py-1 rounded-full inline-block">
              Export formats
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-xl rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold dark:text-gray-100">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <Sliders className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            Report Configuration
          </CardTitle>
          <CardDescription className="dark:text-gray-400">Customize your report parameters and data range</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">8</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Time Periods</div>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900/30 rounded-xl">
              <div className="text-2xl font-bold text-pink-700 dark:text-pink-300">15</div>
              <div className="text-sm text-pink-600 dark:text-pink-300">Data Categories</div>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">6</div>
              <div className="text-sm text-indigo-600 dark:text-indigo-300">Chart Types</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
