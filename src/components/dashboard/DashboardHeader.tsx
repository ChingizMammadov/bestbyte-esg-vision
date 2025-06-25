
import React from 'react';
import { LogOut, User, Calendar, Search, Sparkles } from 'lucide-react';
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
    <header className="w-full py-4 md:py-6 px-4 md:px-6 bg-gradient-to-r from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-sm border-b border-blue-100/60">
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Top row - Company info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="relative bg-white p-4 rounded-2xl border border-blue-200/50 hover:border-blue-300/50 transition-all duration-300">
                <h1 className="text-xl md:text-2xl xl:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Acme Corp
                </h1>
                <p className="text-sm md:text-base text-gray-700 font-medium flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  {getGreeting()}
                </p>
                <p className="text-xs text-gray-500 hidden sm:block font-medium">{getCurrentDate()}</p>
              </div>
            </div>
          </div>

          {/* User info - enhanced design */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-indigo-200/60 hover:border-indigo-300/60 transition-all duration-300">
            <div className="p-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl border border-indigo-200/50">
              <User className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            </div>
            <div className="text-sm md:text-base min-w-0">
              <span className="text-gray-600 hidden sm:inline font-medium">Logged in as </span>
              <span className="font-bold text-gray-900 truncate block sm:inline">{user?.email}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all duration-300 p-2 md:p-3 rounded-xl border border-transparent hover:border-red-200"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline font-medium">Log Out</span>
            </Button>
          </div>
        </div>

        {/* Search and Controls - enhanced design */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search ESG data, metrics, targets..." 
                className="pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:border-gray-300 focus:border-blue-400 transition-all duration-300 text-sm font-medium placeholder:text-gray-400" 
              />
            </div>
          </div>
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-300 text-sm font-medium px-6 py-3 rounded-2xl">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Select Period</span>
            <span className="sm:hidden">Period</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
