import { SECTION_IDS } from "@/lib/constants";
import type { SiteSettingsData } from "@/lib/data";
import { ConsultationForm } from "./ConsultationForm";
import { SectionHead } from "./SectionHead";

export function Consultation({ settings }: { settings: SiteSettingsData }) {
  const contacts = [
    { label: "الخط الهندسي المباشر", value: settings.phone, ltr: true },
    { label: "استقبال المناقصات والعطاءات", value: settings.tendersEmail, ltr: true },
    { label: "الإدارة العامة", value: settings.address, ltr: false },
  ].filter((c) => c.value);

  return (
    <section id={SECTION_IDS.contact} className="band-2 section--tall">
      <div className="container">
        <div className="grid-12">
          <div className="c-1-5">
            <SectionHead label={settings.consultEyebrow} title={settings.consultTitle} />
            <p>{settings.consultText}</p>
            <dl className="contacts">
              {contacts.map(({ label, value, ltr }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd dir={ltr ? "ltr" : undefined} style={ltr ? { textAlign: "right" } : undefined}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            {settings.ndaNote && <p className="note">{settings.ndaNote}</p>}
          </div>

          <div className="c-6-12">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
