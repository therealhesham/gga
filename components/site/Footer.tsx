import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";

const quickLinks = (base: string) => [
  { label: "الرئيسية", href: `${base}#${SECTION_IDS.hero}` },
  { label: "عن المؤسسة", href: `${base}#${SECTION_IDS.about}` },
  { label: "محفظة المشاريع", href: `${base}#${SECTION_IDS.projects}` },
  { label: "معايير الجودة والسلامة", href: `${base}#${SECTION_IDS.quality}` },
  { label: "طلب استشارة وتسعير", href: `${base}#${SECTION_IDS.contact}` },
];

export function Footer({
  settings,
  services,
  homeBase = "",
}: Pick<SiteData, "settings" | "services"> & { homeBase?: string }) {
  return (
    <footer className="band-ink on-ink">
      <div className="container">
        {/* خاتمة الصفحة: دعوة واحدة واضحة */}
        <div className="footer__close">
          <h2>لنبنِ معًا معلمك القادم</h2>
          <div>
            <a className="btn" href={`${homeBase}#${SECTION_IDS.contact}`}>
              اطلب عرض سعر
            </a>
            {settings.phone && (
              <a className="footer__phone" dir="ltr" href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}>
                {settings.phone}
              </a>
            )}
          </div>
        </div>

        <div className="footer__cols">
          <div className="footer__brand">
            <a className="nav__brand" href={`${homeBase}#${SECTION_IDS.hero}`} aria-label={settings.companyName}>
              <span className="nav__mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src="/logo-mark-light.png" width={600} height={357} style={{ opacity: 1 }} />
              </span>
              <span className="nav__name">
                <strong>{settings.companyName}</strong>
                <span>{settings.companyTagline}</span>
              </span>
            </a>
            <p>{settings.footerAbout}</p>
            {settings.footerBadge && <p>{settings.footerBadge}</p>}
            {settings.crBadge && <p>{settings.crBadge}</p>}
          </div>

          <nav className="footer__col" aria-label="روابط رئيسية">
            <h3>روابط رئيسية</h3>
            <ul>
              {quickLinks(homeBase).map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3>الخدمات التخصصية</h3>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`${homeBase}#${SECTION_IDS.services}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>المقر الرئيسي والتواصل</h3>
            <ul>
              {settings.address && <li>{settings.address}</li>}
              {settings.topAddress && settings.topAddress !== settings.address && <li>{settings.topAddress}</li>}
              {settings.email && (
                <li dir="ltr" style={{ textAlign: "right" }}>
                  {settings.email}
                </li>
              )}
              {settings.phone && (
                <li dir="ltr" style={{ textAlign: "right" }}>
                  {settings.phone}
                </li>
              )}
              {settings.workingHours && <li>{settings.workingHours}</li>}
              {settings.footerIso && <li>الاعتماد والامتثال: {settings.footerIso}</li>}
            </ul>
          </div>
        </div>

        <div className="footer__legal">
          <span>{settings.footerCopyright}</span>
          <a href={`${homeBase}#${SECTION_IDS.hero}`}>العودة للأعلى</a>
        </div>
      </div>
    </footer>
  );
}
