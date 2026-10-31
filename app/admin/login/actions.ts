"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/dal";
import { clientIp, createLimiter } from "@/lib/rate-limit";

export type LoginState = { message?: string; email?: string };

// تقييد محاولات الدخول (في الذاكرة): 8 فاشلة لكل IP+بريد، و30 فاشلة لكل بريد من أي عناوين، كل 15 دقيقة
const WINDOW_MS = 15 * 60 * 1000;
const perIp = createLimiter(WINDOW_MS, 8);
const perEmail = createLimiter(WINDOW_MS, 30);

// هاش وهمي لتسوية زمن الاستجابة عندما لا يوجد المستخدم
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEeO1vFjLQ2V2Qz3x1b5s0f0g8y3e5p6mW.";

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { message: "أدخل البريد وكلمة المرور.", email };

  const h = await headers();
  const key = `${clientIp(h)}|${email}`;
  if (perIp.blocked(key) || perEmail.blocked(email)) {
    return { message: "محاولات كثيرة، حاول مرة أخرى بعد قليل.", email };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !valid) {
    perIp.hit(key);
    perEmail.hit(email);
    return { message: "بيانات الدخول غير صحيحة.", email };
  }

  perIp.reset(key);
  perEmail.reset(email);
  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
