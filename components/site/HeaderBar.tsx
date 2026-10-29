"use client";

import { useEffect, useState } from "react";
import { Menu, ReceiptText, X } from "lucide-react";
import { NAV_ITEMS, SECTION_IDS } from "@/lib/constants";

type Props = {
  companyName: string;
  companyTagline: string;
  ctaLabel: string;
};

export function HeaderBar({ companyName, companyTagline, ctaLabel }: Props) {
  const [active, setActive] = useState<string>(SECTION_IDS.hero);
  const [open, setOpen] = useState(false);

  // تمييز القسم الظاهر حاليًا في الشاشة
  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-6">
        <a
          href={`#${SECTION_IDS.hero}`}
          className="flex items-center gap-3.5 shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/logo-mark.png"
            width={600}
            height={357}
            className="h-10 sm:h-12 w-auto shrink-0"
          />
          <span aria-hidden="true" className="h-9 w-px bg-primary/30" />
          <div className="flex flex-col text-right">
            <span className="text-title-lg font-bold text-on-surface tracking-wide leading-tight">
              {companyName}
            </span>
            <span className="text-[11px] text-primary font-semibold tracking-wider uppercase">
              {companyTagline}
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="التنقل الرئيسي">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "transition-colors py-2 text-primary font-bold relative after:content-[''] after:absolute after:bottom-[-26px] after:right-0 after:left-0 after:h-[2.5px] after:bg-primary"
                    : "text-on-surface/80 hover:text-primary transition-colors py-2 font-medium"
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {ctaLabel && (
            <a
              href={`#${SECTION_IDS.contact}`}
              className="hidden sm:inline-flex items-center gap-2 bg-primary text-on-primary px-space-lg py-2.5 text-label-md hover:bg-primary-container transition-all duration-300 font-bold tracking-wider shadow-sm border border-primary/20"
            >
              <ReceiptText className="size-4" />
              <span>{ctaLabel}</span>
            </a>
          )}
          <button
            type="button"
            className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="lg:hidden border-t border-outline-variant/60 bg-surface px-margin-mobile py-4 flex flex-col"
          aria-label="قائمة الجوال"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={`py-3 border-b border-outline-variant/40 last:border-0 ${
                active === item.id ? "text-primary font-bold" : "text-on-surface/80 font-medium"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
