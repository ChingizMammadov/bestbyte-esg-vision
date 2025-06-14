
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus, Target } from "lucide-react";

const dataInsights = [
  {
    title: "Carbon Emissions",
    value: "5% reduction",
    trend: "down",
    description: "Compared to last quarter",
    icon: TrendingDown,
    color: "text-green-600"
  },
  {
    title: "Water Usage",
    value: "12% reduction",
    trend: "down", 
    description: "Achieved through efficiency programs",
    icon: TrendingDown,
    color: "text-green-600"
  },
  {
    title: "Employee Safety",
    value: "Zero incidents",
    trend: "stable",
    description: "For 45 consecutive days",
    icon: Minus,
    color: "text-blue-600"
  },
  {
    title: "ESG Goals",
    value: "On track",
    trend: "up",
    description: "85% of annual targets met",
    icon: Target,
    color: "text-purple-600"
  }
];

export function DataCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {dataInsights.map((insight, index) => (
        <Card key={index} className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 flex items-center gap-2">
              <insight.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${insight.color} flex-shrink-0`} />
              <span className="truncate">{insight.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="space-y-1">
              <p className={`text-lg sm:text-2xl font-bold ${insight.color} leading-tight`}>{insight.value}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{insight.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
