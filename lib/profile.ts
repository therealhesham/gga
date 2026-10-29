import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { CONTACT } from "./contact";

/** هل ملف سابقة الأعمال (PDF) موجود في public؟ (يُفحص وقت البناء) */
export function hasProfilePdf(): boolean {
  return existsSync(path.join(process.cwd(), "public", CONTACT.profilePdf));
}
