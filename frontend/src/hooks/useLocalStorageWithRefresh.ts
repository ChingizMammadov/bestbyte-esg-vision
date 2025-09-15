import { useState, useEffect } from 'react';

/**
 * A custom hook that loads data from localStorage and refreshes when the dataUpdated event is triggered
 * 
 * @param key The localStorage key to load data from
 * @param defaultValue The default value to use if localStorage doesn't have the key
 * @returns The data from localStorage or the default value
 */
export function useLocalStorageWithRefresh<T>(key: string, defaultValue: T): T {
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    // Function to load data from localStorage
    const loadData = () => {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
        } catch (error) {
          console.error(`Error parsing ${key} data from localStorage:`, error);
        }
      }
    };
  
    // Load data initially
    loadData();
    
    // Add event listener for data updates
    const handleDataUpdate = () => {
      loadData();
    };
    
    window.addEventListener('dataUpdated', handleDataUpdate);
    
    // Clean up
    return () => {
      window.removeEventListener('dataUpdated', handleDataUpdate);
    };
  }, [key]);

  return data;
}