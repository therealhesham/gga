"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { getSettings } from "@/lib/data";
import {
  COLLECTIONS,
  SETTINGS_GROUPS,
  isCollectionKey,
  sectionOfCollection,
} from "@/lib/admin/config";
import { DELEGATES } from "@/lib/admin/models";
import { parseFields, type FormState } from "@/lib/admin/parse";

const TOO_LONG = "أحد الحقول أطول من الحد المسموح به.";

function failure(e: unknown): FormState {
  if (typeof e === "object" && e && "code" in e && e.code === "P2000") {
    return { message: TOO_LONG };
  }
  console.error(e);
  return { message: "تعذّر الحفظ، حاول مرة أخرى." };
}

/** حفظ مجموعة نصوص من إعدادات الموقع */
export async function saveSettings(
  group: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const def = SETTINGS_GROUPS[group];
  if (!def) return { message: "مجموعة غير معروفة." };

  const { data, errors, values } = parseFields(def.fields, formData);
  if (Object.keys(errors).length) {
    return { errors, values, message: "راجع الحقول المظللة." };
  }

  try {
    await getSettings();
    await prisma.siteSettings.update({ where: { id: 1 }, data });
  } catch (e) {
    return { ...failure(e), values };
  }

  updateTag("site");
  return { ok: true, message: "تم الحفظ ونُشرت التغييرات على الموقع.", values };
}

/** إضافة أو تعديل عنصر في إحدى المجموعات (id = 0 يعني عنصر جديد) */
export async function saveItem(
  collection: string,
  id: number,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  if (!isCollectionKey(collection)) return { message: "مجموعة غير معروفة." };
  const def = COLLECTIONS[collection];

  const categoryIds = new Set(
    (await prisma.projectCategory.findMany({ select: { id: true } })).map((c) => c.id),
  );
  const { data, errors, values } = parseFields(def.fields, formData, { categoryIds });
  if (Object.keys(errors).length) {
    return { errors, values, message: "راجع الحقول المظللة." };
  }

  const delegate = DELEGATES[collection];
  try {
    if (id) await delegate.update({ where: { id }, data });
    else await delegate.create({ data });
  } catch (e) {
    return { ...failure(e), values };
  }

  updateTag("site");
  redirect(`/admin/section/${sectionOfCollection(collection)?.key ?? ""}`);
}

export async function deleteItem(collection: string, id: number) {
  await requireAdmin();
  if (!isCollectionKey(collection)) return;
  await DELEGATES[collection].delete({ where: { id } });
  updateTag("site");
}

export async function setInquiryStatus(id: number, status: "NEW" | "READ" | "ARCHIVED") {
  await requireAdmin();
  await prisma.inquiry.update({ where: { id }, data: { status } });
}

export async function deleteInquiry(id: number) {
  await requireAdmin();
  await prisma.inquiry.delete({ where: { id } });
}

export async function changePassword(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const admin = await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next.length < 12) return { message: "كلمة المرور الجديدة يجب ألا تقل عن 12 حرفًا." };
  if (next !== confirm) return { message: "تأكيد كلمة المرور غير مطابق." };

  const user = await prisma.adminUser.findUnique({ where: { id: admin.id } });
  if (!user || !(await bcrypt.compare(current, user.passwordHash))) {
    return { message: "كلمة المرور الحالية غير صحيحة." };
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash: await bcrypt.hash(next, 12) },
  });
  return { ok: true, message: "تم تغيير كلمة المرور." };
}
