"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** تأخير بالمللي ثانية لتتابع العناصر */
  delay?: number;
};

/**
 * يُظهر المحتوى بنعومة عند وصوله للشاشة.
 * العناصر الظاهرة أصلًا لا تُخفى (بدون وميض)، ومع تقليل الحركة يظهر كل شيء فورًا.
 */
export function Reveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = el.getBoundingClientRect();
    if (reduced || (rect.top < window.innerHeight * 0.92 && rect.bottom > 0)) {
      setState("shown");
      return;
    }

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stateClass =
    state === "hidden" ? "reveal-hidden" : state === "shown" ? "reveal-shown" : "";

  return (
    <div
      ref={ref}
      className={`${className} ${stateClass}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
