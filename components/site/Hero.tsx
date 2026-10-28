import { ArrowDown, HardHat } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";

export function Hero({ settings, stats }: Pick<SiteData, "settings" | "stats">) {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#F4EFE6] via-[#FAF8F5] to-surface -mt-28 pt-36 pb-20 md:pb-28 border-b border-outline-variant/60"
    >
      {/* إضاءة محيطية */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-primary-fixed/30 rounded-full blur-[180px]" />
      </div>

      {/* خلفية الصورة */}
      <div className="absolute inset-0 z-0">
        {settings.heroImage && (
          <div
            className="w-full h-full bg-cover bg-center opacity-[0.14] mix-blend-multiply scale-105"
            style={{ backgroundImage: `url('${settings.heroImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-[#FAF8F5]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-[#FAF8F5]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin flex flex-col justify-between min-h-[716px]">
        <div className="max-w-4xl pt-8 md:pt-16">
          <div className="inline-flex flex-wrap items-center gap-3 px-3.5 py-1.5 bg-surface-container-lowest border border-outline-variant/80 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-primary" />
            <span className="text-label-sm text-primary font-bold tracking-widest uppercase">
              {settings.heroOverline}
            </span>
            {settings.heroOverlineSub && (
              <>
                <span className="text-outline-variant font-mono text-xs">|</span>
                <span className="text-label-sm text-on-surface-variant font-medium">
                  {settings.heroOverlineSub}
                </span>
              </>
            )}
          </div>

          <h1 className="text-4xl md:text-[68px] md:leading-[1.18] text-on-surface font-extrabold tracking-tight mb-8">
            {settings.heroTitleLine1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary via-[#B88931] to-on-surface">
              {settings.heroTitleHighlight}
            </span>{" "}
            {settings.heroTitleSuffix}
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10 text-justify font-normal">
            {settings.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`#${SECTION_IDS.projects}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-on-primary text-label-md font-bold tracking-wider hover:bg-primary-container transition-all duration-300 shadow-md border border-primary/40"
            >
              <span>{settings.heroPrimaryCta}</span>
              <ArrowDown className="size-[18px]" />
            </a>
            <a
              href={`#${SECTION_IDS.contact}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-surface-container-lowest text-on-surface hover:text-primary hover:border-primary/50 transition-all duration-300 text-label-md font-semibold shadow-sm border border-outline-variant"
            >
              <HardHat className="size-[18px] text-primary" />
              <span>{settings.heroSecondaryCta}</span>
            </a>
          </div>
        </div>

        {stats.length > 0 && (
          <div className="mt-16 md:mt-24 bg-surface-container-lowest border border-outline-variant/80 p-6 md:p-8 shadow-md">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-1.5">
                  {stat.icon ? (
                    <div className="flex items-center gap-2">
                      <Icon name={stat.icon} className="size-8 text-primary shrink-0" />
                      <span className="text-title-lg font-bold text-on-surface">
                        {stat.value}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-[44px] font-bold text-primary tracking-tight">
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span className="text-label-sm text-secondary font-bold tracking-widest uppercase">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                  )}
                  <span className="text-body-sm text-on-surface-variant">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
