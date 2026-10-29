import { ArrowDown, ArrowLeft } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";
import { HeroMedia } from "./HeroMedia";
import { Particles } from "./Particles";

export function Hero({ settings, stats }: Pick<SiteData, "settings" | "stats">) {
  return (
    <section
      id={SECTION_IDS.hero}
      className="snap-section relative isolate w-full min-h-svh overflow-hidden bg-ink text-white flex flex-col"
    >
      {/* الخلفية: فيديو إنشاءات + طبقات تدرّج لثبات قراءة النص */}
      <div className="absolute inset-0 -z-10">
        <HeroMedia src="/hero/construction.mp4" poster="/hero/poster.jpg" />
        <div className="absolute inset-0 bg-gradient-to-l from-ink/80 via-ink/40 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent via-40% to-ink/45" />
      </div>
      <Particles className="absolute inset-0 -z-[5] size-full" />

      <div className="relative flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-margin-mobile md:px-margin pt-[max(7rem,15vh)] pb-8 md:pb-10">
        <div className="max-w-4xl">
          <div className="fade-up flex flex-wrap items-center gap-x-4 gap-y-1 mb-6" style={{ animationDelay: "150ms" }}>
            <span className="h-px w-12 bg-gold-soft" />
            <span className="text-sm font-medium text-gold-soft">{settings.heroOverline}</span>
            {settings.heroOverlineSub && (
              <span className="text-sm font-light text-white/60">{settings.heroOverlineSub}</span>
            )}
          </div>

          <h1
            className="fade-up font-display font-medium text-[clamp(2.1rem,min(4.9vw,8.2vh),4.2rem)] leading-[1.3] mb-6"
            style={{ animationDelay: "300ms" }}
          >
            {settings.heroTitleLine1}
            <br />
            <span className="text-gold-soft">{settings.heroTitleHighlight}</span>{" "}
            {settings.heroTitleSuffix}
          </h1>

          <p
            className="fade-up text-base md:text-lg font-light leading-8 text-white/75 max-w-xl mb-8"
            style={{ animationDelay: "480ms" }}
          >
            {settings.heroSubtitle}
          </p>

          <div className="fade-up flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: "640ms" }}>
            <a
              href={`#${SECTION_IDS.projects}`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gold-soft text-ink text-sm font-bold hover:bg-white transition-colors duration-300"
            >
              <span>{settings.heroPrimaryCta}</span>
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={`#${SECTION_IDS.contact}`}
              className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white/90 hover:text-gold-soft transition-colors"
            >
              <span className="border-b border-white/30 group-hover:border-gold-soft pb-1 transition-colors">
                {settings.heroSecondaryCta}
              </span>
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </a>
          </div>
        </div>

        {stats.length > 0 && (
          <dl
            className="fade-up mt-[clamp(1.5rem,5vh,3.5rem)] grid grid-cols-2 lg:grid-cols-4 border-t border-white/15"
            style={{ animationDelay: "820ms" }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.id}
                className={`py-4 md:py-[clamp(1rem,2.6vh,1.5rem)] ${i % 2 === 1 ? "ps-6" : ""} ${
                  i > 0 ? "lg:ps-8 lg:border-s lg:border-white/10" : ""
                } ${i % 2 === 1 ? "border-s border-white/10" : ""}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex flex-col gap-1.5">
                  {stat.icon ? (
                    <span className="flex items-center gap-2.5">
                      <Icon name={stat.icon} className="size-6 text-gold-soft shrink-0 [stroke-width:1.4]" />
                      <span className="font-display text-xl md:text-2xl font-semibold">{stat.value}</span>
                    </span>
                  ) : (
                    <span className="flex items-baseline gap-2">
                      <span className="font-display text-3xl md:text-[clamp(2rem,5vh,3rem)] font-semibold text-gold-soft">
                        {stat.value}
                      </span>
                      {stat.unit && <span className="text-sm font-light text-white/60">{stat.unit}</span>}
                    </span>
                  )}
                  <span className="text-sm font-light text-white/60" aria-hidden="true">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

    </section>
  );
}
