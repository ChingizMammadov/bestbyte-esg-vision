/**
 * Responsive utility functions and constants for consistent responsive design
 */

/**
 * Standard breakpoints used throughout the application
 */
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Function to generate responsive class names based on screen size
 * @param baseClasses - Base classes applied to all screen sizes
 * @param smClasses - Classes applied at sm breakpoint and above
 * @param mdClasses - Classes applied at md breakpoint and above  
 * @param lgClasses - Classes applied at lg breakpoint and above
 * @param xlClasses - Classes applied at xl breakpoint and above
 * @returns A string of combined class names
 */
export const responsive = (
  baseClasses: string,
  xsClasses?: string,
  smClasses?: string,
  mdClasses?: string,
  lgClasses?: string,
  xlClasses?: string
): string => {
  return [
    baseClasses,
    xsClasses ? `xs:${xsClasses}` : '',
    smClasses ? `sm:${smClasses}` : '',
    mdClasses ? `md:${mdClasses}` : '',
    lgClasses ? `lg:${lgClasses}` : '',
    xlClasses ? `xl:${xlClasses}` : ''
  ].filter(Boolean).join(' ');
};

/**
 * Responsive grid layouts for different screen sizes
 */
export const responsiveGridLayouts = {
  // 1 column on mobile, 2 on tablet, 3 on desktop
  standard: 'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  
  // 1 column on mobile, 2 columns on larger screens
  twoColumn: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  
  // Dashboard specific layouts
  dashboard: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
  
  // For form layouts
  form: 'grid grid-cols-1 md:grid-cols-2 gap-6'
};

/**
 * Responsive padding configurations
 */
export const responsivePadding = {
  section: 'px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-12 xl:px-16',
  container: 'px-4 sm:px-6 lg:px-8',
  card: 'p-4 sm:p-6'
};

/**
 * Responsive text sizes
 */
export const responsiveText = {
  heading1: 'text-2xl sm:text-3xl md:text-4xl font-bold',
  heading2: 'text-xl sm:text-2xl md:text-3xl font-bold',
  heading3: 'text-lg sm:text-xl md:text-2xl font-semibold',
  body: 'text-sm sm:text-base',
  small: 'text-xs sm:text-sm'
};

/**
 * Helper function to conditionally apply classes based on screen size
 */
export const ifMobile = (mobileClass: string, desktopClass: string): string => {
  return `${mobileClass} sm:${desktopClass}`;
};
