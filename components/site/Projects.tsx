"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import { FILTER_EVENT } from "@/lib/service-filter";
import { Img } from "./Img";
import { RevealHeading, apertureVariants, settleVariants } from "./Reveal";
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

const PINNED_QUERY = "(min-width: 1024px) and (pointer: fine)";

/**
 * المعرض: على الشاشات الكبيرة بماوس يتثبّت القسم والتمرير الرأسي يحرّك الشريط أفقيًا،
 * وعلى اللمس والشاشات الصغيرة يتحوّل إلى كاروسيل أفقي طبيعي (snap) بدون اختطاف التمرير.
 */
export function Projects({ eyebrow, title, cta, categories, projects }: Props) {
  const [active, setActive] = useState<number | "all">("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.categoryId === active);

  const [pinned, setPinned] = useState(false);
  const outerRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ track: 0, view: 0, vh: 0 });
  const [index, setIndex] = useState(0);

  // فلتر قادم من كروت الخدمات
  useEffect(() => {
    const onFilter = (e: Event) => {
      const id = (e as CustomEvent<{ categoryId: number | null }>).detail?.categoryId;
      setActive(id ?? "all");
    };
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const distance = Math.max(0, dims.track - dims.view);
  // في RTL يبدأ الشريط من اليمين ويمتد يسارًا، فالإزاحة الموجبة تكشف الباقي
  const pinnedX = useTransform(scrollYProgress, [0, 1], [0, distance]);

  // تقدّم موحّد للمؤشر: من التمرير الرأسي (pinned) أو من تمرير الكاروسيل الأفقي
  const progress = useMotionValue(0);
  const bar = useSpring(progress, { stiffness: 140, damping: 30, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (pinned) progress.set(v);
  });

  useEffect(() => {
    if (pinned) return;
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      progress.set(max > 0 ? Math.min(1, Math.abs(el.scrollLeft) / max) : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [pinned, progress, visible.length]);

  useMotionValueEvent(progress, "change", (v) => {
    setIndex(Math.min(visible.length - 1, Math.max(0, Math.round(v * Math.max(visible.length - 1, 0)))));
  });

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

  // عند تغيير التصنيف نعود لأول الشريط
  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollLeft = 0;
    progress.set(pinned ? scrollYProgress.get() : 0);
  }, [active, pinned, progress, scrollYProgress]);

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
      className="snap-section relative w-full bg-ivory py-20 pinned:py-0 pinned:h-[320svh]"
      style={pinned && dims.vh ? { height: distance + dims.vh } : undefined}
    >
      <div className="pinned:sticky pinned:top-0 pinned:h-svh pinned:overflow-hidden pinned:flex pinned:flex-col pinned:justify-center pinned:pt-20">
        <div
          ref={scrollerRef}
          className="overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-px-margin-mobile pinned:overflow-hidden pinned:snap-none"
        >
          <motion.div
            ref={trackRef}
            style={{ x: pinned ? pinnedX : 0 }}
            className="flex w-max items-stretch gap-4 md:gap-8 px-margin-mobile md:px-margin"
          >
            {/* لوحة العنوان والفلتر */}
            <div className="snap-start shrink-0 w-[82vw] sm:w-[420px] flex flex-col justify-center pe-2 md:pe-8">
              <SectionEyebrow index="03">{eyebrow}</SectionEyebrow>
              <RevealHeading size="text-[clamp(2rem,3.4vw,3.1rem)]" className="text-ink">
                {title}
              </RevealHeading>

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
                {pinned ? "واصل التمرير لاستعراض المشاريع" : "اسحب لاستعراض المشاريع"}
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
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={apertureVariants}
                className="snap-start shrink-0"
              >
                <Link
                  href={`/projects/${p.id}`}
                 
                  className="group relative block aspect-[4/5] w-[78vw] sm:w-[46vw] pinned:w-auto pinned:h-[min(66svh,640px)] overflow-hidden bg-ink"
                >
                  <motion.div variants={settleVariants} className="absolute inset-0">
                    <Img
                      src={p.imageUrl}
                      alt={p.title}
                      sizes="(min-width: 1024px) 30vw, 80vw"
                      className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10" />
                  <span aria-hidden="true" className="cad-grid group-hover:opacity-100" />

                  <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 md:p-6">
                    <span className="font-mono text-xs font-light tracking-[0.2em] text-white/60 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
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

                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7 text-white">
                    <div className="flex items-center justify-between gap-3 text-sm mb-2">
                      <span className="font-medium text-white/75">{p.kind}</span>
                      {p.meta && <span className="font-light text-white/60">{p.meta}</span>}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-normal leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-7 text-white/70 line-clamp-2 max-w-md">
                      {p.description}
                    </p>
                    {p.features.length > 0 && (
                      <ul className="mt-4 pt-3 border-t border-white/15 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-light text-white/75">
                        {p.features.slice(0, 3).map((f, k) => (
                          <li key={k} className="flex items-center gap-1.5">
                            <Icon name={f.icon} className="size-3.5 text-white/50 [stroke-width:1.5]" />
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
              <div className="snap-start shrink-0 w-[70vw] sm:w-[340px] flex flex-col items-start justify-center ps-2 md:ps-8 pe-margin-mobile md:pe-margin">
                  <a
                    href={`#${SECTION_IDS.contact}`}
                    className="group inline-flex items-center gap-3 rounded-full px-9 py-4 border border-ink/80 text-ink text-sm font-semibold hover:bg-ink hover:text-ivory transition-colors duration-500"
                  >
                    <span>{cta}</span>
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* مؤشر التقدم (للمعرض المثبّت وللكاروسيل) */}
        {visible.length > 0 && (
          <div className="mt-6 px-margin-mobile md:px-margin flex items-center gap-5 pinned:absolute pinned:bottom-6 pinned:inset-x-0 pinned:mt-0">
            <span className="font-mono text-xs tracking-[0.15em] text-ink/60 tabular-nums">
              {String(index + 1).padStart(2, "0")}
              <span className="text-ink/30"> / {String(visible.length).padStart(2, "0")}</span>
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
