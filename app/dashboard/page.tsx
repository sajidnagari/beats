"use client";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import MetricCard from "@/components/dashboard/metric-card";
import MiniChart from "@/components/dashboard/mini-chart";
import { overviewMetrics, topVideos, weeklyViews } from "@/lib/dashboard-data";

export default function DashboardOverviewPage() {
  return (
    <DashboardShell title="Overview" subtitle="Your TikTok performance at a glance">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MiniChart title="Weekly views trend" data={weeklyViews} />
        </div>
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Growth score</p>
          <p className="mt-2 text-4xl font-semibold text-cyan-300">86</p>
          <p className="mt-2 text-sm text-emerald-300">Strong momentum this week</p>
          <div className="mt-5 h-2 rounded-full bg-slate-800">
            <div className="h-2 w-[86%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
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
              {topVideos.map((video) => (
                <tr key={video.title} className="border-t border-white/10 text-slate-300">
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
