// Get the base URL from environment or use a default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Flag to determine if we should use the real API or fall back to static files
const USE_REAL_API = true; // Set to false for development without backend

// ESG Metrics interface based on backend response
export interface ESGMetrics {
  water_usage_change: Array<{ Year: number; percentage_change: number }>;
  water_usage: Array<{ Year: number; 'Water Usage (m3)': number }>;
  employee_safety_change: Array<{ Year: number; percentage_change: number }>;
  waste_recycled_change: Array<{ Year: number; percentage_change: number }>;
  waste_unrecycled_change: Array<{ Year: number; percentage_change: number }>;
  waste_recycled: Array<{ Year: number; 'Waste Recycled (tons)': number; 'Waste Unrecycled (tons)': number }>;
  waste_recycled_latest: Array<{ name: string; value: number; color: string }>;
  carbon_emissions_change: Array<{ Year: number; percentage_change: number }>;
  carbon_emissions_renewable_change: Array<{ Year: number; percentage_change: number }>;
  carbon_emissions_nonrenewable_change: Array<{ Year: number; percentage_change: number }>;
  carbon_emissions: Array<{ Year: number; 'Carbon Emissions Renewable (%)': number; 'Carbon Emissions Non-Renewable (%)': number }>;
  energy_usage: Array<{ Year: number; 'Energy Renewable (%)': number; 'Energy Non-Renewable (%)': number }>;
  energy_usage_latest: Array<{ name: string; value: number; color: string }>;
  energy_renewable_change: Array<{ Year: number; percentage_change: number }>;
  energy_nonrenewable_change: Array<{ Year: number; percentage_change: number }>;
  safety_data: Array<{ type: string; count: number; color: string }>;
  diversity_data: Array<{
    category: string;
    men: number;
    women: number;
    minority: number;
  }>;
  wellness_data: Array<{ Year: number; 'Employees covered by collective bargaining Persons annual': number }>;
  labor_rights_compliance_score: number;
  gender_diversity_board: Array<{ name: string; value: number; color: string; description: string }>;
  anti_corruption_training: number;
  disability_representation: number;
  education_diversity_data: Array<{ name: string; value: number; color: string; description: string }>;
  age_group_composition: Array<{ name: string; value: number; color: string; description: string }>;
  ethnic_diversity_data: Array<{ name: string; value: number; color: string; description: string }>;
  shareholder_rights_data: Array<{
    Year: number;
    'Pension fund': number;
    'Ataturk shares': number;
    'Free float': number;
  }>;
}

/**
 * Get the current user's JWT token from Supabase session
 */
import { supabase } from '@/integrations/supabase/client';

async function getAuthToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();
  
  // For debugging large token size
  if (session?.access_token) {
    const tokenSize = new Blob([session.access_token]).size;
    console.log(`JWT token size: ${tokenSize} bytes`);
  }
  
  return session?.access_token || null;
}

// Cache for API responses
const apiCache: Record<string, {data: any, timestamp: number}> = {};
const CACHE_DURATION = 60000; // 1 minute cache duration

/**
 * Generic API request handler with fallback to static files and caching
 */
async function apiRequest<T>(
  endpoint: string,
  method: string = 'GET',
  data?: FormData | Record<string, unknown>,
  fallbackPath?: string, // Path to a static file to use as fallback
  cacheResponse: boolean = false, // Whether to cache the response
): Promise<T> {
  const cacheKey = `${method}:${endpoint}:${data ? JSON.stringify(data) : ''}`;
  
  // Check cache for GET requests
  if (cacheResponse && method === 'GET' && apiCache[cacheKey]) {
    const cachedItem = apiCache[cacheKey];
    const isExpired = Date.now() - cachedItem.timestamp > CACHE_DURATION;
    
    if (!isExpired) {
      console.log(`Using cached response for ${endpoint}`);
      return cachedItem.data as T;
    } else {
      console.log(`Cache expired for ${endpoint}`);
      delete apiCache[cacheKey];
    }
  }
  
  if (!USE_REAL_API && fallbackPath) {
    // If using fallback, directly return a fetch to the static file
    console.log(`Using fallback path: ${fallbackPath}`);
    const response = await fetch(fallbackPath);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch fallback file: ${fallbackPath}`);
    }
    
    if (fallbackPath.endsWith('.pdf')) {
      return response as unknown as T;
    }
    
    const data = await response.json();
    
    // Cache the response if needed
    if (cacheResponse) {
      apiCache[cacheKey] = {
        data,
        timestamp: Date.now()
      };
    }
    
    return data;
  }
  
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Sending ${method} request to: ${url}`);
    
    // Get the authentication token
    const authToken = await getAuthToken();
    console.log('Auth token available:', authToken ? 'Yes' : 'No');
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      } as HeadersInit,
      // Enable credentials for cross-origin requests with cookies
      credentials: 'include',
    };
    
    // Add the Authorization header if we have a token
    if (authToken) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${authToken}`
      };
    } else {
      console.log('No auth token available - authentication will fail');
    }
  
    if (data) {
      if (data instanceof FormData) {
        // Remove Content-Type header to let browser set it with boundary
        delete options.headers['Content-Type'];
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }
  
    const startTime = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    console.log(`Request to ${endpoint} completed in ${endTime - startTime}ms`);
    
    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.detail || errorMessage;
      } catch (e) {
        // Unable to parse error as JSON
      }
      throw new Error(errorMessage);
    }
  
    // For PDF response types, return the response object directly
    if (response.headers.get('Content-Type')?.includes('application/pdf')) {
      return response as unknown as T;
    }
  
    const responseData = await response.json();
    
    // Cache the response if needed
    if (cacheResponse) {
      apiCache[cacheKey] = {
        data: responseData,
        timestamp: Date.now()
      };
    }
    
    return responseData;
  } catch (error) {
    console.error('API request failed:', error);
    
    // If there's a network error and a fallback is provided, use it
    if (fallbackPath) {
      console.log(`API request failed, using fallback: ${fallbackPath}`);
      const response = await fetch(fallbackPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch fallback file: ${fallbackPath}`);
      }
      
      if (fallbackPath.endsWith('.pdf')) {
        return response as unknown as T;
      }
      
      const data = await response.json();
      
      // Cache the fallback data if needed
      if (cacheResponse) {
        apiCache[cacheKey] = {
          data,
          timestamp: Date.now()
        };
      }
      
      return data;
    }
    
    throw error;
  }
}

