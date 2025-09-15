
import React from 'react';
import { LogOut, User, Calendar, Search, Sparkles, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '../ui/sidebar';
import { ThemeToggle } from '../ThemeToggle';
import { responsiveText } from '@/utils/responsiveUtils';

export function DashboardHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    const userName = user?.email?.split('@')[0] || 'User';
    if (hour < 12) return `Good morning, ${userName}`;
    if (hour < 18) return `Good afternoon, ${userName}`;
    return `Good evening, ${userName}`;
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="w-full py-3 md:py-6 px-3 md:px-6 bg-gradient-to-r from-white/95 via-blue-50/95 to-purple-50/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-indigo-900/95 backdrop-blur-sm border-b border-blue-100/60 dark:border-gray-700/60">
      <div className="flex flex-col gap-3 md:gap-6">
        {/* Top row - Company info */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="flex-shrink-0" />
            <div className="relative">
              <div className="relative bg-white dark:bg-gray-800 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border border-blue-200/50 dark:border-blue-900/50 hover:border-blue-300/50 dark:hover:border-blue-800/50 transition-all duration-300">
                <h1 className="text-base sm:text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Acme Corp
                </h1>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-500 dark:text-yellow-400" />
                  <span className="truncate max-w-[100px] sm:max-w-none">{getGreeting()}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block font-medium">{getCurrentDate()}</p>
              </div>
            </div>
          </div>

          {/* User info - enhanced design */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-2 rounded-xl sm:rounded-2xl border border-indigo-200/60 dark:border-indigo-800/60 hover:border-indigo-300/60 dark:hover:border-indigo-700/60 transition-all duration-300">
            <ThemeToggle />
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-800/50 dark:to-purple-800/50 rounded-lg sm:rounded-xl border border-indigo-200/50 dark:border-indigo-700/50 hidden xs:block">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            </div>
            <div className="text-xs md:text-sm min-w-0 max-w-[80px] sm:max-w-[120px] md:max-w-none">
              <span className="text-gray-600 dark:text-gray-300 hidden sm:inline font-medium">Logged in as </span>
              <span className="font-bold text-gray-900 dark:text-gray-100 truncate block sm:inline">{user?.email}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-1 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-transparent hover:border-red-200 dark:hover:border-red-800"
              title="Log Out"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden md:inline text-xs font-medium">Log Out</span>
            </Button>
          </div>
        </div>

        {/* Search and Controls - enhanced design */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500 z-20" />
              <Input 
                placeholder="Search ESG data, metrics, targets..." 
                className="pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-300 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500" 
              />
            </div>
          </div>
          <Button 
            variant="outline" 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-gray-700 dark:text-gray-200"
          >
            <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Select Period</span>
            <span className="xs:hidden">Period</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
