"use client";

import { motion, useScroll, useTransform } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** إزاحة رأسية (px) عند التمرير خلال أول شاشة؛ موجبة = أبطأ من التمرير */
  distance?: number;
  /** يخفت المحتوى تدريجيًا عند الابتعاد عن أعلى الصفحة */
  fade?: boolean;
};

export function ParallaxLayer({ children, className, distance = 200, fade = false }: Props) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, distance]);
  const opacity = useTransform(scrollY, [0, 650], [1, fade ? 0.1 : 1]);

  return (
    <motion.div style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
