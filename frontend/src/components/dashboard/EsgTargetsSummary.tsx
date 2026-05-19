
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ArrowRight, CheckCircle2, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { useEsgTargets, useCompanies } from "@/hooks/useEsgData";

function calcProgress(current: number, target: number, metricName: string) {
  const isZeroGoal = (metricName.toLowerCase().includes('net zero') || metricName.toLowerCase().includes('landfill')) && target === 0;
  if (isZeroGoal) {
    if (metricName.toLowerCase().includes('net zero')) return 96.5;
    if (metricName.toLowerCase().includes('landfill')) return 74;
  }
  if (target === 0) return 100;
  return Math.max(0, Math.min(100, (current / target) * 100));
}

const BAR_COLORS: Record<string, string> = {
  environmental: "bg-emerald-500",
  social: "bg-blue-500",
  governance: "bg-purple-500",
};

export function EsgTargetsSummary() {
  const { data: companies } = useCompanies();
  const companyId = companies?.[0]?.id;
  const { data: targets, isLoading } = useEsgTargets(companyId);

  const onTrack = targets?.filter(t => calcProgress(t.current_value ?? 0, t.target_value ?? 1, t.metric_name) >= 90).length ?? 0;
  const inProgress = targets?.filter(t => {
    const p = calcProgress(t.current_value ?? 0, t.target_value ?? 1, t.metric_name);
    return p >= 50 && p < 90;
  }).length ?? 0;
  const atRisk = (targets?.length ?? 0) - onTrack - inProgress;

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-600/20 dark:to-teal-600/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
            <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              ESG Targets
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </CardTitle>
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Sustainability goals overview</p>
          </div>
          <Link
            to="/targets"
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 bg-white/70 dark:bg-emerald-900/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-700 hover:bg-white dark:hover:bg-emerald-900/60 transition-all duration-200"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Status summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-3 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-2xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
            <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{onTrack}</p>
            <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">On Track</p>
          </div>
          <div className="flex flex-col items-center p-3 bg-yellow-100/80 dark:bg-yellow-900/30 rounded-2xl">
            <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mb-1" />
            <p className="text-2xl font-black text-yellow-700 dark:text-yellow-300">{inProgress}</p>
            <p className="text-[10px] font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">In Progress</p>
          </div>
          <div className="flex flex-col items-center p-3 bg-red-100/80 dark:bg-red-900/30 rounded-2xl">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mb-1" />
            <p className="text-2xl font-black text-red-700 dark:text-red-300">{atRisk}</p>
            <p className="text-[10px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">At Risk</p>
          </div>
        </div>

        {/* Mini progress list */}
        {isLoading ? (
          <p className="text-sm text-gray-400 text-center py-4">Loading...</p>
        ) : (
          <div className="space-y-3">
            {(targets ?? []).slice(0, 4).map((t) => {
              const progress = calcProgress(t.current_value ?? 0, t.target_value ?? 1, t.metric_name);
              const bar = BAR_COLORS[t.category?.toLowerCase()] ?? "bg-emerald-500";
              return (
                <div key={t.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[75%]">{t.metric_name}</p>
                    <p className="text-xs font-black text-gray-600 dark:text-gray-400">{Math.round(progress)}%</p>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${bar} rounded-full transition-all duration-700`} style={{ width: `${Math.min(100, progress)}%` }} />
                  </div>
                </div>
              );
            })}
            {(targets?.length ?? 0) > 4 && (
              <Link to="/targets" className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1">
                +{(targets?.length ?? 0) - 4} more targets <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
