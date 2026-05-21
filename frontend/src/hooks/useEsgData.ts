import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const COMPANY = '8479cb95-2057-490d-813c-825e83d71890';

async function apiFetch(path: string) {
  const clerk = (window as any).Clerk;
  const token = clerk?.session ? await clerk.session.getToken() : null;
  const res = await fetch(`${API}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export function useCarbonFootprint(companyId = COMPANY) {
  return useQuery({
    queryKey: ['carbon-footprint', companyId],
    queryFn: () => apiFetch(`/api/esg/carbon?company_id=${companyId}`).then(r => r.data),
    enabled: !!companyId,
  });
}

export function useEnergyConsumption(companyId = COMPANY) {
  return useQuery({
    queryKey: ['energy-consumption', companyId],
    queryFn: () => apiFetch(`/api/esg/energy?company_id=${companyId}`).then(r => r.data),
    enabled: !!companyId,
  });
}

export function useSupplyChainMetrics(companyId = COMPANY) {
  return useQuery({
    queryKey: ['supply-chain-metrics', companyId],
    queryFn: () => apiFetch(`/api/esg/suppliers?company_id=${companyId}`).then(r => r.data),
    enabled: !!companyId,
  });
}

export function useEsgTargets(companyId = COMPANY) {
  return useQuery({
    queryKey: ['esg-targets', companyId],
    queryFn: () => apiFetch(`/api/esg/targets?company_id=${companyId}`).then(r => r.data),
    enabled: !!companyId,
  });
}

export function useEsgScore(companyId = COMPANY) {
  return useQuery({
    queryKey: ['esg-score', companyId],
    queryFn: () => apiFetch(`/api/analytics/score?company_id=${companyId}`),
    enabled: !!companyId,
  });
}

export function useAnalyticsSummary(companyId = COMPANY) {
  return useQuery({
    queryKey: ['analytics-summary', companyId],
    queryFn: () => apiFetch(`/api/analytics/summary?company_id=${companyId}`),
    enabled: !!companyId,
  });
}

export function useUserProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: () => apiFetch(`/api/users/profile`),
    enabled: !!user?.id,
  });
}

export function useCreateEsgTarget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (targetData: any) => {
      const clerk = (window as any).Clerk;
      const token = clerk?.session ? await clerk.session.getToken() : null;
      const res = await fetch(`${API}/api/esg/targets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(targetData),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['esg-targets'] }),
  });
}

// Legacy aliases kept for pages that import these names
export const useEsgScores = useEsgScore;
export const useCompanies = () => useQuery({
  queryKey: ['companies'],
  queryFn: () => apiFetch(`/api/esg/carbon?company_id=${COMPANY}`).then(() => []),
});
export const useBenchmarkData = () => useQuery({
  queryKey: ['benchmark-data'],
  queryFn: () => Promise.resolve([]),
});
export const useUserRoles = () => useQuery({
  queryKey: ['user-roles'],
  queryFn: () => Promise.resolve([]),
});
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => ({}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-profile'] }),
  });
};
