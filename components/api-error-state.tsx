type ApiErrorStateProps = {
  title?: string;
  message: string;
  code?: string;
};

export default function ApiErrorState({
  title = "Unable to load data",
  message,
  code,
}: ApiErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-6">
      <h3 className="text-lg font-semibold text-rose-200">{title}</h3>
      <p className="mt-2 text-sm text-rose-100/90">{message}</p>
      {code && <p className="mt-3 text-xs text-rose-200/70">Error code: {code}</p>}
    </div>
  );
}
