
import React from "react";

export const Footer = () => (
  <footer className="w-full border-t border-gray-200 bg-white/80">
    <div className="container flex flex-col md:flex-row justify-between items-center py-8 gap-4 md:gap-0 text-sm text-gray-600">
      <div>
        <span className="font-semibold text-primary">BestByte</span> &copy; {new Date().getFullYear()} • All rights reserved.
      </div>
      <nav className="flex gap-6">
        <a href="mailto:hello@bestbyte.com" className="hover:text-primary transition-colors">Contact</a>
        <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
        <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
        <a href="https://twitter.com/" target="_blank" className="hover:text-primary transition-colors">Twitter</a>
        <a href="https://linkedin.com/" target="_blank" className="hover:text-primary transition-colors">LinkedIn</a>
      </nav>
    </div>
  </footer>
);
