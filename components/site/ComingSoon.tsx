import { CalendarClock } from "lucide-react";
import type { SiteSettingsData } from "@/lib/data";

const DEFAULT_TITLE = "نبني شيئًا استثنائيًا";
const DEFAULT_TEXT =
  "نعمل حاليًا على إطلاق موقعنا الجديد. ترقبوا الإطلاق قريبًا.";

export function ComingSoon({ settings }: { settings: SiteSettingsData }) {
  const contacts = [
    { label: "الهاتف", value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}`, ltr: true },
    { label: "البريد", value: settings.email, href: `mailto:${settings.email}`, ltr: true },
    { label: "العنوان", value: settings.address, href: undefined, ltr: false },
  ].filter((c) => c.value);

  return (
    <div className="site">
      <main className="soon band-ink on-ink">
        {settings.comingSoonImage && (
          <div className="soon__media" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.comingSoonImage} alt="" />
          </div>
        )}

        <header className="container soon__head">
          {settings.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" src={settings.logoUrl} width={44} height={44} className="soon__logo" />
          )}
          <span className="nav__name">
            <strong>{settings.companyName}</strong>
            <span>{settings.companyTagline}</span>
          </span>
        </header>

        <section className="container soon__body">
          <h1>{settings.comingSoonTitle || DEFAULT_TITLE}</h1>
          <p className="lead">{settings.comingSoonText || DEFAULT_TEXT}</p>

          <div className="soon__bar" aria-hidden="true">
            <span className="cs-bar" />
          </div>
          <p className="soon__tag">
            <span>قريبًا</span> <span lang="en">Coming Soon</span>
          </p>

          {settings.comingSoonLaunch && (
            <p className="soon__launch">
              <CalendarClock size={20} aria-hidden="true" />
              <strong>{settings.comingSoonLaunch}</strong>
            </p>
          )}
        </section>

        {contacts.length > 0 && (
          <footer className="container">
            <dl className="soon__contacts">
              {contacts.map(({ label, value, href, ltr }) => (
                <div key={value}>
                  <dt>{label}</dt>
                  <dd dir={ltr ? "ltr" : undefined}>{href ? <a href={href}>{value}</a> : value}</dd>
                </div>
              ))}
            </dl>
          </footer>
        )}
      </main>
    </div>
  );
}
