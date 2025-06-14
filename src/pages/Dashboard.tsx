import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { User, LogOut, Info, CalendarDays, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockMetrics = [
  { name: "Carbon", value: 60, color: "url(#carbonGradient)" },
  { name: "Water", value: 25, color: "url(#waterGradient)" },
  { name: "Energy", value: 15, color: "url(#energyGradient)" },
];
const lineData = [
  { name: "Jan", Carbon: 120, Water: 80, Energy: 55 },
  { name: "Feb", Carbon: 105, Water: 60, Energy: 65 },
  { name: "Mar", Carbon: 102, Water: 80, Energy: 70 },
  { name: "Apr", Carbon: 97, Water: 70, Energy: 80 },
  { name: "May", Carbon: 91, Water: 60, Energy: 105 },
];
const radarData = [
  { subject: "Carbon", A: 60, fullMark: 100 },
  { subject: "Water", A: 80, fullMark: 100 },
  { subject: "Energy", A: 95, fullMark: 100 },
];
const recentActivity = [
  { time: "Today", activity: "Uploaded ESG Q2 Report", icon: Info },
  { time: "Yesterday", activity: "System: Carbon footprint reduced by 10%", icon: TrendingDown },
  { time: "This Week", activity: "New Water Usage report generated", icon: CalendarDays },
];
const alerts = [
  { level: "warning", message: "ESG Report deadline in 7 days.", color: "bg-yellow-100 text-yellow-800", icon: Info },
  { level: "info", message: "Your carbon data is trending downward!", color: "bg-green-100 text-green-900", icon: TrendingDown },
];

const cardMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
  transition: { type: "spring" as const, stiffness: 90, damping: 18 },
};

