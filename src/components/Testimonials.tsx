
import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "With BestByte, our carbon reporting went from weeks to hours. The insights have guided our sustainability road map!",
    author: "Sarah K.",
    role: "Head of ESG",
    company: "GreenGrowth Corp",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "The predictive analytics blew us away. We cut energy waste by 15% this quarter alone.",
    author: "Daniel M.",
    role: "COO",
    company: "NovaTech",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    quote: "BestByte's carbon calculator is so intuitive. Our compliance team actually likes reporting now!",
    author: "Jessica F.",
    role: "Compliance Lead",
    company: "EcoElements",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
];

const companyLogos = [
  { name: "TechCorp", logo: "TC" },
  { name: "GreenVentures", logo: "GV" },
  { name: "EcoSolutions", logo: "ES" },
  { name: "SustainableFuture", logo: "SF" },
  { name: "CleanEnergy Co", logo: "CE" },
  { name: "GreenTech Labs", logo: "GT" },
];

export const Testimonials = () => (
  <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 relative overflow-hidden">
    {/* Subtle Background Pattern - Reduced opacity */}
    <div className="absolute inset-0 opacity-3">
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
    </div>
    
    <div className="container relative">
      {/* Compact Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-4">
          <Star className="w-4 h-4 fill-current" />
          Customer Success Stories
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-montserrat">
          Trusted by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            Industry Leaders
          </span>
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of companies already transforming their ESG reporting with BestByte
        </p>
      </div>

      {/* Compact Company Logos */}
      <div className="mb-12">
        <p className="text-center text-xs text-gray-500 mb-6 font-medium tracking-wide">
          TRUSTED BY LEADING ORGANIZATIONS WORLDWIDE
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
          {companyLogos.map((company, index) => (
            <div 
              key={company.name} 
              className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-semibold text-gray-600 text-sm">{company.logo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div 
            key={`${testimonial.author}-${testimonial.company}`} 
            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Quote Icon */}
            <div className="absolute -top-3 left-6">
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-3 h-3 text-white" />
              </div>
            </div>
            
            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            
            {/* Quote */}
            <blockquote className="text-gray-700 mb-6 leading-relaxed italic text-sm">
              "{testimonial.quote}"
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.author}
                className="w-10 h-10 rounded-full border-2 border-emerald-100 object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900 text-sm">{testimonial.author}</div>
                <div className="text-xs text-gray-600">{testimonial.role}</div>
                <div className="text-xs font-medium text-emerald-600">{testimonial.company}</div>
              </div>
            </div>
            
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Compact CTA Section */}
      <div className="text-center mt-12">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 max-w-3xl mx-auto">
          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-montserrat">
            Ready to Join These Success Stories?
          </h4>
          <p className="text-gray-600 mb-6">
            Start your ESG transformation today with a free trial
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Start Free Trial
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-emerald-400 hover:text-emerald-600 transition-colors duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
