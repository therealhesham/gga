// إعدادات لوحة التحكم: بيانات خالصة تُستخدم في السيرفر والكلاينت معًا

export type FieldType =
  | "text"
  | "textarea"
  | "image"
  | "icon"
  | "number"
  | "rating"
  | "checkbox"
  | "features"
  | "category";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  /** للأرقام والروابط والبريد: اتجاه من اليسار لليمين */
  ltr?: boolean;
  min?: number;
  max?: number;
};

export type SettingsGroup = { title: string; fields: Field[] };

export const SETTINGS_GROUPS: Record<string, SettingsGroup> = {
  identity: {
    title: "بيانات المؤسسة",
    fields: [
      { name: "companyName", label: "اسم المؤسسة", type: "text", required: true },
      { name: "companyTagline", label: "السطر التعريفي تحت الاسم", type: "text" },
      { name: "logoUrl", label: "الشعار / الصورة الشخصية", type: "image" },
      { name: "topAddress", label: "العنوان في الشريط العلوي", type: "text" },
      { name: "phone", label: "رقم الهاتف", type: "text", ltr: true },
      { name: "email", label: "البريد العام", type: "text", ltr: true },
      { name: "tendersEmail", label: "بريد المناقصات والعطاءات", type: "text", ltr: true },
      { name: "address", label: "عنوان الإدارة العامة", type: "text" },
      { name: "workingHours", label: "ساعات الدوام", type: "text" },
      { name: "crBadge", label: "شارة السجل التجاري (الشريط العلوي)", type: "text" },
      { name: "navCtaLabel", label: "نص زر الهيدر", type: "text" },
    ],
  },
  hero: {
    title: "نصوص الواجهة الرئيسية",
    fields: [
      { name: "heroOverline", label: "الشارة العلوية", type: "text" },
      { name: "heroOverlineSub", label: "نص الشارة الثانوي", type: "text" },
      { name: "heroTitleLine1", label: "العنوان - السطر الأول", type: "text", required: true },
      { name: "heroTitleHighlight", label: "العنوان - الجزء الملوّن", type: "text" },
      { name: "heroTitleSuffix", label: "العنوان - تتمة السطر", type: "text" },
      { name: "heroSubtitle", label: "الوصف", type: "textarea" },
      { name: "heroImage", label: "صورة الخلفية", type: "image" },
      { name: "heroPrimaryCta", label: "نص الزر الأساسي", type: "text" },
      { name: "heroSecondaryCta", label: "نص الزر الثانوي", type: "text" },
    ],
  },
  about: {
    title: "نصوص قسم عن المؤسسة",
    fields: [
      { name: "aboutEyebrow", label: "العنوان الصغير", type: "text" },
      { name: "aboutTitle", label: "العنوان الرئيسي", type: "text", required: true },
      { name: "aboutP1", label: "الفقرة الأولى", type: "textarea" },
      { name: "aboutP2", label: "الفقرة الثانية", type: "textarea" },
      { name: "aboutImage", label: "الصورة", type: "image" },
      { name: "aboutPlaqueTitle", label: "عنوان اللوحة فوق الصورة", type: "text" },
      { name: "aboutPlaqueText", label: "نص اللوحة فوق الصورة", type: "textarea" },
    ],
  },
  services: {
    title: "نصوص قسم الخدمات",
    fields: [
      { name: "servicesEyebrow", label: "العنوان الصغير", type: "text" },
      { name: "servicesTitle", label: "العنوان الرئيسي", type: "text", required: true },
      { name: "servicesIntro", label: "النص التعريفي", type: "textarea" },
    ],
  },
  projects: {
    title: "نصوص قسم المشاريع",
    fields: [
      { name: "projectsEyebrow", label: "العنوان الصغير", type: "text" },
      { name: "projectsTitle", label: "العنوان الرئيسي", type: "text", required: true },
      { name: "projectsCta", label: "نص الزر أسفل المشاريع", type: "text" },
    ],
  },
  quality: {
    title: "نصوص قسم الجودة",
    fields: [
      { name: "qualityEyebrow", label: "العنوان الصغير", type: "text" },
      { name: "qualityTitle", label: "العنوان الرئيسي", type: "text", required: true },
      { name: "qualityText", label: "النص التعريفي", type: "textarea" },
      { name: "metricsEyebrow", label: "عنوان لوحة المؤشرات (صغير)", type: "text" },
      { name: "metricsTitle", label: "عنوان لوحة المؤشرات", type: "text" },
    ],
  },
  trust: {
    title: "نصوص قسم الشركاء والآراء",
    fields: [
      { name: "partnersEyebrow", label: "العنوان الصغير", type: "text" },
      { name: "partnersTitle", label: "العنوان الرئيسي", type: "text", required: true },
    ],
  },
  consult: {
    title: "نصوص قسم طلب الاستشارة",
    fields: [
      { name: "consultEyebrow", label: "العنوان الصغير", type: "text" },
      { name: "consultTitle", label: "العنوان الرئيسي", type: "text", required: true },
      { name: "consultText", label: "النص التعريفي", type: "textarea" },
      { name: "ndaNote", label: "ملاحظة السرية", type: "text" },
    ],
  },
  comingSoon: {
    title: "صفحة قريبًا (Coming Soon)",
    fields: [
      {
        name: "comingSoonEnabled",
        label: "تفعيل صفحة «قريبًا» للزوار",
        type: "checkbox",
        help: "عند التفعيل يرى الزوار هذه الصفحة بدل الموقع. لوحة التحكم تبقى متاحة لك دائمًا.",
      },
      { name: "comingSoonTitle", label: "العنوان", type: "text", placeholder: "نبني شيئًا استثنائيًا" },
      { name: "comingSoonText", label: "النص", type: "textarea" },
      { name: "comingSoonLaunch", label: "موعد الإطلاق (نص حر)", type: "text", placeholder: "الربع الأول 2027" },
      {
        name: "comingSoonImage",
        label: "صورة الخلفية (اختياري)",
        type: "image",
        help: "تظهر بشفافية خفيفة خلف المحتوى. اتركها فارغة للتصميم الافتراضي.",
      },
    ],
  },
  footer: {
    title: "نصوص الفوتر",
    fields: [
      { name: "footerAbout", label: "نبذة الفوتر", type: "textarea" },
      { name: "footerBadge", label: "شارة الاعتماد", type: "text" },
      { name: "footerIso", label: "رقم الاعتماد (ISO)", type: "text", ltr: true },
      { name: "footerCopyright", label: "نص حقوق النشر", type: "text" },
    ],
  },
};

