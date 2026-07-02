"use client";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import MetricCard from "@/components/dashboard/metric-card";
import MiniChart from "@/components/dashboard/mini-chart";
import { useOverview } from "@/hooks/use-dashboard";

export default function DashboardOverviewPage() {
  const { data, isLoading, isError } = useOverview();

  if (isLoading) {
    return (
      <DashboardShell title="Overview" subtitle="Loading your metrics...">
        <p className="text-slate-400">Fetching data from PostgreSQL...</p>
      </DashboardShell>
    );
  }

  if (isError || !data) {
    return (
      <DashboardShell title="Overview" subtitle="Unable to load metrics">
        <p className="text-rose-300">Failed to load dashboard data. Check database connection.</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Overview" subtitle="Your TikTok performance at a glance">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MiniChart title="Weekly views trend" data={data.weeklyViews} />
        </div>
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Growth score</p>
          <p className="mt-2 text-4xl font-semibold text-cyan-300">{data.growthScore}</p>
          <p className="mt-2 text-sm text-emerald-300">Strong momentum this week</p>
          <div className="mt-5 h-2 rounded-full bg-slate-800">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              style={{ width: `${data.growthScore}%` }}
            />
          </div>
        </article>
      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h2 className="text-lg font-semibold text-white">Top performing videos</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="pb-3 font-medium">Video</th>
                <th className="pb-3 font-medium">Views</th>
                <th className="pb-3 font-medium">Engagement</th>
                <th className="pb-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.videos.map((video) => (
                <tr key={video.id} className="border-t border-white/10 text-slate-300">
                  <td className="py-3 pr-4">{video.title}</td>
                  <td className="py-3">{video.views}</td>
                  <td className="py-3">{video.engagement}</td>
                  <td className="py-3 text-emerald-300">{video.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}
