import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, TrendingUp, Award, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useEsgTargets, useCompanies } from "@/hooks/useEsgData";
import { Button } from "@/components/ui/button";


export const sampleTargets = [
  {
    id: 1,
    metric_name: "Renewable Energy Usage",
    description: "Increase share of renewable energy in total electricity consumption.",
    category: "Environmental",
    current_value: 45,
    target_value: 80,
    unit: "%",
    target_date: "2028-06-30",
  },
  {
    id: 2,
    metric_name: "Carbon Emissions Reduction",
    description: "Reduce total Scope 1 & 2 carbon emissions across all operations.",
    category: "Environmental",
    current_value: 120000,
    target_value: 60000,
    unit: "tons CO₂e",
    target_date: "2030-12-31",
  },
  {
    id: 3,
    metric_name: "Employee Diversity",
    description: "Ensure gender diversity with at least 40% women in leadership positions.",
    category: "Social",
    current_value: 32,
    target_value: 40,
    unit: "%",
    target_date: "2026-12-31",
  },
  {
    id: 4,
    metric_name: "Community Investment",
    description: "Allocate annual profits towards social responsibility programs and community projects.",
    category: "Social",
    current_value: 15,
    target_value: 25,
    unit: "million USD",
    target_date: "2025-12-31",
  },
  {
    id: 5,
    metric_name: "Board Independence",
    description: "Maintain independent members on the company’s board of directors.",
    category: "Governance",
    current_value: 55,
    target_value: 60,
    unit: "%",
    target_date: "2024-12-31",
  },
];


export function EsgTargets({data}) {
  const { targets: targets, isLoading, error } = data ? { targets: sampleTargets, isLoading: false, error: null } : { targets: null, isLoading: false, error: null };
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-600/20 dark:to-teal-600/20 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">ESG Targets</CardTitle>
          </div>
          <CardDescription className="text-emerald-700 dark:text-emerald-300">Loading ESG targets...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error || !targets || targets.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-600/20 dark:to-teal-600/20 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">ESG Targets</CardTitle>
          </div>
          <CardDescription className="text-emerald-700 dark:text-emerald-300">No ESG targets available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "environmental":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800";
      case "social":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800";
      case "governance":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "environmental":
        return <Zap className="w-4 h-4" />;
      case "social":
        return <Award className="w-4 h-4" />;
      case "governance":
        return <Target className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const calculateProgress = (current: number, target: number, isReverse = false) => {
    if (isReverse) {
      const maxValue = Math.max(current, target * 1.5);
      return Math.max(0, Math.min(100, ((maxValue - current) / maxValue) * 100));
    } else {
      return Math.max(0, Math.min(100, (current / target) * 100));
    }
  };

  const visibleTargets = showAll ? targets : targets.slice(0, 1);

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-600/20 dark:to-teal-600/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
            <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              ESG Targets
              <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            </CardTitle>
            <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium">
              Track progress towards sustainability goals
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {visibleTargets.map((target) => {
          const isReverse =
            target.metric_name.toLowerCase().includes("carbon") ||
            target.metric_name.toLowerCase().includes("emission");
          const progress = calculateProgress(target.current_value || 0, target.target_value || 1, isReverse);

          return (
            <div
              key={target.id}
              className="p-5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{target.metric_name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{target.description}</p>
                </div>
                <Badge
                  className={`${getCategoryColor(target.category)} border font-semibold px-3 py-1 flex items-center gap-1`}
                >
                  {getCategoryIcon(target.category)}
                  {target.category}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-gray-600 dark:text-gray-300">
                    Current:{" "}
                    <span className="text-gray-900 dark:text-gray-100 font-bold">
                      {target.current_value} {target.unit}
                    </span>
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Target:{" "}
                    <span className="text-gray-900 dark:text-gray-100 font-bold">
                      {target.target_value} {target.unit}
                    </span>
                  </span>
                </div>
                <div className="relative">
                  <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 dark:from-emerald-500 dark:to-teal-600 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-bold px-2 py-1 rounded-full ${
                      progress >= 80
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                        : progress >= 50
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                    }`}
                  >
                    {Math.round(progress)}% complete
                  </span>
                  {target.target_date && (
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {new Date(target.target_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {targets.length > 1 && (
          <div className="flex justify-center pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full px-4"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
