"use client";

import { useState } from "react";
import SocialIcon from "@/components/social-icon";
import { socialLinks } from "@/lib/data";
import type { ModalType } from "@/lib/modal-types";

type FooterProps = {
  onOpenModal: (type: ModalType) => void;
};

export default function Footer({ onOpenModal }: FooterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleContact = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="border-t border-white/10 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-white">Get in touch</h3>
            <p className="mt-2 max-w-md text-slate-400">
              Questions about PulseTok? Send us a message and we will get back within one business day.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Email:{" "}
              <a href="mailto:hello@pulsetok.io" className="text-cyan-300 hover:underline">
                hello@pulsetok.io
              </a>
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-emerald-200">
              Thanks! We received your message and will reply soon.
            </div>
          ) : (
            <form onSubmit={handleContact} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
              />
              <textarea
                rows={3}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
              />
              <button
                type="submit"
                className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} PulseTok Analytics. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <SocialIcon key={link.name} name={link.name} href={link.href} />
            ))}
          </div>
          <button
            onClick={() => onOpenModal("contact")}
            className="text-cyan-300 transition hover:underline"
          >
            Book a call
          </button>
        </div>
      </div>
    </footer>
  );
}
