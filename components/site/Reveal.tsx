"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** تأخير بالمللي ثانية لتتابع العناصر */
  delay?: number;
};

/** يُظهر المحتوى بهدوء عند وصوله للشاشة (مرة واحدة): تلاشٍ مع إزاحة بسيطة جدًا */
export function Reveal({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.9, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const HEADING = "font-display leading-[1.25] tracking-[-0.01em]";
/** المقاس الموحّد لعناوين الأقسام */
export const HEADING_SIZE = "text-[clamp(2.1rem,4.4vw,3.75rem)]";

/**
 * عنوان قسم يصعد من خلف قناع. المراقبة على القناع نفسه لأن العنصر المزاح خارج القناع
 * لا يُحتسب ظاهرًا عند IntersectionObserver، والحشوة الرأسية تمنع قص الحروف العالية.
 */
export function RevealHeading({
  children,
  as: Tag = "h2",
  className = "",
  size = HEADING_SIZE,
  weight = "font-normal",
  delay = 0,
}: Props & { as?: "h1" | "h2" | "h3"; size?: string; weight?: string }) {
  return (
    <Tag className={`${HEADING} ${size} ${weight} ${className}`}>
      <motion.span
        className="block overflow-hidden py-[0.18em] -my-[0.18em]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.span
          className="block"
          variants={{
            hidden: { y: "115%" },
            show: { y: 0, transition: { duration: 1.1, delay: delay / 1000, ease: EASE } },
          }}
        >
          {children}
        </motion.span>
      </motion.span>
    </Tag>
  );
}

/** متغيرات كشف الصور: فتحة تتسع من المنتصف مع تراجع بسيط للتكبير */
export const apertureVariants = {
  hidden: { clipPath: "inset(10% 8% 10% 8%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.4, ease: EASE } },
};
export const settleVariants = {
  hidden: { scale: 1.16 },
  show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
};

/** حاوية صورة تُكشف عند ظهورها؛ الأبناء (Img بنمط fill) يُوضعون داخل طبقة مطلقة */
export function RevealImage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={apertureVariants}
    >
      <motion.div className="absolute inset-0" variants={settleVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}
