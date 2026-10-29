import * as motion from "motion/react-client";
import { Download } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import { CONTACT } from "@/lib/contact";
import { hasProfilePdf } from "@/lib/profile";
import type { SiteData } from "@/lib/data";
import { Img } from "./Img";
import { Blueprint } from "./Blueprint";
import { Reveal, RevealHeading, apertureVariants, settleVariants } from "./Reveal";
import { ScrollText } from "./ScrollText";
import { SectionEyebrow } from "./SectionEyebrow";

export function About({ settings, pillars }: Pick<SiteData, "settings" | "pillars">) {
  return (
    <section
      id={SECTION_IDS.about}
      className="snap-section relative w-full min-h-svh flex items-center bg-ivory py-24 md:py-32"
    >
      {/* مخطط هندسي يُرسم تباعًا مع التمرير */}
      <Blueprint className="pointer-events-none absolute left-0 top-16 bottom-0 hidden h-[86%] w-auto text-gold/20 lg:block" />
      <div className="relative max-w-7xl mx-auto w-full px-margin-mobile md:px-margin">
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
                className="absolute inset-0 translate-x-2.5 translate-y-2.5 lg:-translate-x-5 lg:translate-y-5 border border-gold/35"
              />
              <motion.div
                variants={apertureVariants}
                className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-deep"
              >
                <motion.div variants={settleVariants} className="absolute inset-0">
                  <Img
                    src={settings.aboutImage}
                    alt={settings.aboutPlaqueTitle || settings.companyName}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
                {settings.aboutPlaqueTitle && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/50 to-transparent p-6 md:p-8 pt-20 text-white">
                    <span className="block font-display text-lg mb-1">
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

          <div className="lg:col-span-7 space-y-8 lg:ps-6">
            <div>
              <Reveal>
                <SectionEyebrow index="01">{settings.aboutEyebrow}</SectionEyebrow>
              </Reveal>
              <RevealHeading className="text-ink">{settings.aboutTitle}</RevealHeading>
            </div>

            <Reveal delay={120} className="space-y-4 max-w-2xl">
              <ScrollText text={settings.aboutP1} className="text-base font-light leading-8 text-ink/80" />
              {settings.aboutP2 && (
                <p className="text-base font-light leading-8 text-ink/70">{settings.aboutP2}</p>
              )}
            </Reveal>

            {hasProfilePdf() && (
              <Reveal delay={200}>
                <a
                  href={CONTACT.profilePdf}
                  download
                  className="group inline-flex items-center gap-3 rounded-full border border-ink/80 px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-500 hover:bg-ink hover:text-ivory"
                >
                  <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                  تحميل سابقة الأعمال - PDF
                </a>
              </Reveal>
            )}

            {pillars.length > 0 && (
              <Reveal delay={240}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 pt-2">
                  {pillars.map((p) => (
                    <li key={p.id} className="border-t border-ink/12 pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name={p.icon} className="size-5 text-ink/45 shrink-0 [stroke-width:1.4]" />
                        <h3 className="font-display text-lg font-medium text-ink">{p.title}</h3>
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
