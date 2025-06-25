import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Force light theme for now
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');

    // Apply light mode CSS variables
    root.style.setProperty('--background', '255 255 255'); // Pure white
    root.style.setProperty('--foreground', '15 23 42'); // Slate 900
    root.style.setProperty('--card', '255 255 255'); // Pure white
    root.style.setProperty('--card-foreground', '15 23 42'); // Slate 900
    root.style.setProperty('--popover', '255 255 255'); // Pure white
    root.style.setProperty('--popover-foreground', '15 23 42'); // Slate 900
    root.style.setProperty('--primary', '34 197 94'); // Emerald 500
    root.style.setProperty('--primary-foreground', '255 255 255'); // White
    root.style.setProperty('--secondary', '241 245 249'); // Slate 100
    root.style.setProperty('--secondary-foreground', '15 23 42'); // Slate 900
    root.style.setProperty('--muted', '248 250 252'); // Slate 50
    root.style.setProperty('--muted-foreground', '100 116 139'); // Slate 500
    root.style.setProperty('--accent', '239 246 255'); // Blue 50
    root.style.setProperty('--accent-foreground', '15 23 42'); // Slate 900
    root.style.setProperty('--destructive', '239 68 68'); // Red 500
    root.style.setProperty('--destructive-foreground', '255 255 255'); // White
    root.style.setProperty('--border', '226 232 240'); // Slate 200
    root.style.setProperty('--input', '248 250 252'); // Slate 50
    root.style.setProperty('--ring', '34 197 94'); // Emerald 500
  }, [theme]);

  const toggleTheme = () => {
    // Keep light theme for now
    setTheme('light');
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
