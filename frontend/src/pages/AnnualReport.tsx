import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Zap, Droplet, Trash2, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const COMPANY_ID = "8479cb95-2057-490d-813c-825e83d71890";
const apiFetch = (p: string) => fetch(`${API}${p}`).then(r => r.json()).then(r => r.data ?? []);

function useAnnualData(year: number) {
  return useQuery({
    queryKey: ["annual-report", COMPANY_ID, year],
    queryFn: async () => {
      const [carbon, energy, waste, water, targets] = await Promise.all([
        apiFetch(`/api/esg/carbon?company_id=${COMPANY_ID}`),
        apiFetch(`/api/esg/energy?company_id=${COMPANY_ID}`),
        apiFetch(`/api/esg/waste?company_id=${COMPANY_ID}`),
        apiFetch(`/api/esg/water?company_id=${COMPANY_ID}`),
        apiFetch(`/api/esg/targets?company_id=${COMPANY_ID}`),
      ]);
      // Filter client-side by year
      const inYear = (r: any) => r.reporting_period?.startsWith(`${year}`);
      return {
        carbon: carbon.filter(inYear),
        energy: energy.filter(inYear),
        waste: waste.filter(inYear),
        water: water.filter(inYear),
        targets,
      };
    },
  });
}

export default function AnnualReport() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const { data, isLoading } = useAnnualData(year);

  const totalCarbon = (data?.carbon ?? []).reduce((s, r) => s + (r.emissions_co2_tons ?? 0), 0);
  const totalKwh = (data?.energy ?? []).reduce((s, r) => s + (r.consumption_kwh ?? 0), 0);
  const renewableKwh = (data?.energy ?? []).filter(r => r.energy_type === "renewable").reduce((s, r) => s + (r.consumption_kwh ?? 0), 0);
  const renewablePct = totalKwh > 0 ? (renewableKwh / totalKwh) * 100 : 0;
  const totalWaste = (data?.waste ?? []).reduce((s, r) => s + (r.amount_kg ?? 0), 0);
  const recycled = (data?.waste ?? []).filter(r => r.disposal_method === "recycled").reduce((s, r) => s + (r.amount_kg ?? 0), 0);
  const recyclingRate = totalWaste > 0 ? (recycled / totalWaste) * 100 : 0;
  const totalWaterML = (data?.water ?? []).reduce((s, r) => s + (r.consumption_liters ?? 0), 0) / 1_000_000;
  const activeTargets = (data?.targets ?? []);
  const hasData = totalCarbon > 0 || totalKwh > 0;

  return (
    <div className="space-y-6">
      {/* Year selector */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => setYear(y => y - 1)} className="rounded-xl">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-base font-semibold text-gray-800 dark:text-gray-200 min-w-[80px] text-center">{year}</span>
        <Button
          variant="outline" size="sm"
          onClick={() => setYear(y => y + 1)}
          disabled={year >= now.getFullYear()}
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
            <p className="text-gray-500 dark:text-gray-400 text-sm">No data available for {year}.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-emerald-200">
                  <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Total Carbon
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{totalCarbon.toFixed(0)} t</div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">CO₂ equivalent {year}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-yellow-200">
                  <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  Renewable Share
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-black text-yellow-700 dark:text-yellow-300">{renewablePct.toFixed(1)}%</div>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">{(totalKwh/1_000_000).toFixed(2)}M kWh total</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-gray-200">
                  <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  Recycling Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-black text-gray-700 dark:text-gray-300">{recyclingRate.toFixed(1)}%</div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{(totalWaste/1000).toFixed(1)}t total waste</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-3 p-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-blue-200">
                  <Droplet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Water Consumed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-black text-blue-700 dark:text-blue-300">{totalWaterML.toFixed(1)} ML</div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Megalitres {year}</p>
              </CardContent>
            </Card>
          </div>

          {/* Monthly breakdown */}
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
            <CardHeader className="pb-4 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
              <CardTitle className="flex items-center gap-2 text-lg font-bold dark:text-gray-100">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Monthly Carbon Emissions — {year}
              </CardTitle>
              <CardDescription className="dark:text-gray-400">Scope 1+2+3 emissions per month</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const period = `${year}-${String(i + 1).padStart(2, "0")}-01`;
                  const monthly = (data?.carbon ?? []).filter(r => r.reporting_period === period).reduce((s, r) => s + (r.emissions_co2_tons ?? 0), 0);
                  const maxCarbon = Math.max(...Array.from({ length: 12 }, (_, j) => {
                    const p = `${year}-${String(j + 1).padStart(2, "0")}-01`;
                    return (data?.carbon ?? []).filter(r => r.reporting_period === p).reduce((s, r) => s + (r.emissions_co2_tons ?? 0), 0);
                  }));
                  const heightPct = maxCarbon > 0 ? (monthly / maxCarbon) * 100 : 0;
                  const monthShort = new Date(year, i, 1).toLocaleString("default", { month: "short" });
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-t-sm" style={{ height: 60 }}>
                        <div
                          className="w-full bg-emerald-400 dark:bg-emerald-500 rounded-t-sm transition-all"
                          style={{ height: `${heightPct}%`, marginTop: `${100 - heightPct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{monthShort}</span>
                      {monthly > 0 && <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">{monthly.toFixed(0)}</span>}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Values in tonnes CO₂e</p>
            </CardContent>
          </Card>

          {/* Active targets */}
          {activeTargets.length > 0 && (
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
              <CardHeader className="pb-4 p-5">
                <CardTitle className="text-lg font-bold dark:text-gray-100">Active ESG Targets</CardTitle>
                <CardDescription className="dark:text-gray-400">{activeTargets.length} targets currently tracked</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-3">
                  {activeTargets.map((t) => {
                    const pct = t.target_value ? Math.min(100, ((t.current_value ?? 0) / t.target_value) * 100) : 0;
                    return (
                      <div key={t.id} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-800 dark:text-gray-200">{t.metric_name}</span>
                            <span className="text-gray-500 dark:text-gray-400">{pct.toFixed(0)}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${pct >= 90 ? "bg-emerald-500" : pct >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
