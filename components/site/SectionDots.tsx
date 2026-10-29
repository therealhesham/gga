"use client";

import { NAV_ITEMS } from "@/lib/constants";
import { useActiveSection } from "./useActiveSection";

/** نقاط تنقل جانبية بين الأقسام (الشاشات الكبيرة فقط). تتكيف تلقائيًا مع الخلفية الفاتحة والغامقة */
export function SectionDots() {
  const active = useActiveSection();

  return (
    <nav
      aria-label="الأقسام"
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 text-white mix-blend-difference"
    >
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
              className={`block rounded-full bg-current transition-all duration-500 ${
                on ? "h-6 w-[3px] opacity-100" : "size-[5px] opacity-40 group-hover:opacity-80"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
