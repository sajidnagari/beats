type MiniChartProps = {
  title: string;
  data: number[];
};

export default function MiniChart({ title, data }: MiniChartProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <p className="mb-4 text-sm text-slate-400">{title}</p>
      <div className="flex h-36 items-end gap-2">
        {data.map((height, index) => (
          <div key={index} className="flex flex-1 flex-col justify-end">
            <div
              className="rounded-t-md bg-gradient-to-t from-indigo-500 to-cyan-400 transition-all duration-500"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
