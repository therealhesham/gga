import "server-only";
import { ICONS } from "@/lib/icons";
import type { Field } from "./config";

export type FormState = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
  /** القيم المرسلة، لإعادة ملء النموذج عند الخطأ */
  values?: Record<string, string>;
};

const MAX_TEXT = 5000;

function isValidImage(url: string) {
  return /^\/media\/[\w.-]+$/.test(url) || /^https?:\/\/\S+$/i.test(url);
}

export function parseFeatures(raw: string) {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((f) => ({
        icon: typeof f?.icon === "string" && f.icon in ICONS ? f.icon : "",
        text: typeof f?.text === "string" ? f.text.trim().slice(0, 120) : "",
      }))
      .filter((f) => f.text)
      .slice(0, 12);
  } catch {
    return [];
  }
}

/** يحوّل FormData إلى بيانات جاهزة للحفظ + أخطاء لكل حقل */
export function parseFields(
  fields: Field[],
  fd: FormData,
  opts: { categoryIds?: Set<number> } = {},
) {
  const data: Record<string, unknown> = {};
  const errors: Record<string, string> = {};
  const values: Record<string, string> = {};

  for (const f of fields) {
    const raw = fd.get(f.name);
    const str = typeof raw === "string" ? raw.trim() : "";
    values[f.name] = typeof raw === "string" ? raw : "";

    switch (f.type) {
      case "checkbox":
        data[f.name] = raw === "on";
        values[f.name] = raw === "on" ? "on" : "";
        break;

      case "number":
      case "rating": {
        const min = f.type === "rating" ? 1 : (f.min ?? -1_000_000);
        const max = f.type === "rating" ? 5 : (f.max ?? 1_000_000);
        if (str === "") {
          if (f.type === "rating") data[f.name] = 5;
          else if (f.name === "percent") data[f.name] = 100;
          else data[f.name] = 0;
          break;
        }
        const n = Number(str);
        if (!Number.isInteger(n) || n < min || n > max) {
          errors[f.name] = `أدخل رقمًا صحيحًا بين ${min} و ${max}`;
        } else data[f.name] = n;
        break;
      }

      case "category": {
        if (str === "") {
          data[f.name] = null;
          break;
        }
        const n = Number(str);
        if (!opts.categoryIds?.has(n)) errors[f.name] = "تصنيف غير صالح";
        else data[f.name] = n;
        break;
      }

      case "features":
        data[f.name] = parseFeatures(str);
        break;

      case "icon":
        if (!str) {
          if (f.required) errors[f.name] = "اختر أيقونة";
          data[f.name] = "";
        } else if (!(str in ICONS)) errors[f.name] = "أيقونة غير صالحة";
        else data[f.name] = str;
        break;

      case "image":
        if (str && !isValidImage(str)) errors[f.name] = "الرابط غير صالح (يجب أن يبدأ بـ http أو https)";
        else data[f.name] = str;
        break;

      default:
        if (f.required && !str) errors[f.name] = "هذا الحقل مطلوب";
        else if (str.length > MAX_TEXT) errors[f.name] = "النص طويل جدًا";
        else data[f.name] = str;
    }
  }

  return { data, errors, values };
}
