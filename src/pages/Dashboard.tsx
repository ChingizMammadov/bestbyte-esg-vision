
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

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
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Navbar />
      <main className="flex-1 container py-12">
        <section className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Side Menu */}
          <aside className="md:col-span-1 hidden md:block">
            <div className="bg-white border rounded-2xl shadow px-6 py-8 flex flex-col gap-4">
              <span className="text-xl font-bold text-primary mb-2">Menu</span>
              <a className="text-gray-700 hover:text-primary font-medium" href="/dashboard">Dashboard</a>
              <a className="text-gray-700 hover:text-primary font-medium" href="/reports">Reports</a>
              <a className="text-gray-700 hover:text-primary font-medium" href="/carbon-calculator">Carbon Calculator</a>
              <a className="text-gray-700 hover:text-primary font-medium" href="/analytics">ESG Analytics</a>
              <a className="text-gray-700 hover:text-primary font-medium" href="/settings">Settings</a>
            </div>
          </aside>
          {/* Main Content */}
          <section className="md:col-span-4 flex flex-col gap-8">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
              <div className="text-2xl font-bold tracking-tight text-gray-900">My ESG Dashboard</div>
              <div className="flex gap-4 items-center">
                <span className="font-medium text-gray-700">Acme Corp</span>
                <span className="text-gray-400 text-xs">|</span>
                <span className="text-sm text-gray-500">Logged in as <span className="font-semibold">jane@acme.com</span></span>
                <button className="ml-3 bg-gray-100 border rounded px-4 py-2 hover:bg-primary hover:text-white font-semibold transition">Log Out</button>
              </div>
            </div>
            {/* Key Metrics */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 bg-white border rounded-2xl px-8 py-6 shadow flex flex-col items-center">
                <span className="font-bold text-gray-700 mb-2">Carbon / Water / Energy</span>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={mockMetrics}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    >
                      {mockMetrics.map((e, idx) => (
                        <Cell key={e.name} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 bg-white border rounded-2xl px-8 py-6 shadow">
                <span className="font-bold text-gray-700 mb-2 block">Yearly ESG Trends</span>
                <ResponsiveContainer width="100%" height={180}>
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
              <div className="flex-1 bg-white border rounded-2xl px-8 py-6 shadow">
                <span className="font-bold text-gray-700 mb-2 block">ESG Focus Radar</span>
                <ResponsiveContainer width="100%" height={180}>
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
            <div className="flex flex-col md:flex-row gap-8">
              <div className="bg-white border rounded-2xl px-8 py-6 shadow flex-1">
                <span className="font-bold text-gray-700 mb-3 block">Recent Activity</span>
                <ul className="space-y-2">
                  {recentActivity.map((a, i) => (
                    <li key={i} className="text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full inline-block" />
                      <span className="font-medium">{a.activity}</span>
                      <span className="ml-auto text-xs text-gray-400">{a.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border rounded-2xl px-8 py-6 shadow w-full md:w-60">
                <span className="font-bold text-gray-700 mb-3 block">Alerts</span>
                <ul className="space-y-2">
                  {alerts.map((a, i) => (
                    <li key={i} className={`text-sm px-3 py-2 rounded ${a.level === "warning" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-700"}`}>
                      {a.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </section>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
