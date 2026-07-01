"use client";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import MetricCard from "@/components/dashboard/metric-card";
import MiniChart from "@/components/dashboard/mini-chart";
import { overviewMetrics, weeklyViews } from "@/lib/dashboard-data";

export default function AnalyticsPage() {
  return (
    <DashboardShell title="Analytics" subtitle="Deep dive into performance trends">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <MiniChart title="Views by day" data={weeklyViews} />
        <MiniChart title="Engagement by day" data={[34, 41, 39, 52, 48, 61, 57]} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "Profile visits", value: "18.4K" },
          { label: "Shares", value: "6.2K" },
          { label: "Comments", value: "4.9K" },
        ].map((item) => (
          <article key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
