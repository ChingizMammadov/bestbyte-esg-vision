
import React from 'react';

interface BestByteLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  showText?: boolean;
  className?: string;
}

export const BestByteLogo: React.FC<BestByteLogoProps> = ({
  size = 'md',
  variant = 'default',
  showText = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          gradient: 'from-white to-gray-100',
          text: 'text-white',
          bars: 'fill-white',
          circle: 'stroke-white'
        };
      case 'dark':
        return {
          gradient: 'from-gray-800 to-gray-600',
          text: 'text-gray-800 dark:text-gray-200',
          bars: 'fill-gray-800 dark:fill-gray-200',
          circle: 'stroke-gray-800 dark:stroke-gray-200'
        };
      default:
        return {
          gradient: 'from-emerald-500 to-cyan-500',
          text: 'text-primary',
          bars: 'fill-emerald-500',
          circle: 'stroke-cyan-500'
        };
    }
  };

  const colors = getColors();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} flex-shrink-0 relative`}>
        <svg
          viewBox="0 0 32 32"
          className="w-full h-full"
          aria-label="BestByte logo"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          
          {/* Background Circle */}
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="url(#logoGradient)"
            opacity="0.1"
          />
          
          {/* Data Bars (Bar Chart) */}
          <rect x="8" y="20" width="2.5" height="6" fill="url(#barGradient)" rx="1" />
          <rect x="11.5" y="16" width="2.5" height="10" fill="url(#barGradient)" rx="1" />
          <rect x="15" y="12" width="2.5" height="14" fill="url(#barGradient)" rx="1" />
          <rect x="18.5" y="8" width="2.5" height="18" fill="url(#barGradient)" rx="1" />
          
          {/* Sustainability Circle (Circular Arrow) */}
          <path
            d="M 24 10 A 6 6 0 1 1 22 8"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          
          {/* Arrow Head */}
          <path
            d="M 22 8 L 24 6 L 26 8"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data Points */}
          <circle cx="9.25" cy="18" r="1" fill="#06b6d4" />
          <circle cx="12.75" cy="13" r="1" fill="#06b6d4" />
          <circle cx="16.25" cy="9" r="1" fill="#06b6d4" />
          <circle cx="19.75" cy="5" r="1" fill="#06b6d4" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span className={`font-montserrat font-bold ${textSizeClasses[size]} ${colors.text} tracking-tight`}>
          BestByte
        </span>
      )}
    </div>
  );
};
