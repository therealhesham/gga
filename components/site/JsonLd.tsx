import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import type { SiteSettingsData } from "@/lib/data";

/** بيانات منظمة (schema.org) تقرؤها محركات البحث؛ "<" تُهرَّب كي لا يُغلق النص وسم السكربت */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const absolute = (src: string) => (src.startsWith("/") ? `${SITE_URL}${src}` : src);

export const ORG_ID = `${SITE_URL}/#organization`;

/** بطاقة المؤسسة كمقاول عام + تعريف الموقع (للصفحة الرئيسية) */
export function organizationLd(settings: SiteSettingsData) {
  const name = settings.companyName || SITE_NAME;
  const contractor = {
    "@type": "GeneralContractor",
    "@id": ORG_ID,
    name,
    alternateName: "GGA Contracting",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: absolute(settings.heroImage || "/images/hero.webp"),
    description: SITE_DESCRIPTION,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: settings.address.includes("الرياض") ? "الرياض" : undefined,
          addressCountry: "SA",
        }
      : undefined,
    areaServed: { "@type": "Country", name: "المملكة العربية السعودية" },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      contractor,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name,
        inLanguage: "ar",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** مسار التنقل لصفحة مشروع */
export function projectBreadcrumbLd(project: { id: number; title: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "المشاريع", item: `${SITE_URL}/#featured-projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projects/${project.id}` },
    ],
  };
}
