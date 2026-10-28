import { Award, Building2, ChevronLeft, Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";

const QUICK_LINKS = [
  { label: "الرئيسية والمنجزات", href: `#${SECTION_IDS.hero}` },
  { label: "نبذة عن المؤسسة وتاريخنا", href: `#${SECTION_IDS.about}` },
  { label: "محفظة المشاريع الكبرى", href: `#${SECTION_IDS.projects}` },
  { label: "معايير الأمان والسلامة", href: `#${SECTION_IDS.quality}` },
  { label: "طلب استشارة وتسعير", href: `#${SECTION_IDS.contact}` },
];

function LinkItem({ label, href }: { label: string; href: string }) {
  return (
    <li className="flex items-center gap-2">
      <ChevronLeft className="size-3 text-primary" />
      <a className="text-on-surface-variant hover:text-primary transition-colors" href={href}>
        {label}
      </a>
    </li>
  );
}

export function Footer({ settings, services }: Pick<SiteData, "settings" | "services">) {
  return (
    <footer className="w-full bg-surface-container-high border-t border-outline-variant text-on-surface">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-12">
          <div className="space-y-space-md">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-surface-container-lowest border border-outline-variant flex items-center justify-center">
                <Building2 className="size-6 text-primary" />
              </div>
              <div>
                <span className="text-title-lg font-bold text-on-surface block leading-snug">
                  {settings.companyName}
                </span>
                <span className="text-[11px] text-primary block uppercase font-bold tracking-wider">
                  {settings.companyTagline}
                </span>
              </div>
            </div>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              {settings.footerAbout}
            </p>
            {settings.footerBadge && (
              <div className="flex items-center gap-3 pt-space-xs">
                <div className="p-2 bg-surface-container-lowest border border-outline-variant">
                  <Award className="size-4 text-primary" />
                </div>
                <span className="text-label-sm text-secondary font-semibold">
                  {settings.footerBadge}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-space-sm">
            <h4 className="text-title-lg font-bold text-on-surface tracking-wide mb-space-md">
              روابط رئيسية
            </h4>
            <ul className="space-y-2.5 text-body-sm">
              {QUICK_LINKS.map((l) => (
                <LinkItem key={l.href} {...l} />
              ))}
            </ul>
          </div>

          <div className="space-y-space-sm">
            <h4 className="text-title-lg font-bold text-on-surface tracking-wide mb-space-md">
              الخدمات التخصصية
            </h4>
            <ul className="space-y-2.5 text-body-sm">
              {services.map((s) => (
                <LinkItem key={s.id} label={s.title} href={`#${SECTION_IDS.services}`} />
              ))}
            </ul>
          </div>

          <div className="space-y-space-sm">
            <h4 className="text-title-lg font-bold text-on-surface tracking-wide mb-space-md">
              المقر الرئيسي والتواصل
            </h4>
            <div className="space-y-3 text-body-sm text-on-surface-variant">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-[18px] text-primary mt-0.5 shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-[18px] text-primary shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="size-[18px] text-primary shrink-0" />
                <span dir="ltr">{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="size-[18px] text-primary shrink-0" />
                <span>{settings.workingHours}</span>
              </div>
            </div>
            {settings.footerIso && (
              <div className="pt-space-xs">
                <div className="p-space-sm bg-surface-container-lowest border border-outline-variant text-xs text-on-surface-variant flex items-center justify-between">
                  <span>الاعتماد والامتثال:</span>
                  <span className="text-primary font-bold">{settings.footerIso}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-outline-variant/60 text-xs text-on-surface-variant">
          {settings.footerCopyright}
        </div>
      </div>
    </footer>
  );
}
