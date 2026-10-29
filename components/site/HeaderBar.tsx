"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { BadgeCheck, MapPin, Menu, Phone, X } from "lucide-react";
import { NAV_ITEMS, SECTION_IDS } from "@/lib/constants";
import { EASE } from "@/lib/motion";
import { useActiveSection } from "./useActiveSection";

type Props = {
  companyName: string;
  companyTagline: string;
  ctaLabel: string;
  topAddress: string;
  phone: string;
  crBadge: string;
};

export function HeaderBar({
  companyName,
  companyTagline,
  ctaLabel,
  topAddress,
  phone,
  crBadge,
}: Props) {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // شريط تقدم القراءة أسفل الهيدر
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // الشريط شفاف فوق الهيرو الغامق، ثم يصبح عاجيًا زجاجيًا عند التمرير
  const solid = scrolled || open;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid
          ? "bg-ivory/90 backdrop-blur-xl shadow-[0_1px_0_rgba(15,15,17,0.08)] text-ink"
          : "bg-gradient-to-b from-ink/75 via-ink/30 to-transparent text-white"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress, transformOrigin: "right" }}
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gold-soft"
      />

      {/* شريط المعلومات: يختفي بنعومة عند التمرير */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        } hidden sm:block`}
      >
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin h-10 flex items-center justify-between text-xs font-light text-white/70">
          <div className="flex items-center gap-6">
            {topAddress && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-gold-soft" />
                {topAddress}
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-1.5" dir="ltr">
                <Phone className="size-3.5 text-gold-soft" />
                {phone}
              </span>
            )}
          </div>
          {crBadge && (
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="size-3.5 text-gold-soft" />
              {crBadge}
            </span>
          )}
        </div>
        <div className="h-px bg-white/10 max-w-7xl mx-auto" />
      </div>

      <div
        className={`max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-6 transition-all duration-500 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <a
          href={`#${SECTION_IDS.hero}`}
          aria-label={companyName}
          className="flex items-center gap-4 shrink-0"
        >
          {/* نسختان من الرمز: فاتحة فوق الفيديو، وأصلية على الخلفية العاجية */}
          <span className="relative block h-10 sm:h-11 aspect-[600/357]">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              alt=""
              src="/logo-mark-light.png"
              width={600}
              height={357}
              className={`absolute inset-0 size-full transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`}
            />
            <img
              alt=""
              src="/logo-mark.png"
              width={600}
              height={357}
              className={`absolute inset-0 size-full transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`}
            />
            {/* eslint-enable @next/next/no-img-element */}
          </span>
          <span aria-hidden="true" className={`h-8 w-px ${solid ? "bg-ink/15" : "bg-white/25"}`} />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[17px] sm:text-lg font-semibold">{companyName}</span>
            <span
              className={`text-[11px] font-light mt-0.5 ${solid ? "text-gold" : "text-gold-soft"}`}
            >
              {companyTagline}
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9" aria-label="التنقل الرئيسي">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 text-[15px] transition-colors after:absolute after:-bottom-0.5 after:right-0 after:h-px after:bg-gold-soft after:transition-all after:duration-500 ${
                  isActive
                    ? `font-semibold after:w-0 ${solid ? "text-ink" : "text-white"}`
                    : `font-normal after:w-0 hover:after:w-full ${
                        solid ? "text-ink/65 hover:text-ink" : "text-white/70 hover:text-white"
                      }`
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className={`absolute -bottom-0.5 inset-x-0 h-px ${solid ? "bg-gold" : "bg-gold-soft"}`}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {ctaLabel && (
            <a
              href={`#${SECTION_IDS.contact}`}
              className={`hidden sm:inline-flex items-center px-6 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                solid
                  ? "bg-ink text-ivory hover:bg-gold hover:text-white"
                  : "bg-gold-soft text-ink hover:bg-white"
              }`}
            >
              {ctaLabel}
            </a>
          )}
          <button
            type="button"
            className="lg:hidden p-2 -me-2"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="lg:hidden overflow-hidden border-t border-ink/10 bg-ivory px-margin-mobile flex flex-col"
          aria-label="قائمة الجوال"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={`py-4 border-b border-ink/10 text-lg font-display ${
                active === item.id ? "text-gold font-semibold" : "text-ink/80"
              }`}
            >
              {item.label}
            </a>
          ))}
          {ctaLabel && (
            <a
              href={`#${SECTION_IDS.contact}`}
              onClick={() => setOpen(false)}
              className="my-5 text-center bg-ink text-ivory py-3.5 font-semibold"
            >
              {ctaLabel}
            </a>
          )}
        </motion.nav>
      )}
      </AnimatePresence>
    </motion.header>
  );
}
