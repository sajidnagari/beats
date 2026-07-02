"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { useMe } from "@/hooks/use-auth";
import { useUpdateSettings } from "@/hooks/use-dashboard";

export default function SettingsPage() {
  const { data } = useMe();
  const updateSettings = useUpdateSettings();
  const user = data?.user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = () => {
    updateSettings.mutate({ name, email });
  };

  return (
    <DashboardShell title="Settings" subtitle="Manage account and workspace preferences">
      <div className="max-w-2xl space-y-4">
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-white">Profile</h2>
          <p className="mt-1 text-sm text-slate-400">Current plan: {user?.plan ?? "—"}</p>
          <div className="mt-4 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-300/50"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-300/50"
            />
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {["Viral spike alerts", "Weekly performance summary", "Team mentions"].map((item) => (
              <label key={item} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                <span>{item}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-cyan-400" />
              </label>
            ))}
          </div>
        </article>

        {updateSettings.isSuccess && (
          <p className="text-sm text-emerald-300">Settings saved. Auth and dashboard queries invalidated.</p>
        )}

        <button
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-70"
        >
          {updateSettings.isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </DashboardShell>
  );
}
