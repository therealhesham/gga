import { Building2, CalendarClock, Mail, MapPin, PhoneCall } from "lucide-react";
import type { SiteSettingsData } from "@/lib/data";

const DEFAULT_TITLE = "نبني شيئًا استثنائيًا";
const DEFAULT_TEXT =
  "نعمل حاليًا على إطلاق موقعنا الجديد. ترقبوا الإطلاق قريبًا.";

export function ComingSoon({ settings }: { settings: SiteSettingsData }) {
  const contacts = [
    { Icon: PhoneCall, value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}`, ltr: true },
    { Icon: Mail, value: settings.email, href: `mailto:${settings.email}`, ltr: true },
    { Icon: MapPin, value: settings.address, href: undefined, ltr: false },
  ].filter((c) => c.value);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F4EFE6] via-[#FAF8F5] to-surface flex flex-col">
      {/* شبكة معمارية خفيفة */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(150 110 29 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(150 110 29 / 0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-primary-fixed/30 rounded-full blur-[180px]" />
      </div>
      {settings.comingSoonImage && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-[0.14] mix-blend-multiply"
          style={{ backgroundImage: `url('${settings.comingSoonImage}')` }}
        />
      )}

      {/* الشعار */}
      <header className="relative z-10 px-margin-mobile md:px-margin pt-8 md:pt-10">
        <div className="max-w-5xl mx-auto flex items-center gap-3.5">
          {settings.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={settings.companyName}
              src={settings.logoUrl}
              className="size-11 rounded-full object-cover ring-2 ring-primary/30"
            />
          ) : (
            <span className="size-11 bg-primary text-on-primary flex items-center justify-center">
              <Building2 className="size-6" />
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-title-lg font-bold text-on-surface leading-tight">
              {settings.companyName}
            </span>
            <span className="text-[11px] text-primary font-semibold tracking-wider uppercase">
              {settings.companyTagline}
            </span>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <section className="relative z-10 flex-1 flex items-center px-margin-mobile md:px-margin py-16">
        <div className="max-w-5xl mx-auto w-full">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-surface-container-lowest border border-outline-variant/80 mb-8 shadow-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full bg-primary opacity-60 animate-ping motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 bg-primary" />
            </span>
            <span className="text-label-sm text-primary font-bold tracking-widest uppercase">
              قريبًا · Coming Soon
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[72px] md:leading-[1.15] text-on-surface font-extrabold tracking-tight mb-6 max-w-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-[#B88931] to-on-surface">
              {settings.comingSoonTitle || DEFAULT_TITLE}
            </span>
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10">
            {settings.comingSoonText || DEFAULT_TEXT}
          </p>

          {/* شريط تقدم متحرك */}
          <div className="max-w-md mb-10" aria-hidden="true">
            <div className="relative h-1.5 bg-surface-container-high overflow-hidden">
              <div className="cs-bar absolute inset-y-0 w-1/3 bg-gradient-to-l from-transparent via-primary-container to-primary" />
            </div>
          </div>

          {settings.comingSoonLaunch && (
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-surface-container-lowest border border-outline-variant shadow-sm">
              <CalendarClock className="size-5 text-primary" />
              <span className="font-bold text-on-surface">{settings.comingSoonLaunch}</span>
            </div>
          )}
        </div>
      </section>

      {/* التواصل */}
      {contacts.length > 0 && (
        <footer className="relative z-10 border-t border-outline-variant/60 bg-surface-container-lowest/70 backdrop-blur px-margin-mobile md:px-margin py-6">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-on-surface-variant">
            {contacts.map(({ Icon: I, value, href, ltr }) => {
              const inner = (
                <>
                  <I className="size-4 text-primary shrink-0" />
                  <span dir={ltr ? "ltr" : undefined}>{value}</span>
                </>
              );
              return href ? (
                <a
                  key={value}
                  href={href}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  {inner}
                </a>
              ) : (
                <span key={value} className="flex items-center gap-2">
                  {inner}
                </span>
              );
            })}
          </div>
        </footer>
      )}
    </main>
  );
}
