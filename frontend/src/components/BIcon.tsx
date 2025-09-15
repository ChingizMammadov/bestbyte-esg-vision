
import React from 'react';

interface BIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BIcon: React.FC<BIconProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex-shrink-0 relative`}>
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="bIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        
        {/* Background Circle */}
        <circle cx="16" cy="16" r="15" fill="url(#bIconGradient)" stroke="#065F46" strokeWidth="1"/>
        
        {/* Letter B */}
        <path
          d="M10 8h7c2.5 0 4.5 1.5 4.5 3.5 0 1.2-0.8 2.3-2 2.8 1.5 0.5 2.5 1.8 2.5 3.2 0 2.5-2 4.5-4.5 4.5H10V8z
             M13 11v3h4c1 0 1.5-0.5 1.5-1.5S18 11 17 11h-4z
             M13 16v3h4.5c1 0 1.5-0.5 1.5-1.5S18.5 16 17.5 16H13z"
          fill="white"
        />
        
        {/* Growth Arrow */}
        <path
          d="M22 8l2 2-2 2m0-2h-3"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
