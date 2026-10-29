"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";

const IDS = NAV_ITEMS.map((i) => i.id) as string[];

/** القسم المتقاطع مع منتصف الشاشة (يعمل جيدًا مع الأقسام الطويلة والـ snap) */
export function useActiveSection(): string {
  const [active, setActive] = useState<string>(IDS[0]);

  useEffect(() => {
    const els = IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}
