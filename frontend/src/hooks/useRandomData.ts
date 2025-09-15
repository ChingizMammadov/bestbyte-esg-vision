import React, { useEffect, useState } from 'react';

/**
 * Custom hook to check if random data has been generated
 * @returns Boolean indicating if random data has been generated
 */
export function useRandomDataCheck() {
  const [isRandomDataGenerated, setIsRandomDataGenerated] = useState(false);
  
  useEffect(() => {
    const checkFlag = () => {
      const flag = localStorage.getItem('randomDataGenerated') === 'true';
      setIsRandomDataGenerated(flag);
    };
    
    // Check initially
    checkFlag();
    
    // Set up event listener for storage changes (in case data is generated in another tab)
    const handleStorageChange = () => {
      checkFlag();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return isRandomDataGenerated;
}

/**
 * Custom hook to get data from localStorage with a default fallback
 * @param key The localStorage key
 * @param defaultValue The default value to use if localStorage doesn't have the key
 * @returns The parsed data or default value
 */
export function useLocalStorageData<T>(key: string, defaultValue: T): T {
  const [data, setData] = useState<T>(defaultValue);
  
  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.error(`Error parsing ${key} from localStorage:`, error);
      }
    }
    
    // Set up event listener for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          const parsedData = JSON.parse(event.newValue);
          setData(parsedData);
        } catch (error) {
          console.error(`Error parsing ${key} from storage event:`, error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);
  
  return data;
}