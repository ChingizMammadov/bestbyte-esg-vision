import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Check, Star, Zap, Shield, Award } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: 60,
    period: "month",
    description: "Perfect for small teams getting started",
    features: [
      "Carbon Calculator",
      "Basic ESG Reports",
      "Community Support",
      "Email Notifications",
      "5 GB Storage",
    ],
    cta: "Start Free Trial",
    icon: Shield,
    color: "from-slate-600 to-slate-700",
    popular: false,
  },
  {
    name: "Standard",
    price: 150,
    period: "month",
    description: "Most popular for growing businesses",
    features: [
      "Everything in Basic",
      "Predictive Analytics",
      "Unlimited Reports",
      "Priority Support",
      "50 GB Storage",
      "API Access",
    ],
    cta: "Start Free Trial",
    icon: Zap,
    color: "from-emerald-600 to-teal-600",
    popular: true,
  },
  {
    name: "Premium",
    price: 300,
    period: "month",
    description: "Enterprise-grade for large organizations",
    features: [
      "Everything in Standard",
      "White-Glove Onboarding",
      "Advanced AI Insights",
      "SLA-backed Support",
      "Custom Integrations",
      "Unlimited Storage",
      "Dedicated Manager",
    ],
    cta: "Contact Sales",
    icon: Award,
    color: "from-purple-600 to-indigo-600",
    popular: false,
  },
];

const trustBadges = [
  { name: "SOC 2", icon: Shield },
  { name: "GDPR", icon: Shield },
  { name: "ISO 27001", icon: Award },
];

export default function Pricing() {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate("/signup");
  };

  const handleContactSales = () => {
    window.location.href = "mailto:hello@bestbyte.com";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 font-inter text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Light Mode Background */}
          <div className="dark:hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-100/60 to-teal-100/40 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-100/50 to-purple-100/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-teal-100/40 to-emerald-100/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Dark Mode Background */}
          <div className="hidden dark:block">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <section className="container py-16 md:py-24 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              Transparent Pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent font-montserrat">
              Pricing & Plans
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your sustainability goals and business needs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {plans.map((plan, idx) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative group animate-fade-in ${
                    plan.popular ? "lg:-mt-4 lg:mb-4" : ""
                  }`}
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div
                    className={`relative h-full transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg ${
                      plan.popular
                        ? "bg-white/95 dark:bg-gradient-to-br dark:from-gray-800/80 dark:to-gray-900/60 border-2 border-emerald-300 dark:border-emerald-500/50 shadow-emerald-200/50 dark:shadow-emerald-500/20 hover:shadow-emerald-300/60 dark:hover:shadow-emerald-500/30"
                        : "bg-white/90 dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600/50 hover:shadow-gray-200/60 dark:hover:shadow-gray-500/10"
                    } backdrop-blur-sm rounded-3xl p-8`}
                  >
                    {/* Plan Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-montserrat">{plan.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{plan.description}</p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-5xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-lg mb-2">/ {plan.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={plan.cta === "Contact Sales" ? handleContactSales : handleStartTrial}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${
                        plan.popular
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 shadow-lg hover:shadow-emerald-500/25"
                          : plan.cta === "Contact Sales"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-lg hover:shadow-purple-500/25"
                          : "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/30"
                      }`}
                    >
                      {plan.cta}
                    </button>

                    {/* Light Mode Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-500/5 dark:to-teal-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Badges */}
          <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: "600ms" }}>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 font-medium tracking-wide">
              TRUSTED & SECURE PLATFORM
            </p>
            <div className="flex justify-center items-center gap-8">
              {trustBadges.map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <div 
                    key={badge.name} 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-300"
                  >
                    <IconComponent className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center animate-fade-in" style={{ animationDelay: "800ms" }}>
            <div className="bg-white/60 dark:bg-gradient-to-r dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 max-w-3xl mx-auto shadow-lg">
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 font-montserrat">
                Need a Custom Solution?
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Contact our team for enterprise pricing and custom integrations tailored to your needs.
              </p>
              <button 
                onClick={handleContactSales}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </section>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
