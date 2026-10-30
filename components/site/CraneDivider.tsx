"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const W = 480;
const H = 130;
const MAST_L = 430;
const MAST_R = 448;
const MAST_TOP = 28;
const APEX = { x: 439, y: 4 };
const JIB_Y = 24;
const JIB_TIP = 40;
const CW_END = 478; // نهاية الذراع الخلفي
const TROLLEY_Y = JIB_Y + 5;

/** شبكة معدنية متعرجة بين خطين (برج الرافعة والذراع) */
function lattice(points: [number, number][]) {
  return "M" + points.map(([x, y]) => `${x} ${y}`).join("L");
}

const mastLattice = (() => {
  const pts: [number, number][] = [];
  for (let y = H, i = 0; y >= MAST_TOP; y -= 12, i++) pts.push([i % 2 ? MAST_L : MAST_R, y]);
  return lattice(pts);
})();

const jibLattice = (() => {
  const pts: [number, number][] = [];
  const bottom = (x: number) => JIB_Y + 1 + ((x - JIB_TIP) / (MAST_L - JIB_TIP)) * 9;
  for (let x = MAST_L, i = 0; x >= JIB_TIP + 8; x -= 18, i++) pts.push([x, i % 2 ? JIB_Y : bottom(x)]);
  return lattice(pts);
})();

type Props = {
  /** رقم القسم القادم (01، 02...) */
  index: string;
  /** اسم القسم القادم يظهر على اللوحة المعلّقة */
  label: string;
  /** القسم السابق غامق: تُرسم الرافعة بذهبي فاتح */
  onDark?: boolean;
  /** لون خلفية القسم السابق: المساحة الإضافية فوق الرافعة تكمله بصريًا */
  bg: string;
  /** ارتفاع المساحة الإضافية على الشاشات الكبيرة كي لا تغطي الرافعة محتوى القسم السابق */
  room?: string;
  /** للمواضع المزدحمة في الجوال (مثل أسفل الهيرو) */
  desktopOnly?: boolean;
};

/**
 * رافعة برجية بخطوط رفيعة تقف على حدّ القسم القادم: مع التمرير تنزلق العربة على الذراع
 * ويهبط الكابل حاملًا لوحة باسم القسم، وتتأرجح اللوحة تأرجحًا خفيفًا مع سرعة التمرير.
 */
export function CraneDivider({
  index,
  label,
  onDark = false,
  bg,
  room = "lg:h-14",
  desktopOnly = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // من لحظة وصول الحد (أسفل العنصر) لأسفل الشاشة حتى خروجه من أعلاها
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"] });

  const still = useMotionValue(0.7); // وضع ثابت لمن يفضّلون تقليل الحركة
  const p = useSpring(reduced ? still : scrollYProgress, { stiffness: 90, damping: 22, mass: 0.5 });

  const trolleyX = useTransform(p, [0.08, 0.7], [400, 120], { clamp: true });
  const cable = useTransform(p, [0.14, 0.58], [8, 60], { clamp: true });
  const cableEnd = useTransform(cable, (c) => TROLLEY_Y + c);

  const velocity = useVelocity(scrollYProgress);
  const swayTarget = useTransform(velocity, [-1.5, 1.5], [6, -6], { clamp: true });
  const swaySpring = useSpring(swayTarget, { stiffness: 60, damping: 8, mass: 0.6 });
  const sway = reduced ? 0 : swaySpring;

  return (
    <div
      ref={ref}
      data-crane
      aria-hidden="true"
      className={`pointer-events-none relative z-30 h-0 ${room} ${bg} ${desktopOnly ? "hidden xl:block" : ""}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        className={`absolute bottom-0 right-1 lg:right-3 h-auto w-[300px] sm:w-[360px] md:w-[440px] lg:w-[620px] overflow-visible [&_*]:[vector-effect:non-scaling-stroke] ${
          onDark ? "text-gold-soft/90" : "text-gold/90"
        }`}
      >
        {/* البرج والقاعدة */}
        <path d={`M${MAST_L} ${H}V${MAST_TOP}M${MAST_R} ${H}V${MAST_TOP}`} />
        <path d={mastLattice} strokeOpacity="0.55" strokeWidth="1" />
        <path d={`M${MAST_L - 8} ${H}H${MAST_R + 8}`} />

        {/* رأس البرج والأسلاك */}
        <path d={`M${MAST_L} ${MAST_TOP}L${APEX.x} ${APEX.y}L${MAST_R} ${MAST_TOP}`} />
        <path
          d={`M${APEX.x} ${APEX.y}L${JIB_TIP} ${JIB_Y}M${APEX.x} ${APEX.y}L${CW_END} ${JIB_Y}`}
          strokeOpacity="0.5"
          strokeWidth="1"
        />

        {/* الذراع الرئيسي والذراع الخلفي مع ثقل الاتزان وكابينة المشغّل */}
        <path d={`M${MAST_R} ${JIB_Y}H${JIB_TIP}M${MAST_L} ${JIB_Y + 10}L${JIB_TIP} ${JIB_Y}`} />
        <path d={jibLattice} strokeOpacity="0.5" strokeWidth="1" />
        <path d={`M${MAST_R} ${JIB_Y}H${CW_END}M${MAST_R} ${JIB_Y + 7}H${CW_END}`} />
        <rect x="460" y={JIB_Y + 7} width="16" height="14" rx="1.5" />
        <rect x="412" y={JIB_Y + 9} width="17" height="12" rx="1.5" />
        <path d="M415 37h11" strokeOpacity="0.6" strokeWidth="1" />

        {/* العربة والكابل واللوحة المعلّقة */}
        <motion.g style={{ x: trolleyX }}>
          <rect x="-7" y={JIB_Y} width="14" height="6" rx="1.5" />
          <motion.line x1="0" y1={TROLLEY_Y} x2="0" y2={cableEnd} />
          <motion.g style={{ y: cableEnd }}>
            <motion.g style={{ rotate: sway, originX: 0.5, originY: 0 }}>
              <rect x="-5" y="0" width="10" height="8" rx="1.5" />
              <path d="M0 8v4M0 12L-34 22M0 12L34 22" strokeOpacity="0.8" strokeWidth="1" />
              <rect
                x="-46"
                y="22"
                width="92"
                height="18"
                rx="2"
                stroke="none"
                className={onDark ? "fill-gold-soft" : "fill-ink"}
              />
              <text
                x="0"
                y="34.6"
                textAnchor="middle"
                fontSize="10.5"
                stroke="none"
                direction="rtl"
                className={onDark ? "fill-ink" : "fill-ivory"}
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {`${index}  ${label}`}
              </text>
            </motion.g>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
