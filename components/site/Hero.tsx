import { preload } from "react-dom";
import * as motion from "motion/react-client";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import { fadeUp, lineReveal, stagger } from "@/lib/motion";
import { Accreditations } from "./Accreditations";
import { CountUp } from "./CountUp";
import { HeroReveal } from "./HeroReveal";
import { Magnetic } from "./Magnetic";
import type { SiteData } from "@/lib/data";
import { HeroMedia } from "./HeroMedia";
import { ParallaxLayer } from "./ParallaxLayer";
import { Particles } from "./Particles";

export function Hero({ settings, stats }: Pick<SiteData, "settings" | "stats">) {
  preload("/hero/poster.jpg", { as: "image", fetchPriority: "high" });
  return (
    <section
      id={SECTION_IDS.hero}
      className="snap-section relative isolate w-full min-h-svh overflow-hidden bg-ink text-white flex flex-col"
    >
      {/* الخلفية: فيديو إنشاءات (parallax) + طبقات تدرّج لثبات قراءة النص */}
      <div className="absolute inset-0 -z-10">
        <ParallaxLayer distance={200} className="absolute inset-0">
          <HeroMedia src="/hero/construction.mp4" poster="/hero/poster.jpg" />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-gradient-to-l from-ink/80 via-ink/40 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent via-40% to-ink/45" />
      </div>
      <Particles className="absolute inset-0 -z-[5] size-full opacity-40" />

      <ParallaxLayer
        distance={-70}
        fade
        className="relative flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-margin-mobile md:px-margin pt-[max(7rem,15vh)] pb-8 md:pb-10"
      >
        <HeroReveal>
          <div className="max-w-4xl">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-6">
              <motion.span
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1 } } }}
                style={{ transformOrigin: "right" }}
                className="h-px w-12 bg-gold-soft/80"
              />
              <span className="text-sm font-medium text-white/85">{settings.heroOverline}</span>
              {settings.heroOverlineSub && (
                <span className="text-sm font-light text-white/60">{settings.heroOverlineSub}</span>
              )}
            </motion.div>

            <h1 className="font-display font-light text-[clamp(2.3rem,min(5.4vw,8.8vh),4.9rem)] leading-[1.22] tracking-[-0.015em] mb-7">
              <motion.span variants={lineReveal} className="block">
                {settings.heroTitleLine1}
              </motion.span>
              <motion.span variants={lineReveal} className="block">
                <span className="font-normal text-gold-soft">{settings.heroTitleHighlight}</span>{" "}
                {settings.heroTitleSuffix}
              </motion.span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg font-light leading-8 text-white/70 max-w-xl mb-9"
            >
              {settings.heroSubtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Magnetic>
                <a
                  href={`#${SECTION_IDS.projects}`}
                  className="group inline-flex items-center gap-3 rounded-full px-8 py-4 bg-gold-soft text-ink text-sm font-bold hover:bg-white transition-colors duration-300"
                >
                  <span>{settings.heroPrimaryCta}</span>
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <a
                href={`#${SECTION_IDS.contact}`}
                className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white/90 hover:text-gold-soft transition-colors"
              >
                <span className="border-b border-white/30 group-hover:border-gold-soft pb-1 transition-colors">
                  {settings.heroSecondaryCta}
                </span>
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              </a>
            </motion.div>
          </div>

          {stats.length > 0 && (
            <motion.dl
              variants={stagger(0.1, 0.15)}
              className="mt-[clamp(1.25rem,4vh,3rem)] grid grid-cols-2 lg:grid-cols-4 border border-white/10 bg-black/40 backdrop-blur-md"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={fadeUp}
                  className="px-5 md:px-7 py-4 md:py-[clamp(0.9rem,2.4vh,1.4rem)] border-white/10 max-lg:[&:nth-child(even)]:border-s max-lg:[&:nth-child(n+3)]:border-t lg:[&:not(:first-child)]:border-s"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="flex flex-col gap-1.5">
                    {stat.icon ? (
                      <span className="flex items-center gap-2.5">
                        <Icon name={stat.icon} className="size-5 text-white/55 shrink-0 [stroke-width:1.3]" />
                        <span className="font-display text-xl md:text-2xl font-normal tabular-nums">
                          <CountUp text={stat.value} />
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-baseline gap-2">
                        <span className="font-display text-3xl md:text-[clamp(2rem,5vh,3rem)] font-light tabular-nums">
                          <CountUp text={stat.value} />
                        </span>
                        {stat.unit && <span className="text-sm font-light text-white/60">{stat.unit}</span>}
                      </span>
                    )}
                    <span className="text-sm font-light text-white/55" aria-hidden="true">
                      {stat.label}
                    </span>
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          )}

          <motion.div variants={fadeUp}>
            <Accreditations />
          </motion.div>
        </HeroReveal>
      </ParallaxLayer>
    </section>
  );
}
