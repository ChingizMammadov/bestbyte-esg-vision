
import React from "react";
import { TrendingDown, Leaf, Users, Shield, DollarSign, Award } from "lucide-react";

const scores = [
  { label: "Environmental", score: 94, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30", bar: "bg-emerald-500", icon: Leaf },
  { label: "Social",        score: 86, color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-50 dark:bg-blue-900/30",    bar: "bg-blue-500",    icon: Users },
  { label: "Governance",    score: 49, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/30", bar: "bg-purple-500",  icon: Shield },
];

const highlights = [
  { icon: TrendingDown, label: "GHG Reduced",       value: "96.5%",  sub: "vs 2010 baseline",       color: "text-emerald-600 dark:text-emerald-400" },
  { icon: Leaf,         label: "Renewable Energy",  value: "100%",   sub: "since 2019",              color: "text-green-600 dark:text-green-400" },
  { icon: DollarSign,   label: "Sustainable Finance", value: "$860B", sub: "toward $1.5T goal",      color: "text-blue-600 dark:text-blue-400" },
  { icon: Users,        label: "Employees",         value: "213K",   sub: "52% women globally",      color: "text-violet-600 dark:text-violet-400" },
  { icon: Award,        label: "ESG Rating",        value: "AA",     sub: "MSCI ESG Rating 2024",    color: "text-amber-600 dark:text-amber-400" },
];

export function ESGHeroBanner() {
  const overall = Math.round(scores.reduce((s, x) => s + x.score, 0) / scores.length);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white shadow-2xl">
      {/* Top strip */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 pt-6 pb-4 border-b border-white/10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-1">ESG Intelligence Dashboard</p>
          <h2 className="text-2xl md:text-3xl font-black text-white">Bank of America Corporation</h2>
          <p className="text-sm text-blue-200 mt-1">NYSE: BAC · Banking & Financial Services · Charlotte, NC</p>
        </div>
        {/* Overall score ring */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
          <div className="text-center">
            <p className="text-5xl font-black text-white">{overall}</p>
            <p className="text-xs text-blue-200 font-semibold uppercase tracking-wide mt-1">Overall ESG Score</p>
          </div>
          <div className="h-12 w-px bg-white/20" />
          <div className="text-center">
            <p className="text-3xl font-black text-amber-400">AA</p>
            <p className="text-xs text-blue-200 font-semibold uppercase tracking-wide mt-1">MSCI Rating</p>
          </div>
        </div>
      </div>

      {/* E / S / G score bars */}
      <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-white/10">
        {scores.map(({ label, score, bar, icon: Icon }) => (
          <div key={label} className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-white/60" />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wide">{label}</span>
              <span className="ml-auto text-lg font-black text-white">{score}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full ${bar} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Highlight stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 px-6 py-4">
        {highlights.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-all duration-200">
            <Icon className={`w-4 h-4 mb-2 ${color}`} />
            <p className="text-xl font-black text-white">{value}</p>
            <p className="text-xs font-semibold text-white/80">{label}</p>
            <p className="text-[10px] text-white/50 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
