
import React from 'react';
import { LogOut, User, Calendar, Search } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning, Jane";
    if (hour < 18) return "Good afternoon, Jane";
    return "Good evening, Jane";
  };

  return (
    <header className="w-full py-4 px-4 md:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between bg-background/70 border-b border-white/10 gap-4">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight drop-shadow-xl">
          {getGreeting()}
        </h1>
        <p className="text-xs md:text-sm font-medium text-primary/70">
          Here are your latest ESG insights for Acme Corp.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8 w-full sm:w-48 md:w-64 bg-white" />
        </div>
        <Button variant="outline" className="w-full sm:w-auto bg-white">
          <Calendar className="mr-2 h-4 w-4" />
          Select Period
        </Button>
      </div>
      <div className="flex flex-row gap-2 items-center bg-gray-100/80 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition group w-full lg:w-auto justify-between">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary/70" />
          <div className="text-gray-700 text-xs md:text-sm font-medium">
            <span className="hidden sm:inline">Logged in as </span>
            <span className="font-bold text-primary">jane@acme.com</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <SidebarTrigger className="hidden md:inline-flex" />
          <Button variant="ghost" size="sm" className="flex gap-1 items-center hover:bg-red-100 hover:text-red-600 font-semibold text-xs transition active:scale-95">
            <LogOut size={16} />
            <span className="hidden sm:inline">Log Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
