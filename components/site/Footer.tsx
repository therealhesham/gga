import { ArrowUpRight, Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";

const QUICK_LINKS = [
  { label: "الرئيسية", href: `#${SECTION_IDS.hero}` },
  { label: "عن المؤسسة", href: `#${SECTION_IDS.about}` },
  { label: "محفظة المشاريع", href: `#${SECTION_IDS.projects}` },
  { label: "معايير الجودة والسلامة", href: `#${SECTION_IDS.quality}` },
  { label: "طلب استشارة وتسعير", href: `#${SECTION_IDS.contact}` },
];

const linkClass = "text-sm font-light text-white/60 hover:text-gold-soft transition-colors";

export function Footer({ settings, services }: Pick<SiteData, "settings" | "services">) {
  return (
    <footer className="snap-section w-full bg-ink text-white">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-12 gap-y-12 pb-14">
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src="/logo-mark-light.png"
                width={600}
                height={357}
                className="h-12 w-auto"
              />
              <span aria-hidden="true" className="h-9 w-px bg-white/20" />
              <div className="leading-tight">
                <span className="block font-display text-lg font-semibold">{settings.companyName}</span>
                <span className="block text-[11px] font-light text-gold-soft mt-0.5">
                  {settings.companyTagline}
                </span>
              </div>
            </div>
            <p className="text-sm font-light leading-8 text-white/55 max-w-sm">{settings.footerAbout}</p>
            {settings.footerBadge && (
              <p className="text-sm font-medium text-gold-soft">{settings.footerBadge}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-base font-semibold mb-5">روابط رئيسية</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a className={linkClass} href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-semibold mb-5">الخدمات التخصصية</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a className={linkClass} href={`#${SECTION_IDS.services}`}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-semibold mb-5">المقر الرئيسي والتواصل</h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="size-[18px] text-gold-soft mt-0.5 shrink-0 [stroke-width:1.5]" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-[18px] text-gold-soft shrink-0 [stroke-width:1.5]" />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="size-[18px] text-gold-soft shrink-0 [stroke-width:1.5]" />
                <span dir="ltr">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-[18px] text-gold-soft shrink-0 [stroke-width:1.5]" />
                <span>{settings.workingHours}</span>
              </li>
            </ul>
            {settings.footerIso && (
              <p className="mt-6 text-sm font-light text-white/50">
                الاعتماد والامتثال: <span className="font-medium text-gold-soft">{settings.footerIso}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-7 border-t border-white/10 text-xs font-light text-white/45">
          <span>{settings.footerCopyright}</span>
          <a
            href={`#${SECTION_IDS.hero}`}
            className="inline-flex items-center gap-1.5 hover:text-gold-soft transition-colors"
          >
            العودة للأعلى
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
