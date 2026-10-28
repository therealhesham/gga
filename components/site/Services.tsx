import { ArrowLeft } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

export function Services({ settings, services }: Pick<SiteData, "settings" | "services">) {
  return (
    <section
      id={SECTION_IDS.services}
      className="w-full py-24 bg-surface-container-low border-y border-outline-variant/60 relative"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionEyebrow>{settings.servicesEyebrow}</SectionEyebrow>
            <h2 className="text-headline-lg md:text-[44px] text-on-surface font-extrabold tracking-tight">
              {settings.servicesTitle}
            </h2>
          </div>
          <p className="text-body-md text-on-surface-variant max-w-md font-medium">
            {settings.servicesIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="group bg-surface-container-lowest hover:bg-white transition-all duration-300 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl relative overflow-hidden border border-outline-variant"
            >
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-primary via-primary-container to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="size-14 bg-surface-container-low border border-outline-variant flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Icon name={s.icon} className="size-7" />
                </div>
                {s.code && (
                  <div dir="ltr" className="font-mono text-xs text-primary font-semibold mb-2 text-right">
                    {s.code}
                  </div>
                )}
                <h3 className="text-title-lg font-bold text-on-surface group-hover:text-primary transition-colors mb-4">
                  {s.title}
                </h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed mb-6">
                  {s.description}
                </p>
              </div>
              <a
                href={`#${SECTION_IDS.projects}`}
                className="pt-4 flex items-center justify-between text-label-md text-primary font-bold border-t border-outline-variant/40"
              >
                <span>استعراض النماذج</span>
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
