"use client";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import { useAudience } from "@/hooks/use-dashboard";

export default function AudiencePage() {
  const { data, isLoading, isError } = useAudience();

  if (isLoading) {
    return (
      <DashboardShell title="Audience" subtitle="Loading audience data...">
        <p className="text-slate-400">Fetching audience insights...</p>
      </DashboardShell>
    );
  }

  if (isError || !data) {
    return (
      <DashboardShell title="Audience" subtitle="Error">
        <p className="text-rose-300">Failed to load audience data.</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Audience" subtitle="Understand who watches and engages with your content">
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-white">Age distribution</h2>
          <div className="mt-5 space-y-4">
            {data.segments.map((segment) => (
              <div key={segment.id}>
                <div className="mb-1 flex justify-between text-sm text-slate-300">
                  <span>{segment.label}</span>
                  <span>{segment.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                    style={{ width: `${segment.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-white">Audience insights</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {data.insights.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-3">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </DashboardShell>
  );
}
