import { mkdir, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/dal";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

const MAX_BYTES = 8 * 1024 * 1024;

// نتحقق من البصمة الفعلية للملف ولا نثق في الامتداد أو نوع MIME المرسل
function detectExt(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  if (buf.subarray(0, 3).toString("ascii") === "GIF") return "gif";
  if (buf.subarray(4, 8).toString("ascii") === "ftyp" && buf.subarray(8, 12).toString("ascii").startsWith("avif")) return "avif";
  return null;
}

export async function POST(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "لم يتم اختيار ملف" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "حجم الصورة يتجاوز 8 ميجابايت" }, { status: 413 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = detectExt(buffer);
  if (!ext) {
    return NextResponse.json(
      { error: "صيغة غير مدعومة (المسموح: JPG, PNG, WebP, GIF, AVIF)" },
      { status: 415 },
    );
  }

  const name = `${Date.now().toString(36)}-${randomBytes(6).toString("hex")}.${ext}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), buffer);

  return NextResponse.json({ url: `/media/${name}` });
}
