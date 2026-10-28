import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { SESSION_COOKIE, SESSION_DAYS, signToken, verifyToken } from "./token";

/** طبقة الوصول للبيانات: المصدر الوحيد للتحقق من هوية الأدمن */
export const getAdmin = cache(async () => {
  const store = await cookies();
  const userId = await verifyToken(store.get(SESSION_COOKIE)?.value);
  if (!userId) return null;
  return prisma.adminUser.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true },
  });
});

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function createSession(userId: number) {
  const store = await cookies();
  store.set(SESSION_COOKIE, await signToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}
