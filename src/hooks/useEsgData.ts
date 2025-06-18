
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Hook for fetching ESG scores
export function useEsgScores() {
  return useQuery({
    queryKey: ['esg-scores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('esg_scores')
        .select('*')
        .order('category');
      
      if (error) throw error;
      return data;
    }
  });
}

// Hook for fetching company data
export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });
}

// Hook for fetching carbon footprint data
export function useCarbonFootprint(companyId?: string) {
  return useQuery({
    queryKey: ['carbon-footprint', companyId],
    queryFn: async () => {
      let query = supabase
        .from('carbon_footprint_details')
        .select('*')
        .order('reporting_period', { ascending: false });
      
      if (companyId) {
        query = query.eq('company_id', companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!companyId
  });
}

// Hook for fetching energy consumption data
export function useEnergyConsumption(companyId?: string) {
  return useQuery({
    queryKey: ['energy-consumption', companyId],
    queryFn: async () => {
      let query = supabase
        .from('energy_consumption')
        .select('*')
        .order('reporting_period', { ascending: false });
      
      if (companyId) {
        query = query.eq('company_id', companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!companyId
  });
}

// Hook for fetching supply chain metrics
export function useSupplyChainMetrics(companyId?: string) {
  return useQuery({
    queryKey: ['supply-chain-metrics', companyId],
    queryFn: async () => {
      let query = supabase
        .from('supply_chain_metrics')
        .select('*')
        .order('esg_score', { ascending: false });
      
      if (companyId) {
        query = query.eq('company_id', companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!companyId
  });
}

// Hook for fetching ESG targets
export function useEsgTargets(companyId?: string) {
  return useQuery({
    queryKey: ['esg-targets', companyId],
    queryFn: async () => {
      let query = supabase
        .from('esg_targets')
        .select('*')
        .eq('is_active', true)
        .order('target_date');
      
      if (companyId) {
        query = query.eq('company_id', companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!companyId
  });
}

// Hook for fetching user profile
export function useUserProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });
}

// Hook for fetching user roles
export function useUserRoles() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-roles', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });
}

// Hook for fetching benchmark data
export function useBenchmarkData(industry?: string, companySize?: string) {
  return useQuery({
    queryKey: ['benchmark-data', industry, companySize],
    queryFn: async () => {
      let query = supabase
        .from('benchmark_data')
        .select('*')
        .order('metric_name');
      
      if (industry) {
        query = query.eq('industry', industry);
      }
      
      if (companySize) {
        query = query.eq('company_size', companySize);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
}

// Mutation for updating user profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (profileData: any) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    }
  });
}

// Mutation for creating ESG targets
export function useCreateEsgTarget() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (targetData: any) => {
      const { data, error } = await supabase
        .from('esg_targets')
        .insert(targetData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-targets'] });
    }
  });
}
