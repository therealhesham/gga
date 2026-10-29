import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/dal";

// تنزيل مرفقات طلبات التسعير: للأدمن فقط، وكـ attachment دائمًا (لا يُعرض داخل المتصفح)
const NAME = /^[a-z0-9]+-[a-f0-9]{12}\.(pdf|dwg|dxf|xls|xlsx|doc|docx|zip)$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }
  const { name } = await params;
  if (!NAME.test(name)) return new Response("Not found", { status: 404 });

  try {
    const file = await readFile(path.join(process.cwd(), "uploads", "rfq", name));
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${name}"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
