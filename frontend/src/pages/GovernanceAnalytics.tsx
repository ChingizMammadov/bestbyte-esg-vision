import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Scale, BarChart3, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const COMPANY_ID = "8479cb95-2057-490d-813c-825e83d71890";

function useGovernanceData() {
  const targets = useQuery({
    queryKey: ["esg-targets-governance", COMPANY_ID],
    queryFn: () =>
      fetch(`${API}/api/esg/targets?company_id=${COMPANY_ID}`)
        .then(r => r.json()).then(r => r.data ?? []),
  });
  const benchmarks = useQuery({
    queryKey: ["benchmark-data-banking"],
    queryFn: () => Promise.resolve([]),
  });
  return { targets, benchmarks };
}

function progressColor(pct: number) {
  if (pct >= 90) return "bg-emerald-500";
  if (pct >= 70) return "bg-yellow-500";
  return "bg-red-500";
}

function progressBadge(pct: number) {
  if (pct >= 90) return "text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40";
  if (pct >= 70) return "text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/40";
  return "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40";
}

export default function GovernanceAnalytics() {
  const { targets, benchmarks } = useGovernanceData();

  const allTargets = targets.data ?? [];
  const govTargets = allTargets.filter((t) => t.category === "governance");
  const socialTargets = allTargets.filter((t) => t.category === "social");
  const envTargets = allTargets.filter((t) => t.category === "environmental");

  const benchmarkData = benchmarks.data ?? [];

  // Compute overall governance score from active governance targets (avg % achieved)
  const govAchieved = govTargets.map((t) => {
    if (!t.target_value || t.target_value === 0) return 0;
    return Math.min(100, ((t.current_value ?? 0) / t.target_value) * 100);
  });
  const avgGovScore =
    govAchieved.length > 0 ? govAchieved.reduce((a, b) => a + b, 0) / govAchieved.length : 0;

  const complianceTarget = allTargets.find((t) =>
    t.metric_name?.toLowerCase().includes("compliance")
  );
  const compliancePct =
    complianceTarget && complianceTarget.target_value
      ? Math.min(
          100,
          ((complianceTarget.current_value ?? 0) / complianceTarget.target_value) * 100
        )
      : 99.8;

  const isLoading = targets.isLoading || benchmarks.isLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-0 shadow-xl rounded-3xl animate-pulse h-36" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Risk / Governance score */}
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-indigo-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-indigo-200">
              <div className="p-1.5 sm:p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg sm:rounded-xl">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="truncate">Governance Score</span>
            </CardTitle>
            <CardDescription className="text-indigo-700 dark:text-indigo-300 font-medium text-xs sm:text-sm">
              Avg. target achievement
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-indigo-700 dark:text-indigo-300 mb-2">
              {avgGovScore.toFixed(1)}%
            </div>
            <p className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block ${progressBadge(avgGovScore)}`}>
              {avgGovScore >= 90 ? "On track" : avgGovScore >= 70 ? "Needs attention" : "Below target"}
            </p>
          </CardContent>
        </Card>

        {/* Compliance */}
        <Card className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/40 dark:to-sky-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-blue-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-sky-500/10 dark:from-blue-500/5 dark:to-sky-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-blue-200">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg sm:rounded-xl">
                <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="truncate">Compliance Rate</span>
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300 font-medium text-xs sm:text-sm">
              Regulatory compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-700 dark:text-blue-300 mb-2">
              {compliancePct.toFixed(1)}%
            </div>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 font-medium bg-blue-100 dark:bg-blue-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              Regulatory compliance rate
            </p>
          </CardContent>
        </Card>

        {/* Total active targets */}
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-amber-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-500/5 dark:to-yellow-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-amber-200">
              <div className="p-1.5 sm:p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg sm:rounded-xl">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="truncate">Active ESG Targets</span>
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300 font-medium text-xs sm:text-sm">
              Across all categories
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-amber-700 dark:text-amber-300 mb-2">
              {allTargets.length}
            </div>
            <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-300 font-medium bg-amber-100 dark:bg-amber-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              {envTargets.length}E · {socialTargets.length}S · {govTargets.length}G
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Governance targets progress */}
      <Card className="border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
            <div className="p-1.5 sm:p-2 bg-indigo-100 dark:bg-indigo-800/60 rounded-lg sm:rounded-xl">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="truncate">ESG Target Progress</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">
            Progress toward each active ESG target
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6 space-y-4">
          {allTargets.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No active targets found.</p>
          )}
          {allTargets.map((target) => {
            const pct =
              target.target_value && target.target_value > 0
                ? Math.min(100, ((target.current_value ?? 0) / target.target_value) * 100)
                : 0;
            const categoryColors: Record<string, string> = {
              environmental: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
              social: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30",
              governance: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30",
            };
            return (
              <div key={target.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase ${categoryColors[target.category] ?? ""}`}>
                      {target.category}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {target.metric_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {target.current_value} / {target.target_value} {target.unit}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${progressBadge(pct)}`}>
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${progressColor(pct)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {target.target_date && (
                  <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <Clock className="w-3 h-3" />
                    Target date: {new Date(target.target_date).toLocaleDateString()}
                    {target.description && <span className="ml-2 truncate opacity-70">{target.description}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Industry Benchmarks */}
      {benchmarkData.length > 0 && (
        <Card className="border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
              <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="truncate">Industry Benchmarks</span>
            </CardTitle>
            <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">
              Banking & Financial Services — peer comparison
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {benchmarkData.map((b) => (
                <div key={b.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                    {b.benchmark_value} {b.unit}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{b.metric_name}</div>
                  {b.percentile && (
                    <div className="text-xs text-slate-400 dark:text-slate-500">p{b.percentile}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
