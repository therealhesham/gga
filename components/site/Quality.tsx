import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";
import { CountUp } from "./CountUp";
import { MetricBar } from "./MetricBar";
import { Reveal, RevealHeading } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

type Props = Pick<SiteData, "settings" | "qualityItems" | "metrics" | "certifications">;

export function Quality({ settings, qualityItems, metrics, certifications }: Props) {
  return (
    <section
      id={SECTION_IDS.quality}
      className="snap-section relative w-full min-h-svh flex items-center bg-stone text-ink py-24 md:py-32 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto w-full px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionEyebrow index="05">{settings.qualityEyebrow}</SectionEyebrow>
            </Reveal>
            <RevealHeading size="text-[clamp(2.1rem,4vw,3.4rem)]" className="mb-6">
              {settings.qualityTitle}
            </RevealHeading>
            <Reveal delay={120}>
              <p className="text-base font-light leading-8 text-ink/65 max-w-xl">
                {settings.qualityText}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {qualityItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-5 py-5">
                    <Icon name={item.icon} className="size-6 text-ink/45 mt-0.5 shrink-0 [stroke-width:1.3]" />
                    <div>
                      <h3 className="font-display text-lg font-medium">{item.title}</h3>
                      <p className="mt-1.5 text-sm font-light leading-7 text-ink/60">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-6 lg:ps-4">
            <div className="mb-9">
              <span className="block text-sm font-medium text-gold mb-2">{settings.metricsEyebrow}</span>
              <h3 className="font-display text-2xl md:text-3xl font-normal">{settings.metricsTitle}</h3>
            </div>

            <div className="space-y-8">
              {metrics.map((m) => (
                <div key={m.id}>
                  <div className="flex items-end justify-between gap-4 mb-3.5">
                    <span className="text-base font-light text-ink/75">{m.label}</span>
                    <span className="font-display text-2xl md:text-3xl font-normal text-ink shrink-0 tabular-nums">
                      <CountUp text={m.valueText} />
                    </span>
                  </div>
                  <MetricBar percent={m.percent} />
                </div>
              ))}
            </div>

            {certifications.length > 0 && (
              <div className="grid grid-cols-3 mt-12 border-t border-ink/12 [&>*:not(:first-child)]:border-s [&>*]:border-ink/10">
                {certifications.map((c) => (
                  <div key={c.id} className="flex flex-col items-center text-center pt-7 px-2">
                    <Icon name={c.icon} className="size-7 text-gold mb-3 [stroke-width:1.2]" />
                    <span className="font-display text-base font-medium">{c.code}</span>
                    <span className="text-xs font-light text-ink/50 mt-1">{c.label}</span>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
