"use client";

import { useEffect, useRef, useState } from "react";

/** شريط نسبة رفيع يمتلئ بنعومة عند ظهوره */
export function MetricBar({ percent }: { percent: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const width = Math.min(100, Math.max(0, percent));

  return (
    <div ref={ref} className="relative h-px w-full bg-white/15">
      <div
        className="absolute inset-y-[-1px] right-0 h-[3px] bg-gold-soft transition-[width] duration-[1600ms] ease-out"
        style={{ width: on ? `${width}%` : "0%" }}
      />
    </div>
  );
}
