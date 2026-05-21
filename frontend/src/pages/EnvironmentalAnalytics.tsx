import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, Zap, Droplet, Trash2, Leaf, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const COMPANY_ID = "8479cb95-2057-490d-813c-825e83d71890";
const apiFetch = (p: string) => fetch(`${API}${p}`).then(r => r.json()).then(r => r.data ?? []);

function useEnvironmentalData() {
  const carbon = useQuery({
    queryKey: ["carbon-footprint", COMPANY_ID],
    queryFn: () => apiFetch(`/api/esg/carbon?company_id=${COMPANY_ID}`),
  });
  const energy = useQuery({
    queryKey: ["energy-consumption", COMPANY_ID],
    queryFn: () => apiFetch(`/api/esg/energy?company_id=${COMPANY_ID}`),
  });
  const waste = useQuery({
    queryKey: ["waste-management", COMPANY_ID],
    queryFn: () => apiFetch(`/api/esg/waste?company_id=${COMPANY_ID}`),
  });
  const water = useQuery({
    queryKey: ["water-usage", COMPANY_ID],
    queryFn: () => apiFetch(`/api/esg/water?company_id=${COMPANY_ID}`),
  });
  return { carbon, energy, waste, water };
}

function StatCard({
  title, description, value, label, icon: Icon, colorClass, bgClass, headerBg,
}: {
  title: string; description: string; value: string; label: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string; bgClass: string; headerBg: string;
}) {
  return (
    <Card className={`${bgClass} border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden`}>
      <CardHeader className={`${headerBg} pb-3 sm:pb-4 p-3 sm:p-4 md:p-5`}>
        <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
          <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/40`}>
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colorClass}`} />
          </div>
          <span className="truncate">{title}</span>
        </CardTitle>
        <CardDescription className={`${colorClass} font-medium text-xs sm:text-sm opacity-90`}>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className={`text-xl sm:text-2xl md:text-3xl font-black ${colorClass} mb-2`}>{value}</div>
        <p className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block bg-white/40 ${colorClass}`}>
          {label}
        </p>
      </CardContent>
    </Card>
  );
}

export default function EnvironmentalAnalytics() {
  const { carbon, energy, waste, water } = useEnvironmentalData();

  const isLoading = carbon.isLoading || energy.isLoading || waste.isLoading || water.isLoading;

  // Carbon: total emissions and latest-month vs prior-month change
  const carbonData = carbon.data ?? [];
  const totalEmissions = carbonData.reduce((sum, r) => sum + (r.emissions_co2_tons ?? 0), 0);
  const sortedPeriods = [...new Set(carbonData.map((r) => r.reporting_period))].sort().reverse();
  const latestPeriodEmissions = carbonData
    .filter((r) => r.reporting_period === sortedPeriods[0])
    .reduce((sum, r) => sum + (r.emissions_co2_tons ?? 0), 0);
  const priorPeriodEmissions = carbonData
    .filter((r) => r.reporting_period === sortedPeriods[1])
    .reduce((sum, r) => sum + (r.emissions_co2_tons ?? 0), 0);
  const carbonChange =
    priorPeriodEmissions > 0
      ? ((latestPeriodEmissions - priorPeriodEmissions) / priorPeriodEmissions) * 100
      : 0;

  // Energy: renewable share
  const energyData = energy.data ?? [];
  const totalKwh = energyData.reduce((sum, r) => sum + (r.consumption_kwh ?? 0), 0);
  const renewableKwh = energyData
    .filter((r) => r.energy_type === "renewable")
    .reduce((sum, r) => sum + (r.consumption_kwh ?? 0), 0);
  const renewablePct = totalKwh > 0 ? (renewableKwh / totalKwh) * 100 : 0;

  // Waste: recycling rate
  const wasteData = waste.data ?? [];
  const totalWaste = wasteData.reduce((sum, r) => sum + (r.amount_kg ?? 0), 0);
  const recycledWaste = wasteData
    .filter((r) => r.disposal_method === "recycled")
    .reduce((sum, r) => sum + (r.amount_kg ?? 0), 0);
  const recyclingRate = totalWaste > 0 ? (recycledWaste / totalWaste) * 100 : 0;
  const landfillWaste = wasteData
    .filter((r) => r.disposal_method === "landfill")
    .reduce((sum, r) => sum + (r.amount_kg ?? 0), 0);
  const compostedWaste = wasteData
    .filter((r) => r.disposal_method === "composted")
    .reduce((sum, r) => sum + (r.amount_kg ?? 0), 0);

  // Water: total in megalitres
  const waterData = water.data ?? [];
  const totalWaterLitres = waterData.reduce((sum, r) => sum + (r.consumption_liters ?? 0), 0);
  const totalWaterML = totalWaterLitres / 1_000_000;
  const waterPeriods = [...new Set(waterData.map((r) => r.reporting_period))].sort().reverse();
  const latestWater = waterData
    .filter((r) => r.reporting_period === waterPeriods[0])
    .reduce((sum, r) => sum + (r.consumption_liters ?? 0), 0);
  const priorWater = waterData
    .filter((r) => r.reporting_period === waterPeriods[1])
    .reduce((sum, r) => sum + (r.consumption_liters ?? 0), 0);
  const waterChange = priorWater > 0 ? ((latestWater - priorWater) / priorWater) * 100 : 0;

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
        <StatCard
          title="Carbon Emissions"
          description="Total CO₂ equivalent"
          value={`${totalEmissions.toLocaleString(undefined, { maximumFractionDigits: 0 })} t`}
          label={carbonChange < 0 ? `${carbonChange.toFixed(1)}% vs prior month` : `+${carbonChange.toFixed(1)}% vs prior month`}
          icon={TrendingDown}
          colorClass="text-emerald-700 dark:text-emerald-400"
          bgClass="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30"
          headerBg="bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-600/20 dark:to-green-600/20"
        />
        <StatCard
          title="Renewable Energy"
          description="Share of total energy consumed"
          value={`${renewablePct.toFixed(1)}%`}
          label={`${(totalKwh / 1000).toFixed(0)}k kWh total consumption`}
          icon={Zap}
          colorClass="text-yellow-700 dark:text-yellow-400"
          bgClass="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30"
          headerBg="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 dark:from-yellow-600/20 dark:to-amber-600/20"
        />
        <StatCard
          title="Water Usage"
          description="Total water consumption"
          value={`${totalWaterML.toFixed(1)} ML`}
          label={waterChange < 0 ? `${waterChange.toFixed(1)}% vs prior month` : `+${waterChange.toFixed(1)}% vs prior month`}
          icon={Droplet}
          colorClass="text-blue-700 dark:text-blue-400"
          bgClass="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30"
          headerBg="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-600/20 dark:to-cyan-600/20"
        />
      </div>

      {/* Waste Management breakdown */}
      <Card className="border-0 dark:bg-gray-800 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-700 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
            <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-lg sm:rounded-xl">
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            </div>
            <span className="truncate">Waste Management Analytics</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">
            Total waste: {totalWaste.toFixed(0)} kg across all facilities
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-400">
                {recyclingRate.toFixed(1)}%
              </div>
              <div className="text-xs sm:text-sm text-green-600 dark:text-green-400">Recycling Rate</div>
              <div className="text-xs text-green-500 dark:text-green-500 mt-1">{recycledWaste.toFixed(0)} kg recycled</div>
            </div>
            <div className="p-3 sm:p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-orange-700 dark:text-orange-400">
                {totalWaste > 0 ? ((landfillWaste / totalWaste) * 100).toFixed(1) : 0}%
              </div>
              <div className="text-xs sm:text-sm text-orange-600 dark:text-orange-400">Landfill Waste</div>
              <div className="text-xs text-orange-500 dark:text-orange-500 mt-1">{landfillWaste.toFixed(0)} kg to landfill</div>
            </div>
            <div className="p-3 sm:p-4 bg-lime-50 dark:bg-lime-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-lime-700 dark:text-lime-400">
                {totalWaste > 0 ? ((compostedWaste / totalWaste) * 100).toFixed(1) : 0}%
              </div>
              <div className="text-xs sm:text-sm text-lime-600 dark:text-lime-400">Composting</div>
              <div className="text-xs text-lime-500 dark:text-lime-500 mt-1">{compostedWaste.toFixed(0)} kg composted</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carbon breakdown by scope */}
      <Card className="border-0 dark:bg-gray-800 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
            <div className="p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-800/60 rounded-lg sm:rounded-xl">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="truncate">Carbon Emissions by Scope</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">
            GHG Protocol scope breakdown — all periods
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3].map((scope) => {
              const scopeTotal = carbonData
                .filter((r) => r.scope === scope)
                .reduce((sum, r) => sum + (r.emissions_co2_tons ?? 0), 0);
              const scopePct = totalEmissions > 0 ? (scopeTotal / totalEmissions) * 100 : 0;
              const labels = ["Direct (fuel, fleet)", "Indirect (purchased energy)", "Value chain (travel, suppliers)"];
              const colors = [
                "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
                "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400",
                "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400",
              ];
              return (
                <div key={scope} className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${colors[scope - 1]}`}>
                  <div className="text-lg sm:text-2xl font-bold">{scopeTotal.toFixed(0)} t</div>
                  <div className="text-xs sm:text-sm font-semibold">Scope {scope}</div>
                  <div className="text-xs mt-1 opacity-80">{labels[scope - 1]}</div>
                  <div className="text-xs mt-1 opacity-70">{scopePct.toFixed(1)}% of total</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Energy mix */}
      <Card className="border-0 dark:bg-gray-800 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
            <div className="p-1.5 sm:p-2 bg-yellow-100 dark:bg-yellow-800/60 rounded-lg sm:rounded-xl">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="truncate">Energy Consumption Mix</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">
            Breakdown by energy type across all facilities
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {["renewable", "non-renewable"].map((type) => {
              const typeKwh = energyData
                .filter((r) => r.energy_type === type)
                .reduce((sum, r) => sum + (r.consumption_kwh ?? 0), 0);
              const typePct = totalKwh > 0 ? (typeKwh / totalKwh) * 100 : 0;
              return (
                <div
                  key={type}
                  className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                    type === "renewable"
                      ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-gray-50 dark:bg-gray-700/30 text-gray-700 dark:text-gray-400"
                  }`}
                >
                  <div className="text-lg sm:text-2xl font-bold">{typePct.toFixed(1)}%</div>
                  <div className="text-xs sm:text-sm font-semibold capitalize">{type}</div>
                  <div className="text-xs mt-1 opacity-70">{(typeKwh / 1000).toFixed(0)}k kWh</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
