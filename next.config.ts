import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
