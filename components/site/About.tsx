import { Award } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";
import { Img } from "./Img";
import { SectionEyebrow } from "./SectionEyebrow";

export function About({ settings, pillars }: Pick<SiteData, "settings" | "pillars">) {
  return (
    <section id={SECTION_IDS.about} className="w-full py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative bg-surface-container-lowest p-3 border border-outline-variant shadow-lg">
              <div className="relative h-[480px] md:h-[580px] w-full overflow-hidden">
                <Img
                  src={settings.aboutImage}
                  alt={settings.aboutPlaqueTitle || settings.companyName}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>

              {settings.aboutPlaqueTitle && (
                <div className="absolute -bottom-6 -right-6 bg-surface-container-lowest p-6 shadow-xl max-w-xs hidden sm:block border border-outline-variant">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="size-6 text-primary" />
                    <span className="text-label-md text-primary font-bold tracking-wider">
                      {settings.aboutPlaqueTitle}
                    </span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    {settings.aboutPlaqueText}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <SectionEyebrow>{settings.aboutEyebrow}</SectionEyebrow>
              <h2 className="text-headline-lg md:text-[44px] md:leading-tight text-on-surface font-extrabold tracking-tight">
                {settings.aboutTitle}
              </h2>
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed text-justify">
              {settings.aboutP1}
            </p>
            {settings.aboutP2 && (
              <p className="text-body-md text-on-surface-variant leading-relaxed text-justify">
                {settings.aboutP2}
              </p>
            )}

            {pillars.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {pillars.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 bg-surface-container-lowest border border-outline-variant/70 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name={p.icon} className="size-5 text-primary shrink-0" />
                      <h4 className="text-title-lg font-bold text-on-surface">{p.title}</h4>
                    </div>
                    <p className="text-body-sm text-on-surface-variant">{p.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
