
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus, Target, Sparkles } from "lucide-react";
import { useLocalStorageWithRefresh } from "@/hooks/useLocalStorageWithRefresh";

// Default insights that will be shown if localStorage doesn't have any
const defaultDataInsights = [
  {
    title: "Carbon Emissions",
    value: "5% reduction",
    trend: "down",
    description: "Compared to last quarter",
    icon: "TrendingDown",
    color: "text-emerald-600 dark:text-emerald-400",
    bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    borderColor: "border-emerald-200 dark:border-emerald-900"
  },
  {
    title: "Water Usage",
    value: "12% reduction",
    trend: "down", 
    description: "Achieved through efficiency programs",
    icon: "TrendingDown",
    color: "text-blue-600 dark:text-blue-400",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    borderColor: "border-blue-200 dark:border-blue-900"
  },
  {
    title: "Employee Safety",
    value: "Zero incidents",
    trend: "stable",
    description: "For 45 consecutive days",
    icon: "Minus",
    color: "text-purple-600 dark:text-purple-400",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    borderColor: "border-purple-200 dark:border-purple-900"
  },
  {
    title: "ESG Goals",
    value: "On track",
    trend: "up",
    description: "85% of annual targets met",
    icon: "Target",
    color: "text-indigo-600 dark:text-indigo-400",
    bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
    borderColor: "border-indigo-200 dark:border-indigo-900"
  }
];

export function DataCards() {
  const dataInsights = useLocalStorageWithRefresh('dataCards', defaultDataInsights);

  // Helper function to get the appropriate icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'TrendingDown':
        return TrendingDown;
      case 'TrendingUp':
        return TrendingUp;
      case 'Minus':
        return Minus;
      case 'Target':
        return Target;
      default:
        return TrendingDown;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {dataInsights.map((insight, index) => {
        // Get the appropriate icon component
        const IconComponent = getIconComponent(insight.icon);
        
        return (
          <Card key={index} className={`bg-gradient-to-br ${insight.bgGradient} border ${insight.borderColor} rounded-2xl overflow-hidden hover:border-opacity-70 transition-all duration-300 transform hover:-translate-y-1`}>
            <CardHeader className="pb-2 px-6 pt-6">
              <CardTitle className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-3">
                <div className={`p-2 ${insight.iconBg} rounded-xl border border-white/50 dark:border-gray-700/50`}>
                  <IconComponent className={`w-4 h-4 ${insight.color}`} />
                </div>
                <span className="flex-1">{insight.title}</span>
                <Sparkles className="w-3 h-3 text-yellow-500 dark:text-yellow-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-2">
                <p className={`text-2xl font-black ${insight.color} leading-tight flex items-center gap-2`}>
                  {insight.value}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium bg-white/60 dark:bg-gray-800/60 px-3 py-1 rounded-full border border-white/50 dark:border-gray-700/50">
                  {insight.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
