
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => (
  <section className="relative w-full py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 border-b border-gray-100 overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]"></div>
    <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
    
    <div className="container relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      <div className="flex-1 text-center lg:text-left animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-sm font-medium mb-6 animate-scale-in">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          Trusted by 500+ companies worldwide
        </div>
        
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
          Real-Time ESG{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Insights
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-scale-in"></div>
          </span>{" "}
          at Your Fingertips
        </h1>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
          BestByte empowers businesses with automated carbon calculators, predictive analytics, and AI-driven ESG reporting—so you can drive positive change, reduce risk, and exceed compliance.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
          <Link 
            to="/signup" 
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            Start Your ESG Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link 
            to="/pricing" 
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold text-lg bg-white hover:bg-gray-50 transition-all duration-300 hover:border-emerald-400 hover:text-emerald-600 shadow-sm hover:shadow-md"
          >
            <Play className="w-5 h-5" />
            See Pricing
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-600 font-semibold text-xs">A</div>
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 font-semibold text-xs">B</div>
              <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-purple-600 font-semibold text-xs">C</div>
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-600 font-semibold text-xs">+</div>
            </div>
            <span>Join 500+ companies</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
          <span>⭐ 4.9/5 customer rating</span>
          <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
          <span>🔒 SOC 2 & GDPR compliant</span>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="flex-1 flex justify-center lg:justify-end animate-scale-in">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
            alt="ESG Analytics Dashboard"
            className="relative rounded-3xl shadow-2xl border border-gray-200 max-w-md w-full transform hover:scale-105 transition-transform duration-500"
            style={{ objectFit: "cover" }}
          />
          
          {/* Floating Cards */}
          <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-4 animate-float">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Carbon Neutral</span>
            </div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-emerald-600">98%</div>
              <span className="text-sm text-gray-600">ESG Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
