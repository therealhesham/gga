"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * حلقة ذهبية تتبع المؤشر؛ تكبر فوق الروابط، وتعرض نصًا فوق أي عنصر يحمل data-cursor.
 * تُخفى على اللمس ومع تقليل الحركة.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target instanceof Element ? e.target : null;
      setLabel(el?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "");
      setHover(!!el?.closest("a,button,[role='button'],input,select,textarea,label"));
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 92 : hover ? 54 : 36;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[90]"
      >
        <motion.div
          animate={{
            width: size,
            height: size,
            backgroundColor: label ? "rgba(216,181,101,0.96)" : "rgba(216,181,101,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full border border-gold-soft/80 text-[13px] font-bold text-ink"
        >
          {label}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[90]"
      >
        <span
          className={`block -translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full bg-gold-soft transition-opacity ${
            label ? "opacity-0" : "opacity-100"
          }`}
        />
      </motion.div>
    </>
  );
}
