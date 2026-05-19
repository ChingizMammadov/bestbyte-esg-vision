
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Globe, Users, Sparkles, Leaf, Shield, TrendingUp, Award, DollarSign, Zap } from "lucide-react";
import { useCompanies } from "@/hooks/useEsgData";

const ESG_SCORES = [
  { label: "Environmental", score: 94, color: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500", icon: Leaf },
  { label: "Social",        score: 86, color: "text-blue-600 dark:text-blue-400",       bar: "bg-blue-500",    icon: Users },
  { label: "Governance",    score: 49, color: "text-purple-600 dark:text-purple-400",    bar: "bg-purple-500",  icon: Shield },
];

const ACHIEVEMENTS = [
  { icon: Zap,        label: "Carbon Neutral",    sub: "since 2019",        color: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
  { icon: Award,      label: "MSCI Rating AA",    sub: "2024",              color: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800" },
  { icon: Leaf,       label: "100% Renewable",    sub: "electricity",       color: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800" },
  { icon: TrendingUp, label: "Net Zero",          sub: "target 2050",       color: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
];

const KEY_STATS = [
  { icon: Users,       label: "Employees",      value: "213K",   color: "text-violet-600 dark:text-violet-400" },
  { icon: DollarSign,  label: "Total Assets",   value: "$3.3T",  color: "text-emerald-600 dark:text-emerald-400" },
  { icon: TrendingUp,  label: "Sust. Finance",  value: "$860B",  color: "text-blue-600 dark:text-blue-400" },
  { icon: Globe,       label: "Countries",      value: "35+",    color: "text-orange-600 dark:text-orange-400" },
];

export function CompanyOverview() {
  const { data: companies, isLoading, error } = useCompanies();

  const skeleton = (
    <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/50 rounded-xl">
            <Building2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Company Overview</CardTitle>
        </div>
        <p className="text-sm text-violet-700 dark:text-violet-300">
          {isLoading ? "Loading company information..." : "No company data available"}
        </p>
      </CardHeader>
    </Card>
  );

  if (isLoading || error || !companies || companies.length === 0) return skeleton;

  const company = companies[0];

  return (
    <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-600/20 dark:to-purple-600/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/50 rounded-xl">
            <Building2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              Company Overview
              <Sparkles className="w-4 h-4 text-violet-500 dark:text-violet-400" />
            </CardTitle>
            <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 truncate">{company.name}</p>
          </div>
          <Badge variant="secondary" className="bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-semibold text-xs shrink-0">
            NYSE: BAC
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* Key stats row */}
        <div className="grid grid-cols-4 gap-2">
          {KEY_STATS.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex flex-col items-center p-2.5 bg-white/70 dark:bg-gray-800/70 rounded-xl text-center border border-white/60 dark:border-gray-700/60">
              <Icon className={`w-4 h-4 mb-1 ${color}`} />
              <p className="text-sm font-black text-gray-900 dark:text-gray-100">{value}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* ESG Score mini-bars */}
        <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-2xl border border-white/60 dark:border-gray-700/60 space-y-3">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">ESG Score Breakdown</p>
          {ESG_SCORES.map(({ label, score, bar, color, icon: Icon }) => (
            <div key={label} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</span>
                </div>
                <span className={`text-sm font-black ${color}`}>{score}</span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full ${bar} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 gap-2">
          {ACHIEVEMENTS.map(({ icon: Icon, label, sub, color }) => (
            <div key={label} className={`flex items-center gap-2 p-2.5 rounded-xl border ${color}`}>
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold leading-tight">{label}</p>
                <p className="text-[10px] opacity-70 leading-tight">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Location + website in a compact row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-medium">{company.headquarters_location}</span>
          </div>
          <div className="h-3 w-px bg-gray-300 dark:bg-gray-600" />
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 font-semibold"
            >
              <Globe className="w-3.5 h-3.5" />
              bankofamerica.com
            </a>
          )}
          <div className="h-3 w-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Banking & Financial Services</span>
        </div>
      </CardContent>
    </Card>
  );
}
