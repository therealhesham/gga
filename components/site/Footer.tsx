import { ArrowLeft, ArrowUpRight, Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";
import { FitText } from "./FitText";
import { Reveal, RevealHeading } from "./Reveal";

const quickLinks = (base: string) => [
  { label: "الرئيسية", href: `${base}#${SECTION_IDS.hero}` },
  { label: "عن المؤسسة", href: `${base}#${SECTION_IDS.about}` },
  { label: "محفظة المشاريع", href: `${base}#${SECTION_IDS.projects}` },
  { label: "معايير الجودة والسلامة", href: `${base}#${SECTION_IDS.quality}` },
  { label: "طلب استشارة وتسعير", href: `${base}#${SECTION_IDS.contact}` },
];

const linkClass = "text-sm font-light text-white/60 hover:text-gold-soft transition-colors";

export function Footer({
  settings,
  services,
  homeBase = "",
}: Pick<SiteData, "settings" | "services"> & { homeBase?: string }) {
  return (
    <footer className="snap-section w-full overflow-hidden bg-ink text-white">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* خاتمة الصفحة: دعوة واحدة واضحة */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 py-24 md:py-32 border-b border-white/10">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="mb-6 flex items-center gap-3 text-sm font-medium text-gold-soft">
                <span className="h-px w-10 bg-gold-soft/70" />
                مشروعك القادم
              </span>
            </Reveal>
            <RevealHeading size="text-[clamp(2.3rem,5vw,4.6rem)]" weight="font-light" className="leading-[1.2]">
              لنبنِ معًا معلمك <span className="font-normal text-gold-soft">القادم</span>
            </RevealHeading>
          </div>
          <Reveal delay={150} className="lg:col-span-4 flex flex-col items-start gap-5 lg:items-end">
            <a
              href={`${homeBase}#${SECTION_IDS.contact}`}
              className="group inline-flex items-center gap-3 rounded-full bg-gold-soft px-9 py-4 text-sm font-bold text-ink transition-colors duration-300 hover:bg-white"
            >
              اطلب عرض سعر
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </a>
            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                dir="ltr"
                className="text-lg font-light text-white/70 transition-colors hover:text-white"
              >
                {settings.phone}
              </a>
            )}
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-12 gap-y-12 pt-16 pb-14">
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
                <span className="block font-display text-lg font-medium">{settings.companyName}</span>
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
            <h4 className="font-display text-base font-medium mb-5">روابط رئيسية</h4>
            <ul className="space-y-3">
              {quickLinks(homeBase).map((l) => (
                <li key={l.href}>
                  <a className={linkClass} href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-medium mb-5">الخدمات التخصصية</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a className={linkClass} href={`${homeBase}#${SECTION_IDS.services}`}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-base font-medium mb-5">المقر الرئيسي والتواصل</h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="size-[18px] text-white/40 mt-0.5 shrink-0 [stroke-width:1.5]" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-[18px] text-white/40 shrink-0 [stroke-width:1.5]" />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="size-[18px] text-white/40 shrink-0 [stroke-width:1.5]" />
                <span dir="ltr">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-[18px] text-white/40 shrink-0 [stroke-width:1.5]" />
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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-7 pb-10 border-t border-white/10 text-xs font-light text-white/45">
          <span>{settings.footerCopyright}</span>
          <a
            href={`${homeBase}#${SECTION_IDS.hero}`}
            className="inline-flex items-center gap-1.5 hover:text-gold-soft transition-colors"
          >
            العودة للأعلى
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
      <FitText className="px-margin-mobile md:px-margin font-display font-light text-white/[0.07] select-none -mb-[0.06em]">
        {settings.companyName}
      </FitText>
    </footer>
  );
}
