
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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
  const [apiData, setApiData] = useState(null);

  const handleApiData = (data) => {
    setApiData(data);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 font-sans transition-all">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <DashboardHeader />
          <main className="flex-1 min-h-0 p-3 md:p-6 pb-20 md:pb-6 space-y-6">
            {/* Filter Controls with Seed Button */}
            <motion.div {...cardMotion} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-slate-200/60">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                <FilterControls 
                  selectedPeriod={selectedPeriod}
                  setSelectedPeriod={setSelectedPeriod}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                />
                <div className="w-full md:w-auto">
                  <SeedDataButton onUploadSuccess={handleApiData} />
                </div>
              </div>
            </motion.div>

            {/* Company Overview and ESG Targets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div {...cardMotion}>
                <CompanyOverview />
              </motion.div>
              <motion.div {...cardMotion}>
                <EsgTargets />
              </motion.div>
            </div>

            {/* Real-time Data Cards */}
            <motion.div {...cardMotion}>
              <DataCards data={apiData} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
