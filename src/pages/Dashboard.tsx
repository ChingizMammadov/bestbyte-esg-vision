
import { AppSidebar } from "@/components/AppSidebar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Footer } from "@/components/Footer";
import { Alerts } from "@/components/dashboard/Alerts";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FocusRadarChart } from "@/components/dashboard/charts/FocusRadarChart";
import { MetricsPieChart } from "@/components/dashboard/charts/MetricsPieChart";
import { TrendsLineChart } from "@/components/dashboard/charts/TrendsLineChart";
import { SidebarProvider } from "@/components/ui/sidebar";
import { motion, easeOut } from "framer-motion"; // <-- Import easeOut

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easeOut }, // <-- Use imported easeOut
};

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-tr from-[#0f2027] via-[#23638B]/40 to-[#aed9da]/10 font-sans transition-all">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <DashboardHeader />
          <main className="flex-1 min-h-0 p-4 md:p-6">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
