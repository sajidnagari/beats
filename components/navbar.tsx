"use client";

import { useState } from "react";
import { navItems } from "@/lib/data";
import type { ModalType } from "@/lib/modal-types";

type NavbarProps = {
  onOpenModal: (type: ModalType) => void;
};

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#" className="text-lg font-semibold tracking-tight text-cyan-300">
          PulseTok
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-slate-300 transition hover:text-cyan-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenModal("get-started")}
            className="hidden rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-300/20 hover:shadow-[0_10px_24px_rgba(34,211,238,0.18)] sm:inline-flex"
          >
            Get Started
          </button>

          <button
            className="inline-flex rounded-lg border border-white/15 p-2 text-slate-200 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="rounded-lg px-2 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => {
                closeMenu();
                onOpenModal("get-started");
              }}
              className="mt-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
