"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout, useMe } from "@/hooks/use-auth";
import { sidebarLinks } from "@/lib/dashboard-data";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data } = useMe();
  const logout = useLogout();
  const user = data?.user;

  const handleLogout = () => {
    logout.mutate();
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {open && <button className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} aria-label="Close sidebar" />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/10 px-6 py-5">
          <Link href="/" className="text-lg font-semibold text-cyan-300">
            PulseTok
          </Link>
          <p className="mt-1 text-xs text-slate-400">Creator Analytics</p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ${
                isActive(link.href)
                  ? "border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-[0_8px_24px_rgba(34,211,238,0.12)]"
                  : "text-slate-300 hover:bg-white/5 hover:text-cyan-200"
              }`}
            >
              <span className="text-base opacity-80">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm font-medium text-slate-100">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/15 px-3 py-2 text-sm text-slate-300 transition hover:border-red-400/40 hover:text-red-300"
          >
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
