
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
import { SeedDataButton } from "@/components/SeedDataButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { motion, easeOut } from "framer-motion";
import { useState } from "react";

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
      <div className="flex min-h-screen w-full bg-gradient-to-tr from-[#0f2027] via-[#23638B]/40 to-[#aed9da]/10 font-sans transition-all">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <DashboardHeader />
          <main className="flex-1 min-h-0 p-3 md:p-6 pb-20 md:pb-6">
            {/* Filter Controls with Seed Button */}
            <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                <FilterControls 
                  selectedPeriod={selectedPeriod}
                  setSelectedPeriod={setSelectedPeriod}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                />
                <div className="w-full md:w-auto">
                  <SeedDataButton />
                </div>
              </div>
            </div>

            {/* Real-time Data Cards */}
            <div className="mb-4 md:mb-6">
              <DataCards />
            </div>

            {/* ESG Score Breakdown at the top */}
            <motion.div {...cardMotion} className="mb-4 md:mb-6">
              <ESGScoreBreakdownChart />
            </motion.div>

            {/* Detailed ESG Metrics Tabs */}
            <motion.div {...cardMotion} className="mb-4 md:mb-6">
              <TabNavigation />
            </motion.div>

            {/* Main dashboard charts */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
              <motion.div {...cardMotion}>
                <MetricsPieChart />
              </motion.div>
              <motion.div {...cardMotion}>
                <TrendsLineChart />
              </motion.div>
              <motion.div {...cardMotion}>
                <FocusRadarChart />
              </motion.div>
            </div>

            {/* Activity Feed and Alerts */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
              <motion.div {...cardMotion} className="lg:col-span-2">
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
