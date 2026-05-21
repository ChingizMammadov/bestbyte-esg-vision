import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useQuery } from "@tanstack/react-query";
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const apiFetch = (path: string) => fetch(`${API}${path}`).then(r => r.json());
import { Database, CheckCircle2, AlertCircle, Clock, Plug, RefreshCw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const COMPANY_ID = "8479cb95-2057-490d-813c-825e83d71890";

function useDataSources() {
  return useQuery({
    queryKey: ["data-sources"],
    queryFn: () => Promise.resolve([]),
  });
}

function useDataSummary() {
  return useQuery({
    queryKey: ["data-summary", COMPANY_ID],
    queryFn: async () => {
      const [carbon, energy, waste, water, engagement, suppliers] = await Promise.all([
        apiFetch(`/api/esg/carbon?company_id=${COMPANY_ID}`),
        apiFetch(`/api/esg/energy?company_id=${COMPANY_ID}`),
        apiFetch(`/api/esg/waste?company_id=${COMPANY_ID}`),
        apiFetch(`/api/esg/water?company_id=${COMPANY_ID}`),
        apiFetch(`/api/esg/employees?company_id=${COMPANY_ID}`),
        apiFetch(`/api/esg/suppliers?company_id=${COMPANY_ID}`),
      ]);
      return {
        carbon: carbon.count ?? 0,
        energy: energy.count ?? 0,
        waste: waste.count ?? 0,
        water: water.count ?? 0,
        engagement: engagement.count ?? 0,
        suppliers: suppliers.count ?? 0,
      };
    },
  });
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  manual: <Upload className="w-4 h-4" />,
  api: <Plug className="w-4 h-4" />,
  file_upload: <Upload className="w-4 h-4" />,
  sensor: <RefreshCw className="w-4 h-4" />,
};

const TYPE_COLORS: Record<string, string> = {
  manual: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  api: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  file_upload: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  sensor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

export default function DataHub() {
  const { data: sources = [], isLoading: sourcesLoading } = useDataSources();
  const { data: summary, isLoading: summaryLoading } = useDataSummary();
  const [activeTab, setActiveTab] = useState<"overview" | "sources">("overview");

    const DATA_TABLES = [
    { label: "Carbon Footprint Records", count: summary?.carbon, valueClass: "text-emerald-700 dark:text-emerald-300", iconClass: "text-emerald-500", description: "Scope 1, 2 & 3 emissions data" },
    { label: "Energy Consumption Records", count: summary?.energy, valueClass: "text-yellow-700 dark:text-yellow-300", iconClass: "text-yellow-500", description: "Facility-level energy use" },
    { label: "Waste Management Records", count: summary?.waste, valueClass: "text-gray-700 dark:text-gray-300", iconClass: "text-gray-500", description: "Waste disposal & recycling" },
    { label: "Water Usage Records", count: summary?.water, valueClass: "text-blue-700 dark:text-blue-300", iconClass: "text-blue-500", description: "Potable & process water" },
    { label: "Employee Engagement Metrics", count: summary?.engagement, valueClass: "text-purple-700 dark:text-purple-300", iconClass: "text-purple-500", description: "Social KPIs & diversity" },
    { label: "Supplier ESG Records", count: summary?.suppliers, valueClass: "text-orange-700 dark:text-orange-300", iconClass: "text-orange-500", description: "Supply chain scores" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
          <DashboardHeader />
          <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Data Hub</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your ESG data sources and records</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
              {(["overview", "sources"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab === "overview" ? "Data Overview" : "Data Sources"}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DATA_TABLES.map(({ label, count, valueClass, iconClass, description }) => (
                    <Card key={label} className="border-0 shadow-lg rounded-2xl dark:bg-gray-900 dark:border dark:border-gray-800">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className={`text-2xl font-black ${valueClass}`}>
                              {summaryLoading ? "…" : (count ?? 0).toLocaleString()}
                            </div>
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-0.5">{label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</div>
                          </div>
                          <CheckCircle2 className={`w-5 h-5 ${iconClass} shrink-0 mt-0.5`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800">
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-base font-bold dark:text-gray-100">Upload New Data</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Upload ESG data files (.xlsx, .csv) to import into the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
                      <Upload className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Drag & drop files here, or</p>
                      <Button variant="outline" className="mt-3 rounded-xl text-sm">
                        Browse files
                      </Button>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Supports .xlsx, .csv, .json — max 25 MB</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "sources" && (
              <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-base font-bold dark:text-gray-100">Connected Data Sources</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    {sources.length} data sources configured
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-3">
                  {sourcesLoading ? (
                    <div className="space-y-3">
                      {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl animate-pulse" />)}
                    </div>
                  ) : sources.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No data sources configured yet.</p>
                  ) : (
                    sources.map((source) => (
                      <div key={source.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className={`p-2 rounded-lg ${TYPE_COLORS[source.type] ?? "bg-gray-100"}`}>
                          {TYPE_ICONS[source.type] ?? <Database className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">{source.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[source.type] ?? ""}`}>
                              {source.type.replace("_", " ")}
                            </span>
                            {source.is_active ? (
                              <span className="text-xs flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-3 h-3" /> Active
                              </span>
                            ) : (
                              <span className="text-xs flex items-center gap-1 text-gray-400">
                                <AlertCircle className="w-3 h-3" /> Inactive
                              </span>
                            )}
                          </div>
                          {source.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{source.description}</p>
                          )}
                          {source.last_sync && (
                            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                              <Clock className="w-3 h-3" />
                              Last sync: {new Date(source.last_sync).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl text-xs shrink-0">
                          <RefreshCw className="w-3 h-3 mr-1" /> Sync
                        </Button>
                      </div>
                    ))
                  )}

                  <Button className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm">
                    <Plug className="w-4 h-4 mr-2" />
                    Connect New Source
                  </Button>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
