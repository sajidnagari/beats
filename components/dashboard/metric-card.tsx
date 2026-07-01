type MetricCardProps = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

export default function MetricCard({ label, value, change, positive }: MetricCardProps) {
  return (
    <article className="neon-card rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_14px_40px_rgba(34,211,238,0.14)]">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className={`mt-2 text-xs font-medium ${positive ? "text-emerald-300" : "text-rose-300"}`}>{change} vs last week</p>
    </article>
  );
}
