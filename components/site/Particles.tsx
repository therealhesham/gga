"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** لون الجسيمات (r, g, b) */
  color?: [number, number, number];
};

const GOLD: [number, number, number] = [216, 181, 101];

type Dot = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  phase: number;
};

/**
 * غبار ذهبي هادئ يتصاعد ببطء مع خيوط رفيعة بين الجسيمات القريبة،
 * ويتجاوب بلطف مع حركة المؤشر. يتوقف خارج الشاشة ومع تقليل الحركة.
 */
export function Particles({ className = "", color = GOLD }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [cr, cg, cb] = color;
    const mouse = { x: -9999, y: -9999 };
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;

    const spawn = (initial: boolean): Dot => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(0.08 + Math.random() * 0.32),
      a: 0.25 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(26, (w * h) / 22000)));
      dots = Array.from({ length: count }, () => spawn(true));
    };

    const LINK = 120;

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        // انجراف جانبي ناعم + ابتعاد خفيف عن المؤشر
        d.x += d.vx + Math.sin(t / 2600 + d.phase) * 0.12;
        d.y += d.vy;
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 0.1) {
          const f = (1 - dist / 140) * 0.9;
          d.x += (dx / dist) * f;
          d.y += (dy / dist) * f;
        }
        if (d.y < -10 || d.x < -20 || d.x > w + 20) Object.assign(d, spawn(false));
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(1 - dist / LINK) * 0.16})`;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        const tw = 0.65 + 0.35 * Math.sin(t / 900 + d.phase);
        const alpha = d.a * tw;
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha * 0.14})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (visible && !document.hidden) frame(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    if (reduced) {
      frame(0); // لقطة ثابتة فقط
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [color]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
