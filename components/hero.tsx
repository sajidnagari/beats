"use client";

import ParticleBackground from "@/components/particle-background";
import DashboardPreview from "@/components/dashboard-preview";
import Reveal from "@/components/reveal";
import { buttonBase } from "@/lib/styles";
import type { ModalType } from "@/lib/modal-types";

type HeroProps = {
  onOpenModal: (type: ModalType) => void;
};

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-24 pt-28">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.2),transparent_35%)]" />
      <div className="absolute inset-0 -z-10 opacity-70">
        <ParticleBackground />
      </div>

      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
            Trusted by 50K+ creators
          </p>
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            TikTok Analytics That Helps You Grow Faster
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Track views, engagement, and content performance in one place, with insights built to scale your creator
            strategy.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenModal("trial")}
              className={`${buttonBase} animate-pulse-glow bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 shadow-glow hover:scale-[1.05] hover:shadow-[0_20px_44px_rgba(99,102,241,0.45)]`}
            >
              Start Free Trial
            </button>
            <button
              onClick={() => onOpenModal("demo")}
              className={`${buttonBase} border border-white/20 bg-white/5 text-slate-100 hover:scale-[1.04] hover:border-cyan-300/40 hover:bg-white/10 hover:shadow-[0_16px_30px_rgba(15,23,42,0.55)]`}
            >
              See Demo
            </button>
          </div>
          <DashboardPreview />
        </Reveal>
      </div>
    </section>
  );
}
