"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import { EASE } from "@/lib/motion";
import { Img } from "./Img";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

type ProjectItem = {
  id: number;
  title: string;
  kind: string;
  location: string;
  badge: string;
  badgePrimary: boolean;
  meta: string;
  imageUrl: string;
  description: string;
  features: { icon: string; text: string }[];
  categoryId: number | null;
};

type Props = {
  eyebrow: string;
  title: string;
  cta: string;
  categories: { id: number; name: string }[];
  projects: ProjectItem[];
};

// نمط توزيع البطاقات في الشبكة (12 عمود): كبير، متوسط، ثم بطاقتان متساويتان
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-6", "lg:col-span-6"];
const isLarge = (index: number) => index % 4 < 2;

export function Projects({ eyebrow, title, cta, categories, projects }: Props) {
  const [active, setActive] = useState<number | "all">("all");
  const visible =
    active === "all" ? projects : projects.filter((p) => p.categoryId === active);

  const tab = (isActive: boolean) =>
    `relative whitespace-nowrap pb-2.5 text-sm transition-colors after:absolute after:bottom-0 after:right-0 after:h-px after:bg-gold after:transition-all after:duration-500 after:w-0 ${
      isActive ? "font-semibold text-ink" : "font-normal text-ink/50 hover:text-ink hover:after:w-1/2"
    }`;

  const underline = (
    <motion.span
      layoutId="project-tab"
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      className="absolute bottom-0 inset-x-0 h-px bg-gold"
    />
  );

  return (
    <section
      id={SECTION_IDS.projects}
      className="snap-section relative w-full min-h-svh bg-ivory py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-14">
          <div>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2 className="font-display font-medium text-[clamp(2rem,4vw,3.4rem)] leading-[1.4] text-ink">
              {title}
            </h2>
          </div>

          {categories.length > 0 && (
            <div className="flex items-center md:flex-wrap gap-x-7 gap-y-1 overflow-x-auto md:overflow-visible border-b border-ink/10 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 md:max-w-xl">
              <button type="button" className={tab(active === "all")} onClick={() => setActive("all")}>
                الكل
                {active === "all" && underline}
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={tab(active === c.id)}
                  onClick={() => setActive(c.id)}
                >
                  {c.name}
                  {active === c.id && underline}
                </button>
              ))}
            </div>
          )}
        </Reveal>

        {visible.length === 0 ? (
          <p className="text-center text-ink/50 font-light py-20 border-y border-ink/10">
            لا توجد مشاريع في هذا التصنيف حاليًا.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
            <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const large = isLarge(i);
              return (
                <motion.div
                  key={p.id}
                  layout="position"
                  className={SPANS[i % 4]}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: EASE }}
                >
                  <article className="group">
                    <div className="relative w-full overflow-hidden h-[280px] sm:h-[340px] lg:h-[420px] bg-ivory-deep">
                      <Img
                        src={p.imageUrl}
                        alt={p.title}
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        {p.location && (
                          <span className="px-3 py-1 bg-ivory/90 backdrop-blur-sm text-ink text-xs font-medium">
                            {p.location}
                          </span>
                        )}
                        {p.badge && (
                          <span
                            className={`px-3 py-1 text-xs font-medium ${
                              p.badgePrimary ? "bg-gold-soft text-ink" : "bg-ink/70 text-white backdrop-blur-sm"
                            }`}
                          >
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-6">
                      <div className="flex items-center justify-between gap-3 mb-2.5 text-sm">
                        <span className="font-medium text-gold">{p.kind}</span>
                        {p.meta && <span className="font-light text-ink/50">{p.meta}</span>}
                      </div>
                      <h3
                        className={`font-display font-semibold text-ink transition-colors duration-500 group-hover:text-gold ${
                          large ? "text-2xl md:text-[1.75rem]" : "text-xl md:text-2xl"
                        }`}
                      >
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-base font-light leading-8 text-ink/60 line-clamp-3">
                        {p.description}
                      </p>
                      {p.features.length > 0 && (
                        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 pt-4 border-t border-ink/10 text-sm font-light text-ink/65">
                          {p.features.map((f, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Icon name={f.icon} className="size-4 text-gold [stroke-width:1.5]" />
                              <span>{f.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </div>
        )}

        {cta && (
          <Reveal className="mt-16 flex justify-center">
            <a
              href={`#${SECTION_IDS.contact}`}
              className="group inline-flex items-center gap-3 px-9 py-4 border border-ink/80 text-ink text-sm font-semibold hover:bg-ink hover:text-ivory transition-colors duration-500"
            >
              <span>{cta}</span>
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
