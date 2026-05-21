import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, Zap, Droplet, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const COMPANY_ID = "8479cb95-2057-490d-813c-825e83d71890";

function formatPeriod(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
}

function useMonthData(period: string) {
  return useQuery({
    queryKey: ["monthly-report", COMPANY_ID, period],
    queryFn: async () => {
      const [carbon, energy, waste, water] = await Promise.all([
        fetch(`${API}/api/esg/carbon?company_id=${COMPANY_ID}`).then(r => r.json()).then(r => r.data ?? []),
        fetch(`${API}/api/esg/energy?company_id=${COMPANY_ID}`).then(r => r.json()).then(r => r.data ?? []),
        fetch(`${API}/api/esg/waste?company_id=${COMPANY_ID}`).then(r => r.json()).then(r => r.data ?? []),
        fetch(`${API}/api/esg/water?company_id=${COMPANY_ID}`).then(r => r.json()).then(r => r.data ?? []),
      ]);
      // Filter client-side by period
      return {
        carbon: carbon.filter((r: any) => r.reporting_period?.startsWith(period.slice(0, 7))),
        energy: energy.filter((r: any) => r.reporting_period?.startsWith(period.slice(0, 7))),
        waste: waste.filter((r: any) => r.reporting_period?.startsWith(period.slice(0, 7))),
        water: water.filter((r: any) => r.reporting_period?.startsWith(period.slice(0, 7))),
      };
    },
  });
}

export default function MonthlyReport() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-indexed

  const period = formatPeriod(new Date(year, month, 1));
  const { data, isLoading } = useMonthData(period);

  const goBack = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const goForward = () => {
    const d = new Date(year, month + 1, 1);
    if (d <= now) {
      if (month === 11) { setMonth(0); setYear((y) => y + 1); }
      else setMonth((m) => m + 1);
    }
  };

  const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" });

  const totalCarbon = (data?.carbon ?? []).reduce((s, r) => s + (r.emissions_co2_tons ?? 0), 0);
  const totalKwh = (data?.energy ?? []).reduce((s, r) => s + (r.consumption_kwh ?? 0), 0);
  const renewableKwh = (data?.energy ?? []).filter(r => r.energy_type === "renewable").reduce((s, r) => s + (r.consumption_kwh ?? 0), 0);
  const renewablePct = totalKwh > 0 ? (renewableKwh / totalKwh) * 100 : 0;
  const totalWaste = (data?.waste ?? []).reduce((s, r) => s + (r.amount_kg ?? 0), 0);
  const recycledWaste = (data?.waste ?? []).filter(r => r.disposal_method === "recycled").reduce((s, r) => s + (r.amount_kg ?? 0), 0);
  const recyclingRate = totalWaste > 0 ? (recycledWaste / totalWaste) * 100 : 0;
  const totalWaterML = (data?.water ?? []).reduce((s, r) => s + (r.consumption_liters ?? 0), 0) / 1_000_000;

  const hasData = totalCarbon > 0 || totalKwh > 0 || totalWaste > 0 || totalWaterML > 0;

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={goBack} className="rounded-xl">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-base font-semibold text-gray-800 dark:text-gray-200 min-w-[140px] text-center">
          {monthName} {year}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={goForward}
          disabled={new Date(year, month + 1, 1) > now}
          className="rounded-xl"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Card key={i} className="animate-pulse h-32 border-0 shadow-xl rounded-3xl" />)}
        </div>
      ) : !hasData ? (
        <Card className="border-0 shadow-xl rounded-3xl">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">No data available for {monthName} {year}.</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Try selecting a month with available ESG data.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-emerald-200">
                  <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Carbon Emissions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{totalCarbon.toFixed(1)} t</div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">CO₂ equivalent</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-yellow-200">
                  <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  Renewable Energy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-black text-yellow-700 dark:text-yellow-300">{renewablePct.toFixed(1)}%</div>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">{(totalKwh/1000).toFixed(0)}k kWh total</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-gray-200">
                  <TrendingDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  Recycling Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-black text-gray-700 dark:text-gray-300">{recyclingRate.toFixed(1)}%</div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{totalWaste.toFixed(0)} kg total waste</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-blue-200">
                  <Droplet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Water Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-black text-blue-700 dark:text-blue-300">{totalWaterML.toFixed(2)} ML</div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Megalitres consumed</p>
              </CardContent>
            </Card>
          </div>

          {/* Carbon by scope */}
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
            <CardHeader className="pb-4 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
              <CardTitle className="text-lg font-bold dark:text-gray-100">Carbon Footprint by GHG Scope</CardTitle>
              <CardDescription className="dark:text-gray-400">{monthName} {year} breakdown</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { scope: 1, label: "Direct emissions", bg: "bg-emerald-50 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300", sub: "text-emerald-600 dark:text-emerald-400" },
                  { scope: 2, label: "Purchased energy", bg: "bg-teal-50 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-300", sub: "text-teal-600 dark:text-teal-400" },
                  { scope: 3, label: "Value chain", bg: "bg-cyan-50 dark:bg-cyan-900/30", text: "text-cyan-700 dark:text-cyan-300", sub: "text-cyan-600 dark:text-cyan-400" },
                ].map(({ scope, label, bg, text, sub }) => {
                  const scopeTotal = (data?.carbon ?? []).filter(r => r.scope === scope).reduce((s, r) => s + (r.emissions_co2_tons ?? 0), 0);
                  return (
                    <div key={scope} className={`p-4 ${bg} rounded-xl`}>
                      <div className={`text-xl font-bold ${text}`}>{scopeTotal.toFixed(1)} t</div>
                      <div className={`text-sm font-semibold ${sub}`}>Scope {scope}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
