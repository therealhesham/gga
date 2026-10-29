// ربط خدمة ← تصنيف مشاريع (بالمطابقة على الاسم، لأن التصنيفات تُدار من لوحة التحكم)
export const FILTER_EVENT = "gga:project-filter";

const RULES: { service: RegExp; category: RegExp }[] = [
  { service: /تجاري|إدار|أبراج/, category: /تجاري|أبراج/ },
  { service: /قصور|سكن/, category: /سكن|قصور/ },
  { service: /بنية|مدني/, category: /بنية|مدني/ },
  { service: /تشطيب|ديكور/, category: /تشطيب|ديكور/ },
];

/** معرّف تصنيف المشاريع المقابل للخدمة، أو null (= عرض الكل) إن لم يوجد تصنيف مطابق */
export function categoryForService(
  title: string,
  categories: { id: number; name: string }[],
): number | null {
  for (const rule of RULES) {
    if (rule.service.test(title)) {
      return categories.find((c) => rule.category.test(c.name))?.id ?? null;
    }
  }
  return null;
}
