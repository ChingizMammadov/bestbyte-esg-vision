
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus, Target, Sparkles } from "lucide-react";

const dataInsights = [
  {
    title: "Carbon Emissions",
    value: "5% reduction",
    trend: "down",
    description: "Compared to last quarter",
    icon: TrendingDown,
    color: "text-emerald-600",
    bgGradient: "from-emerald-50 to-green-50",
    iconBg: "bg-emerald-100"
  },
  {
    title: "Water Usage",
    value: "12% reduction",
    trend: "down", 
    description: "Achieved through efficiency programs",
    icon: TrendingDown,
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-cyan-50",
    iconBg: "bg-blue-100"
  },
  {
    title: "Employee Safety",
    value: "Zero incidents",
    trend: "stable",
    description: "For 45 consecutive days",
    icon: Minus,
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-violet-50",
    iconBg: "bg-purple-100"
  },
  {
    title: "ESG Goals",
    value: "On track",
    trend: "up",
    description: "85% of annual targets met",
    icon: Target,
    color: "text-indigo-600",
    bgGradient: "from-indigo-50 to-blue-50",
    iconBg: "bg-indigo-100"
  }
];

export function DataCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {dataInsights.map((insight, index) => (
        <Card key={index} className={`bg-gradient-to-br ${insight.bgGradient} border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
          <CardHeader className="pb-2 px-6 pt-6">
            <CardTitle className="text-sm font-bold text-gray-700 flex items-center gap-3">
              <div className={`p-2 ${insight.iconBg} rounded-xl`}>
                <insight.icon className={`w-4 h-4 ${insight.color}`} />
              </div>
              <span className="flex-1">{insight.title}</span>
              <Sparkles className="w-3 h-3 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-2">
              <p className={`text-2xl font-black ${insight.color} leading-tight flex items-center gap-2`}>
                {insight.value}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed font-medium bg-white/60 px-3 py-1 rounded-full">
                {insight.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
