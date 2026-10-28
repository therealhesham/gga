import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "./prisma";

export type Feature = { icon: string; text: string };

function parseFeatures(value: unknown): Feature[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (f): f is Feature =>
        !!f && typeof f === "object" && typeof (f as Feature).text === "string",
    )
    .map((f) => ({ icon: String(f.icon ?? ""), text: f.text }));
}

// أعمدة TEXT في MySQL لا تقبل قيمة افتراضية، فنعبّئها هنا عند إنشاء الصف
const TEXT_DEFAULTS = {
  heroSubtitle: "",
  aboutP1: "",
  aboutP2: "",
  aboutPlaqueText: "",
  servicesIntro: "",
  qualityText: "",
  consultText: "",
  footerAbout: "",
  comingSoonText: "",
};

/** صف الإعدادات الوحيد؛ يُنشأ بقيم فارغة لو لم يوجد */
export async function getSettings() {
  const existing = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (existing) return existing;
  return prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, ...TEXT_DEFAULTS },
  });
}

const byOrder = [{ sortOrder: "asc" as const }, { id: "asc" as const }];

/**
 * كل محتوى الصفحة الرئيسية في استعلام واحد مخزّن بالكاش.
 * أي تعديل من لوحة التحكم يستدعي updateTag("site") فيظهر فورًا.
 */
export async function getSiteData() {
  "use cache";
  cacheTag("site");
  cacheLife("hours");

  const [
    settings,
    stats,
    pillars,
    services,
    categories,
    projects,
    qualityItems,
    metrics,
    certifications,
    partners,
    testimonials,
  ] = await Promise.all([
    getSettings(),
    prisma.stat.findMany({ orderBy: byOrder }),
    prisma.pillar.findMany({ orderBy: byOrder }),
    prisma.service.findMany({ orderBy: byOrder }),
    prisma.projectCategory.findMany({ orderBy: byOrder }),
    prisma.project.findMany({ where: { published: true }, orderBy: byOrder }),
    prisma.qualityItem.findMany({ orderBy: byOrder }),
    prisma.qualityMetric.findMany({ orderBy: byOrder }),
    prisma.certification.findMany({ orderBy: byOrder }),
    prisma.partner.findMany({ orderBy: byOrder }),
    prisma.testimonial.findMany({ orderBy: byOrder }),
  ]);

  return {
    settings,
    stats,
    pillars,
    services,
    categories,
    projects: projects.map((p) => ({ ...p, features: parseFeatures(p.features) })),
    qualityItems,
    metrics,
    certifications,
    partners,
    testimonials,
  };
}

export type SiteData = Awaited<ReturnType<typeof getSiteData>>;
export type SiteSettingsData = SiteData["settings"];
