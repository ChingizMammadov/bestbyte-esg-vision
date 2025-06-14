
import React from 'react';
import { LogOut, User, Calendar, Search } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
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
    await signOut();
    navigate('/login');
  };

  return (
    <header className="w-full py-4 px-4 md:px-6 bg-white/95 border-b border-gray-200 shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Company and Greeting Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Acme Corp
            </h1>
            <p className="text-sm text-gray-600">{getGreeting()}</p>
            <p className="text-xs text-gray-500">{getCurrentDate()}</p>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search ESG data..." 
              className="pl-10 w-full sm:w-64 bg-white border-gray-300 focus:border-blue-500" 
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto bg-white border-gray-300 hover:bg-gray-50">
            <Calendar className="mr-2 h-4 w-4" />
            Select Period
          </Button>
        </div>

        {/* User Info and Logout */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            <div className="text-sm">
              <span className="text-gray-600">Logged in as </span>
              <span className="font-semibold text-gray-900">{user?.email}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-red-100 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
