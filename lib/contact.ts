// بيانات التواصل المركزية: عدّلها هنا (أو من لوحة التحكم لرقم الهاتف المعروض) وستنعكس في كل الموقع.

export const CONTACT = {
  /** رقم هاتف افتراضي يُستخدم عند تهيئة قاعدة البيانات (seed). المعروض فعليًا يُدار من لوحة التحكم. */
  defaultPhone: "+966 11 000 8899",

  /**
   * رقم واتساب بصيغة دولية بدون + أو مسافات (مثال: جوال 9665XXXXXXXX).
   * استبدله برقم العميل الحقيقي (رقم 9200 لا يدعم واتساب عادةً، استخدم الجوال).
   */
  whatsapp: "966110008899",

  /** رسالة افتتاحية تُملأ تلقائيًا عند فتح المحادثة */
  whatsappMessage: "السلام عليكم، أرغب بالاستفسار عن خدمات المؤسسة.",

  /** ملف سابقة الأعمال (PDF) داخل مجلد public. يظهر زر التحميل فقط عند وجود الملف. */
  profilePdf: "/company-profile.pdf",
} as const;

export const whatsappUrl = (
  number: string = CONTACT.whatsapp,
  text: string = CONTACT.whatsappMessage,
) => `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
