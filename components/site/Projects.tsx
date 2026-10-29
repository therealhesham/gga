"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import { toArabicDigits } from "@/lib/digits";
import { EASE } from "@/lib/motion";
import { Img } from "./Img";
import { Magnetic } from "./Magnetic";
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

/**
 * معرض أفقي: القسم يتثبّت في الشاشة والتمرير الرأسي يحرّك الشريط أفقيًا.
 * الارتفاع الكلي = مسافة الشريط الأفقية + ارتفاع الشاشة، ويُقاس عند تغيّر الحجم.
 */
export function Projects({ eyebrow, title, cta, categories, projects }: Props) {
  const [active, setActive] = useState<number | "all">("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.categoryId === active);

  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ track: 0, view: 0, vh: 0 });
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const distance = Math.max(0, dims.track - dims.view);
  // في RTL يبدأ الشريط من اليمين ويمتد يسارًا، فالإزاحة الموجبة تكشف الباقي
  const x = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      setDims({ track: t.offsetWidth, view: window.innerWidth, vh: window.innerHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [visible.length]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(visible.length - 1, Math.max(0, Math.round(v * Math.max(visible.length - 1, 0)))));
  });

  const tab = (isActive: boolean) =>
    `relative whitespace-nowrap pb-2 text-sm transition-colors ${
      isActive ? "font-semibold text-ink" : "font-normal text-ink/50 hover:text-ink"
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
      ref={outerRef}
      className="snap-section relative w-full bg-ivory"
      style={{ height: dims.vh ? distance + dims.vh : "320svh" }}
    >
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center pt-20">
        <div className="overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max items-stretch gap-5 md:gap-8 px-margin-mobile md:px-margin"
          >
            {/* لوحة العنوان والفلتر */}
            <div className="shrink-0 w-[82vw] sm:w-[420px] flex flex-col justify-center pe-2 md:pe-8">
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
              <h2 className="font-display font-medium text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.4] text-ink">
                {title}
              </h2>

              {categories.length > 0 && (
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-ink/10">
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

              <p className="mt-8 text-sm font-light text-ink/50 inline-flex items-center gap-2">
                <ArrowLeft className="size-4 text-gold" />
                واصل التمرير لاستعراض المشاريع
              </p>
            </div>

            {visible.length === 0 && (
              <p className="shrink-0 self-center text-ink/50 font-light px-10">
                لا توجد مشاريع في هذا التصنيف حاليًا.
              </p>
            )}

            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
                className="shrink-0"
              >
                <Link
                  href={`/projects/${p.id}`}
                  data-cursor="استعرض"
                  className="group relative block h-[min(64svh,620px)] w-[78vw] sm:w-[54vw] lg:w-[36vw] overflow-hidden bg-ink"
                >
                  <Img
                    src={p.imageUrl}
                    alt={p.title}
                    sizes="(min-width: 1024px) 36vw, 80vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10" />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
                    <span className="font-display text-3xl text-white/40 leading-none">
                      {toArabicDigits(String(i + 1).padStart(2, "0"))}
                    </span>
                    <div className="flex items-center gap-2">
                      {p.location && (
                        <span className="rounded-full px-3 py-1 bg-ivory/90 backdrop-blur-sm text-ink text-xs font-medium">
                          {p.location}
                        </span>
                      )}
                      {p.badge && (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            p.badgePrimary ? "bg-gold-soft text-ink" : "bg-ink/70 text-white backdrop-blur-sm"
                          }`}
                        >
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-white">
                    <div className="flex items-center justify-between gap-3 text-sm mb-2">
                      <span className="font-medium text-gold-soft">{p.kind}</span>
                      {p.meta && <span className="font-light text-white/60">{p.meta}</span>}
                    </div>
                    <h3 className="font-display text-xl md:text-[1.7rem] font-medium leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-7 text-white/70 line-clamp-2 max-w-md">
                      {p.description}
                    </p>
                    {p.features.length > 0 && (
                      <ul className="mt-4 pt-3 border-t border-white/15 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-light text-white/75">
                        {p.features.slice(0, 3).map((f, k) => (
                          <li key={k} className="flex items-center gap-1.5">
                            <Icon name={f.icon} className="size-3.5 text-gold-soft [stroke-width:1.5]" />
                            {f.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* لوحة الختام */}
            {cta && (
              <div className="shrink-0 w-[70vw] sm:w-[340px] flex flex-col items-start justify-center ps-2 md:ps-8 pe-margin-mobile md:pe-margin">
                <Magnetic>
                  <a
                    href={`#${SECTION_IDS.contact}`}
                    className="group inline-flex items-center gap-3 rounded-full px-9 py-4 border border-ink/80 text-ink text-sm font-semibold hover:bg-ink hover:text-ivory transition-colors duration-500"
                  >
                    <span>{cta}</span>
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  </a>
                </Magnetic>
              </div>
            )}
          </motion.div>
        </div>

        {/* مؤشر التقدم */}
        {visible.length > 0 && (
          <div className="absolute bottom-6 inset-x-margin-mobile md:inset-x-margin flex items-center gap-5">
            <span className="font-display text-sm text-ink/60 tabular-nums">
              {toArabicDigits(String(index + 1).padStart(2, "0"))}
              <span className="text-ink/30"> / {toArabicDigits(String(visible.length).padStart(2, "0"))}</span>
            </span>
            <div className="relative h-px flex-1 bg-ink/15">
              <motion.div
                style={{ scaleX: bar, transformOrigin: "right" }}
                className="absolute inset-y-[-1px] inset-x-0 h-[3px] bg-gold"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
