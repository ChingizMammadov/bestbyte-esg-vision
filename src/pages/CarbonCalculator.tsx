
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
        <section className="container py-12 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center lg:text-left">Interactive Carbon Calculator</h1>
              <form className="space-y-4 md:space-y-6">
                {inputDefs.map((f) => (
                  <div key={f.key} className="flex flex-col gap-2">
                    <label className="font-semibold text-sm md:text-base">{f.label}</label>
                    <input
                      className="px-3 md:px-4 py-2 md:py-3 border rounded-lg bg-gray-50 outline-primary text-base md:text-lg"
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
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center min-h-[300px] md:min-h-[340px] justify-center gap-4 md:gap-6 animate-fade-in shadow-xl bg-white rounded-2xl border px-6 md:px-8 py-8 md:py-12">
                <div className="text-center">
                  <h2 className="text-base md:text-lg uppercase font-bold tracking-wide text-primary">Estimated Emissions</h2>
                  <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold my-3 text-gray-800">
                    {totalEmission.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-lg md:text-xl lg:text-2xl">tons CO₂e/mo</span>
                  </div>
                </div>
                <div className="w-full bg-green-100 rounded-lg h-4 md:h-6 flex items-center">
                  <div
                    className="bg-primary h-4 md:h-6 rounded-lg transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (totalEmission / 20) * 100)}%`
                    }}
                  />
                </div>
                <div className="mt-2 md:mt-4 text-center text-emerald-800">
                  <strong className="text-sm md:text-base">
                    Suggestions&nbsp;
                  </strong>
                  <ul className="mt-2 space-y-1 text-left text-xs md:text-sm mx-auto max-w-xs">
                    <li>• Switch to renewable power: <span className="font-semibold">Est. -20%</span> </li>
                    <li>• Optimize business travel: <span className="font-semibold">Est. -12%</span></li>
                    <li>• Improve waste management: <span className="font-semibold">Est. -6%</span></li>
                    <li>• <b>Want custom guidance?</b> Upgrade for AI-driven insights.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