/**
 * Upload an Excel file to generate ESG metrics
 */
export async function uploadESGFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  // Use a mock JSON file as fallback
  return apiRequest<ESGMetrics>('/uploadfile/', 'POST', formData, '/mock-data/esg-metrics.json');
}

/**
 * Generate a comprehensive ESG report PDF
 */
export async function generateESGReport(file: File) {
  const formData = new FormData();
  formData.append('excel_file', file);
  // Use a static PDF as fallback
  return apiRequest<Response>('/report', 'POST', formData, '/ESG_Report.pdf');
}

/**
 * Download a generated PDF report
 */
export async function downloadPDFReport(response: Response, filename: string) {
  try {
    console.log('Downloading PDF report:', filename);
    const contentType = response.headers.get('Content-Type');
    console.log('Content-Type:', contentType);
    
    if (!contentType?.includes('application/pdf')) {
      console.warn('Response is not a PDF. Content-Type:', contentType);
    }
    
    const blob = await response.blob();
    console.log('Blob size:', blob.size, 'bytes');
    
    if (blob.size === 0) {
      throw new Error('Downloaded file is empty');
    }
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    
    // Fallback to a static PDF if available
    try {
      console.log('Using fallback PDF');
      const fallbackResponse = await fetch('/ESG_Report.pdf');
      const blob = await fallbackResponse.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (fallbackError) {
      console.error('Fallback download failed:', fallbackError);
      throw error; // Throw the original error
    }
  }
}

/**
 * Interface for Report metadata from the backend
 */
export interface ReportMetadata {
  id: number;
  filename: string;
  created_at: string;
  user_id?: string;
  file_size?: number;
  display_name?: string; // A shortened filename for display purposes
}

/**
 * Get all reports for the current user
 */
export async function getUserReports(): Promise<ReportMetadata[]> {
  console.log("Calling getUserReports API endpoint");
  
  try {
    // Use caching for this endpoint to improve performance
    const response = await apiRequest<{reports: ReportMetadata[]}>('/reports', 'GET', undefined, undefined, true);
    
    // Check if response or response.reports is undefined
    if (!response || !response.reports) {
      console.warn("Invalid response format:", response);
      return [];
    }
    
    // Validate each report has the required fields
    const validReports = response.reports.filter(report => {
      if (!report || typeof report !== 'object') {
        return false;
      }
      
      // Check for required fields
      if (!('id' in report) || !('filename' in report) || !('created_at' in report)) {
        return false;
      }
      
      return true;
    });
    
    console.log(`Found ${validReports.length} valid reports`);
    return validReports;
  } catch (error) {
    console.error('Failed to fetch user reports:', error);
    return [];
  }
}

/**
 * Get a signed URL for direct file access
 */
export async function getSignedReportUrl(reportId: number): Promise<{url: string, filename: string}> {
  try {
    return await apiRequest<{url: string, filename: string}>(`/reports/${reportId}/signed-url`, 'GET');
  } catch (error) {
    console.error(`Failed to get signed URL for report ID ${reportId}:`, error);
    throw error;
  }
}

/**
 * Download a specific report by ID
 */
export async function downloadReportById(reportId: number, filename: string): Promise<boolean> {
  try {
    // First try to get a signed URL for direct file access (faster)
    try {
      const { url } = await getSignedReportUrl(reportId);
      // Use the full URL (prepend API_BASE_URL if it's a relative URL)
      const fullUrl = url.startsWith('/') ? `${API_BASE_URL}${url}` : url;
      console.log(`Using direct file access with signed URL: ${fullUrl}`);
      
      const response = await fetch(fullUrl);
      return downloadPDFReport(response, filename);
    } catch (signedUrlError) {
      console.warn('Failed to use signed URL, falling back to regular download:', signedUrlError);
      // Fall back to regular download if signed URL fails
      const response = await apiRequest<Response>(`/reports/${reportId}`, 'GET');
      return downloadPDFReport(response, filename);
    }
  } catch (error) {
    console.error(`Failed to download report ID ${reportId}:`, error);
    throw error;
  }
}
