import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
      // Light mode CSS variables
      root.style.setProperty('--background', '255 255 255');
      root.style.setProperty('--foreground', '15 23 42');
      root.style.setProperty('--card', '255 255 255');
      root.style.setProperty('--card-foreground', '15 23 42');
      root.style.setProperty('--popover', '255 255 255');
      root.style.setProperty('--popover-foreground', '15 23 42');
      root.style.setProperty('--primary', '34 197 94');
      root.style.setProperty('--primary-foreground', '255 255 255');
      root.style.setProperty('--secondary', '241 245 249');
      root.style.setProperty('--secondary-foreground', '15 23 42');
      root.style.setProperty('--muted', '248 250 252');
      root.style.setProperty('--muted-foreground', '100 116 139');
      root.style.setProperty('--accent', '239 246 255');
      root.style.setProperty('--accent-foreground', '15 23 42');
      root.style.setProperty('--destructive', '239 68 68');
      root.style.setProperty('--destructive-foreground', '255 255 255');
      root.style.setProperty('--border', '226 232 240');
      root.style.setProperty('--input', '248 250 252');
      root.style.setProperty('--ring', '34 197 94');
    } else {
      // Dark mode CSS variables
      root.style.setProperty('--background', '2 6 23');
      root.style.setProperty('--foreground', '248 250 252');
      root.style.setProperty('--card', '15 23 42');
      root.style.setProperty('--card-foreground', '248 250 252');
      root.style.setProperty('--popover', '15 23 42');
      root.style.setProperty('--popover-foreground', '248 250 252');
      root.style.setProperty('--primary', '34 197 94');
      root.style.setProperty('--primary-foreground', '15 23 42');
      root.style.setProperty('--secondary', '30 41 59');
      root.style.setProperty('--secondary-foreground', '248 250 252');
      root.style.setProperty('--muted', '30 41 59');
      root.style.setProperty('--muted-foreground', '148 163 184');
      root.style.setProperty('--accent', '30 41 59');
      root.style.setProperty('--accent-foreground', '248 250 252');
      root.style.setProperty('--destructive', '239 68 68');
      root.style.setProperty('--destructive-foreground', '248 250 252');
      root.style.setProperty('--border', '30 41 59');
      root.style.setProperty('--input', '30 41 59');
      root.style.setProperty('--ring', '34 197 94');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
