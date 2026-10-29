"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Img } from "./Img";
import { RevealHeading } from "./Reveal";

/** صورة عريضة بعرض الشاشة بين الأقسام (21:9 على الشاشات الكبيرة) مع parallax هادئ وعبارة واحدة */
export function ImageBand({ src, caption, label }: { src: string; caption: string; label?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  if (!src) return null;

  return (
    <section
      ref={ref}
      aria-label={caption}
      className="relative isolate w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-ink text-white"
    >
      <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0 -z-10">
        <Img src={src} alt="" sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/40" />

      <div className="flex h-full flex-col items-center justify-center px-margin-mobile text-center">
        {label && (
          <span className="mb-6 font-mono text-xs font-light tracking-[0.3em] text-white/55">{label}</span>
        )}
        <RevealHeading as="h2" size="text-[clamp(1.9rem,4.2vw,3.6rem)]" weight="font-light" className="max-w-4xl">
          {caption}
        </RevealHeading>
      </div>
    </section>
  );
}
