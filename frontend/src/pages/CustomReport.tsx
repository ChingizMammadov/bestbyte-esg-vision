import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sliders, Leaf, Zap, Droplet, Trash2, Users, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const COMPANY_ID = "8479cb95-2057-490d-813c-825e83d71890";
const apiFetch = (p: string) => fetch(`${API}${p}`).then(r => r.json()).then(r => r.data ?? []);

const METRIC_OPTIONS = [
  { key: "carbon", label: "Carbon Emissions", icon: Leaf, color: "emerald" },
  { key: "energy", label: "Energy Consumption", icon: Zap, color: "yellow" },
  { key: "waste", label: "Waste Management", icon: Trash2, color: "gray" },
  { key: "water", label: "Water Usage", icon: Droplet, color: "blue" },
  { key: "employees", label: "Employee Engagement", icon: Users, color: "purple" },
];

function useCustomData(from: string, to: string, metrics: string[]) {
  return useQuery({
    queryKey: ["custom-report", COMPANY_ID, from, to, metrics.join(",")],
    enabled: !!from && !!to && metrics.length > 0,
    queryFn: async () => {
      const inRange = (r: any) => {
        const p = r.reporting_period ?? "";
        return p >= `${from}-01` && p <= `${to}-31`;
      };
      const endpoints: Record<string, string> = {
        carbon: `/api/esg/carbon?company_id=${COMPANY_ID}`,
        energy: `/api/esg/energy?company_id=${COMPANY_ID}`,
        waste: `/api/esg/waste?company_id=${COMPANY_ID}`,
        water: `/api/esg/water?company_id=${COMPANY_ID}`,
        employees: `/api/esg/employees?company_id=${COMPANY_ID}`,
      };
      const activeKeys = metrics.filter(k => endpoints[k]);
      const fetched = await Promise.all(activeKeys.map(k => apiFetch(endpoints[k])));
      return Object.fromEntries(activeKeys.map((k, i) => [k, fetched[i].filter(inRange)]));
    },
  });
}

export default function CustomReport() {
  const now = new Date();
  const thisYear = now.getFullYear();
  const [from, setFrom] = useState(`${thisYear}-01`);
  const [to, setTo] = useState(`${thisYear}-${String(now.getMonth() + 1).padStart(2, "0")}`);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["carbon", "energy"]);
  const [submitted, setSubmitted] = useState(false);

  const { data, isLoading } = useCustomData(from, to, submitted ? selectedMetrics : []);

  const toggleMetric = (key: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    setSubmitted(false);
  };

  const handleGenerate = () => setSubmitted(true);

  return (
    <div className="space-y-6">
      {/* Config panel */}
      <Card className="border-0 shadow-xl rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
        <CardHeader className="pb-4 p-5 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
          <CardTitle className="flex items-center gap-2 text-lg font-bold dark:text-gray-100">
            <Sliders className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Custom Report Configuration
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Select date range and metrics, then generate your report
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">From (YYYY-MM)</Label>
              <input
                type="month"
                value={from}
                max={to}
                onChange={(e) => { setFrom(e.target.value); setSubmitted(false); }}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">To (YYYY-MM)</Label>
              <input
                type="month"
                value={to}
                min={from}
                max={`${thisYear}-${String(now.getMonth() + 1).padStart(2, "0")}`}
                onChange={(e) => { setTo(e.target.value); setSubmitted(false); }}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Metrics to include</Label>
            <div className="flex flex-wrap gap-2">
              {METRIC_OPTIONS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => toggleMetric(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                    selectedMetrics.includes(key)
                      ? "bg-violet-600 text-white border-violet-700"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-violet-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={selectedMetrics.length === 0}
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {submitted && isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedMetrics.map((k) => (
            <Card key={k} className="animate-pulse h-32 border-0 shadow-xl rounded-3xl" />
          ))}
        </div>
      )}

      {submitted && !isLoading && data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedMetrics.includes("carbon") && data.carbon && (
            <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-emerald-200">
                  <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Carbon Emissions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-2">
                {([1,2,3] as const).map((scope) => {
                  const t = data.carbon.filter((r: any) => r.scope === scope).reduce((s: number, r: any) => s + (r.emissions_co2_tons ?? 0), 0);
                  return (
                    <div key={scope} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Scope {scope}</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">{t.toFixed(1)} t CO₂e</span>
                    </div>
                  );
                })}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2 flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span className="text-emerald-700 dark:text-emerald-400">{data.carbon.reduce((s: number, r: any) => s + (r.emissions_co2_tons ?? 0), 0).toFixed(1)} t</span>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedMetrics.includes("energy") && data.energy && (
            <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-yellow-200">
                  <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  Energy Consumption
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-2">
                {["renewable", "non-renewable"].map((type) => {
                  const kwh = data.energy.filter((r: any) => r.energy_type === type).reduce((s: number, r: any) => s + (r.consumption_kwh ?? 0), 0);
                  return (
                    <div key={type} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 capitalize">{type}</span>
                      <span className="font-semibold text-yellow-700 dark:text-yellow-400">{(kwh/1000).toFixed(0)}k kWh</span>
                    </div>
                  );
                })}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2 flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span className="text-yellow-700 dark:text-yellow-400">{(data.energy.reduce((s: number, r: any) => s + (r.consumption_kwh ?? 0), 0)/1000).toFixed(0)}k kWh</span>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedMetrics.includes("waste") && data.waste && (
            <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-gray-200">
                  <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  Waste Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-2">
                {["recycled", "landfill", "composted"].map((method) => {
                  const kg = data.waste.filter((r: any) => r.disposal_method === method).reduce((s: number, r: any) => s + (r.amount_kg ?? 0), 0);
                  return (
                    <div key={method} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 capitalize">{method}</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{kg.toFixed(0)} kg</span>
                    </div>
                  );
                })}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2 flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span className="text-gray-700 dark:text-gray-300">{data.waste.reduce((s: number, r: any) => s + (r.amount_kg ?? 0), 0).toFixed(0)} kg</span>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedMetrics.includes("water") && data.water && (
            <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-blue-200">
                  <Droplet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Water Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {(data.water.reduce((s: number, r: any) => s + (r.consumption_liters ?? 0), 0) / 1_000_000).toFixed(2)} ML
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Megalitres in selected period</p>
              </CardContent>
            </Card>
          )}

          {selectedMetrics.includes("employees") && data.employees && (
            <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800 md:col-span-2">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-bold dark:text-purple-200">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Employee Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {data.employees.map((r: any) => (
                    <div key={r.id} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                      <div className="text-base font-bold text-purple-700 dark:text-purple-300">{r.value}{r.unit ? ` ${r.unit}` : ""}</div>
                      <div className="text-xs text-purple-600 dark:text-purple-400 truncate">{r.metric_name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
