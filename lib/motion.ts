// إعدادات الحركة المشتركة (تُستخدم من مكونات الخادم والعميل)
export const EASE = [0.22, 0.7, 0.2, 1] as const;

/** حاوية تُظهر أبناءها تباعًا */
export const stagger = (gap = 0.12, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** ظهور من الأسفل مع تلاشي */
export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/** سطر عنوان يُكشف من الأسفل (clip-path بحدود سالبة كي لا تُقص الحروف العالية) */
export const lineReveal = {
  hidden: { opacity: 0, y: 46, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(-30% -5% -30% -5%)",
    transition: { duration: 1.1, ease: EASE },
  },
};
