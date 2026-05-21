import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, GraduationCap, ShieldCheck, HandHeart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const COMPANY_ID = "8479cb95-2057-490d-813c-825e83d71890";

function useEmployeeEngagement() {
  return useQuery({
    queryKey: ["employee-engagement", COMPANY_ID],
    queryFn: () =>
      fetch(`${API}/api/esg/employees?company_id=${COMPANY_ID}`)
        .then(r => r.json()).then(r => r.data ?? []),
  });
}

function getMetric(data: any[], name: string) {
  return data.find((r) => r.metric_name === name);
}

export default function SocialAnalytics() {
  const { data: engagementData = [], isLoading } = useEmployeeEngagement();

  const diversityRow = getMetric(engagementData, "Female Representation");
  const satisfactionRow = getMetric(engagementData, "Employee Satisfaction Score");
  const trainingRow = getMetric(engagementData, "Training Hours per Employee");
  const safetyRow = getMetric(engagementData, "Safety Incidents");
  const volunteerRow = getMetric(engagementData, "Volunteer Hours");
  const communityRow = getMetric(engagementData, "Community Programs");
  const turnoverRow = getMetric(engagementData, "Employee Turnover Rate");

  const diversityPct = diversityRow?.value ?? 0;
  const satisfaction = satisfactionRow?.value ?? 0;
  const satisfactionTarget = satisfactionRow?.target_value ?? 5;
  const trainingHours = trainingRow?.value ?? 0;
  const trainingTarget = trainingRow?.target_value ?? 0;
  const trainingChange =
    trainingTarget > 0 ? ((trainingHours - trainingTarget) / trainingTarget) * 100 : 0;
  const safetyIncidents = safetyRow?.value ?? 0;
  const volunteerHours = volunteerRow?.value ?? 0;
  const communityPrograms = communityRow?.value ?? 0;
  const turnoverRate = turnoverRow?.value ?? 0;

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
        {/* Workforce Diversity */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-blue-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-blue-200">
              <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg sm:rounded-xl">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="truncate">Workforce Diversity</span>
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300 font-medium text-xs sm:text-sm">
              Gender representation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-blue-700 dark:text-blue-300 mb-2">
              {diversityPct}%
            </div>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 font-medium bg-blue-100 dark:bg-blue-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              Female representation
            </p>
            {turnoverRow && (
              <p className="text-xs text-blue-500 dark:text-blue-400 mt-2">
                Turnover rate: {turnoverRate}%
              </p>
            )}
          </CardContent>
        </Card>

        {/* Employee Wellbeing */}
        <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-rose-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 dark:from-rose-500/5 dark:to-pink-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-rose-200">
              <div className="p-1.5 sm:p-2 bg-rose-100 dark:bg-rose-900/40 rounded-lg sm:rounded-xl">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <span className="truncate">Employee Wellbeing</span>
            </CardTitle>
            <CardDescription className="text-rose-700 dark:text-rose-300 font-medium text-xs sm:text-sm">
              Satisfaction score
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-rose-700 dark:text-rose-300 mb-2">
              {satisfaction}/{satisfactionTarget}
            </div>
            <p className="text-xs sm:text-sm text-rose-600 dark:text-rose-300 font-medium bg-rose-100 dark:bg-rose-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              Average satisfaction rating
            </p>
            {safetyRow && (
              <p className="text-xs text-rose-500 dark:text-rose-400 mt-2">
                Safety incidents: {safetyIncidents}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Training & Development */}
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40 border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl dark:border dark:border-emerald-800/30 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-500/5 dark:to-green-500/5 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-emerald-200">
              <div className="p-1.5 sm:p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg sm:rounded-xl">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="truncate">Training & Development</span>
            </CardTitle>
            <CardDescription className="text-emerald-700 dark:text-emerald-300 font-medium text-xs sm:text-sm">
              Learning metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-700 dark:text-emerald-300 mb-2">
              {trainingHours}h
            </div>
            <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 font-medium bg-emerald-100 dark:bg-emerald-900/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              {trainingChange >= 0
                ? `+${trainingChange.toFixed(0)}% above target`
                : `${trainingChange.toFixed(0)}% below target`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Community Impact */}
      <Card className="border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
            <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl">
              <HandHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <span className="truncate">Community Impact</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">
            Overview of community engagement and social initiatives
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-purple-700 dark:text-purple-300">
                {getMetric(engagementData, "Charitable Donations")?.value
                  ? `$${(getMetric(engagementData, "Charitable Donations")!.value / 1_000_000).toFixed(1)}M`
                  : "—"}
              </div>
              <div className="text-xs sm:text-sm text-purple-600 dark:text-purple-300">Charitable Donations</div>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-blue-700 dark:text-blue-300">
                {volunteerHours > 0 ? volunteerHours.toLocaleString() : "—"}
              </div>
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-300">Volunteer Hours</div>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/30 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300">
                {communityPrograms > 0 ? communityPrograms : "—"}
              </div>
              <div className="text-xs sm:text-sm text-green-600 dark:text-green-300">Community Programs</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety */}
      <Card className="border-0 shadow-xl rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 pb-3 sm:pb-4 p-3 sm:p-4 md:p-5">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold dark:text-gray-100">
            <div className="p-1.5 sm:p-2 bg-amber-100 dark:bg-amber-800/60 rounded-lg sm:rounded-xl">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="truncate">Workforce Safety & Wellbeing</span>
          </CardTitle>
          <CardDescription className="dark:text-gray-400 text-xs sm:text-sm">
            All tracked social engagement metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {engagementData.map((row) => (
              <div key={row.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                  {row.value}{row.unit ? ` ${row.unit}` : ""}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{row.metric_name}</div>
                {row.department && (
                  <div className="text-xs text-slate-400 dark:text-slate-500 truncate">{row.department}</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
