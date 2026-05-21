import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useQuery } from "@tanstack/react-query";
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
import { Truck, Search, Star, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const COMPANY_ID = "8479cb95-2057-490d-813c-825e83d71890";

function useSuppliers() {
  return useQuery({
    queryKey: ["supply-chain-metrics", COMPANY_ID],
    queryFn: () =>
      fetch(`${API}/api/esg/suppliers?company_id=${COMPANY_ID}`)
        .then(r => r.json())
        .then(r => r.data ?? []),
  });
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score == null) return <span className="text-gray-400 text-sm">—</span>;
  const color =
    score >= 80 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" :
    score >= 60 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" :
    "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>{score}</span>;
}

function ScoreBar({ score, color }: { score: number | null; color: string }) {
  const pct = score ?? 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-8 text-right">{score ?? "—"}</span>
    </div>
  );
}

function certColor(status: string | null) {
  if (!status) return "text-gray-400";
  if (status.toLowerCase().includes("iso") || status.toLowerCase().includes("certified"))
    return "text-emerald-600 dark:text-emerald-400";
  if (status.toLowerCase().includes("pending")) return "text-yellow-600 dark:text-yellow-400";
  return "text-gray-600 dark:text-gray-400";
}

export default function SupplierPortal() {
  const { data: suppliers = [], isLoading } = useSuppliers();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filtered = suppliers.filter((s) => {
    const matchesSearch = s.supplier_name.toLowerCase().includes(search.toLowerCase()) ||
      (s.supplier_category ?? "").toLowerCase().includes(search.toLowerCase());
    const score = s.esg_score ?? 0;
    const matchesFilter =
      filter === "all" ||
      (filter === "high" && score >= 80) ||
      (filter === "medium" && score >= 60 && score < 80) ||
      (filter === "low" && score < 60);
    return matchesSearch && matchesFilter;
  });

  const avgScore = suppliers.length > 0
    ? Math.round(suppliers.reduce((s, r) => s + (r.esg_score ?? 0), 0) / suppliers.length)
    : 0;
  const highRisk = suppliers.filter(s => (s.esg_score ?? 0) < 60).length;
  const certified = suppliers.filter(s => s.certification_status && s.certification_status !== "None" && s.certification_status !== "Pending").length;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
          <DashboardHeader />
          <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Supplier ESG Portal</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monitor and manage your supply chain ESG performance</p>
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <Star className="w-8 h-8 text-orange-500" />
                    <div>
                      <div className="text-2xl font-black text-orange-700 dark:text-orange-300">{avgScore}</div>
                      <div className="text-xs text-orange-600 dark:text-orange-400">Avg ESG Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <div>
                      <div className="text-2xl font-black text-red-700 dark:text-red-300">{highRisk}</div>
                      <div className="text-xs text-red-600 dark:text-red-400">High Risk Suppliers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    <div>
                      <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{certified}</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">Certified Suppliers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="border-0 shadow-xl rounded-3xl dark:bg-gray-900 dark:border dark:border-gray-800">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-base font-bold dark:text-gray-100">Supplier Directory</CardTitle>
                <CardDescription className="dark:text-gray-400">{suppliers.length} suppliers tracked</CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search suppliers..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    {(["all", "high", "medium", "low"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                          filter === f
                            ? "bg-orange-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {f === "all" ? "All" : f === "high" ? "High (80+)" : f === "medium" ? "Medium (60-79)" : "Low (<60)"}
                      </button>
                    ))}
                  </div>
                </div>

                {isLoading ? (
                  <div className="space-y-3">
                    {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl animate-pulse" />)}
                  </div>
                ) : filtered.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No suppliers match your filter.</p>
                ) : (
                  <div className="space-y-3">
                    {filtered.map((supplier) => (
                      <div key={supplier.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="flex flex-wrap items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-gray-900 dark:text-gray-100">{supplier.supplier_name}</span>
                              {supplier.supplier_category && (
                                <span className="text-xs bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full">
                                  {supplier.supplier_category}
                                </span>
                              )}
                            </div>
                            {supplier.certification_status && (
                              <div className={`flex items-center gap-1 text-xs mt-1 ${certColor(supplier.certification_status)}`}>
                                <CheckCircle2 className="w-3 h-3" />
                                {supplier.certification_status}
                              </div>
                            )}
                            {supplier.last_audit_date && (
                              <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                                <Clock className="w-3 h-3" />
                                Last audit: {new Date(supplier.last_audit_date).toLocaleDateString()}
                                {supplier.next_audit_date && ` · Next: ${new Date(supplier.next_audit_date).toLocaleDateString()}`}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Overall</span>
                            <ScoreBadge score={supplier.esg_score} />
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Environmental</div>
                            <ScoreBar score={supplier.environmental_score} color="bg-emerald-500" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Social</div>
                            <ScoreBar score={supplier.social_score} color="bg-blue-500" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Governance</div>
                            <ScoreBar score={supplier.governance_score} color="bg-indigo-500" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
