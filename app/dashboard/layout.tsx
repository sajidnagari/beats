"use client";

import { useRequireAuth } from "@/hooks/use-auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-slate-300">
        Loading dashboard...
      </div>
    );
  }

  return children;
}
