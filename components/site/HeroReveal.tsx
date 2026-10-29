"use client";

import { motion } from "motion/react";
import { stagger } from "@/lib/motion";
import { useIntroReady } from "./MotionRoot";

/** يبدأ ظهور عناصر الهيرو المتتابع بعد انتهاء الافتتاحية */
export function HeroReveal({ children }: { children: React.ReactNode }) {
  const ready = useIntroReady();
  return (
    <motion.div variants={stagger(0.13, 0.05)} initial="hidden" animate={ready ? "show" : "hidden"}>
      {children}
    </motion.div>
  );
}
