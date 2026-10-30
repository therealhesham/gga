"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SECTION_IDS } from "@/lib/constants";
import { useActiveSection } from "./useActiveSection";

type Props = {
  companyName: string;
  companyTagline: string;
  ctaLabel: string;
  phone: string;
  /** false في الصفحات الفرعية: الروابط تعود للرئيسية ولا يُميَّز قسم */
  home?: boolean;
};

export function HeaderBar({ companyName, companyTagline, ctaLabel, phone, home = true }: Props) {
  const sectionActive = useActiveSection();
  const active = home ? sectionActive : "";
  const base = home ? "" : "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // شفاف فوق الهيرو الغامق، ثم ورقي عند التمرير أو فتح القائمة
  const solid = scrolled || open;

  return (
    <header className="nav" data-solid={solid}>
      <div className="container nav__bar">
        <a href={`${base}#${SECTION_IDS.hero}`} aria-label={companyName} className="nav__brand">
          <span className="nav__mark">
            {/* eslint-disable @next/next/no-img-element */}
            <img alt="" src="/logo-mark-light.png" width={600} height={357} />
            <img alt="" src="/logo-mark.png" width={600} height={357} />
            {/* eslint-enable @next/next/no-img-element */}
          </span>
          <span className="nav__name">
            <strong>{companyName}</strong>
            <span>{companyTagline}</span>
          </span>
        </a>

        <nav aria-label="التنقل الرئيسي">
          <ul className="nav__links">
            {NAV_ITEMS.slice(1, -1).map((item) => (
              <li key={item.id}>
                <a
                  href={`${base}#${item.id}`}
                  aria-current={active === item.id ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          {phone && (
            <a className="nav__phone" dir="ltr" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
              {phone}
            </a>
          )}
          {ctaLabel && (
            <a className="btn btn--small" href={`${base}#${SECTION_IDS.contact}`}>
              {ctaLabel}
            </a>
          )}
          <button
            type="button"
            className="nav__toggle"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="nav__panel" aria-label="قائمة الجوال">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`${base}#${item.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          {ctaLabel && (
            <a className="btn" href={`${base}#${SECTION_IDS.contact}`} onClick={() => setOpen(false)}>
              {ctaLabel}
            </a>
          )}
        </nav>
      )}
    </header>
  );
}
