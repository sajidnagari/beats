"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";
import Reveal from "@/components/reveal";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <h2 className="mb-8 text-3xl font-semibold">FAQ</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition duration-300 hover:border-cyan-300/30"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-100">{faq.question}</span>
                  <span
                    className={`text-cyan-300 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-4 text-slate-300">{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
