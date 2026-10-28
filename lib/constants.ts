export const PROJECT_TYPES = [
  "مشروع تجاري / برج إداري",
  "مجمع سكني أو قصر خاص",
  "بنية تحتية وتطوير أراضٍ",
  "تشطيبات معمارية وتصميم داخلي",
  "مقاولات عامة شاملة (تسليم مفتاح)",
] as const;

export const BUDGET_OPTIONS = [
  { value: "٥ - ١٥ مليون", hint: "ريال سعودي" },
  { value: "١٥ - ٥٠ مليون", hint: "ريال سعودي" },
  { value: "٥٠ - ١٠٠ مليون", hint: "ريال سعودي" },
  { value: "+١٠٠ مليون", hint: "مشاريع كبرى" },
] as const;

/** معرّفات الأقسام في الصفحة الرئيسية (تُستخدم في الروابط والـ scroll-spy) */
export const SECTION_IDS = {
  hero: "hero",
  about: "about-us",
  services: "services",
  projects: "featured-projects",
  quality: "quality-standards",
  contact: "consultation-booking",
} as const;

export const NAV_ITEMS = [
  { id: SECTION_IDS.hero, label: "الرئيسية" },
  { id: SECTION_IDS.about, label: "عن المؤسسة" },
  { id: SECTION_IDS.services, label: "خدماتنا" },
  { id: SECTION_IDS.projects, label: "المشاريع" },
  { id: SECTION_IDS.quality, label: "معايير الجودة" },
  { id: SECTION_IDS.contact, label: "تواصل معنا" },
] as const;
