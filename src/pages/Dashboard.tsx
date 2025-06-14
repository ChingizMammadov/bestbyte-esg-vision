import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Menu, X } from "lucide-react";

const mockMetrics = [
  { name: "Carbon", value: 60, color: "#20716A" },
  { name: "Water", value: 25, color: "#42B883" },
  { name: "Energy", value: 15, color: "#34d399" },
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
  { time: "Today", activity: "Uploaded ESG Q2 Report" },
  { time: "Yesterday", activity: "System: Carbon footprint reduced by 10%" },
  { time: "This Week", activity: "New Water Usage report generated" },
];

const alerts = [
  { level: "warning", message: "ESG Report deadline in 7 days." },
  { level: "info", message: "Your carbon data is trending downward!" },
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6 md:py-12">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden mb-4 p-2 rounded-lg bg-white border shadow-sm hover:bg-gray-50 transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Sidebar */}
            <aside className={`md:col-span-1 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white border rounded-2xl shadow px-4 md:px-6 py-6 md:py-8 flex flex-col gap-3 md:gap-4">
                <span className="text-lg md:text-xl font-bold text-primary mb-2">Menu</span>
                <a className="text-gray-700 hover:text-primary font-medium text-sm md:text-base py-1" href="/dashboard">Dashboard</a>
                <a className="text-gray-700 hover:text-primary font-medium text-sm md:text-base py-1" href="/reports">Reports</a>
                <a className="text-gray-700 hover:text-primary font-medium text-sm md:text-base py-1" href="/carbon-calculator">Carbon Calculator</a>
                <a className="text-gray-700 hover:text-primary font-medium text-sm md:text-base py-1" href="/analytics">ESG Analytics</a>
                <a className="text-gray-700 hover:text-primary font-medium text-sm md:text-base py-1" href="/settings">Settings</a>
              </div>
            </aside>

            {/* Main Content */}
            <section className="md:col-span-4 flex flex-col gap-6 md:gap-8">
              {/* Top Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2 gap-4">
                <div className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">My ESG Dashboard</div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center text-sm">
                  <span className="font-medium text-gray-700">Acme Corp</span>
                  <span className="text-gray-400 text-xs hidden sm:inline">|</span>
                  <span className="text-gray-500">Logged in as <span className="font-semibold">jane@acme.com</span></span>
                  <button className="bg-gray-100 border rounded px-3 md:px-4 py-2 hover:bg-primary hover:text-white font-semibold transition text-sm">Log Out</button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <div className="bg-white border rounded-2xl px-4 md:px-8 py-4 md:py-6 shadow flex flex-col items-center">
                  <span className="font-bold text-gray-700 mb-2 text-sm md:text-base">Carbon / Water / Energy</span>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={mockMetrics}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        label
                      >
                        {mockMetrics.map((e, idx) => (
                          <Cell key={e.name} fill={e.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white border rounded-2xl px-4 md:px-8 py-4 md:py-6 shadow">
                  <span className="font-bold text-gray-700 mb-2 block text-sm md:text-base">Yearly ESG Trends</span>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={lineData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Line type="monotone" dataKey="Carbon" stroke="#20716A" strokeWidth={2} />
                      <Line type="monotone" dataKey="Water" stroke="#42B883" strokeWidth={2} />
                      <Line type="monotone" dataKey="Energy" stroke="#34d399" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white border rounded-2xl px-4 md:px-8 py-4 md:py-6 shadow">
                  <span className="font-bold text-gray-700 mb-2 block text-sm md:text-base">ESG Focus Radar</span>
                  <ResponsiveContainer width="100%" height={150}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="A" dataKey="A" stroke="#20716A" fill="#20716A" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity and Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <div className="lg:col-span-2 bg-white border rounded-2xl px-4 md:px-8 py-4 md:py-6 shadow">
                  <span className="font-bold text-gray-700 mb-3 block text-sm md:text-base">Recent Activity</span>
                  <ul className="space-y-2">
                    {recentActivity.map((a, i) => (
                      <li key={i} className="text-gray-600 flex items-start gap-2 text-sm md:text-base">
                        <span className="w-2 h-2 bg-primary rounded-full inline-block mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <span className="font-medium block">{a.activity}</span>
                          <span className="text-xs text-gray-400">{a.time}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border rounded-2xl px-4 md:px-8 py-4 md:py-6 shadow">
                  <span className="font-bold text-gray-700 mb-3 block text-sm md:text-base">Alerts</span>
                  <ul className="space-y-2">
                    {alerts.map((a, i) => (
                      <li key={i} className={`text-xs md:text-sm px-3 py-2 rounded ${a.level === "warning" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-700"}`}>
                        {a.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
