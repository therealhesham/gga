"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Seg = { d: string; from: number; to: number };

// مخطط هندسي لأبراج ورافعة برجية؛ تُرسم الخطوط تباعًا مع تقدّم التمرير
const SEGS: Seg[] = [
  { d: "M10 600H510", from: 0.0, to: 0.12 },
  { d: "M150 600V190H310V600", from: 0.05, to: 0.38 },
  { d: "M180 190V140H280V190", from: 0.3, to: 0.45 },
  { d: "M230 140V48", from: 0.4, to: 0.55 },
  { d: "M150 218H310M150 246H310M150 274H310M150 302H310M150 330H310M150 358H310M150 386H310M150 414H310M150 442H310M150 470H310M150 498H310M150 526H310M150 554H310M150 582H310", from: 0.28, to: 0.7 },
  { d: "M190 190V600M230 190V600M270 190V600", from: 0.35, to: 0.72 },
  { d: "M320 600V380H420V600", from: 0.15, to: 0.42 },
  { d: "M320 408H420M320 436H420M320 464H420M320 492H420M320 520H420M320 548H420M320 576H420", from: 0.35, to: 0.68 },
  { d: "M40 600V450H130V600", from: 0.1, to: 0.35 },
  { d: "M40 478H130M40 506H130M40 534H130M40 562H130M40 590H130", from: 0.3, to: 0.6 },
  { d: "M444 600V110M456 600V110", from: 0.2, to: 0.55 },
  { d: "M444 600L456 572L444 544L456 516L444 488L456 460L444 432L456 404L444 376L456 348L444 320L456 292L444 264L456 236L444 208L456 180L444 152L456 124", from: 0.3, to: 0.75 },
  { d: "M60 110H505M60 122H456", from: 0.55, to: 0.8 },
  { d: "M60 122L82 110L104 122L126 110L148 122L170 110L192 122L214 110L236 122L258 110L280 122L302 110L324 122L346 110L368 122L390 110L412 122L434 110", from: 0.62, to: 0.88 },
  { d: "M450 110V58M450 58L84 110M450 58L500 110", from: 0.7, to: 0.92 },
  { d: "M200 122V212M193 212H207V224H193Z", from: 0.82, to: 0.98 },
  { d: "M96 190V600M88 190H104M88 600H104M92 196L96 190L100 196M92 594L96 600L100 594", from: 0.75, to: 1.0 },
];

function Draw({ seg, progress }: { seg: Seg; progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [seg.from, seg.to], [0, 1]);
  return <motion.path d={seg.d} style={{ pathLength }} />;
}

/** رسم معماري يُرسم بالتمرير؛ اللون من currentColor */
export function Blueprint({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.2"] });

  return (
    <div ref={ref} className={className}>
    <svg
      viewBox="0 0 520 640"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-full w-auto"
    >
      {SEGS.map((s, i) => (
        <Draw key={i} seg={s} progress={scrollYProgress} />
      ))}
    </svg>
    </div>
  );
}
