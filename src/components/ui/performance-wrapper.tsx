import React, { useState, useEffect, useCallback } from 'react';

interface PerformanceWrapperProps {
  children: React.ReactNode;
  delayMs?: number;
}

/**
 * A component that helps prevent UI freezing by rendering children after a small delay
 * to allow the main thread to complete other tasks.
 */
export function PerformanceWrapper({ children, delayMs = 0 }: PerformanceWrapperProps) {
  const [shouldRender, setShouldRender] = useState(delayMs === 0);

  useEffect(() => {
    if (delayMs > 0) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delayMs);
      
      return () => clearTimeout(timer);
    }
  }, [delayMs]);

  if (!shouldRender) {
    return <div className="p-2 text-center text-sm text-slate-400">Loading...</div>;
  }

  return <>{children}</>;
}

interface LazySelectWrapperProps {
  children: React.ReactNode;
  isOpen: boolean;
}

/**
 * A component that only renders its children when it's open/visible
 * to improve performance of heavy select/dropdown components
 */
export function LazySelectWrapper({ children, isOpen }: LazySelectWrapperProps) {
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true);
    }
  }, [isOpen, shouldRender]);
  
  if (!shouldRender && !isOpen) {
    return null;
  }
  
  return <>{children}</>;
}
