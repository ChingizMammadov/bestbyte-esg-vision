import React from 'react';
import { 
  responsive, 
  responsiveGridLayouts, 
  responsivePadding, 
  responsiveText 
} from '@/utils/responsiveUtils';

/**
 * This is an example component that showcases best practices for responsive design
 * using the utility functions from responsiveUtils.ts
 */
export const ResponsiveExample = () => {
  return (
    <div className={responsivePadding.section}>
      <h1 className={responsiveText.heading1}>Responsive Design Example</h1>
      <p className={responsiveText.body}>
        This component demonstrates the responsive design patterns recommended for the application.
      </p>
      
      {/* Example of responsive grid layout */}
      <div className={responsiveGridLayouts.standard}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md"
          >
            <h3 className={responsiveText.heading3}>Card {i + 1}</h3>
            <p className={responsiveText.small}>
              This card demonstrates responsive sizing and layout.
            </p>
          </div>
        ))}
      </div>
      
      {/* Example of custom responsive classes */}
      <div className={responsive(
        'mt-8 p-4 bg-blue-100 rounded-lg', // base classes
        'p-6', // sm classes
        'p-8 bg-blue-200', // md classes
        'p-10 rounded-xl', // lg classes
        'p-12' // xl classes
      )}>
        <h2 className={responsiveText.heading2}>Custom Responsive Component</h2>
        <p className={responsiveText.body}>
          This section uses the responsive() utility function to apply different classes
          at different breakpoints.
        </p>
      </div>
      
      {/* Example of responsive form layout */}
      <form className={`${responsiveGridLayouts.form} mt-8`}>
        <div className="space-y-2">
          <label className={`${responsiveText.small} font-medium`}>
            First Name
          </label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-lg" 
          />
        </div>
        
        <div className="space-y-2">
          <label className={`${responsiveText.small} font-medium`}>
            Last Name
          </label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-lg" 
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className={`${responsiveText.small} font-medium`}>
            Email Address
          </label>
          <input 
            type="email" 
            className="w-full p-2 border rounded-lg" 
          />
        </div>
      </form>
    </div>
  );
};

export default ResponsiveExample;
