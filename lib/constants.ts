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

/** شريط الاعتمادات والشراكات (نص فقط: استبدله بشعارات رسمية موثّقة من العميل عند توفرها) */
export const ACCREDITATIONS = [
  { icon: "shield-check", label: "الهيئة السعودية للمقاولين" },
  { icon: "building-2", label: "كود البناء السعودي SBC" },
  { icon: "badge-check", label: "ISO 9001" },
  { icon: "hard-hat", label: "ISO 45001" },
  { icon: "landmark", label: "شريك تحقيق رؤية المملكة 2030" },
] as const;
