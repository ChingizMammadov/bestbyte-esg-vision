
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
  <section className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
    </div>
    
    <div className="container relative">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
          <Star className="w-4 h-4 fill-current" />
          Customer Success Stories
        </div>
        <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Trusted by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            Industry Leaders
          </span>
        </h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Join hundreds of companies already transforming their ESG reporting with BestByte
        </p>
      </div>

      {/* Company Logos */}
      <div className="mb-20">
        <p className="text-center text-sm text-gray-500 mb-8 font-medium">
          TRUSTED BY LEADING ORGANIZATIONS WORLDWIDE
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
          {companyLogos.map((company, index) => (
            <div 
              key={company.name} 
              className="flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-bold text-gray-600 text-lg">{company.logo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div 
            key={`${testimonial.author}-${testimonial.company}`} 
            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 left-8">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-4 h-4 text-white" />
              </div>
            </div>
            
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            {/* Quote */}
            <blockquote className="text-lg text-gray-700 mb-8 leading-relaxed italic">
              "{testimonial.quote}"
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.author}
                className="w-12 h-12 rounded-full border-2 border-emerald-100 object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
                <div className="text-sm font-medium text-emerald-600">{testimonial.company}</div>
              </div>
            </div>
            
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 max-w-4xl mx-auto">
          <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Join These Success Stories?
          </h4>
          <p className="text-gray-600 mb-8 text-lg">
            Start your ESG transformation today with a free trial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-emerald-400 hover:text-emerald-600 transition-colors duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
