
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Features", to: "/#features" },
  { name: "Pricing", to: "/pricing" },
  { name: "About", to: "/about" },
  { name: "Sign Up", to: "/signup" },
  { name: "Log In", to: "/login" },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl md:text-2xl text-primary tracking-tight hover:opacity-80 transition">
          <span className="rounded-full bg-gradient-to-tr from-green-700 to-teal-400 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-white text-sm md:text-xl">B</span>
          <span>BestByte</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 lg:gap-8 items-center font-medium">
          {navLinks.map(link => (
            <li key={link.name}>
              <Link
                to={link.to}
                className={`hover:text-primary transition-colors text-sm lg:text-base ${pathname === link.to ? "text-primary" : "text-gray-700"}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden">
            <ul className="flex flex-col py-4">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className={`block px-6 py-3 hover:bg-gray-50 transition-colors ${pathname === link.to ? "text-primary bg-gray-50" : "text-gray-700"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
