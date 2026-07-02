"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type {
  AnalyticsResponse,
  AudienceResponse,
  ContentResponse,
  OverviewResponse,
  UserDto,
} from "@/lib/types/api";

export function useOverview() {
  return useQuery({
    queryKey: queryKeys.dashboard.overview,
    queryFn: () => apiFetch<OverviewResponse>("/api/dashboard/overview"),
    staleTime: 30_000,
  });
}

export function useAnalytics() {
  return useQuery({
    queryKey: queryKeys.dashboard.analytics,
    queryFn: () => apiFetch<AnalyticsResponse>("/api/dashboard/analytics"),
    staleTime: 30_000,
  });
}

export function useContent() {
  return useQuery({
    queryKey: queryKeys.dashboard.content,
    queryFn: () => apiFetch<ContentResponse>("/api/dashboard/content"),
    staleTime: 30_000,
  });
}

export function useAudience() {
  return useQuery({
    queryKey: queryKeys.dashboard.audience,
    queryFn: () => apiFetch<AudienceResponse>("/api/dashboard/audience"),
    staleTime: 30_000,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name?: string; email?: string }) =>
      apiFetch<{ user: UserDto }>("/api/dashboard/settings", {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
