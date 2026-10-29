"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
import { FILTER_EVENT } from "@/lib/service-filter";

/** كرت خدمة: يفعّل تصنيف المشاريع المقابل ثم يمرّر لقسم المشاريع */
export function ServiceCard({
  categoryId,
  href,
  className,
  children,
}: {
  categoryId: number | null;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      variants={fadeUp}
      href={href}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: { categoryId } }))}
    >
      {children}
    </motion.a>
  );
}
