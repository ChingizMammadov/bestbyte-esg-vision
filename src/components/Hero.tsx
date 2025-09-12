import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { EnhancedButton } from "./EnhancedButton";

export const Hero = () => (
  <section
    id="hero"
    className="relative w-full py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300"
    aria-label="Hero section"
  >
    {/* Background Pattern */}
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(76,175,80,0.1),transparent_50%)]"
      aria-hidden="true"
    ></div>
    <div
      className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 dark:opacity-10"
      aria-hidden="true"
    ></div>

    {/* Dark mode gradient overlay */}
    <div
      className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/10 dark:to-gray-900/30"
      aria-hidden="true"
    ></div>

    <div className="container relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      <div className="flex-1 opacity-0 text-center lg:text-left animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-6 animate-scale-in backdrop-blur-sm">
          <div
            className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"
            aria-hidden="true"
          ></div>
          <span role="status" aria-label="Trust indicator">
            Trusted by 500+ companies worldwide
          </span>
        </div>

        {/* Main Headline - Using Montserrat for premium feel */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight font-montserrat">
          Real-Time ESG{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              Insights
            </span>
          </span>{" "}
          at Your Fingertips
        </h1>

        {/* Subheading - Using Inter for readability */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed font-inter">
          BestByte empowers businesses with automated carbon calculators,
          predictive analytics, and AI-driven ESG reporting—so you can drive
          positive change, reduce risk, and exceed compliance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
          <Link to="/signup">
            <EnhancedButton
              premium
              glow
              size="lg"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-white shadow-lg hover:shadow-xl dark:shadow-emerald-500/25 dark:hover:shadow-emerald-500/40 transition-all duration-300 font-montserrat"
              aria-label="Start your ESG journey with BestByte"
            >
              Start Your ESG Journey
              <ArrowRight
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                aria-hidden="true"
              />
            </EnhancedButton>
          </Link>
          <Link to="/pricing">
            <EnhancedButton
              variant="outline"
              size="lg"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-sm hover:shadow-md dark:shadow-gray-900/20 transition-all duration-300 font-montserrat"
              aria-label="View pricing plans"
            >
              <Play className="w-5 h-5" aria-hidden="true" />
              See Pricing
            </EnhancedButton>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-inter"
          role="group"
          aria-label="Trust indicators"
        >
          <div className="flex items-center gap-2">
            <div
              className="flex -space-x-2"
              role="group"
              aria-label="Customer avatars"
            >
              <div
                className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-2 border-white dark:border-gray-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-semibold text-xs"
                aria-label="Customer A"
              >
                A
              </div>
              <div
                className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 border-2 border-white dark:border-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-xs"
                aria-label="Customer B"
              >
                B
              </div>
              <div
                className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 border-2 border-white dark:border-gray-700 flex items-center justify-center text-purple-600 dark:text-purple-400 font-semibold text-xs"
                aria-label="Customer C"
              >
                C
              </div>
              <div
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold text-xs"
                aria-label="More customers"
              >
                +
              </div>
            </div>
            <span>Join 500+ companies</span>
          </div>
          <div
            className="hidden sm:block w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"
            aria-hidden="true"
          ></div>
          <span role="img" aria-label="4.9 out of 5 star rating">
            ⭐ 4.9/5 customer rating
          </span>
          <div
            className="hidden sm:block w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"
            aria-hidden="true"
          ></div>
          <span role="img" aria-label="Security certified">
            🔒 SOC 2 & GDPR compliant
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex-1 flex justify-center lg:justify-end animate-scale-in">
        <div className="relative">
          <div
            className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-500 dark:to-teal-500 rounded-3xl blur-2xl opacity-20 dark:opacity-30 animate-pulse"
            aria-hidden="true"
          ></div>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
            alt="ESG Analytics Dashboard showing environmental data and sustainability metrics"
            className="relative rounded-3xl shadow-2xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 max-w-md w-full transform hover:scale-105 transition-transform duration-500"
            style={{ objectFit: "cover" }}
            loading="eager"
          />

          {/* Floating Cards */}
          <div
            className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-4 animate-float border border-gray-100 dark:border-gray-700"
            role="img"
            aria-label="Carbon neutral badge"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"
                aria-hidden="true"
              ></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Carbon Neutral
              </span>
            </div>
          </div>

          <div
            className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-4 animate-float border border-gray-100 dark:border-gray-700"
            style={{ animationDelay: "1s" }}
            role="img"
            aria-label="ESG score of 98%"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                98%
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ESG Score
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
