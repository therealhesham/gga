"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useIntroControls } from "./MotionRoot";

const KEY = "gga-intro-seen-at";
/** لا تتكرر الافتتاحية للزائر نفسه قبل مرور 30 يومًا */
const REPEAT_AFTER = 30 * 24 * 60 * 60 * 1000;

/**
 * افتتاحية سينمائية: الشعار "يُبنى" من الأسفل للأعلى، ثم تنزاح الستارة عن الهيرو.
 * تُعرض في الزيارة الأولى فقط، وتُتخطى مع تقليل الحركة أو بالنقر.
 */
export function Intro() {
  const { setReady } = useIntroControls();
  const [phase, setPhase] = useState<"play" | "out" | "gone">("play");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = Date.now() - Number(localStorage.getItem(KEY) || 0) < REPEAT_AFTER;
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // لو تأخر تحميل JS حتى أخفتها شبكة الأمان (CSS) فلا داعي لتشغيلها مخفية
    const hiddenByFailsafe = !!ref.current && getComputedStyle(ref.current).visibility === "hidden";
    if (seen || reduced || hiddenByFailsafe) {
      setPhase("gone");
      setReady(true);
      return;
    }

    const root = document.documentElement;
    root.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // تُسجَّل الزيارة فورًا كي لا تتكرر حتى لو غادر الزائر أثناء الافتتاحية
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {}

    const t1 = setTimeout(() => setPhase("out"), 1600);
    const t2 = setTimeout(() => setReady(true), 1850); // يبدأ نص الهيرو مع ارتفاع الستارة
    const t3 = setTimeout(() => {
      setPhase("gone");
      root.style.overflow = "";
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      root.style.overflow = "";
    };
  }, [setReady]);

  const skip = () => setPhase((p) => (p === "play" ? "out" : p));

  if (phase === "gone") return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      onClick={skip}
      initial={{ y: 0 }}
      animate={{ y: phase === "out" ? "-100%" : 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="intro-failsafe fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink cursor-pointer"
    >
      <div className="relative w-[min(72vw,380px)]">
        {/* ظل خافت للشعار ثم كشفه من الأسفل للأعلى كأنه يُبنى */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-mark-light.png"
          alt=""
          width={600}
          height={357}
          className="absolute inset-0 size-full opacity-[0.12]"
        />
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.65, 0, 0.25, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark-light.png" alt="" width={600} height={357} className="w-full h-auto" />
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.65, 0, 0.25, 1] }}
        className="mt-10 h-px w-[min(60vw,260px)] origin-right bg-gold-soft/70"
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-5 font-display text-sm text-white/55"
      >
        نبني بإتقان · لنصنع معالم تدوم
      </motion.p>
    </motion.div>
  );
}
