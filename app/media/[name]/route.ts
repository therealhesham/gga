import { readFile } from "node:fs/promises";
import path from "node:path";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  // اسم ملف بسيط فقط: يمنع أي محاولة للخروج من مجلد uploads
  const match = /^[\w-]+\.(jpg|png|webp|gif|avif)$/.exec(name);
  if (!match) return new Response("Not found", { status: 404 });

  try {
    const file = await readFile(path.join(process.cwd(), "uploads", name));
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": TYPES[match[1]],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
