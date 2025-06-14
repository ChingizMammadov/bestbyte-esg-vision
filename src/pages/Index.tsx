
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import React from "react";

const Index = () => (
  <div className="flex flex-col min-h-screen bg-background font-sans">
    <Navbar />
    <main className="flex-1">
      <Hero />
      <Features />
      <Testimonials />
    </main>
    <ChatbotWidget />
    <Footer />
  </div>
);

export default Index;
