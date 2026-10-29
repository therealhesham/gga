import { Building2, Lock, Mail, Phone } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteSettingsData } from "@/lib/data";
import { ConsultationForm } from "./ConsultationForm";
import { Reveal, RevealHeading } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

export function Consultation({ settings }: { settings: SiteSettingsData }) {
  const contacts = [
    { Icon: Phone, label: "الخط الهندسي المباشر", value: settings.phone, ltr: true },
    { Icon: Mail, label: "استقبال المناقصات والعطاءات", value: settings.tendersEmail, ltr: false },
    { Icon: Building2, label: "الإدارة العامة", value: settings.address, ltr: false },
  ].filter((c) => c.value);

  return (
    <section
      id={SECTION_IDS.contact}
      className="snap-section relative w-full min-h-svh flex items-center bg-ivory py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:pt-4">
            <Reveal>
              <SectionEyebrow index="07">{settings.consultEyebrow}</SectionEyebrow>
            </Reveal>
            <RevealHeading size="text-[clamp(2rem,3.4vw,3rem)]" className="text-ink mb-6">
              {settings.consultTitle}
            </RevealHeading>
            <Reveal delay={120}>
              <p className="text-base font-light leading-8 text-ink/65 mb-9">{settings.consultText}</p>

              <ul className="space-y-6">
                {contacts.map(({ Icon: I, label, value, ltr }) => (
                  <li key={label} className="flex items-center gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/70">
                      <I className="size-5 [stroke-width:1.5]" />
                    </span>
                    <div>
                      <span className="block text-sm font-light text-ink/50">{label}</span>
                      <span dir={ltr ? "ltr" : undefined} className="block text-lg font-medium text-ink">
                        {value}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {settings.ndaNote && (
                <p className="mt-10 flex items-center gap-3 text-sm font-light text-ink/55">
                  <Lock className="size-4 text-gold shrink-0" />
                  <span>{settings.ndaNote}</span>
                </p>
              )}
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="bg-white p-7 md:p-12 border border-ink/[0.06] shadow-[0_40px_90px_-60px_rgba(15,15,17,0.3)]">
              <ConsultationForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
