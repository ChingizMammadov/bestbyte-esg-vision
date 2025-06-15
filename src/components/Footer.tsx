
import React from "react";
import { Linkedin, Mail, FileText, Users, Shield, Award } from "lucide-react";
import { BestByteLogo } from "./BestByteLogo";

export const Footer = () => (
  <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 mt-8 transition-colors duration-300">
    {/* Divider Line */}
    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
    
    <div className="container mx-auto px-4 py-8 md:py-10">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        
        {/* Branding and Copyright */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-2">
            <BestByteLogo size="sm" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} • All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <a 
              href="mailto:hello@bestbyte.com" 
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
              aria-label="Contact us via email"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
            <a 
              href="/privacy" 
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
            >
              <Shield className="w-4 h-4" />
              Privacy
            </a>
            <a 
              href="/terms" 
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
            >
              <FileText className="w-4 h-4" />
              Terms
            </a>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4 pt-2 md:pt-0">
            <a 
              href="https://x.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-200 hover:scale-105"
              aria-label="Follow us on X (formerly Twitter)"
            >
              <img 
                src="https://pngate.com/wp-content/uploads/2025/03/x-social-media-logo-2025-dark-letter-x-1.png" 
                alt="X logo" 
                className="w-4 h-4 object-contain"
              />
            </a>
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-200 hover:scale-105"
              aria-label="Connect with us on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </a>
          </div>
        </nav>
      </div>

      {/* Trust Badges and Certifications */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Social Proof */}
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center justify-center md:justify-start gap-2">
              <Users className="w-4 h-4" />
              Trusted by leading organizations worldwide
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 opacity-60">
              <div className="bg-gray-200 dark:bg-gray-600 rounded px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">Fortune 500</div>
              <div className="bg-gray-200 dark:bg-gray-600 rounded px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">Startups</div>
              <div className="bg-gray-200 dark:bg-gray-600 rounded px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">NGOs</div>
            </div>
          </div>

          {/* Certification Badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-full px-3 py-1">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium text-green-800 dark:text-green-300">GDPR</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full px-3 py-1">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-800 dark:text-blue-300">SOC 2</span>
            </div>
            <div className="flex items-center gap-1 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-full px-3 py-1">
              <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-medium text-purple-800 dark:text-purple-300">ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
