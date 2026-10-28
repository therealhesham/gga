import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";
import { SectionEyebrow } from "./SectionEyebrow";

type Props = Pick<SiteData, "settings" | "qualityItems" | "metrics" | "certifications">;

export function Quality({ settings, qualityItems, metrics, certifications }: Props) {
  return (
    <section
      id={SECTION_IDS.quality}
      className="w-full py-24 bg-surface-container-low border-y border-outline-variant/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionEyebrow className="">{settings.qualityEyebrow}</SectionEyebrow>
            <h2 className="text-headline-lg md:text-[40px] md:leading-tight text-on-surface font-extrabold tracking-tight">
              {settings.qualityTitle}
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed text-justify">
              {settings.qualityText}
            </p>

            <div className="space-y-4 pt-4">
              {qualityItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-5 bg-surface-container-lowest border border-outline-variant/70 shadow-sm"
                >
                  <Icon name={item.icon} className="size-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="text-title-lg font-bold text-on-surface">{item.title}</h4>
                    <p className="text-body-sm text-on-surface-variant mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-surface-container-lowest p-8 md:p-12 shadow-xl border border-outline-variant relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 pointer-events-none" />
            <div className="mb-8">
              <span className="text-label-sm text-primary font-bold tracking-widest uppercase block mb-1">
                {settings.metricsEyebrow}
              </span>
              <h3 className="text-headline-sm font-bold text-on-surface">{settings.metricsTitle}</h3>
            </div>

            <div className="space-y-6">
              {metrics.map((m, i) => (
                <div key={m.id}>
                  <div className="flex justify-between gap-4 text-label-md mb-2">
                    <span className="text-on-surface font-bold">{m.label}</span>
                    <span className="text-primary font-mono font-bold shrink-0">{m.valueText}</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container">
                    <div
                      className={`h-2.5 ${i % 2 === 1 ? "bg-primary-container" : "bg-primary"}`}
                      style={{ width: `${Math.min(100, Math.max(0, m.percent))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {certifications.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-10 bg-surface-container-low border border-outline-variant/60 p-4 text-center">
                {certifications.map((c) => (
                  <div key={c.id} className="flex flex-col items-center">
                    <Icon name={c.icon} className="size-8 text-primary mb-1" />
                    <span className="font-mono text-xs font-bold text-on-surface">{c.code}</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">{c.label}</span>
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
