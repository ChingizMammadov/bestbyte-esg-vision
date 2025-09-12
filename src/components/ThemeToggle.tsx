import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-10 w-10 px-0 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 dark:from-amber-400/25 dark:to-orange-400/25 dark:hover:from-amber-500/25 dark:hover:to-orange-500/25 border border-indigo-600 dark:border-yellow-500 hover:border-indigo-800 dark:hover:border-yellow-400 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <div className="relative">
          <Moon className="h-4 w-4 text-indigo-600 hover:text-indigo-800 transition-colors" />
        </div>
      ) : (
        <div className="relative">
          <Sun className="h-4 w-4 text-yellow-500 hover:text-yellow-400 transition-colors" />
        </div>
      )}
    </Button>
  );
}
