import "server-only";

/**
 * عنوان العميل كما يضبطه nginx (proxy_set_header X-Real-IP / X-Forwarded-For = $remote_addr).
 * لا نأخذ أول عنصر في X-Forwarded-For لأن العميل هو من يكتبه.
 */
export function clientIp(h: Headers) {
  const real = h.get("x-real-ip")?.trim();
  if (real) return real;
  const parts = h.get("x-forwarded-for")?.split(",");
  return parts?.[parts.length - 1]?.trim() || "local";
}

/** محدّد معدّل في الذاكرة بنافذة منزلقة، مع تنظيف دوري حتى لا تكبر الخريطة */
export function createLimiter(windowMs: number, max: number) {
  const hits = new Map<string, number[]>();
  let lastSweep = Date.now();

  const recent = (key: string, now: number) =>
    (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  function sweep(now: number) {
    if (now - lastSweep < windowMs) return;
    lastSweep = now;
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < windowMs)) hits.delete(key);
    }
  }

  return {
    /** هل بلغ المفتاح الحد دون تسجيل محاولة جديدة؟ */
    blocked(key: string) {
      const now = Date.now();
      sweep(now);
      return recent(key, now).length >= max;
    },
    /** سجّل محاولة (فاشلة أو طلبًا) وأرجع true لو تجاوزت الحد */
    hit(key: string) {
      const now = Date.now();
      sweep(now);
      const times = [...recent(key, now), now];
      hits.set(key, times);
      return times.length > max;
    },
    reset(key: string) {
      hits.delete(key);
    },
  };
}
