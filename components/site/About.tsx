import * as motion from "motion/react-client";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import { EASE } from "@/lib/motion";
import type { SiteData } from "@/lib/data";
import { Img } from "./Img";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

export function About({ settings, pillars }: Pick<SiteData, "settings" | "pillars">) {
  return (
    <section
      id={SECTION_IDS.about}
      className="snap-section relative w-full min-h-svh flex items-center bg-ivory py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            {/* المراقبة على الأب: العنصر المقصوص بالكامل لا يُحتسب ظاهرًا عند IntersectionObserver */}
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* إطار ذهبي رفيع مزاح خلف الصورة */}
              <motion.div
                aria-hidden="true"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.2, delay: 0.5 } } }}
                className="absolute inset-0 translate-x-2.5 translate-y-2.5 lg:-translate-x-5 lg:translate-y-5 border border-gold/50"
              />
              <motion.div
                variants={{
                  hidden: { clipPath: "inset(0 0 100% 0)" },
                  show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.3, ease: EASE } },
                }}
                className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-deep"
              >
                <Img
                  src={settings.aboutImage}
                  alt={settings.aboutPlaqueTitle || settings.companyName}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                {settings.aboutPlaqueTitle && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/50 to-transparent p-6 md:p-8 pt-20 text-white">
                    <span className="block font-display text-lg text-gold-soft mb-1">
                      {settings.aboutPlaqueTitle}
                    </span>
                    <p className="text-sm font-light leading-7 text-white/80 max-w-sm">
                      {settings.aboutPlaqueText}
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-6 lg:ps-6">
            <Reveal>
              <SectionEyebrow>{settings.aboutEyebrow}</SectionEyebrow>
              <h2 className="font-display font-medium text-[clamp(2rem,4vw,3.4rem)] leading-[1.4] text-ink">
                {settings.aboutTitle}
              </h2>
            </Reveal>

            <Reveal delay={120} className="space-y-4 max-w-2xl">
              <p className="text-base font-light leading-8 text-ink/70">{settings.aboutP1}</p>
              {settings.aboutP2 && (
                <p className="text-base font-light leading-8 text-ink/70">{settings.aboutP2}</p>
              )}
            </Reveal>

            {pillars.length > 0 && (
              <Reveal delay={240}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 pt-2">
                  {pillars.map((p) => (
                    <li key={p.id} className="border-t border-ink/12 pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name={p.icon} className="size-5 text-gold shrink-0 [stroke-width:1.5]" />
                        <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                      </div>
                      <p className="text-sm font-light leading-7 text-ink/60">{p.description}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