export type CollectionKey =
  | "stats"
  | "pillars"
  | "services"
  | "categories"
  | "projects"
  | "quality-items"
  | "metrics"
  | "certifications"
  | "partners"
  | "testimonials";

export type Collection = {
  title: string;
  singular: string;
  fields: Field[];
  /** الحقل الذي يُعرض كعنوان للصف */
  primary: string;
  secondary?: string;
  /** حقل الأيقونة المعروضة بجوار الصف */
  iconField?: string;
  hint?: string;
};

const sortOrder: Field = {
  name: "sortOrder",
  label: "الترتيب",
  type: "number",
  help: "الرقم الأصغر يظهر أولًا",
  ltr: true,
};

export const COLLECTIONS: Record<CollectionKey, Collection> = {
  stats: {
    title: "مؤشرات الأرقام أسفل الواجهة",
    singular: "مؤشر",
    primary: "value",
    secondary: "label",
    iconField: "icon",
    fields: [
      { name: "value", label: "القيمة", type: "text", required: true, placeholder: "+25" },
      { name: "unit", label: "الوحدة", type: "text", placeholder: "عاماً" },
      { name: "label", label: "الوصف", type: "text", required: true },
      {
        name: "icon",
        label: "أيقونة (اختياري)",
        type: "icon",
        help: "لو اخترت أيقونة تظهر القيمة كعنوان بجانبها بدل الرقم الكبير",
      },
      sortOrder,
    ],
  },
  pillars: {
    title: "ركائز المؤسسة",
    singular: "ركيزة",
    primary: "title",
    secondary: "description",
    iconField: "icon",
    fields: [
      { name: "icon", label: "الأيقونة", type: "icon", required: true },
      { name: "title", label: "العنوان", type: "text", required: true },
      { name: "description", label: "الوصف", type: "textarea", required: true },
      sortOrder,
    ],
  },
  services: {
    title: "الخدمات",
    singular: "خدمة",
    primary: "title",
    secondary: "description",
    iconField: "icon",
    fields: [
      { name: "icon", label: "الأيقونة", type: "icon", required: true },
      { name: "code", label: "الكود الصغير", type: "text", ltr: true, placeholder: "01 / COMMERCIAL" },
      { name: "title", label: "عنوان الخدمة", type: "text", required: true },
      { name: "description", label: "الوصف", type: "textarea", required: true },
      sortOrder,
    ],
  },
  categories: {
    title: "تصنيفات المشاريع (أزرار الفلتر)",
    singular: "تصنيف",
    primary: "name",
    fields: [
      { name: "name", label: "اسم التصنيف", type: "text", required: true },
      sortOrder,
    ],
  },
  projects: {
    title: "المشاريع",
    singular: "مشروع",
    primary: "title",
    secondary: "kind",
    fields: [
      { name: "title", label: "اسم المشروع", type: "text", required: true },
      { name: "kind", label: "نوع المشروع", type: "text", placeholder: "مشروع تجاري ومكتبي متكامل" },
      { name: "categoryId", label: "التصنيف", type: "category" },
      { name: "location", label: "الموقع (شارة على الصورة)", type: "text" },
      { name: "badge", label: "الشارة الثانية (الحالة/القطاع)", type: "text", placeholder: "مكتمل 2024" },
      { name: "badgePrimary", label: "إبراز الشارة الثانية بالّلون الأساسي", type: "checkbox" },
      { name: "meta", label: "معلومة جانبية", type: "text", placeholder: "مساحة البناء: 45,000 م²" },
      { name: "imageUrl", label: "صورة المشروع", type: "image" },
      { name: "description", label: "الوصف", type: "textarea", required: true },
      { name: "features", label: "مميزات المشروع", type: "features", help: "تظهر أسفل البطاقة بأيقونات" },
      { name: "published", label: "منشور على الموقع", type: "checkbox" },
      sortOrder,
    ],
  },
  "quality-items": {
    title: "بنود الجودة",
    singular: "بند",
    primary: "title",
    secondary: "description",
    iconField: "icon",
    fields: [
      { name: "icon", label: "الأيقونة", type: "icon", required: true },
      { name: "title", label: "العنوان", type: "text", required: true },
      { name: "description", label: "الوصف", type: "textarea", required: true },
      sortOrder,
    ],
  },
  metrics: {
    title: "مؤشرات الأداء (أشرطة التقدم)",
    singular: "مؤشر أداء",
    primary: "label",
    secondary: "valueText",
    fields: [
      { name: "label", label: "اسم المؤشر", type: "text", required: true },
      { name: "valueText", label: "القيمة المعروضة", type: "text", required: true, ltr: true, placeholder: "99.8%" },
      { name: "percent", label: "نسبة امتلاء الشريط (0-100)", type: "number", min: 0, max: 100, ltr: true },
      sortOrder,
    ],
  },
  certifications: {
    title: "الشهادات والاعتمادات",
    singular: "شهادة",
    primary: "code",
    secondary: "label",
    iconField: "icon",
    fields: [
      { name: "icon", label: "الأيقونة", type: "icon", required: true },
      { name: "code", label: "الرمز", type: "text", required: true, ltr: true, placeholder: "ISO 9001:2015" },
      { name: "label", label: "الوصف", type: "text", required: true },
      sortOrder,
    ],
  },
  partners: {
    title: "الشركاء والعملاء",
    singular: "شريك",
    primary: "name",
    iconField: "icon",
    fields: [
      { name: "icon", label: "الأيقونة", type: "icon", required: true },
      { name: "name", label: "اسم الجهة", type: "text", required: true },
      sortOrder,
    ],
  },
  testimonials: {
    title: "آراء العملاء",
    singular: "رأي",
    primary: "name",
    secondary: "role",
    fields: [
      { name: "quote", label: "نص الرأي", type: "textarea", required: true },
      { name: "name", label: "الاسم", type: "text", required: true },
      { name: "role", label: "المنصب / الجهة", type: "text", required: true },
      { name: "rating", label: "التقييم (1-5)", type: "rating" },
      sortOrder,
    ],
  },
};

