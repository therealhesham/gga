"use client";

import { MotionConfig } from "motion/react";

/** احترام تفضيل "تقليل الحركة" في كل حركات الموقع */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
