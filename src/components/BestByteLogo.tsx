
import React from 'react';
import { BIcon } from './BIcon';

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
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const getTextColor = () => {
    switch (variant) {
      case 'white':
        return 'text-white';
      case 'dark':
        return 'text-gray-800 dark:text-gray-200';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <BIcon size={size} />

      {/* Brand Text */}
      {showText && (
        <span className={`font-montserrat font-bold ${textSizeClasses[size]} ${getTextColor()} tracking-tight`}>
          BestByte
        </span>
      )}
    </div>
  );
};
