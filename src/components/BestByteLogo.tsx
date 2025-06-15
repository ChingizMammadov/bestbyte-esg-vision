
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
      <div className={`${sizeClasses[size]} flex-shrink-0 relative`}>
        <img
          src="/lovable-uploads/fb131415-b7a4-4625-8e94-80178d1dec22.png"
          alt="BestByte logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <span className={`font-montserrat font-bold ${textSizeClasses[size]} ${getTextColor()} tracking-tight`}>
          BestByte
        </span>
      )}
    </div>
  );
};
