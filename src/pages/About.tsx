import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React from "react";

const teamMembers = [
  {
    name: "Chingiz Mammadov",
    title: "CEO & Co-Founder",
    bio: "Former sustainability director at Fortune 500 companies with 15+ years in ESG strategy.",
    image: "/lovable-uploads/12f7c51e-436e-48cb-a6c3-c506078362cb.png"
  },
  {
    name: "Marcus Rodriguez",
    title: "CTO & Co-Founder", 
    bio: "AI researcher and former Google engineer specializing in predictive analytics and machine learning.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Dr. Emily Watson",
    title: "Head of ESG Research",
    bio: "Environmental scientist and former UN climate advisor with expertise in carbon accounting.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
  }
];

const milestones = [
  { year: "2022", event: "BestByte founded with $2M seed funding" },
  { year: "2023", event: "Launched AI-powered carbon calculator" },
  { year: "2023", event: "Partnership with major banks for ESG compliance" },
  { year: "2024", event: "Reached 500+ enterprise customers" },
  { year: "2024", event: "Launched predictive analytics platform" }
];

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-100 via-white to-teal-50">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About BestByte</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're on a mission to empower businesses with the tools and insights needed to drive meaningful environmental change and achieve ESG excellence.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To provide sustainable solutions through cutting-edge technology, empowering businesses of all sizes to improve their ESG practices, reduce environmental impact, and create lasting positive change for our planet.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To lead the way in helping businesses achieve net-zero goals and exceed ESG compliance requirements, making sustainability accessible, measurable, and profitable for organizations worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our diverse team combines deep ESG expertise with cutting-edge technology to deliver solutions that make a real difference.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover object-top"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Key milestones in our mission to revolutionize ESG reporting and sustainability management.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary"></div>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative flex items-center">
                      <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="ml-12 bg-gray-50 rounded-lg p-6 shadow-sm">
                        <div className="text-primary font-bold text-lg mb-2">{milestone.year}</div>
                        <p className="text-gray-700">{milestone.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your ESG Strategy?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join hundreds of forward-thinking companies already using BestByte to drive their sustainability initiatives.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition">
                Contact Sales
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
