import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";
import { Blueprint } from "./Blueprint";
import { CountUp } from "./CountUp";
import { MetricBar } from "./MetricBar";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

type Props = Pick<SiteData, "settings" | "qualityItems" | "metrics" | "certifications">;

export function Quality({ settings, qualityItems, metrics, certifications }: Props) {
  return (
    <section
      id={SECTION_IDS.quality}
      className="snap-section relative w-full min-h-svh flex items-center bg-ink-soft text-white py-24 md:py-28 overflow-hidden"
    >
      {/* وهج ذهبي هادئ في الخلفية */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[36rem] rounded-full bg-gold/10 blur-[140px]"
      />
      <Blueprint className="pointer-events-none absolute right-6 bottom-0 hidden h-[78%] w-auto text-gold-soft/15 lg:block" />
      <div className="relative max-w-7xl mx-auto w-full px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionEyebrow dark>{settings.qualityEyebrow}</SectionEyebrow>
              <h2 className="font-display font-medium text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.4] mb-6">
                {settings.qualityTitle}
              </h2>
              <p className="text-base font-light leading-8 text-white/65 max-w-xl">
                {settings.qualityText}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {qualityItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-5 py-5">
                    <Icon name={item.icon} className="size-7 text-gold-soft mt-0.5 shrink-0 [stroke-width:1.3]" />
                    <div>
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1.5 text-sm font-light leading-7 text-white/55">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-6 lg:ps-4">
            <div className="mb-9">
              <span className="block text-sm font-medium text-gold-soft mb-2">{settings.metricsEyebrow}</span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold">{settings.metricsTitle}</h3>
            </div>

            <div className="space-y-8">
              {metrics.map((m) => (
                <div key={m.id}>
                  <div className="flex items-end justify-between gap-4 mb-3.5">
                    <span className="text-base font-light text-white/80">{m.label}</span>
                    <span className="font-display text-2xl md:text-3xl font-semibold text-gold-soft shrink-0 tabular-nums">
                      <CountUp text={m.valueText} />
                    </span>
                  </div>
                  <MetricBar percent={m.percent} />
                </div>
              ))}
            </div>

            {certifications.length > 0 && (
              <div className="grid grid-cols-3 mt-12 border-t border-white/12 [&>*:not(:first-child)]:border-s [&>*]:border-white/10">
                {certifications.map((c) => (
                  <div key={c.id} className="flex flex-col items-center text-center pt-7 px-2">
                    <Icon name={c.icon} className="size-8 text-gold-soft mb-3 [stroke-width:1.2]" />
                    <span className="font-display text-base font-semibold">{c.code}</span>
                    <span className="text-xs font-light text-white/50 mt-1">{c.label}</span>
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
