export default function DashboardPreview() {
  const bars = [42, 68, 55, 82, 74, 91, 63];

  return (
    <div className="neon-card mx-auto mt-14 max-w-3xl rounded-2xl border border-cyan-300/25 bg-slate-900/80 p-5 shadow-[0_24px_80px_rgba(34,211,238,0.15)] backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-cyan-300/80">Live dashboard</p>
          <p className="text-lg font-semibold text-white">Performance Overview</p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          +24.8% this week
        </span>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          { label: "Views", value: "128.4K" },
          { label: "Engagement", value: "9.2%" },
          { label: "Followers", value: "+1.8K" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-slate-400">{item.label}</p>
            
            <p className="mt-1 text-sm font-semibold text-cyan-200">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
        <p className="mb-3 text-xs text-slate-400">7-day views trend</p>
        <div className="flex h-28 items-end gap-2">
          {bars.map((height, index) => (
            <div key={index} className="flex flex-1 flex-col justify-end">
              <div
                className="rounded-t-md bg-gradient-to-t from-indigo-500 to-cyan-400 transition-all duration-500"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
