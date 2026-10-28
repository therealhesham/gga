import { SignJWT, jwtVerify } from "jose";

// بدون "server-only" لأن proxy.ts يستخدمه أيضًا

export const SESSION_COOKIE = "gga_admin";
export const SESSION_DAYS = 7;

function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET مطلوب في .env (32 حرف على الأقل)");
  }
  return new TextEncoder().encode(secret);
}

export async function signToken(userId: number) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getKey());
}

/** يرجع معرّف المستخدم لو التوكن سليم وغير منتهٍ، وإلا null */
export async function verifyToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ["HS256"] });
    const id = Number(payload.sub);
    return Number.isInteger(id) ? id : null;
  } catch {
    return null;
  }
}
