import type { Metadata } from "next";
import { Cairo, Geist_Mono, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// خط العناوين: كوفي هندسي نظيف يناسب هوية المقاولات
const kufi = Noto_Kufi_Arabic({
  variable: "--font-kufi",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "غسان غازي الميمني للمقاولات العامة | GGA Contracting",
  description:
    "مؤسسة غسان غازي الميمني للمقاولات العامة: حلول إنشائية متكاملة، أبراج ومجمعات تجارية وسكنية، وبنية تحتية في المملكة العربية السعودية.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${kufi.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
        {children}
      </body>
    </html>
  );
}
