import type { MetadataRoute } from "next";
import { getSiteData } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { settings, projects } = await getSiteData();
  // أثناء وضع "قريبًا" لا نعرض للمحركات غير الصفحة الرئيسية
  if (settings.comingSoonEnabled) return [{ url: SITE_URL }];

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: p.imageUrl ? [p.imageUrl.startsWith("/") ? `${SITE_URL}${p.imageUrl}` : p.imageUrl] : undefined,
    })),
  ];
}
