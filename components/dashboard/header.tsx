"use client";

type DashboardHeaderProps = {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
};

export default function DashboardHeader({ title, subtitle, onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg border border-white/15 p-2 text-slate-200 lg:hidden"
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <div>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">{title}</h1>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Live sync
          </span>
          <button className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-300/20">
            Export report
          </button>
        </div>
      </div>
    </header>
  );
}
