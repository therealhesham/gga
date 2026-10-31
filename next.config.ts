import type { NextConfig } from "next";

// ترويسات الحماية: منع التضمين في إطار، وتثبيت نوع المحتوى، وتقييد المصادر الخطرة (بدون تقييد السكربتات كي لا يتعطل Next)
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // ناتج مستقل (server.js + الملفات المطلوبة فقط) لصورة Docker صغيرة
  output: "standalone",
  experimental: {
    agentFeedback: true,
    // مرفقات طلبات التسعير: حتى 3 ملفات × 10MB
    serverActions: { bodySizeLimit: "32mb" },
  },
  images: { formats: ["image/avif", "image/webp"] },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
