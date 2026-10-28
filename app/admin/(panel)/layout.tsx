import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { Sidebar } from "@/components/admin/Sidebar";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-on-surface-variant gap-2">
          <LoaderCircle className="size-5 animate-spin" />
          جارٍ التحميل...
        </div>
      }
    >
      <Shell>{children}</Shell>
    </Suspense>
  );
}

async function Shell({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const newInquiries = await prisma.inquiry.count({ where: { status: "NEW" } });

  return (
    <div className="lg:flex min-h-screen">
      <Sidebar adminName={admin.name} newInquiries={newInquiries} />
      <div className="flex-1 min-w-0">
        <main className="max-w-5xl mx-auto p-5 md:p-10 space-y-8">{children}</main>
      </div>
    </div>
  );
}
