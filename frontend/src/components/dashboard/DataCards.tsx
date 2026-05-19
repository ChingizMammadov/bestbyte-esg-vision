
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus, Target, ArrowDownRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import { useLocalStorageWithRefresh } from "@/hooks/useLocalStorageWithRefresh";

const defaultDataInsights = [
  {
    title: "GHG Emissions",
    value: "96.5% reduced",
    badge: "Ahead of target",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    trend: "down",
    description: "61,800 MT CO2e in 2024 vs 1.79M baseline (2010)",
    icon: "TrendingDown",
    color: "text-emerald-600 dark:text-emerald-400",
    bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    borderColor: "border-emerald-200 dark:border-emerald-900"
  },
  {
    title: "Sustainable Finance",
    value: "$860B deployed",
    badge: "57% of $1.5T goal",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    trend: "up",
    description: "$245B deployed in 2024 · On track for 2030",
    icon: "TrendingUp",
    color: "text-blue-600 dark:text-blue-400",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    borderColor: "border-blue-200 dark:border-blue-900"
  },
  {
    title: "Workforce Diversity",
    value: "52% women",
    badge: "Target exceeded",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
    trend: "stable",
    description: "45% diverse race/ethnicity · 213,000 employees globally",
    icon: "Minus",
    color: "text-purple-600 dark:text-purple-400",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    borderColor: "border-purple-200 dark:border-purple-900"
  },
  {
    title: "ESG Goals",
    value: "Ahead of schedule",
    badge: "Carbon neutral since 2019",
    badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
    trend: "up",
    description: "100% renewable electricity · Net Zero target 2050",
    icon: "Target",
    color: "text-indigo-600 dark:text-indigo-400",
    bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
    borderColor: "border-indigo-200 dark:border-indigo-900"
  }
];

export function DataCards() {
  const dataInsights = useLocalStorageWithRefresh('dataCards', defaultDataInsights);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'TrendingDown': return TrendingDown;
      case 'TrendingUp':  return TrendingUp;
      case 'Minus':       return Minus;
      case 'Target':      return Target;
      default:            return TrendingDown;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'down') return <ArrowDownRight className="w-3 h-3 text-emerald-500" />;
    if (trend === 'up')   return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    return null;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {dataInsights.map((insight, index) => {
        const IconComponent = getIconComponent(insight.icon);
        const badge = (insight as any).badge;
        const badgeColor = (insight as any).badgeColor ?? "bg-gray-100 text-gray-600";

        return (
          <Card
            key={index}
            className={`bg-gradient-to-br ${insight.bgGradient} border ${insight.borderColor} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            <CardHeader className="pb-1 px-5 pt-5">
              <CardTitle className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <div className={`p-2 ${insight.iconBg} rounded-xl border border-white/50 dark:border-gray-700/50`}>
                  <IconComponent className={`w-4 h-4 ${insight.color}`} />
                </div>
                <span className="flex-1 leading-tight">{insight.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-2">
              <div className="flex items-center gap-1">
                <p className={`text-xl font-black ${insight.color} leading-tight`}>
                  {insight.value}
                </p>
                {getTrendIcon(insight.trend)}
              </div>

              {badge && (
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
                  <BadgeCheck className="w-3 h-3" />
                  {badge}
                </span>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {insight.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
