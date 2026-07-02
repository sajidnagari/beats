"use client";

import ApiErrorState from "@/components/api-error-state";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import MetricCard from "@/components/dashboard/metric-card";
import MiniChart from "@/components/dashboard/mini-chart";
import { useAnalytics } from "@/hooks/use-dashboard";
import { ApiError, getApiErrorMessage } from "@/lib/api-client";

export default function AnalyticsPage() {
  const { data, isLoading, isError, error } = useAnalytics();

  if (isLoading) {
    return (
      <DashboardShell title="Analytics" subtitle="Loading analytics...">
        <p className="text-slate-400">Fetching analytics...</p>
      </DashboardShell>
    );
  }

  if (isError || !data) {
    return (
      <DashboardShell title="Analytics" subtitle="Unable to load analytics">
        <ApiErrorState
          message={getApiErrorMessage(error, "Failed to load analytics.")}
          code={error instanceof ApiError ? error.code : undefined}
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Analytics" subtitle="Deep dive into performance trends">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <MiniChart title="Views by day" data={data.viewsTrend} />
        <MiniChart title="Engagement by day" data={data.engagementTrend} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {data.extras.map((item) => (
          <article key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
