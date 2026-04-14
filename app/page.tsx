import ParticleBackground from "@/components/particle-background";
import Reveal from "@/components/reveal";

const navItems = ["Features", "Pricing", "Testimonials", "Contact"];

const features = [
  { title: "Real-time analytics", description: "Track views, watch time, and engagement instantly as posts go live." },
  { title: "Audience insights", description: "Understand viewer demographics, active hours, and follower behavior." },
  { title: "Content performance", description: "Measure what hooks, formats, and hashtags drive your best growth." },
  { title: "Growth recommendations", description: "Get smart suggestions to improve consistency and boost reach." },
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