export type Section = {
  key: string;
  title: string;
  description: string;
  icon: string;
  /** مفتاح مجموعة النصوص في SETTINGS_GROUPS */
  settings?: string;
  collections: CollectionKey[];
};

export const SECTIONS: Section[] = [
  { key: "identity", title: "الهوية والتواصل", description: "اسم المؤسسة، الشعار، الهاتف، العنوان", icon: "building-2", settings: "identity", collections: [] },
  { key: "hero", title: "الواجهة الرئيسية", description: "العنوان الكبير، الصورة، مؤشرات الأرقام", icon: "sparkles", settings: "hero", collections: ["stats"] },
  { key: "about", title: "عن المؤسسة", description: "النبذة، الصورة، ركائز المؤسسة", icon: "users", settings: "about", collections: ["pillars"] },
  { key: "services", title: "الخدمات", description: "عناوين القسم وبطاقات الخدمات", icon: "hard-hat", settings: "services", collections: ["services"] },
  { key: "projects", title: "المشاريع", description: "التصنيفات وبطاقات المشاريع", icon: "folder-open", settings: "projects", collections: ["categories", "projects"] },
  { key: "quality", title: "الجودة والمعايير", description: "بنود الجودة، المؤشرات، الشهادات", icon: "badge-check", settings: "quality", collections: ["quality-items", "metrics", "certifications"] },
  { key: "trust", title: "الشركاء والآراء", description: "شعارات الشركاء وآراء العملاء", icon: "handshake", settings: "trust", collections: ["partners", "testimonials"] },
  { key: "consult", title: "طلب الاستشارة", description: "نصوص قسم التواصل والنموذج", icon: "send", settings: "consult", collections: [] },
  { key: "coming-soon", title: "صفحة قريبًا", description: "تفعيل صفحة «قريبًا» وتخصيص شكلها", icon: "timer", settings: "comingSoon", collections: [] },
  { key: "footer", title: "الفوتر", description: "النبذة وحقوق النشر", icon: "layers", settings: "footer", collections: [] },
];

export const SECTION_BY_KEY = Object.fromEntries(SECTIONS.map((s) => [s.key, s]));

/** القسم الذي تنتمي إليه المجموعة (للرجوع بعد الحفظ) */
export function sectionOfCollection(key: CollectionKey) {
  return SECTIONS.find((s) => s.collections.includes(key));
}

export function isCollectionKey(key: string): key is CollectionKey {
  return key in COLLECTIONS;
}
