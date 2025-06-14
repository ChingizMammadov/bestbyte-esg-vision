
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React, { useState } from "react";

const inputDefs = [
  { label: "Electricity Usage (kWh/month)", key: "electricity", factor: 0.0007 },
  { label: "Gas Consumption (therms/month)", key: "gas", factor: 0.0053 },
  { label: "Company Vehicles (miles/month)", key: "vehicles", factor: 0.0004 },
  { label: "Flight Travel (miles/month)", key: "flights", factor: 0.00025 },
  { label: "Waste (tons/month)", key: "waste", factor: 0.4 },
];

export default function CarbonCalculator() {
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const totalEmission = inputDefs.reduce(
    (sum, field) =>
      sum + (Number(inputs[field.key]) || 0) * field.factor,
    0
  );

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [key]: value === "" ? 0 : Math.max(0, Number(value))
    }));
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="container py-16 flex flex-col md:flex-row gap-16 items-start">
          <div className="flex-1 max-w-lg">
            <h1 className="text-3xl font-bold mb-8">Interactive Carbon Calculator</h1>
            <form className="space-y-6">
              {inputDefs.map((f) => (
                <div key={f.key} className="flex flex-col gap-2">
                  <label className="font-semibold">{f.label}</label>
                  <input
                    className="px-4 py-3 border rounded-lg bg-gray-50 outline-primary text-lg"
                    type="number"
                    min="0"
                    step="any"
                    value={inputs[f.key] || ""}
                    onChange={e => handleInputChange(f.key, e.target.value)}
                    placeholder="0"
                  />
                </div>
              ))}
            </form>
          </div>
          <div className="flex-1 flex flex-col items-center min-h-[340px] justify-center gap-6 animate-fade-in shadow-xl bg-white rounded-2xl border px-8 py-12 mx-auto">
            <div>
              <h2 className="text-lg uppercase font-bold tracking-wide text-primary">Estimated Emissions</h2>
              <div className="text-5xl md:text-6xl font-extrabold my-3 text-gray-800">
                {totalEmission.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-2xl">tons CO₂e/mo</span>
              </div>
            </div>
            <div className="w-full bg-green-100 rounded-lg h-6 flex items-center">
              <div
                className="bg-primary h-6 rounded-lg transition-all duration-300"
                style={{
                  width: `${Math.min(100, (totalEmission / 20) * 100)}%`
                }}
              />
            </div>
            <div className="mt-4 text-center text-emerald-800">
              <strong>
                Suggestions&nbsp;
              </strong>
              <ul className="mt-2 space-y-1 text-left text-sm mx-auto max-w-xs">
                <li>• Switch to renewable power: <span className="font-semibold">Est. -20%</span> </li>
                <li>• Optimize business travel: <span className="font-semibold">Est. -12%</span></li>
                <li>• Improve waste management: <span className="font-semibold">Est. -6%</span></li>
                <li>• <b>Want custom guidance?</b> Upgrade for AI-driven insights.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
