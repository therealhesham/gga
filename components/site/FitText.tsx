"use client";

import { useLayoutEffect, useRef } from "react";

/** سطر واحد يُكبَّر خطه ليملأ عرض الحاوية تمامًا (للاسم الكبير في الفوتر) */
export function FitText({ children, className = "" }: { children: string; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;
    const fit = () => {
      // العرض المتاح بدون الحشوة الجانبية
      const cs = getComputedStyle(box);
      const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      text.style.fontSize = "100px";
      const w = text.scrollWidth;
      if (w > 0 && avail > 0) text.style.fontSize = `${(100 * avail) / w}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    // إعادة القياس بعد تحميل الخط النهائي
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div ref={boxRef} aria-hidden="true" className={`overflow-hidden ${className}`}>
      <span ref={textRef} className="block w-max whitespace-nowrap leading-[1.15]" style={{ fontSize: "12vw" }}>
        {children}
      </span>
    </div>
  );
}
