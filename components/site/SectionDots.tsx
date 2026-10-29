"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { NAV_ITEMS } from "@/lib/constants";
import { useActiveSection } from "./useActiveSection";

/** نقاط تنقل جانبية بين الأقسام (الشاشات الكبيرة فقط). المؤشر النشط ينزلق بين النقاط، وتتكيف الألوان تلقائيًا مع الخلفية */
export function SectionDots() {
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40 text-white mix-blend-difference">
    <motion.nav
      aria-label="الأقسام"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="relative flex flex-col items-center gap-3.5"
    >
      {/* خط تقدم القراءة خلف النقاط */}
      <span aria-hidden="true" className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-current opacity-15">
        <motion.span style={{ scaleY: fill, transformOrigin: "top" }} className="block h-full w-full bg-current opacity-100" />
      </span>
      {NAV_ITEMS.map((item) => {
        const on = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            aria-current={on ? "true" : undefined}
            title={item.label}
            className="group relative flex items-center justify-center size-4"
          >
            <span
              className={`block size-[5px] rounded-full bg-current transition-opacity duration-500 ${
                on ? "opacity-0" : "opacity-40 group-hover:opacity-80"
              }`}
            />
            {on && (
              <motion.span
                layoutId="section-dot"
                className="absolute h-6 w-[3px] rounded-full bg-current"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </a>
        );
      })}
    </motion.nav>
    </div>
  );
}
