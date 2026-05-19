
import React from 'react';

interface BestByteLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  showText?: boolean;
  className?: string;
}

const imgSizeClasses = {
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
  xl: 'h-14 w-14',
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export const BestByteLogo: React.FC<BestByteLogoProps> = ({
  size = 'md',
  variant = 'default',
  showText = true,
  className = '',
}) => {
  const textColor =
    variant === 'white'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-gray-800 dark:text-gray-200'
      : 'text-primary';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo_image.png"
        alt="BestByte logo"
        className={`${imgSizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className={`font-montserrat font-bold ${textSizeClasses[size]} ${textColor} tracking-tight`}>
          BestByte
        </span>
      )}
    </div>
  );
};
