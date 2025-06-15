
import React from "react";
import { Shield, Twitter, Linkedin, Mail, FileText, Users } from "lucide-react";

export const Footer = () => (
  <footer className="w-full border-t border-gray-200 bg-gradient-to-b from-white to-gray-50/50 mt-8">
    {/* Divider Line */}
    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    
    <div className="container mx-auto px-4 py-8 md:py-10">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        
        {/* Branding and Copyright */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-xl text-primary">BestByte</span>
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} • All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <a 
              href="mailto:hello@bestbyte.com" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
              aria-label="Contact us via email"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
            <a 
              href="/privacy" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
            >
              <Shield className="w-4 h-4" />
              Privacy
            </a>
            <a 
              href="/terms" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
            >
              <FileText className="w-4 h-4" />
              Terms
            </a>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4 pt-2 md:pt-0">
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-200 hover:scale-105"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-200 hover:scale-105"
              aria-label="Connect with us on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </div>

      {/* Trust Badges and Certifications */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Social Proof */}
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-500 mb-2 flex items-center justify-center md:justify-start gap-2">
              <Users className="w-4 h-4" />
              Trusted by leading organizations worldwide
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 opacity-60">
              <div className="bg-gray-200 rounded px-3 py-1 text-xs font-medium">Fortune 500</div>
              <div className="bg-gray-200 rounded px-3 py-1 text-xs font-medium">Startups</div>
              <div className="bg-gray-200 rounded px-3 py-1 text-xs font-medium">NGOs</div>
            </div>
          </div>

          {/* Certification Badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-3 py-1">
              <Shield className="w-3 h-3 text-green-600" />
              <span className="text-xs font-medium text-green-800">GDPR</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
              <Shield className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">SOC 2</span>
            </div>
            <div className="flex items-center gap-1 bg-purple-50 border border-purple-200 rounded-full px-3 py-1">
              <Shield className="w-3 h-3 text-purple-600" />
              <span className="text-xs font-medium text-purple-800">ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
