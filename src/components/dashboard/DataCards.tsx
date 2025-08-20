
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus, Target, Sparkles } from "lucide-react";

const getLatestChange = (changeArray) => {
  if (!changeArray || changeArray.length === 0) return null;
  const latestEntry = changeArray[changeArray.length - 1];
  return latestEntry ? latestEntry.percentage_change : null;
};

const getLatestAccident = (changeArray) => {
  if (!changeArray || changeArray.length === 0) return null;
  const latestEntry = changeArray[changeArray.length - 1];
  return latestEntry ? latestEntry["Date of Accident"] : null;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  console.log(date)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export function DataCards({ data }) {
  const carbonChange = data ? getLatestChange(data.carbon_emissions_change) : null;
  const waterChange = data ? getLatestChange(data.water_usage_change) : null;
  const lastAccidentDate = data ? getLatestAccident(data.employee_safety_change) : null;
  const esgGoals = data ? data.waste_management?.combined?.recycled : null;


  const dataInsights = [
    {
      title: "Carbon Emissions",
      value: carbonChange !== null ? `${Math.abs(carbonChange).toFixed(1)}% ${carbonChange > 0 ? "increase" : "reduction"}` : "N/A",
      trend: carbonChange !== null ? (carbonChange > 0 ? "up" : "down") : "stable",
      description: "Compared to last month",
      icon: carbonChange !== null ? (carbonChange > 0 ? TrendingUp : TrendingDown) : Minus,
      color: carbonChange !== null ? (carbonChange > 0 ? "text-red-600" : "text-emerald-600") : "text-gray-600",
      bgGradient: "from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      borderColor: "border-emerald-200"
    },
    {
      title: "Water Usage",
      value: waterChange !== null ? `${Math.abs(waterChange).toFixed(1)}% ${waterChange > 0 ? "increase" : "reduction"}` : "N/A",
      trend: waterChange !== null ? (waterChange > 0 ? "up" : "down") : "stable",
      description: "Achieved through efficiency programs",
      icon: waterChange !== null ? (waterChange > 0 ? TrendingUp : TrendingDown) : Minus,
      color: waterChange !== null ? (waterChange > 0 ? "text-red-600" : "text-blue-600") : "text-gray-600",
      bgGradient: "from-blue-50 to-cyan-50",
      iconBg: "bg-blue-100",
      borderColor: "border-blue-200"
    },
    {
      title: "Employee Safety",
      value: lastAccidentDate !== null ? lastAccidentDate : "N/A",
      trend: "stable",
      description: "Date of last reported incident",
      icon: Minus,
      color: "text-purple-600",
      bgGradient: "from-purple-50 to-violet-50",
      iconBg: "bg-purple-100",
      borderColor: "border-purple-200"
    },
    {
      title: "Waste Recycled",
      value: esgGoals !== null ? `${esgGoals.toFixed(1)}%` : "N/A",
      trend: "up",
      description: "Total recycled waste",
      icon: Target,
      color: "text-indigo-600",
      bgGradient: "from-indigo-50 to-blue-50",
      iconBg: "bg-indigo-100",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {dataInsights.map((insight, index) => (
        <Card key={index} className={`bg-gradient-to-br ${insight.bgGradient} border ${insight.borderColor} rounded-2xl overflow-hidden hover:border-opacity-70 transition-all duration-300 transform hover:-translate-y-1`}>
          <CardHeader className="pb-2 px-6 pt-6">
            <CardTitle className="text-sm font-bold text-gray-700 flex items-center gap-3">
              <div className={`p-2 ${insight.iconBg} rounded-xl border border-white/50`}>
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
              <p className="text-xs text-gray-600 leading-relaxed font-medium bg-white/60 px-3 py-1 rounded-full border border-white/50">
                {insight.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
