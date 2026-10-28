"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/dal";

export type LoginState = { message?: string; email?: string };

// تقييد محاولات الدخول: 8 محاولات فاشلة لكل IP+بريد كل 15 دقيقة (في الذاكرة)
const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 8;

const recent = (key: string) =>
  (attempts.get(key) ?? []).filter((t) => Date.now() - t < WINDOW_MS);

// هاش وهمي لتسوية زمن الاستجابة عندما لا يوجد المستخدم
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEeO1vFjLQ2V2Qz3x1b5s0f0g8y3e5p6mW.";

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { message: "أدخل البريد وكلمة المرور.", email };

  const h = await headers();
  const key = `${h.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"}|${email}`;
  if (recent(key).length >= MAX_FAILS) {
    return { message: "محاولات كثيرة، حاول مرة أخرى بعد قليل.", email };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !valid) {
    attempts.set(key, [...recent(key), Date.now()]);
    return { message: "بيانات الدخول غير صحيحة.", email };
  }

  attempts.delete(key);
  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
