import { Building2, Lock, Mail, Phone } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteSettingsData } from "@/lib/data";
import { ConsultationForm } from "./ConsultationForm";
import { SectionEyebrow } from "./SectionEyebrow";

export function Consultation({ settings }: { settings: SiteSettingsData }) {
  const contacts = [
    { Icon: Phone, label: "الخط الهندسي المباشر:", value: settings.phone, ltr: true },
    { Icon: Mail, label: "استقبال المناقصات والعطاءات:", value: settings.tendersEmail, ltr: false },
    { Icon: Building2, label: "الإدارة العامة:", value: settings.address, ltr: false },
  ].filter((c) => c.value);

  return (
    <section
      id={SECTION_IDS.contact}
      className="w-full py-24 bg-surface-container-low border-t border-outline-variant/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-surface-container-lowest border border-outline-variant shadow-xl p-8 md:p-14">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <SectionEyebrow>{settings.consultEyebrow}</SectionEyebrow>
              <h2 className="text-headline-lg font-extrabold text-on-surface tracking-tight mb-4">
                {settings.consultTitle}
              </h2>
              <p className="text-body-md text-on-surface-variant leading-relaxed mb-8">
                {settings.consultText}
              </p>

              <div className="space-y-4">
                {contacts.map(({ Icon: I, label, value, ltr }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="size-12 shrink-0 bg-surface-container border border-outline-variant flex items-center justify-center text-primary">
                      <I className="size-6" />
                    </div>
                    <div>
                      <span className="text-xs text-on-surface-variant block font-medium">
                        {label}
                      </span>
                      <span
                        dir={ltr ? "ltr" : undefined}
                        className="text-title-lg font-bold text-on-surface"
                      >
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {settings.ndaNote && (
              <div className="p-4 bg-surface-container border border-outline-variant/60 text-xs text-secondary flex items-center gap-3">
                <Lock className="size-5 text-primary shrink-0" />
                <span>{settings.ndaNote}</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 bg-surface-container-low border border-outline-variant p-6 md:p-10 shadow-sm">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
