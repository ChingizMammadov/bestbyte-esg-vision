
import React from "react";
import { Link } from "react-router-dom";

export const Hero = () => (
  <section className="w-full py-24 bg-gradient-to-br from-green-100 via-white to-teal-50 border-b border-gray-200">
    <div className="container flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in" style={{ fontFamily: 'Inter, sans-serif' }}>
          Real-Time ESG <span className="text-primary">Insights</span> at Your Fingertips
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl animate-fade-in">
          BestByte empowers businesses with automated carbon calculators, predictive analytics, and AI-driven ESG reporting—so you can drive positive change, reduce risk, and exceed compliance.
        </p>
        <div className="flex gap-6">
          <Link to="/signup" className="px-8 py-3 rounded-lg bg-primary text-white text-lg font-semibold hover:opacity-90 shadow-lg transition hover:scale-105 duration-200">
            Start Your ESG Journey
          </Link>
          <Link to="/pricing" className="px-8 py-3 rounded-lg border border-gray-300 text-primary font-semibold text-lg bg-white hover:bg-gray-50 transition shadow">
            See Pricing
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center animate-scale-in">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
          alt="Eco analytics"
          className="rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  </section>
);
