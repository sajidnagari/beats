"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  suffix: string;
  label: string;
};

export default function StatCounter({ value, suffix, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(value * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-indigo-400/20 bg-indigo-400/5 px-5 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-indigo-300/40 hover:bg-indigo-400/10"
    >
      <p className="text-2xl font-bold text-indigo-100">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm font-medium text-indigo-200/80">{label}</p>
    </div>
  );
}
