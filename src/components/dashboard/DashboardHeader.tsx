
import React from 'react';
import { LogOut, User, Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <header className="w-full py-3 md:py-4 px-3 md:px-6 bg-white/95 border-b border-gray-200 shadow-sm">
      <div className="flex flex-col gap-3 md:gap-4">
        {/* Top row - Company info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div>
              <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-gray-900">
                Acme Corp
              </h1>
              <p className="text-xs md:text-sm text-gray-600">{getGreeting()}</p>
              <p className="text-xs text-gray-500 hidden sm:block">{getCurrentDate()}</p>
            </div>
          </div>

          {/* User info - always visible but compact on mobile */}
          <div className="flex items-center gap-2 bg-gray-50 px-2 md:px-4 py-1.5 md:py-2 rounded-lg">
            <User className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <div className="text-xs md:text-sm min-w-0">
              <span className="text-gray-600 hidden sm:inline">Logged in as </span>
              <span className="font-semibold text-gray-900 truncate block sm:inline">{user?.email}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-1 md:gap-2 hover:bg-red-100 hover:text-red-600 transition-colors p-1 md:p-2"
              title="Log Out"
            >
              <LogOut className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden md:inline">Log Out</span>
            </Button>
          </div>
        </div>

        {/* Search and Controls - stacked on mobile */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search ESG data..." 
              className="pl-10 bg-white border-gray-300 focus:border-blue-500 text-sm" 
            />
          </div>
          <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50 text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Select Period</span>
            <span className="sm:hidden">Period</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
