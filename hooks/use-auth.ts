"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { apiFetch } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { UserDto } from "@/lib/types/api";

type AuthMeResponse = { user: UserDto };
type AuthLoginResponse = { user: UserDto };

export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => apiFetch<AuthMeResponse>("/api/auth/me"),
    retry: false,
    staleTime: 60_000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      apiFetch<AuthLoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      router.push("/dashboard");
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: { name: string; email: string; password: string }) =>
      apiFetch<AuthLoginResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      router.push("/dashboard");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () =>
      apiFetch<{ success: boolean }>("/api/auth/logout", {
        method: "POST",
      }),
    onSuccess: async () => {
      queryClient.clear();
      router.push("/");
    },
  });
}

export function useRequireAuth() {
  const router = useRouter();
  const me = useMe();

  useEffect(() => {
    if (!me.isLoading && me.isError) router.replace("/");
  }, [me.isLoading, me.isError, router]);

  return {
    user: me.data?.user ?? null,
    loading: me.isLoading,
  };
}
