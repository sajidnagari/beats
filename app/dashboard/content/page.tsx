"use client";

import ApiErrorState from "@/components/api-error-state";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { useContent } from "@/hooks/use-dashboard";
import { ApiError, getApiErrorMessage } from "@/lib/api-client";

export default function ContentPage() {
  const { data, isLoading, isError, error } = useContent();

  if (isLoading) {
    return (
      <DashboardShell title="Content" subtitle="Loading content data...">
        <p className="text-slate-400">Fetching content metrics...</p>
      </DashboardShell>
    );
  }

  if (isError || !data) {
    return (
      <DashboardShell title="Content" subtitle="Unable to load content data">
        <ApiErrorState
          message={getApiErrorMessage(error, "Failed to load content data.")}
          code={error instanceof ApiError ? error.code : undefined}
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Content" subtitle="Track what content formats perform best">
      <div className="grid gap-4 md:grid-cols-2">
        {data.formats.map((item) => (
          <article
            key={item.id}
            className="neon-card rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-cyan-300/30"
          >
            <h3 className="text-lg font-semibold text-cyan-200">{item.format}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.posts} posts published</p>
            <p className="mt-1 text-xl font-semibold text-white">{item.avgViews} avg views</p>
          </article>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h2 className="text-lg font-semibold text-white">Recent top videos</h2>
        <ul className="mt-4 space-y-3">
          {data.videos.map((video) => (
            <li
              key={video.id}
              className="flex flex-col justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center"
            >
              <span className="text-slate-200">{video.title}</span>
              <span className="text-sm text-cyan-300">
                {video.views} views · {video.engagement}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </DashboardShell>
  );
}
