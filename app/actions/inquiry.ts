"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  values?: Record<string, string>;
};

// حماية بسيطة من الإغراق: 5 طلبات لكل IP كل 10 دقائق (في الذاكرة)
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_HITS;
}

const clean = (v: FormDataEntryValue | null, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const values = {
    name: clean(formData.get("name"), 191),
    phone: clean(formData.get("phone"), 64),
    projectType: clean(formData.get("projectType"), 191),
    location: clean(formData.get("location"), 191),
    budget: clean(formData.get("budget"), 191),
    details: clean(formData.get("details"), 4000),
  };

  // حقل مصيدة للبوتات: يجب أن يبقى فارغًا
  if (clean(formData.get("website"), 100)) {
    return { status: "success" };
  }

  if (!values.name || !values.phone) {
    return {
      status: "error",
      message: "الرجاء إدخال الاسم ورقم الجوال.",
      values,
    };
  }
  if (!/^[+\d][\d\s()-]{6,}$/.test(values.phone)) {
    return { status: "error", message: "رقم الجوال غير صحيح.", values };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "تم إرسال عدد كبير من الطلبات، حاول مرة أخرى لاحقًا.",
      values,
    };
  }

  try {
    await prisma.inquiry.create({ data: values });
  } catch (error) {
    console.error("inquiry.create failed", error);
    return {
      status: "error",
      message: "تعذّر حفظ الطلب حاليًا، حاول مرة أخرى.",
      values,
    };
  }

  return { status: "success" };
}
