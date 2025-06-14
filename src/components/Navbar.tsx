
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Features", to: "/#features" },
  { name: "Pricing", to: "/pricing" },
  { name: "About", to: "/#about" },
  { name: "Sign Up", to: "/signup" },
  { name: "Log In", to: "/login" },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-primary tracking-tight hover:opacity-80 transition">
          <span className="rounded-full bg-gradient-to-tr from-green-700 to-teal-400 w-8 h-8 flex items-center justify-center text-white text-xl">B</span>
          <span>BestByte</span>
        </Link>
        <ul className="flex gap-8 items-center font-medium">
          {navLinks.map(link => (
            <li key={link.name}>
              <Link
                to={link.to}
                className={`hover:text-primary transition-colors ${pathname === link.to ? "text-primary" : "text-gray-700"}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
