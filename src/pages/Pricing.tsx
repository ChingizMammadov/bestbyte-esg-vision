
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
        <section className="container py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center px-4">Pricing & Plans</h1>
          <p className="mb-6 md:mb-8 text-base md:text-lg text-center text-muted-foreground px-4 max-w-3xl mx-auto">
            Choose the plan that fits your sustainability goals and business needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto px-4">
            {plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={`rounded-2xl border px-4 md:px-6 py-6 md:py-8 bg-white shadow-lg flex flex-col items-center transition hover:scale-105 duration-200 ${
                  plan.popular ? "border-2 border-primary shadow-xl" : ""
                }`}
              >
                {plan.popular && (
                  <span className="mb-2 px-3 py-1 text-xs bg-primary text-white rounded-full uppercase tracking-wider font-bold">
                    Most Popular
                  </span>
                )}
                <h2 className="text-lg md:text-xl font-bold mb-2">{plan.name}</h2>
                <div className="text-2xl md:text-3xl font-extrabold mb-3 text-primary flex items-end gap-1">
                  ${plan.price}
                  <span className="text-sm font-normal text-gray-500">/ {plan.period}</span>
                </div>
                <ul className="mb-4 md:mb-6 space-y-1.5 text-left w-full text-gray-700 text-sm">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2 mt-0.5">•</span>
                      <span className="flex-1">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 md:px-6 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm md:text-base hover:bg-emerald-700 transition mt-auto">
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 md:mt-8 text-center text-gray-500 text-sm px-4">
            Need a custom solution? <a href="mailto:hello@bestbyte.com" className="text-primary underline">Contact our team</a>
          </p>
        </section>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
