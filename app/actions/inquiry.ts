"use server";

import { randomBytes } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { RFQ_FILE, RFQ_PROJECT_TYPES } from "@/lib/rfq";

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

const RFQ_DIR = path.join(process.cwd(), "uploads", "rfq");

/** نتحقق من بصمة الملف الفعلية ولا نثق في الامتداد أو نوع MIME المرسل */
function matchesSignature(ext: string, buf: Buffer): boolean {
  const head = buf.subarray(0, 512);
  const ascii = head.toString("latin1");
  switch (ext) {
    case "pdf":
      return ascii.slice(0, 1024).includes("%PDF-");
    case "dwg":
      return /^AC10\d\d/.test(ascii);
    case "dxf":
      return ascii.includes("SECTION") || ascii.startsWith("AutoCAD Binary DXF");
    case "xlsx":
    case "docx":
    case "zip":
      return head[0] === 0x50 && head[1] === 0x4b && (head[2] === 0x03 || head[2] === 0x05);
    case "xls":
    case "doc":
      return head.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
    default:
      return false;
  }
}

const safeName = (name: string) =>
  name.replace(/[\u0000-\u001f\\/[\]]/g, "").replace(/\s+/g, " ").trim().slice(0, 80) || "ملف";

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const values = {
    name: clean(formData.get("name"), 191),
    company: clean(formData.get("company"), 191),
    phone: clean(formData.get("phone"), 64),
    email: clean(formData.get("email"), 191),
    projectType: clean(formData.get("projectType"), 191),
    location: clean(formData.get("location"), 191),
    budget: clean(formData.get("budget"), 191),
    details: clean(formData.get("details"), 3000),
  };

  // حقل مصيدة للبوتات: يجب أن يبقى فارغًا
  if (clean(formData.get("website"), 100)) {
    return { status: "success" };
  }

  if (!values.name || !values.phone) {
    return { status: "error", message: "الرجاء إدخال الاسم ورقم الجوال.", values };
  }
  if (!/^[+\d][\d\s()-]{6,}$/.test(values.phone)) {
    return { status: "error", message: "رقم الجوال غير صحيح.", values };
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return { status: "error", message: "البريد الإلكتروني غير صحيح.", values };
  }
  if (!(RFQ_PROJECT_TYPES as readonly string[]).includes(values.projectType)) {
    return { status: "error", message: "الرجاء اختيار نوع المشروع.", values };
  }

  // الملفات (اختيارية)
  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > RFQ_FILE.maxFiles) {
    return { status: "error", message: `الحد الأقصى ${RFQ_FILE.maxFiles} ملفات.`, values };
  }
  const prepared: { original: string; stored: string; buffer: Buffer }[] = [];
  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!(RFQ_FILE.exts as readonly string[]).includes(ext)) {
      return { status: "error", message: `صيغة الملف غير مدعومة: ${safeName(file.name)}`, values };
    }
    if (file.size > RFQ_FILE.maxBytes) {
      return { status: "error", message: `حجم الملف يتجاوز 10 ميجابايت: ${safeName(file.name)}`, values };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!matchesSignature(ext, buffer)) {
      return { status: "error", message: `الملف تالف أو لا يطابق صيغته: ${safeName(file.name)}`, values };
    }
    prepared.push({
      original: safeName(file.name),
      stored: `${Date.now().toString(36)}-${randomBytes(6).toString("hex")}.${ext}`,
      buffer,
    });
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

  // الجهة والبريد والمرفقات لا أعمدة لها في الجدول: تُكتب في بداية التفاصيل بصيغة مقروءة
  const header: string[] = [];
  if (values.company) header.push(`الجهة: ${values.company}`);
  if (values.email) header.push(`البريد: ${values.email}`);
  if (prepared.length) {
    header.push("المرفقات:");
    for (const f of prepared) header.push(`- ${f.original} [rfq:${f.stored}]`);
  }
  const details = [header.join("\n"), values.details].filter(Boolean).join("\n\n");

  const saved: string[] = [];
  try {
    if (prepared.length) {
      await mkdir(RFQ_DIR, { recursive: true });
      for (const f of prepared) {
        await writeFile(path.join(RFQ_DIR, f.stored), f.buffer);
        saved.push(f.stored);
      }
    }
    await prisma.inquiry.create({
      data: {
        name: values.name,
        phone: values.phone,
        projectType: values.projectType,
        location: values.location,
        budget: values.budget,
        details,
      },
    });
  } catch (error) {
    console.error("inquiry.create failed", error);
    await Promise.all(saved.map((n) => unlink(path.join(RFQ_DIR, n)).catch(() => {})));
    return {
      status: "error",
      message: "تعذّر حفظ الطلب حاليًا، حاول مرة أخرى.",
      values,
    };
  }

  return { status: "success" };
}
