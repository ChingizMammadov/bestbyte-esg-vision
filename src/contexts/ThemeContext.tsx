//! Changed colors from RBG format to HSL
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme;
    return stored || "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    if (theme === "light") {
      // Light mode CSS variables (HSL)
      root.style.setProperty("--background", "0 0% 100%");
      root.style.setProperty("--foreground", "220 53% 11%");
      root.style.setProperty("--card", "0 0% 100%");
      root.style.setProperty("--card-foreground", "220 53% 11%");
      root.style.setProperty("--popover", "0 0% 100%");
      root.style.setProperty("--popover-foreground", "220 53% 11%");
      root.style.setProperty("--primary", "145 61% 45%");
      root.style.setProperty("--primary-foreground", "0 0% 100%");
      root.style.setProperty("--secondary", "210 20% 96%");
      root.style.setProperty("--secondary-foreground", "220 53% 11%");
      root.style.setProperty("--muted", "210 20% 97%");
      root.style.setProperty("--muted-foreground", "210 18% 47%");
      root.style.setProperty("--accent", "210 100% 97%");
      root.style.setProperty("--accent-foreground", "220 53% 11%");
      root.style.setProperty("--destructive", "0 71% 60%");
      root.style.setProperty("--destructive-foreground", "0 0% 100%");
      root.style.setProperty("--border", "210 25% 92%");
      root.style.setProperty("--input", "210 20% 97%");
      root.style.setProperty("--ring", "145 61% 45%");
    } else {
      // Dark mode CSS variables (HSL)
      root.style.setProperty("--background", "230 83% 5%");
      root.style.setProperty("--foreground", "210 20% 97%");
      root.style.setProperty("--card", "220 53% 11%");
      root.style.setProperty("--card-foreground", "210 20% 97%");
      root.style.setProperty("--popover", "220 53% 11%");
      root.style.setProperty("--popover-foreground", "210 20% 97%");
      root.style.setProperty("--primary", "145 61% 45%");
      root.style.setProperty("--primary-foreground", "220 53% 11%");
      root.style.setProperty("--secondary", "210 32% 17%");
      root.style.setProperty("--secondary-foreground", "210 20% 97%");
      root.style.setProperty("--muted", "210 32% 17%");
      root.style.setProperty("--muted-foreground", "210 20% 65%");
      root.style.setProperty("--accent", "210 32% 17%");
      root.style.setProperty("--accent-foreground", "210 20% 97%");
      root.style.setProperty("--destructive", "0 71% 60%");
      root.style.setProperty("--destructive-foreground", "210 20% 97%");
      root.style.setProperty("--border", "210 32% 17%");
      root.style.setProperty("--input", "210 32% 17%");
      root.style.setProperty("--ring", "145 61% 45%");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
