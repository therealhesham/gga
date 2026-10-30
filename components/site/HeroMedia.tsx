"use client";

import { useEffect, useRef } from "react";

/** فيديو الإنشاءات خلف الهيرو؛ مع تقليل الحركة يبقى الـ poster ثابتًا */
export function HeroMedia({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, []);

  return (
    <video ref={ref} autoPlay muted loop playsInline preload="auto" poster={poster} aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  );
}
