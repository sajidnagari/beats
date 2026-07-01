"use client";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import { audienceSegments } from "@/lib/dashboard-data";

export default function AudiencePage() {
  return (
    <DashboardShell title="Audience" subtitle="Understand who watches and engages with your content">
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-white">Age distribution</h2>
          <div className="mt-5 space-y-4">
            {audienceSegments.map((segment) => (
              <div key={segment.label}>
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
            <li className="rounded-xl border border-white/10 bg-white/5 p-3">Peak activity: 7 PM - 10 PM</li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-3">Top region: United States (42%)</li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-3">Returning viewers: 61%</li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-3">Follower conversion rate: 3.8%</li>
          </ul>
        </article>
      </div>
    </DashboardShell>
  );
}
