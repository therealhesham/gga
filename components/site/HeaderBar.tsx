"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, MapPin, Phone } from "lucide-react";
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
  /** false في الصفحات الفرعية: الروابط تعود للرئيسية ولا يُميَّز قسم */
  home?: boolean;
};

export function HeaderBar({
  companyName,
  ctaLabel,
  topAddress,
  phone,
  crBadge,
  home = true,
}: Props) {
  const sectionActive = useActiveSection();
  const active = home ? sectionActive : "";
  const base = home ? "" : "/";
  const [open, setOpen] = useState(false);

  // Escape يغلق القائمة، ونمنع تمرير الصفحة خلفها وهي مفتوحة
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="pointer-events-none fixed inset-x-0 top-4 sm:top-6 z-[70] flex justify-center px-4"
      >
        {/* كبسولة عائمة داكنة شبه شفافة */}
        <div className="pointer-events-auto flex w-full lg:w-fit max-w-full items-center justify-between gap-8 rounded-full border border-white/10 bg-black/80 px-5 sm:px-8 lg:px-10 py-2.5 sm:py-3 text-white backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
          <a
            href={`${base}#${SECTION_IDS.hero}`}
            aria-label={companyName}
            className="flex items-center gap-3 shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/logo-mark-light.png"
              width={600}
              height={357}
              className="h-9 sm:h-10 w-auto"
            />
            <span className="hidden xl:block font-display text-base font-medium">{companyName}</span>
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="التنقل الرئيسي">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`${base}#${item.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative whitespace-nowrap py-2 text-[15px] transition-colors after:absolute after:-bottom-0.5 after:right-0 after:h-px after:bg-gold-soft after:transition-[width] after:duration-500 ${
                    isActive
                      ? "font-semibold text-gold-soft after:w-full"
                      : "font-normal text-gold-soft/75 hover:text-gold-soft after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {ctaLabel && (
              <a
                href={`${base}#${SECTION_IDS.contact}`}
                className="hidden lg:inline-flex items-center rounded-lg border border-gold-soft px-5 py-2 text-sm font-medium text-gold-soft transition-colors duration-300 hover:bg-gold-soft hover:text-ink"
              >
                {ctaLabel}
              </a>
            )}
            <button
              type="button"
              className="lg:hidden grid size-11 place-items-center rounded-xl text-gold-soft transition-colors hover:bg-gold-soft/10"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-5 w-7">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`absolute inset-x-0 h-0.5 rounded-full bg-current transition-[transform,opacity] duration-300 ${
                      i === 0
                        ? open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                        : i === 1
                          ? open ? "top-1/2 -translate-y-1/2 opacity-0" : "top-1/2 -translate-y-1/2"
                          : open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                    }`}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              aria-hidden="true"
              className="lg:hidden fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
            />
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: EASE }}
              aria-label="قائمة الجوال"
              className="lg:hidden fixed inset-y-0 right-0 z-[60] flex w-[82%] max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-black pt-28 pb-8"
            >
              <div className="flex flex-col px-8">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`${base}#${item.id}`}
                    onClick={close}
                    aria-current={active === item.id ? "page" : undefined}
                    className={`py-4 text-lg font-display transition-colors ${
                      active === item.id ? "text-gold-soft font-semibold" : "text-gold-soft/75"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-auto border-t border-white/10 px-8 pt-6 flex flex-col gap-4 text-sm text-white/70">
                {ctaLabel && (
                  <a
                    href={`${base}#${SECTION_IDS.contact}`}
                    onClick={close}
                    className="inline-flex justify-center rounded-lg border border-gold-soft py-3 font-medium text-gold-soft"
                  >
                    {ctaLabel}
                  </a>
                )}
                {phone && (
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2" dir="ltr">
                    <Phone className="size-4 text-gold-soft" />
                    {phone}
                  </a>
                )}
                {topAddress && (
                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 text-gold-soft" />
                    {topAddress}
                  </span>
                )}
                {crBadge && (
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="size-4 text-gold-soft" />
                    {crBadge}
                  </span>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
