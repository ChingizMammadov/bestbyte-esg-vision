import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollbarProviderProps {
  children: ReactNode;
}

export const ScrollbarProvider = ({ children }: ScrollbarProviderProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Remove any existing scrollbar classes
    document.documentElement.classList.remove('route-landing', 'route-app');
    document.body.classList.remove('route-landing', 'route-app');
    
    // Determine which theme to apply
    let themeClass = '';
    
    if (
      pathname === '/' || 
      pathname === '/about' || 
      pathname === '/pricing' || 
      pathname === '/signup' || 
      pathname === '/login' ||
      pathname === '/forgot-password' ||
      pathname === '/reset-password'
    ) {
      themeClass = 'route-landing';
    } else if (
      pathname.startsWith('/dashboard') || 
      pathname.startsWith('/reports') || 
      pathname.startsWith('/carbon-calculator') || 
      pathname.startsWith('/analytics') || 
      pathname.startsWith('/settings')
    ) {
      themeClass = 'route-app';
    }
    
    // Apply the theme class to both html and body elements
    if (themeClass) {
      document.documentElement.classList.add(themeClass);
      document.body.classList.add(themeClass);
      
      // Apply to div elements with scrollable content
      const applyScrollbarStyles = () => {
        const scrollableElements = document.querySelectorAll('div[style*="overflow"], .scrollable');
        scrollableElements.forEach(element => {
          element.classList.remove('route-landing', 'route-app');
          element.classList.add(themeClass);
        });
      };
      
      // Run initially
      applyScrollbarStyles();
      
      // Set up a mutation observer to apply styles to new elements
      const observer = new MutationObserver(applyScrollbarStyles);
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'] 
      });
      
      return () => observer.disconnect();
    }
  }, [pathname]);

  return <>{children}</>;
};
