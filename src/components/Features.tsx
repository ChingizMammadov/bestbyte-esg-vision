
import { BarChart2, FileText, CalendarCheck, MessageSquare } from "lucide-react";
import React from "react";

const features = [
  {
    icon: <FileText className="w-8 h-8 text-teal-700" />,
    name: "Real-Time ESG Reporting",
    desc: "On-demand, compliant ESG reports to boost your reputation, satisfy regulation and attract investors.",
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-emerald-600" />,
    name: "Automated Carbon Calculators",
    desc: "Instantly compute your carbon footprint—energy, transport, waste, and more—with interactive tools.",
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-blue-700" />,
    name: "Predictive Analytics",
    desc: "Forecast emission trends and compliance risks with AI-powered models built for your business.",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    name: "AI-Driven Insights",
    desc: "Actionable recommendations to reduce your footprint and supercharge your ESG progress.",
  },
];

export const Features = () => (
  <section id="features" className="py-24 bg-white border-b border-gray-100">
    <div className="container text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
        {features.map(f => (
          <div key={f.name} className="flex flex-col items-center bg-gray-50 p-8 rounded-xl shadow group hover:shadow-xl transition">
            {f.icon}
            <h4 className="mt-6 text-xl font-semibold mb-2">{f.name}</h4>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
