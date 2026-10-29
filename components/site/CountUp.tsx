"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { EASE } from "@/lib/motion";
import { useIntroReady } from "./MotionRoot";

const AR = "٠١٢٣٤٥٦٧٨٩";
const toLatin = (s: string) => s.replace(/[٠-٩]/g, (d) => String(AR.indexOf(d))).replace("٫", ".");
const toArabic = (s: string) => s.replace(/\d/g, (d) => AR[+d]);

/**
 * يعدّ الرقم الأول داخل النص من الصفر حتى قيمته (يدعم الأرقام العربية والعشرية)
 * ويحافظ على ما قبله وبعده (+ ، % ، M ...). بدون JS يظهر النص النهائي.
 */
export function CountUp({ text, duration = 2.2 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const ready = useIntroReady();
  const [val, setVal] = useState<number | null>(null); // null = النص النهائي

  const parsed = useMemo(() => {
    const m = text.match(/[\d٠-٩]+(?:[.٫][\d٠-٩]+)?/);
    if (!m || m.index === undefined) return null;
    const latin = toLatin(m[0]);
    return {
      prefix: text.slice(0, m.index),
      suffix: text.slice(m.index + m[0].length),
      arabic: /[٠-٩]/.test(m[0]),
      num: parseFloat(latin),
      decimals: (latin.split(".")[1] ?? "").length,
    };
  }, [text]);

  useEffect(() => {
    if (!parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setVal(0);
  }, [parsed]);

  useEffect(() => {
    if (!parsed || val === null || !inView || !ready) return;
    const controls = animate(0, parsed.num, {
      duration,
      ease: EASE,
      onUpdate: setVal,
      onComplete: () => setVal(null),
    });
    return () => controls.stop();
    // يبدأ مرة واحدة عند أول ظهور بعد الافتتاحية
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, ready, parsed]);

  if (!parsed) return <span>{text}</span>;
  if (val === null) return <span ref={ref}>{text}</span>;

  const fixed = val.toFixed(parsed.decimals);
  return (
    <span ref={ref}>
      {parsed.prefix}
      {parsed.arabic ? toArabic(fixed) : fixed}
      {parsed.suffix}
    </span>
  );
}
