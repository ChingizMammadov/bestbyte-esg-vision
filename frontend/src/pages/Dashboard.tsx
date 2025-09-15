
import { AppSidebar } from "@/components/AppSidebar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Footer } from "@/components/Footer";
import { Alerts } from "@/components/dashboard/Alerts";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FocusRadarChart } from "@/components/dashboard/charts/FocusRadarChart";
import { MetricsPieChart } from "@/components/dashboard/charts/MetricsPieChart";
import { TrendsLineChart } from "@/components/dashboard/charts/TrendsLineChart";
import { ESGScoreBreakdownChart } from "@/components/dashboard/charts/ESGScoreBreakdownChart";
import { FilterControls } from "@/components/dashboard/FilterControls";
import { DataCards } from "@/components/dashboard/DataCards";
import { TabNavigation } from "@/components/dashboard/TabNavigation";
import { CompanyOverview } from "@/components/dashboard/CompanyOverview";
import { EsgTargets } from "@/components/dashboard/EsgTargets";
import { SeedDataButton } from "@/components/SeedDataButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { motion, easeOut } from "framer-motion";
import { useState } from "react";
import { responsiveGridLayouts, responsivePadding } from "@/utils/responsiveUtils";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easeOut },
};

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedRegion, setSelectedRegion] = useState("global");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-700 font-sans transition-all">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-x-hidden">
          <DashboardHeader />
          <main className="flex-1 min-h-0 p-2 sm:p-3 md:p-6 pb-20 md:pb-6 space-y-3 sm:space-y-4 md:space-y-6">
            {/* Filter Controls with Seed Button */}
            <motion.div {...cardMotion} className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-xl sm:rounded-2xl p-3 md:p-4 lg:p-6 border border-slate-200/60 dark:border-gray-700/60">
              <div className="flex flex-col gap-3">
                <FilterControls 
                  selectedPeriod={selectedPeriod}
                  setSelectedPeriod={setSelectedPeriod}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                />
                <div className="w-full">
                  <SeedDataButton />
                </div>
              </div>
            </motion.div>

            {/* Company Overview and ESG Targets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <motion.div {...cardMotion}>
                <CompanyOverview />
              </motion.div>
              <motion.div {...cardMotion}>
                <EsgTargets />
              </motion.div>
            </div>

            {/* Real-time Data Cards */}
            <motion.div {...cardMotion}>
              <DataCards />
            </motion.div>

            {/* ESG Score Breakdown at the top */}
            <motion.div {...cardMotion}>
              <ESGScoreBreakdownChart />
            </motion.div>

            {/* Detailed ESG Metrics Tabs */}
            <motion.div {...cardMotion}>
              <TabNavigation />
            </motion.div>

            {/* Main dashboard charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <motion.div {...cardMotion}>
                <MetricsPieChart />
              </motion.div>
              <motion.div {...cardMotion}>
                <TrendsLineChart />
              </motion.div>
              <motion.div {...cardMotion} className="sm:col-span-2 xl:col-span-1">
                <FocusRadarChart />
              </motion.div>
            </div>

            {/* Activity Feed and Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <motion.div {...cardMotion} className="md:col-span-2">
                <ActivityFeed />
              </motion.div>
              <motion.div {...cardMotion}>
                <Alerts />
              </motion.div>
            </div>
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      </div>
    </SidebarProvider>
  );
}
