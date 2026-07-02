"use client";

import { useCallback, useState } from "react";
import CtaModal from "@/components/cta-modal";
import FaqAccordion from "@/components/faq-accordion";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Reveal from "@/components/reveal";
import StatCounter from "@/components/stat-counter";
import {
  advancedFeatures,
  features,
  integrations,
  plans,
  stats,
  testimonials,
  useCases,
} from "@/lib/data";
import { initialModalState } from "@/lib/modal-types";
import type { ModalState, ModalType } from "@/lib/modal-types";
import { buttonBase, cardBase } from "@/lib/styles";

export default function HomePage() {
  const [modal, setModal] = useState<ModalState>(initialModalState);

  const openModal = useCallback((type: ModalType, planName?: string) => {
    setModal({ open: true, type, planName });
  }, []);

  const closeModal = useCallback(() => {
    setModal(initialModalState);
  }, []);

  return (
    <main>
      <Navbar onOpenModal={(type) => openModal(type)} />
      <Hero onOpenModal={openModal} />

      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold">Features</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className={`${cardBase} border-white/10 bg-surface hover:border-cyan-300/40`}>
                <h3 className="text-lg font-semibold text-cyan-300">{feature.title}</h3>
                <p className="mt-3 text-slate-300">{feature.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <Reveal>
          <h2 className="mb-3 text-3xl font-semibold">Advanced Features</h2>
          <p className="mb-8 max-w-3xl text-slate-300">
            Built for creators, agencies, and growth teams that need deeper analytics beyond basic dashboards.
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advancedFeatures.map((feature) => (
              <article
                key={feature.title}
                className={`${cardBase} border-indigo-300/20 bg-slate-900/50 hover:border-cyan-300/40`}
              >
                <h3 className="text-lg font-semibold text-indigo-200">{feature.title}</h3>
                <p className="mt-3 text-slate-300">{feature.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </Reveal>
      </section>

      <section id="testimonials" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold">Testimonials</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.author} className={`${cardBase} border-white/10 bg-slate-900/60 hover:border-cyan-300/35`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cyan-300">{item.author}</p>
                    <p className="text-xs text-slate-400">{item.role}</p>
                  </div>
                </div>
                <p className="text-slate-300">"{item.quote}"</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-3 text-3xl font-semibold">Pricing</h2>
          <p className="mb-8 text-slate-400">14-day free trial on all plans · Save 2 months with annual billing</p>
          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`neon-card rounded-2xl border p-7 transition duration-300 hover:-translate-y-2 hover:scale-[1.01] ${
                  plan.recommended
                    ? "animate-float border-cyan-300/50 bg-cyan-300/10 shadow-glow hover:shadow-[0_20px_60px_rgba(34,211,238,0.28)]"
                    : "border-white/10 bg-slate-900/50 hover:border-cyan-300/35 hover:shadow-[0_20px_60px_rgba(56,189,248,0.15)]"
                }`}
              >
                {plan.recommended && (
                  <span className="mb-4 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
                    Recommended
                  </span>
                )}
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-3xl font-bold text-cyan-300">{plan.price}</p>
                {"annualPrice" in plan && (
                  <p className="mt-1 text-xs text-slate-400">or {plan.annualPrice} billed yearly</p>
                )}
                <p className="mt-2 text-slate-300">{plan.description}</p>
                <ul className="mt-5 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1 text-cyan-300">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal("plan", plan.name)}
                  className="mt-6 rounded-full border border-white/20 px-5 py-2 text-sm font-medium transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-cyan-300/50 hover:text-cyan-200 hover:shadow-[0_14px_30px_rgba(34,211,238,0.25)]"
                >
                  Choose {plan.name}
                </button>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-3 text-3xl font-semibold">Integrations</h2>
          <p className="mb-8 max-w-3xl text-slate-300">
            Connect your existing growth stack and keep analytics, reporting, and team workflows in sync.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {integrations.map((integration) => (
              <article
                key={integration.name}
                className={`${cardBase} border-white/10 bg-slate-900/50 hover:border-cyan-300/40`}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-xs font-bold text-cyan-200">
                  {integration.icon}
                </div>
                <h3 className="text-lg font-semibold text-cyan-300">{integration.name}</h3>
                <p className="mt-3 text-slate-300">{integration.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold">Use Cases</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {useCases.map((item) => (
              <article
                key={item.title}
                className={`${cardBase} border-indigo-300/20 bg-indigo-400/5 hover:border-cyan-300/35`}
              >
                <h3 className="text-lg font-semibold text-indigo-200">{item.title}</h3>
                <ul className="mt-4 space-y-3 text-slate-300">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <FaqAccordion />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        <Reveal>
          <div className="rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-indigo-500/20 via-cyan-400/15 to-indigo-500/20 p-8 text-center shadow-glow md:p-12">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Ready to scale your TikTok growth?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-200">
              Start your free trial and turn performance data into content decisions that grow faster.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openModal("trial")}
                className={`${buttonBase} animate-pulse-glow bg-cyan-300 text-slate-950 hover:scale-[1.05] hover:bg-cyan-200 hover:shadow-[0_18px_40px_rgba(34,211,238,0.4)]`}
              >
                Start Free Trial
              </button>
              <button
                onClick={() => openModal("demo")}
                className={`${buttonBase} border border-white/30 bg-white/10 text-slate-100 hover:scale-[1.04] hover:border-cyan-300/50 hover:bg-white/15 hover:shadow-[0_16px_30px_rgba(15,23,42,0.55)]`}
              >
                Book a Demo
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer onOpenModal={(type) => openModal(type)} />
      <CtaModal modal={modal} onClose={closeModal} />
    </main>
  );
}
