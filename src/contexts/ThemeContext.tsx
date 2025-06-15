
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      return stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);

    // Apply enhanced dark mode CSS variables
    if (theme === 'dark') {
      root.style.setProperty('--background', '18 18 18'); // #121212
      root.style.setProperty('--foreground', '224 224 224'); // #E0E0E0
      root.style.setProperty('--card', '42 42 42'); // #2A2A2A
      root.style.setProperty('--card-foreground', '255 255 255'); // #FFFFFF
      root.style.setProperty('--popover', '42 42 42'); // #2A2A2A
      root.style.setProperty('--popover-foreground', '255 255 255');
      root.style.setProperty('--primary', '76 175 80'); // #4CAF50
      root.style.setProperty('--primary-foreground', '255 255 255');
      root.style.setProperty('--secondary', '68 68 68'); // #444444
      root.style.setProperty('--secondary-foreground', '224 224 224');
      root.style.setProperty('--muted', '51 51 51'); // #333333
      root.style.setProperty('--muted-foreground', '179 179 179'); // #B3B3B3
      root.style.setProperty('--accent', '0 191 174'); // #00BFAE
      root.style.setProperty('--accent-foreground', '255 255 255');
      root.style.setProperty('--destructive', '244 67 54'); // #F44336
      root.style.setProperty('--destructive-foreground', '255 255 255');
      root.style.setProperty('--border', '68 68 68'); // #444444
      root.style.setProperty('--input', '51 51 51'); // #333333
      root.style.setProperty('--ring', '76 175 80'); // #4CAF50
    } else {
      // Reset to light mode defaults
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '222.2 84% 4.9%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '222.2 84% 4.9%');
      root.style.setProperty('--popover', '0 0% 100%');
      root.style.setProperty('--popover-foreground', '222.2 84% 4.9%');
      root.style.setProperty('--primary', '142 86% 28%');
      root.style.setProperty('--primary-foreground', '356 29% 98%');
      root.style.setProperty('--secondary', '210 40% 96%');
      root.style.setProperty('--secondary-foreground', '222.2 84% 4.9%');
      root.style.setProperty('--muted', '210 40% 96%');
      root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
      root.style.setProperty('--accent', '210 40% 96%');
      root.style.setProperty('--accent-foreground', '222.2 84% 4.9%');
      root.style.setProperty('--destructive', '0 84% 60%');
      root.style.setProperty('--destructive-foreground', '210 40% 98%');
      root.style.setProperty('--border', '214.3 31.8% 91.4%');
      root.style.setProperty('--input', '214.3 31.8% 91.4%');
      root.style.setProperty('--ring', '142 86% 28%');
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
