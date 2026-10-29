"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** تأخير بالمللي ثانية لتتابع العناصر */
  delay?: number;
};

/** يُظهر المحتوى بنعومة عند وصوله للشاشة (مرة واحدة) */
export function Reveal({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 1, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
