
import React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-10 w-10 px-0 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <div className="relative">
          <Moon className="h-4 w-4 text-indigo-600 hover:text-indigo-800 transition-colors" />
          <Palette className="absolute -top-1 -right-1 h-2 w-2 text-purple-500" />
        </div>
      ) : (
        <div className="relative">
          <Sun className="h-4 w-4 text-yellow-500 hover:text-yellow-400 transition-colors" />
          <Palette className="absolute -top-1 -right-1 h-2 w-2 text-orange-500" />
        </div>
      )}
    </Button>
  );
}
