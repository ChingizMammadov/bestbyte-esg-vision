
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, FileText, Calculator, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Calculator', href: '/carbon-calculator', icon: Calculator },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Only show mobile navigation if user is authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-lg safe-area-pb">
      <div className="flex items-center justify-around py-1 px-2 h-16">
        {navigationItems.slice(0, 4).map((item) => {
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
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center justify-center py-1.5 px-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg min-w-0 flex-1"
              aria-label="More options"
            >
              <Menu className="h-4 w-4 mb-1 flex-shrink-0" />
              <span className="text-xs font-medium">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[60vh] p-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'text-primary bg-primary/10 border border-primary/20' 
                        : 'text-gray-700 hover:text-primary hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
