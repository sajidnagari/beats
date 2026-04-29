"use client";

import { useEffect, useState } from "react";
import ParticleBackground from "@/components/particle-background";
import Reveal from "@/components/reveal";

const navItems = ["Features", "Pricing", "Testimonials", "Contact"];

const features = [
  { title: "Real-time analytics", description: "Track views, watch time, and engagement instantly as posts go live." },
  { title: "Audience insights", description: "Understand viewer demographics, active hours, and follower behavior." },
  { title: "Content performance", description: "Measure what hooks, formats, and hashtags drive your best growth." },
  { title: "Growth recommendations", description: "Get smart suggestions to improve consistency and boost reach." },
];

const advancedFeatures = [
  {
    title: "Viral spike alerts",
    description: "Get notified when a video starts trending so you can react with timely follow-up content.",
  },
  {
    title: "Competitor benchmarking",
    description: "Compare posting frequency, engagement rate, and growth velocity against similar creators.",
  },
  {
    title: "Campaign attribution",
    description: "Track which campaigns, sounds, and hashtags lead to profile visits and follower conversion.",
  },
  {
    title: "Automated reporting",
    description: "Export polished weekly and monthly performance reports for clients or internal teams.",
  },
  {
    title: "Team collaboration",
    description: "Share dashboards, assign action items, and align content, growth, and brand teams in one place.",
  },
  {
    title: "Anomaly detection",
    description: "Spot sudden drops or spikes in performance early with intelligent pattern detection.",
  },
];

const stats = ["1M+ views tracked", "50K+ creators", "98% accuracy", "24/7 monitoring"];

const testimonials = [
  {
    quote: "PulseTok helped us identify exactly which videos convert followers into customers.",
    author: "Mia Chen, Growth Lead",
  },
  {
    quote: "Our team doubled engagement in a month using the performance and audience insights.",
    author: "Jordan Lee, Creator Manager",
  },
  {
    quote: "Simple, clear analytics with recommendations we can execute right away.",
    author: "Andre Silva, Content Strategist",
  },
];

const plans = [
  { name: "Starter", price: "$19/mo", description: "For solo creators testing growth", recommended: false },
  { name: "Pro", price: "$49/mo", description: "For teams scaling multiple accounts", recommended: true },
];

const integrations = [
  {
    name: "TikTok Ads",
    description: "Unify paid and organic performance in one dashboard to see full-funnel impact.",
  },
  {
    name: "GA4",
    description: "Connect campaign traffic and conversion metrics to prove ROI from TikTok content.",
  },
  {
    name: "Slack",
    description: "Send performance alerts and weekly summaries directly to your team channels.",
  },
  {
    name: "Notion",
    description: "Sync insights into content calendars and planning docs for faster execution.",
  },
];

const useCases = [
  {
    title: "For Creators",
    points: [
      "Find top-performing formats and posting times.",
      "Track follower growth from each video and series.",
      "Get clear recommendations without analytics overload.",
    ],
  },
  {
    title: "For Agencies",
    points: [
      "Manage multiple client accounts from one workspace.",
      "Automate branded reports with KPI snapshots.",
      "Benchmark clients against competitors in each niche.",
    ],
  },
  {
    title: "For Brands",
    points: [
      "Measure creator collaboration performance at scale.",
      "Tie TikTok engagement to traffic and conversion outcomes.",
      "Share cross-team dashboards for faster marketing decisions.",
    ],
  },
];

const faqs = [
  {
    question: "How quickly can I connect my TikTok account?",
    answer: "Most users connect in under two minutes and start seeing data immediately.",
  },
  {
    question: "Can I manage multiple profiles?",
    answer: "Yes, Pro supports multiple profiles with account-level views and combined reporting.",
  },
  {
    question: "Do you provide exports for client reporting?",
    answer: "Yes, you can export performance summaries and recurring reports in a few clicks.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, every plan starts with a free trial so you can evaluate your workflow risk-free.",
  },
];

type ModalState = {
  open: boolean;
  title: string;
  description: string;
  cta: string;
};

