
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, FileText, Calculator, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Calculator', href: '/carbon-calculator', icon: Calculator },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function MobileNavigation() {
  const location = useLocation();
  const { user } = useAuth();

  // Only show mobile navigation if user is authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-lg safe-area-pb">
      <div className="flex items-center justify-around py-1 px-2 h-16">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                isActive 
                  ? 'text-primary bg-primary/10 scale-105' 
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }`}
              aria-label={item.name}
            >
              <Icon className="h-4 w-4 mb-1 flex-shrink-0" />
              <span className="text-xs font-medium truncate max-w-full">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
