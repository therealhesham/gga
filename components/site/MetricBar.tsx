"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/** شريط نسبة رفيع يمتلئ بنعومة عند ظهوره */
export function MetricBar({ percent }: { percent: number }) {
  const width = Math.min(100, Math.max(0, percent));

  return (
    <div className="relative h-px w-full bg-ink/15">
      <motion.div
        className="absolute inset-y-[-1px] right-0 h-[3px] bg-gold"
        initial={{ width: "0%" }}
        whileInView={{ width: `${width}%` }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
    </div>
  );
}