export default function Dashboard() {
  const [displayedAlerts, setDisplayedAlerts] = useState(alerts);

  const handleDismissAlert = (idx: number) => {
    setDisplayedAlerts(alerts => alerts.filter((_, i) => i !== idx));
  };

  // Gradients for charts
  const PieGradients = (
    <defs>
      <linearGradient id="carbonGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#b6c4bb" />
        <stop offset="100%" stopColor="#707070" />
      </linearGradient>
      <linearGradient id="waterGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="energyGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6ee7b7" />
        <stop offset="100%" stopColor="#065f46" />
      </linearGradient>
    </defs>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-tr from-[#0f2027] via-[#23638B]/40 to-[#aed9da]/10 font-sans transition-all">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Navbar */}
          <Navbar />

          <main className="flex-1 min-h-0">
            {/* Top Bar */}
            <div className="w-full py-5 px-2 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between bg-gradient-to-r from-background/70 to-background/10 border-b border-white/10">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight drop-shadow-xl">My ESG Dashboard</h1>
                <span className="text-xs md:text-sm font-medium text-primary/70">Deep insights & analytics for Acme Corp</span>
              </div>
              <div className="mt-5 md:mt-0 flex flex-row gap-2 items-center bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2 rounded-xl shadow hover:shadow-lg transition group">
                <User className="w-5 h-5 text-primary/70" />
                <div className="text-gray-700 text-xs md:text-base font-medium">
                  <span className="hidden sm:inline">Logged in as </span>
                  <span className="font-bold text-primary">jane@acme.com</span>
                </div>
                <SidebarTrigger className="hidden md:inline-flex ml-2" />
                <button className="flex gap-1 items-center bg-white border border-gray-200 rounded px-3 py-2 hover:bg-primary/90 hover:text-white ml-3 font-semibold text-xs md:text-sm transition active:scale-95">
                  <LogOut size={18} className="mr-1" />
                  Log Out
                </button>
              </div>
            </div>

            {/* DASHBOARD CARDS */}
            <div className="w-full px-2 md:px-8 py-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                <motion.div {...cardMotion} className="bg-white/95 border rounded-2xl px-5 py-6 shadow-xl flex flex-col items-center gap-2 dashboard-card relative hover-scale-hover">
                  <span className="font-bold text-gray-700 mb-2 text-base md:text-lg">Carbon / Water / Energy</span>
                  <ResponsiveContainer width="100%" height={170}>
                    <PieChart>
                      {PieGradients}
                      <Pie
                        dataKey="value"
                        data={mockMetrics}
                        cx="50%"
                        cy="50%"
                        outerRadius={65}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                          const RADIAN = Math.PI / 180;
                          const radius = 70;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          const metric = mockMetrics[index];
                          return (
                            <text x={x} y={y} fill={metric.name === "Carbon" ? "#707070" : metric.name === "Water" ? "#0284c7" : "#065f46"} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" className="font-bold text-xs">
                              {metric.name}
                            </text>
                          );
                        }}
                        isAnimationActive={true}
                        animationDuration={700}
                      >
                        {mockMetrics.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        cursor={{ fill: "#d1fae5", opacity: 0.4 }}
                        formatter={(value: any, name: string) => [`${value} units`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-4 right-4 bg-gradient-to-tr from-primary via-primary/80 to-[#aed9da] w-8 h-8 rounded-full blur-xl opacity-20 pointer-events-none" />
                </motion.div>

                <motion.div {...cardMotion} className="bg-white/95 border rounded-2xl px-5 py-6 shadow-xl dashboard-card">
                  <span className="font-bold text-gray-700 mb-2 block text-base md:text-lg">Yearly ESG Trends</span>
                  <ResponsiveContainer width="100%" height={170}>
                    <LineChart data={lineData}>
                      <defs>
                        <linearGradient id="carbonLine" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#b6c4bb" />
                          <stop offset="100%" stopColor="#707070" />
                        </linearGradient>
                        <linearGradient id="waterLine" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#82caff" />
                          <stop offset="100%" stopColor="#0284c7" />
                        </linearGradient>
                        <linearGradient id="energyLine" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6ee7b7" />
                          <stop offset="100%" stopColor="#065f46" />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} />
                      <YAxis stroke="#a3a3a3" fontSize={12} />
                      <ChartTooltip
                        contentStyle={{ background: "#f0fdfa", borderColor: "#a7f3d0", borderRadius: 8 }}
                        formatter={(value: any, name: string) => [`${value} units`, name]}
                      />
                      <Line type="monotone" dataKey="Carbon" stroke="url(#carbonLine)" strokeWidth={2.5} dot={{ r: 5, fill: "#b6c4bb" }} activeDot={{ r: 7, fill: "#707070" }} isAnimationActive={true} animationDuration={700} />
                      <Line type="monotone" dataKey="Water" stroke="url(#waterLine)" strokeWidth={2.5} dot={{ r: 5, fill: "#0284c7" }} activeDot={{ r: 7, fill: "#38bdf8" }} isAnimationActive={true} animationDuration={700} />
                      <Line type="monotone" dataKey="Energy" stroke="url(#energyLine)" strokeWidth={2.5} dot={{ r: 5, fill: "#6ee7b7" }} activeDot={{ r: 7, fill: "#065f46" }} isAnimationActive={true} animationDuration={700} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div {...cardMotion} className="bg-white/95 border rounded-2xl px-5 py-6 shadow-xl dashboard-card">
                  <span className="font-bold text-gray-700 mb-2 block text-base md:text-lg">ESG Focus Radar</span>
                  <ResponsiveContainer width="100%" height={170}>
                    <RadarChart data={radarData}>
                      <defs>
                        <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.0} />
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.6} />
                        </radialGradient>
                      </defs>
                      <PolarGrid stroke="#a3a3a3" strokeDasharray="6 6" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#155e75", fontWeight: 600, fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="A" dataKey="A" stroke="#22d3ee" strokeWidth={3} fill="url(#radarGradient)" fillOpacity={0.65} />
                      <ChartTooltip
                        formatter={(value: any, name: string) => [`${value} units`, name]}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ACTIVITY + ALERTS */}
            <div className="w-full px-2 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <motion.div {...cardMotion} className="lg:col-span-2 bg-gradient-to-br from-[#effffd]/60 to-[#e9ecef]/45 border rounded-2xl px-5 py-6 shadow-xl">
                <span className="font-bold text-gray-700 mb-3 block text-base md:text-lg">Recent Activity</span>
                <ul className="space-y-2">
                  {recentActivity.map((a, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm md:text-base group transition">
                      <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-md transition group-hover:bg-primary/20">
                        <a.icon className="w-4 h-4 text-primary/80" />
                      </div>
                      <div className="flex-1 text-gray-700">{a.activity}</div>
                      <div className="flex items-center text-xs text-gray-400 gap-1"><CalendarDays className="w-3 h-3" />{a.time}</div>
                    </li>
                  ))}
                </ul>
              </motion.div>
              {/* Alerts */}
              <motion.div {...cardMotion} className="bg-gradient-to-br from-yellow-50/70 to-white/80 border rounded-2xl px-5 py-6 shadow-xl">
                <span className="font-bold text-gray-700 mb-3 block text-base md:text-lg">Alerts</span>
                <ul className="space-y-3">
                  <AnimatePresence>
                    {displayedAlerts.map((a, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: 120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 120, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 70, damping: 18 }}
                        className={`${a.color} px-3 py-2 rounded flex items-center gap-2 shadow group hover:scale-105 cursor-pointer transition`}
                        onClick={() => {
                          if (a.level === "info") {
                            window.location.href = "/carbon-calculator";
                          }
                        }}
                      >
                        <a.icon className="w-5 h-5 mr-1 flex-shrink-0" />
                        <span className="flex-1 font-semibold">{a.message}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDismissAlert(i);
                          }}
                          className="ml-2 text-xs px-2 py-1 rounded bg-white/30 hover:bg-white/70 text-gray-600 font-semibold transition-all"
                        >
                          Dismiss
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </motion.div>
            </div>
          </main>
          {/* Responsive Footer update */}
          <footer className="w-full bg-gradient-to-tr from-white/70 to-gray-50/80 border-t border-gray-200 px-3 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-2 z-10 relative">
            <div className="text-base font-semibold text-[#25624A] whitespace-nowrap">
              <span className="font-bold text-green-700">BestByte</span> <span className="text-gray-400 font-normal">© 2025 • All rights reserved.</span>
            </div>
            <div className="flex flex-row flex-wrap justify-center md:justify-end gap-6 text-[15px] font-medium text-gray-500">
              <a href="/contact" className="hover:text-primary transition">Contact</a>
              <a href="/privacy" className="hover:text-primary transition">Privacy</a>
              <a href="/terms" className="hover:text-primary transition">Terms</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Twitter</a>
              <a href="https://lovable.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Lovable</a>
            </div>
          </footer>
          {/* Chatbot Widget will be placed above the footer */}
          {/* >>> Make sure to provide bottom margin here <<< */}
          <div className="pointer-events-none">
            <div className="pointer-events-auto">
              <ChatbotWidget />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
