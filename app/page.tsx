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

export default function HomePage() {
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
          <button className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/20">
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
              <button className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:scale-[1.02]">
                Start Free Trial
              </button>
              <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:bg-white/10">
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
                className="rounded-2xl border border-white/10 bg-surface p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300/40"
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
                className="rounded-2xl border border-indigo-300/20 bg-slate-900/50 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300/40"
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
              <div key={stat} className="rounded-2xl border border-indigo-400/20 bg-indigo-400/5 px-5 py-6 text-center">
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
              <article key={item.author} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
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
                className={`rounded-2xl border p-7 ${
                  plan.recommended
                    ? "animate-float border-cyan-300/50 bg-cyan-300/10 shadow-glow"
                    : "border-white/10 bg-slate-900/50"
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
                <button className="mt-6 rounded-full border border-white/20 px-5 py-2 text-sm font-medium transition hover:border-cyan-300/50 hover:text-cyan-200">
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
                className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-300/40"
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
              <article key={item.title} className="rounded-2xl border border-indigo-300/20 bg-indigo-400/5 p-6">
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
              <article key={faq.question} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
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
              <button className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-200">
                Start Free Trial
              </button>
              <button className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/50 hover:bg-white/15">
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
            <a href="#" className="hover:text-cyan-300">
              X
            </a>
            <a href="#" className="hover:text-cyan-300">
              LinkedIn
            </a>
            <a href="#" className="hover:text-cyan-300">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
