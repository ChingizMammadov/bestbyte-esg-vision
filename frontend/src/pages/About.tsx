import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { EnhancedButton } from "@/components/EnhancedButton";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Flag,
  Rocket,
  Building2,
  Users,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { HashLink } from "react-router-hash-link";

const teamMembers = [
  {
    name: "Chingiz Mammadov",
    title: "CEO & Founder",
    bio: `Business Administration Student at Baku Higher Oil School. Winner of INFOTECH 2025 and Enactus World Cup 2024 Simulation. National finalist at USG2024 with “Ecoists,” a startup creating edible, biodegradable utensils. Top Campus Director for Hult Prize, with nominations for Best Regional and World Program of the Year. Finalist or winner in 15+ local and international competitions on sustainability, green innovation, and entrepreneurship. Completed Cambridge University’s global biodiversity course and participated in programs like CampUSA and John Galt School.`,
    image: "/lovable-uploads/12f7c51e-436e-48cb-a6c3-c506078362cb.png",
  },
  {
    name: "Toghrul Abdullayev",
    title: "Full-Stack Developer",
    bio: "Computer Science Student at Baku Higher Oil School. Participant in Teknofest 2025, Full-Stack Developer of FlowGuard App. 2 years of experience in full-stack development. Developed several personal fully-fledged web applications",
    image: "/lovable-uploads/toghrul.png",
  },
  {
    name: "Gudrat Abbasli",
    title: "Business Developer",
    bio: "Business Administration Student at Baku Higher Oil School. Research-driven: market sizing, pricing/WTP, unit economics, investment appraisal, and cohort/funnel analysis.",
    image: "/lovable-uploads/gudrat.jpg",
  },
];

const milestones = [
  { year: "2022", event: "BestByte founded with $2M seed funding" },
  { year: "2023", event: "Launched AI-powered carbon calculator" },
  { year: "2023", event: "Partnership with major banks for ESG compliance" },
  { year: "2024", event: "Reached 500+ enterprise customers" },
  { year: "2024", event: "Launched predictive analytics platform" },
];

// Icon mapping for timeline milestones (aligns icon to each entry)
const timelineIcons = [Flag, Rocket, Building2, Users, TrendingUp];

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section (expanded, aligned with homepage Hero) */}
        <section
          id="hero"
          className="relative w-full py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300"
          aria-label="About BestByte hero"
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

              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight font-montserrat">
                About{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                    BestByte
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed font-inter mx-auto lg:mx-0">
                We build the modern ESG platform—combining automated data
                pipelines, AI insights, and audit-ready reporting—so teams can
                move faster on sustainability and exceed compliance with
                confidence.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <HashLink to="#team">
                  <EnhancedButton
                    premium
                    glow
                    size="lg"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-white shadow-lg hover:shadow-xl dark:shadow-emerald-500/25 dark:hover:shadow-emerald-500/40 transition-all duration-300 font-montserrat"
                    aria-label="Meet the BestByte team"
                  >
                    Meet the Team
                    <ArrowRight
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </EnhancedButton>
                </HashLink>
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
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=760&q=80"
                  alt="BestByte team collaborating on sustainability initiatives"
                  className="relative rounded-3xl shadow-2xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 max-w-md w-full transform hover:scale-105 transition-transform duration-500"
                  style={{ objectFit: "cover" }}
                  loading="eager"
                />

                {/* Floating Cards */}
                <div
                  className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-4 animate-float border border-gray-100 dark:border-gray-700"
                  role="img"
                  aria-label="Founded in 2022 badge"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"
                      aria-hidden="true"
                    ></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Founded 2022
                    </span>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-4 animate-float border border-gray-100 dark:border-gray-700"
                  style={{ animationDelay: "1s" }}
                  role="img"
                  aria-label="500+ customers indicator"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      500+
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Customers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About BestByte Details */}
        <section className="py-10 md:py-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  What we do
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  BestByte is an end-to-end ESG data platform that helps
                  organizations collect, calculate, and report sustainability
                  metrics across environmental, social, and governance pillars.
                  From Scope 1–3 emissions to supplier engagement and policy
                  controls, we make ESG measurable, auditable, and actionable.
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  Who we serve
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Sustainability, Finance, and Operations teams at mid-market
                  and enterprise companies in manufacturing, retail, energy, and
                  services. Our role-based workflows fit existing business
                  processes and reduce manual reporting overhead.
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  How it works
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-semibold">1.</span>{" "}
                    Ingest: Connect ERPs, utility bills, travel data, and
                    supplier inputs.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-semibold">2.</span>{" "}
                    Normalize: Map data to consistent factors and organizational
                    boundaries.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-semibold">3.</span>{" "}
                    Analyze: Identify hotspots, trends, and reduction
                    opportunities.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-600 font-semibold">4.</span>{" "}
                    Report: Generate audit-ready ESG reports and dashboards.
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
              {[
                {
                  title: "Automated data",
                  desc: "Connect systems and suppliers to cut manual work.",
                },
                {
                  title: "Real-time dashboards",
                  desc: "Track Scope 1–3, ESG KPIs, and progress to targets.",
                },
                {
                  title: "AI insights",
                  desc: "Find drivers, forecast scenarios, and prioritize actions.",
                },
                {
                  title: "Open & secure",
                  desc: "APIs, role-based access, and exportable, auditable data.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-5"
                >
                  <div className="text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
                    {item.title}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
          <div className="container px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                  Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                    Mission
                  </span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  To provide sustainable solutions through cutting-edge
                  technology, empowering businesses of all sizes to improve
                  their ESG practices, reduce environmental impact, and create
                  lasting positive change for our planet.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                  Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                    Vision
                  </span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  To lead the way in helping businesses achieve net-zero goals
                  and exceed ESG compliance requirements, making sustainability
                  accessible, measurable, and profitable for organizations
                  worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          id="team"
          className="py-12 md:py-16 bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 dark:from-gray-800/80 dark:via-emerald-800/30 dark:to-teal-900/40"
        >
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Meet Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                  Team
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our diverse team combines deep ESG expertise with cutting-edge
                technology to deliver solutions that make a real difference.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col opacity-0 items-center group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 object-cover object-top"
                  />
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary dark:text-emerald-600 font-semibold mb-3 text-sm md:text-base">
                    {member.title}
                  </p>
                  <p className="text-gray-600 text-center dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 md:py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              {/* Section Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
                Our Journey
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                  Milestones
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Key milestones in our mission to revolutionize ESG reporting and
                sustainability management.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400"></div>
                <div className="space-y-6 md:space-y-8">
                  {milestones.map((milestone, index) => {
                    const Icon = timelineIcons[index] || Flag;
                    return (
                      <div
                        key={index}
                        className="relative flex items-start animate-fade-in"
                        style={{ animationDelay: `${index * 120}ms` }}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-0 -ml-0.5 w-9 h-9 rounded-full bg-white dark:bg-gray-900 border-2 border-emerald-400 dark:border-emerald-500 flex items-center justify-center shadow-sm">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                        </div>

                        {/* Card */}
                        <div className="ml-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon
                              className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                              aria-hidden="true"
                            />
                            <div className="text-primary dark:text-emerald-500 font-bold text-base md:text-lg">
                              {milestone.year}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            {milestone.event}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Compact CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 font-montserrat">
                Ready to Transform Your ESG Strategy?
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join hundreds of forward-thinking companies already using
                BestByte to drive their sustainability initiatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start Free Trial
                </Link>
                <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-600 transition-colors duration-300">
                  Contact Sales
                </button>
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
