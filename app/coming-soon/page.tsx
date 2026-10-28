import type { Metadata } from "next";
import { getSiteData } from "@/lib/data";
import { ComingSoon } from "@/components/site/ComingSoon";

export const metadata: Metadata = {
  title: "قريبًا | GGA",
  robots: { index: false, follow: false },
};

// معاينة الصفحة تعمل دائمًا حتى لو كانت غير مفعّلة، للاطلاع على شكلها قبل التفعيل
export default async function ComingSoonPreview() {
  const { settings } = await getSiteData();
  return <ComingSoon settings={settings} />;
}
