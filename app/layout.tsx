import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// خط الموقع للعناوين والنصوص (Tajawal لا يوفّر وزن 600، فيُستخدم 500 أو 700)
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | GGA Contracting`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "مقاولات عامة",
    "شركة مقاولات في الرياض",
    "مقاول معتمد",
    "إنشاء أبراج تجارية",
    "قصور ومجمعات سكنية",
    "بنية تحتية",
    "تشطيبات فاخرة",
    "GGA Contracting",
  ],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | GGA Contracting`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // رمز التحقق من Google Search Console (يُضاف في .env عند التسجيل)
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
