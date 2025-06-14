
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React from "react";

const plans = [
  {
    name: "Basic",
    price: 60,
    period: "month",
    features: [
      "Carbon Calculator",
      "Basic ESG Reports",
      "Community Support",
      "Email Notifications",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Standard",
    price: 150,
    period: "month",
    features: [
      "Everything in Basic",
      "Predictive Analytics",
      "Unlimited Reports",
      "Priority Support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Premium",
    price: 300,
    period: "month",
    features: [
      "Everything in Standard",
      "White-Glove Onboarding",
      "Advanced AI Insights",
      "SLA-backed Support",
      "Custom Integrations",
    ],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Navbar />
      <main className="flex-1">
        <section className="container py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center px-4">Pricing & Plans</h1>
          <p className="mb-8 md:mb-12 text-base md:text-lg text-center text-muted-foreground px-4 max-w-3xl mx-auto">
            Choose the plan that fits your sustainability goals and business needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
            {plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={`rounded-2xl border px-6 md:px-8 py-8 md:py-12 bg-white shadow-lg flex flex-col items-center transition hover:scale-105 duration-200 ${
                  plan.popular ? "border-4 border-primary shadow-2xl" : ""
                }`}
              >
                {plan.popular && (
                  <span className="mb-2 px-3 py-1 text-xs bg-primary text-white rounded-full uppercase tracking-wider font-bold animate-pulse">
                    Most Popular
                  </span>
                )}
                <h2 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="text-3xl md:text-4xl font-extrabold mb-4 text-primary flex items-end gap-1">
                  ${plan.price}
                  <span className="text-sm md:text-base font-normal text-gray-500">/ {plan.period}</span>
                </div>
                <ul className="mb-6 md:mb-8 space-y-2 text-left w-full text-gray-700 text-sm md:text-base">
                  {plan.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
                <button className="w-full px-6 md:px-8 py-3 rounded-lg bg-primary text-white font-semibold text-base md:text-lg hover:bg-emerald-700 transition">
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-8 md:mt-12 text-center text-gray-500 text-sm px-4">
            Need a custom solution? <a href="mailto:hello@bestbyte.com" className="text-primary underline">Contact our team</a>
          </p>
        </section>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
