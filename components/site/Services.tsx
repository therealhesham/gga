import * as motion from "motion/react-client";
import { ArrowLeft } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import { categoryForService } from "@/lib/service-filter";
import { stagger } from "@/lib/motion";
import type { SiteData } from "@/lib/data";
import { Reveal } from "./Reveal";
import { ServiceCard } from "./ServiceCard";
import { SectionEyebrow } from "./SectionEyebrow";

export function Services({
  settings,
  services,
  categories,
}: Pick<SiteData, "settings" | "services" | "categories">) {
  return (
    <section
      id={SECTION_IDS.services}
      className="snap-section relative w-full min-h-svh flex items-center bg-ink text-white py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16">
          <div>
            <SectionEyebrow dark>{settings.servicesEyebrow}</SectionEyebrow>
            <h2 className="font-display font-medium text-[clamp(2rem,4vw,3.4rem)] leading-[1.4]">
              {settings.servicesTitle}
            </h2>
          </div>
          <p className="text-base font-light leading-8 text-white/60 max-w-md">{settings.servicesIntro}</p>
        </Reveal>

        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/12 divide-y md:divide-y-0 divide-white/10">
            {services.map((s, i) => (
              <ServiceCard
                key={s.id}
                categoryId={categoryForService(s.title, categories)}
                href={`#${SECTION_IDS.projects}`}
                className={`group relative flex flex-col justify-between gap-10 p-7 md:p-9 min-h-[15rem] md:min-h-[20rem] transition-colors duration-500 hover:bg-white/[0.04] md:border-b md:border-white/10 ${
                  i % 2 === 0 ? "md:border-e" : ""
                } lg:border-e lg:last:border-e-0`}
              >
                <span aria-hidden="true" className="cad-grid group-hover:opacity-100" />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 h-px w-0 bg-gold-soft transition-all duration-700 group-hover:w-full"
                />
                <div className="flex items-start justify-between">
                  <Icon name={s.icon} className="size-9 text-gold-soft [stroke-width:1.2]" />
                  <span className="font-display text-5xl leading-none text-white/10 transition-colors duration-500 group-hover:text-gold-soft/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm font-light leading-7 text-white/55 mb-6">{s.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-soft">
                    استعراض مشاريع الخدمة
                    <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1.5" />
                  </span>
                </div>
              </ServiceCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
