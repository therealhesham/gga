"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { toArabicDigits } from "@/lib/digits";
import { KSA_CITIES, KSA_PATH, KSA_VIEWBOX, matchCity } from "@/lib/ksa";
import { EASE } from "@/lib/motion";
import { CountUp } from "./CountUp";
import { Img } from "./Img";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

type MapProject = {
  id: number;
  title: string;
  kind: string;
  location: string;
  imageUrl: string;
  meta: string;
};

/** خريطة المملكة بمشاريع المؤسسة؛ المدينة تُستنتج من حقل "الموقع" في كل مشروع */
export function ProjectsMap({ projects }: { projects: MapProject[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, MapProject[]>();
    for (const p of projects) {
      const city = matchCity(p.location);
      if (city) map.set(city, [...(map.get(city) ?? []), p]);
    }
    return [...map.entries()].map(([city, items]) => ({ city, items, pos: KSA_CITIES[city] }));
  }, [projects]);

  const [activeCity, setActiveCity] = useState<string | null>(null);
  if (groups.length === 0) return null;

  const current = groups.find((g) => g.city === activeCity) ?? groups[0];

  return (
    <section
      id="projects-map"
      className="snap-section relative w-full min-h-svh flex items-center bg-ink text-white py-24 md:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 size-[34rem] rounded-full bg-gold/10 blur-[150px]"
      />
      <div className="relative max-w-7xl mx-auto w-full px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Reveal>
              <SectionEyebrow dark>حضور وطني</SectionEyebrow>
              <h2 className="font-display font-medium text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.4]">
                مشاريعنا في أنحاء المملكة
              </h2>
              <p className="mt-5 text-base font-light leading-8 text-white/60 max-w-md">
                <span className="font-display text-gold-soft text-xl">
                  <CountUp text={toArabicDigits(projects.length)} />
                </span>{" "}
                مشروعاً في{" "}
                <span className="font-display text-gold-soft text-xl">
                  <CountUp text={toArabicDigits(groups.length)} />
                </span>{" "}
                {groups.length === 1 ? "مدينة" : groups.length === 2 ? "مدينتين" : groups.length <= 10 ? "مدن" : "مدينة"}. اختر مدينة لاستعراض مشاريعها.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 flex flex-wrap gap-2">
                {groups.map((g) => {
                  const on = g.city === current.city;
                  return (
                    <button
                      key={g.city}
                      type="button"
                      onClick={() => setActiveCity(g.city)}
                      onMouseEnter={() => setActiveCity(g.city)}
                      className={`px-4 py-2 text-sm border transition-colors duration-300 ${
                        on
                          ? "bg-gold-soft text-ink border-gold-soft font-semibold"
                          : "border-white/20 text-white/70 hover:border-gold-soft hover:text-white"
                      }`}
                    >
                      {g.city}
                      <span className={`ms-2 text-xs ${on ? "text-ink/60" : "text-white/40"}`}>
                        {toArabicDigits(g.items.length)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 min-h-[9rem]">
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={current.city}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="divide-y divide-white/10 border-y border-white/10"
                  >
                    {current.items.slice(0, 3).map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/projects/${p.id}`}
                          data-cursor="استعرض"
                          className="group flex items-center gap-4 py-3.5"
                        >
                          <span className="relative size-16 shrink-0 overflow-hidden bg-ink-soft">
                            <Img src={p.imageUrl} alt={p.title} sizes="64px" className="object-cover" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-xs text-gold-soft">{p.kind}</span>
                            <span className="block truncate font-display text-base group-hover:text-gold-soft transition-colors">
                              {p.title}
                            </span>
                          </span>
                          <ArrowLeft className="size-4 text-white/40 transition-transform group-hover:-translate-x-1.5 group-hover:text-gold-soft" />
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.svg
              viewBox={`0 0 ${KSA_VIEWBOX.width} ${KSA_VIEWBOX.height}`}
              className="w-full h-auto max-h-[72svh]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              role="img"
              aria-label="خريطة المملكة العربية السعودية بمواقع المشاريع"
            >
              <defs>
                <pattern id="ksa-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.1" fill="#d8b565" fillOpacity="0.28" />
                </pattern>
              </defs>
              <motion.path
                d={KSA_PATH}
                fill="url(#ksa-dots)"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.4, delay: 1.2 } } }}
              />
              <motion.path
                d={KSA_PATH}
                fill="none"
                stroke="#d8b565"
                strokeOpacity="0.75"
                strokeWidth="1.4"
                strokeLinejoin="round"
                variants={{
                  hidden: { pathLength: 0 },
                  show: { pathLength: 1, transition: { duration: 2.6, ease: EASE } },
                }}
              />

              {groups.map((g, i) => {
                const on = g.city === current.city;
                const [cx, cy] = g.pos;
                return (
                  <motion.g
                    key={g.city}
                    transform={`translate(${cx} ${cy})`}
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { delay: 1.8 + i * 0.12, duration: 0.6 } },
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${g.city}: ${g.items.length} مشروع`}
                    onMouseEnter={() => setActiveCity(g.city)}
                    onFocus={() => setActiveCity(g.city)}
                    onClick={() => setActiveCity(g.city)}
                    className="cursor-pointer outline-none"
                  >
                    <circle r="30" fill="transparent" />
                    <motion.circle
                      r="9"
                      fill="#d8b565"
                      fillOpacity="0.35"
                      animate={{ r: [9, 30], opacity: [0.7, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
                    />
                    <circle r={on ? 11 : 7} fill="#d8b565" className="transition-all duration-300" />
                    {on && <circle r="19" fill="none" stroke="#d8b565" strokeWidth="1.2" />}
                    {g.items.length > 1 && (
                      <text
                        y="4.2"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="700"
                        fill="#0f0f11"
                        style={{ pointerEvents: "none" }}
                      >
                        {toArabicDigits(g.items.length)}
                      </text>
                    )}
                    {on && (
                      <text
                        y="-30"
                        textAnchor="middle"
                        fontSize="26"
                        fill="#fff"
                        style={{ pointerEvents: "none", fontFamily: "var(--font-display)" }}
                      >
                        {g.city}
                      </text>
                    )}
                  </motion.g>
                );
              })}
            </motion.svg>
          </div>
        </div>
      </div>
    </section>
  );
}