export default function HomePage() {
  const [modal, setModal] = useState<ModalState>({
    open: false,
    title: "",
    description: "",
    cta: "",
  });

  const openModal = (title: string, description: string, cta: string) => {
    setModal({ open: true, title, description, cta });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal((prev) => ({ ...prev, open: false }));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const buttonBase =
    "rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80";
  const cardBase =
    "neon-card rounded-2xl border p-6 backdrop-blur-md transition duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_18px_50px_rgba(34,211,238,0.18)]";

  return (
    <main>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#" className="text-lg font-semibold tracking-tight text-cyan-300">
            PulseTok
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-slate-300 transition hover:text-cyan-300">
                {item}
              </a>
            ))}
          </nav>
          <button
            onClick={() => openModal("Get Started", "Create your PulseTok workspace in minutes.", "Create account")}
            className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-300/20 hover:shadow-[0_10px_24px_rgba(34,211,238,0.18)]"
          >
            Get Started
          </button>
        </div>
      </header>

      <section className="relative isolate overflow-hidden px-6 pb-24 pt-28">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.2),transparent_35%)]" />
        <div className="absolute inset-0 -z-10 opacity-70">
          <ParticleBackground />
        </div>

        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
              TikTok Analytics That Helps You Grow Faster
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Track views, engagement, and content performance in one place, with insights built to scale your creator
              strategy.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() =>
                  openModal(
                    "Start Free Trial",
                    "Launch a 14-day free trial and unlock all analytics modules.",
                    "Start trial now",
                  )
                }
                className={`${buttonBase} animate-pulse-glow bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 shadow-glow hover:scale-[1.05] hover:shadow-[0_20px_44px_rgba(99,102,241,0.45)]`}
              >
                Start Free Trial
              </button>
              <button
                onClick={() =>
                  openModal("See Demo", "Watch a short walkthrough of dashboards, alerts, and reports.", "Watch demo")
                }
                className={`${buttonBase} border border-white/20 bg-white/5 text-slate-100 hover:scale-[1.04] hover:border-cyan-300/40 hover:bg-white/10 hover:shadow-[0_16px_30px_rgba(15,23,42,0.55)]`}
              >
                See Demo
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold">Features</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className={`${cardBase} border-white/10 bg-surface hover:border-cyan-300/40`}
              >
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
              <div
                key={stat}
                className="rounded-2xl border border-indigo-400/20 bg-indigo-400/5 px-5 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-indigo-300/40 hover:bg-indigo-400/10"
              >
                <p className="font-semibold text-indigo-200">{stat}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="testimonials" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold">Testimonials</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.author}
                className={`${cardBase} border-white/10 bg-slate-900/60 hover:border-cyan-300/35`}
              >
                <p className="text-slate-300">"{item.quote}"</p>
                <p className="mt-4 text-sm font-medium text-cyan-300">{item.author}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold">Pricing</h2>
          <div className="grid gap-5 md:grid-cols-2">
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
                <p className="mt-2 text-slate-300">{plan.description}</p>
                <button
                  onClick={() =>
                    openModal(
                      `Choose ${plan.name}`,
                      `You selected the ${plan.name} plan. We can now set up billing and workspace preferences.`,
                      `Continue with ${plan.name}`,
                    )
                  }
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

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold">FAQ</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className={`${cardBase} border-white/10 bg-slate-900/60 hover:border-cyan-300/35`}
              >
                <h3 className="text-base font-semibold text-slate-100">{faq.question}</h3>
                <p className="mt-3 text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        <Reveal>
          <div className="rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-indigo-500/20 via-cyan-400/15 to-indigo-500/20 p-8 text-center shadow-glow md:p-12">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">Ready to scale your TikTok growth?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-200">
              Start your free trial and turn performance data into content decisions that grow faster.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() =>
                  openModal("Start Free Trial", "Activate your trial and import your TikTok profile today.", "Start trial")
                }
                className={`${buttonBase} animate-pulse-glow bg-cyan-300 text-slate-950 hover:scale-[1.05] hover:bg-cyan-200 hover:shadow-[0_18px_40px_rgba(34,211,238,0.4)]`}
              >
                Start Free Trial
              </button>
              <button
                onClick={() =>
                  openModal("Book a Demo", "Pick a time and we will walk your team through PulseTok live.", "Schedule demo")
                }
                className={`${buttonBase} border border-white/30 bg-white/10 text-slate-100 hover:scale-[1.04] hover:border-cyan-300/50 hover:bg-white/15 hover:shadow-[0_16px_30px_rgba(15,23,42,0.55)]`}
              >
                Book a Demo
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <footer id="contact" className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} PulseTok Analytics. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/sajidnagari"
              target="_blank"
              rel="noreferrer"
              className="transition duration-300 hover:-translate-y-0.5 hover:text-cyan-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sajidnagari/"
              target="_blank"
              rel="noreferrer"
              className="transition duration-300 hover:-translate-y-0.5 hover:text-cyan-300"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/sajid_ali_05/"
              target="_blank"
              rel="noreferrer"
              className="transition duration-300 hover:-translate-y-0.5 hover:text-cyan-300"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/sajidaly05/"
              target="_blank"
              rel="noreferrer"
              className="transition duration-300 hover:-translate-y-0.5 hover:text-cyan-300"
            >
              Facebook
            </a>
            <a
              href="https://www.youtube.com/@sajidnagari"
              target="_blank"
              rel="noreferrer"
              className="transition duration-300 hover:-translate-y-0.5 hover:text-cyan-300"
            >
              YouTube
            </a>
          </div>
        </div>
      </footer>

      {modal.open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
          onClick={() => setModal((prev) => ({ ...prev, open: false }))}
        >
          <div
            className="animate-modal-in w-full max-w-md rounded-2xl border border-cyan-300/30 bg-slate-900/95 p-6 shadow-[0_24px_90px_rgba(34,211,238,0.28)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cta-modal-title"
          >
            <h3 id="cta-modal-title" className="text-xl font-semibold text-white">
              {modal.title}
            </h3>
            <p className="mt-3 text-slate-300">{modal.description}</p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/40"
                onClick={() => setModal((prev) => ({ ...prev, open: false }))}
              >
                Close
              </button>
              <button
                className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                onClick={() => setModal((prev) => ({ ...prev, open: false }))}
              >
                {modal.cta}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
