// توحيد الأرقام في كل محتوى الموقع: الأرقام العربية-الهندية → لاتينية (٢٥ → 25، ٩٩.٤٪ → 99.4%)
// يُطبَّق عند قراءة البيانات فيشمل أي نص يدخله الأدمن لاحقًا دون تعديل قاعدة البيانات.
const MAP: Record<string, string> = {
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
  "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
  "٪": "%", "٫": ".", "٬": ",",
};

const RE = /[٠-٩٪٫٬]/g;

export const westernize = (s: string) => s.replace(RE, (c) => MAP[c]);

export function westernizeDeep<T>(value: T): T {
  if (typeof value === "string") return westernize(value) as T;
  if (Array.isArray(value)) return value.map((v) => westernizeDeep(v)) as T;
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = westernizeDeep(v);
    return out as T;
  }
  return value;
}
