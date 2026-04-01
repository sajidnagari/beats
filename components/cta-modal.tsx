"use client";

import { useEffect, useState } from "react";
import type { ModalState } from "@/lib/modal-types";

type CtaModalProps = {
  modal: ModalState;
  onClose: () => void;
};

export default function CtaModal({ modal, onClose }: CtaModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!modal.open) {
      setName("");
      setEmail("");
      setCompany("");
      setSubmitted(false);
    }
  }, [modal.open, modal.type]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!modal.open || !modal.type) return null;

  const titles: Record<NonNullable<ModalState["type"]>, string> = {
    trial: "Start Free Trial",
    demo: "See Demo",
    plan: `Choose ${modal.planName ?? "Plan"}`,
    contact: "Book a Call",
    "get-started": "Get Started",
  };

  const descriptions: Record<NonNullable<ModalState["type"]>, string> = {
    trial: "Start your 14-day free trial. No credit card required.",
    demo: "Get a personalized walkthrough of dashboards, alerts, and reports.",
    plan: `Continue with the ${modal.planName} plan and set up your workspace.`,
    contact: "Share your details and we will schedule a quick intro call.",
    "get-started": "Create your PulseTok workspace in minutes.",
  };

  const submitLabel: Record<NonNullable<ModalState["type"]>, string> = {
    trial: "Start trial",
    demo: "Request demo",
    plan: `Continue with ${modal.planName}`,
    contact: "Schedule call",
    "get-started": "Create account",
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-modal-in w-full max-w-md rounded-2xl border border-cyan-300/30 bg-slate-900/95 p-6 shadow-[0_24px_90px_rgba(34,211,238,0.28)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cta-modal-title"
      >
        {submitted ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-2xl text-emerald-300">
              ✓
            </div>
            <h3 className="text-xl font-semibold text-white">You are all set!</h3>
            <p className="mt-2 text-slate-300">We will reach out to {email} shortly.</p>
            <button
              className="mt-6 rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 id="cta-modal-title" className="text-xl font-semibold text-white">
              {titles[modal.type]}
            </h3>
            <p className="mt-2 text-slate-300">{descriptions[modal.type]}</p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
              />
              {(modal.type === "demo" || modal.type === "contact" || modal.type === "plan") && (
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company (optional)"
                  className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
                />
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/40"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  {submitLabel[modal.type]}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
