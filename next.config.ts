import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ناتج مستقل (server.js + الملفات المطلوبة فقط) لصورة Docker صغيرة
  output: "standalone",
  experimental: {
    agentFeedback: true,
  },
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
