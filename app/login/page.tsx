"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { buttonBase } from "@/lib/styles";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState("demo@pulsetok.io");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const ok = await login(email, password);
    setSubmitting(false);

    if (!ok) {
      setError("Invalid credentials. Use demo@pulsetok.io / demo123");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.15),transparent_30%)] px-6">
      <div className="w-full max-w-md rounded-3xl border border-cyan-300/20 bg-slate-900/80 p-8 shadow-[0_24px_80px_rgba(34,211,238,0.15)] backdrop-blur-md">
        <Link href="/" className="text-lg font-semibold text-cyan-300">
          PulseTok
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to access your analytics dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
          />

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className={`${buttonBase} w-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 hover:scale-[1.02] disabled:opacity-70`}
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-400">
          Demo login: <span className="text-cyan-200">demo@pulsetok.io</span> / <span className="text-cyan-200">demo123</span>
        </p>
      </div>
    </main>
  );
}
