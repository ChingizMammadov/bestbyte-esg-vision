import {
  BarChart2,
  FileText,
  CalendarCheck,
  MessageSquare,
  Zap,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: <FileText className="w-8 h-8" />,
    name: "Real-Time ESG Reporting",
    desc: "On-demand, compliant ESG reports to boost your reputation, satisfy regulation and attract investors.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    name: "Automated Carbon Calculators",
    desc: "Instantly compute your carbon footprint—energy, transport, waste, and more—with interactive tools.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: <CalendarCheck className="w-8 h-8" />,
    name: "Predictive Analytics",
    desc: "Forecast emission trends and compliance risks with AI-powered models built for your business.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    name: "AI-Driven Insights",
    desc: "Actionable recommendations to reduce your footprint and supercharge your ESG progress.",
    color: "from-orange-500 to-red-500",
  },
];

const additionalFeatures = [
  {
    icon: <Zap />,
    title: "Lightning Fast",
    desc: "Reports generated in seconds",
  },
  {
    icon: <Shield />,
    title: "Enterprise Security",
    desc: "Bank-level encryption & compliance",
  },
  {
    icon: <Target />,
    title: "Goal Tracking",
    desc: "Monitor progress toward sustainability targets",
  },
  {
    icon: <TrendingUp />,
    title: "Performance Metrics",
    desc: "Real-time KPI monitoring",
  },
];

export const Features = () => (
  <section
    id="features"
    className="py-24 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300 border-b border-gray-100 dark:border-gray-700"
  >
    {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900"></div>
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>

    <div className="container relative">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-6 border border-emerald-200 dark:border-emerald-700">
          <Zap className="w-4 h-4" />
          Powerful Features
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Everything you need for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
            ESG Excellence
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Comprehensive ESG management tools designed to help your business
          thrive in a sustainable future
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {features.map((feature, index) => (
          <div
            key={feature.name}
            className="group relative opacity-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/20 hover:shadow-2xl dark:hover:shadow-gray-900/40 transition-all duration-500 hover:-translate-y-2 animate-fade-in backdrop-blur-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
            ></div>

            {/* Icon Container */}
            <div className="relative mb-6">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-2 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
            </div>

            {/* Content */}
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
              {feature.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {feature.desc}
            </p>

            {/* Hover Arrow */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Features */}
      <div className="bg-gradient-to-r from-gray-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-600 shadow-lg dark:shadow-gray-900/20">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              Scale
            </span>{" "}
            &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              Security
            </span>
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enterprise-grade features that grow with your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 shadow-md dark:shadow-gray-900/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 text-emerald-600 dark:text-emerald-400 border border-gray-100 dark:border-gray-600">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
