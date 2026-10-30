import Link from "next/link";
import { connection } from "next/server";
import { Briefcase, HardHat, Inbox, MailOpen, Timer } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/data";
import { SECTIONS } from "@/lib/admin/config";
import { Icon } from "@/lib/icons";
import { Card, PageHeader } from "@/components/admin/Ui";
import { formatDate } from "@/lib/format";

export default async function DashboardPage() {
  await connection();
  const [total, unread, projects, services, latest] = await Promise.all([
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.project.count(),
    prisma.service.count(),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const { comingSoonEnabled } = await getSettings();

  const stats = [
    { label: "طلبات جديدة", value: unread, Icon: MailOpen, href: "/admin/inquiries?status=NEW" },
    { label: "إجمالي الطلبات", value: total, Icon: Inbox, href: "/admin/inquiries" },
    { label: "المشاريع", value: projects, Icon: Briefcase, href: "/admin/section/projects" },
    { label: "الخدمات", value: services, Icon: HardHat, href: "/admin/section/services" },
  ];

  return (
    <>
      <PageHeader title="لوحة المعلومات" description="نظرة سريعة على الموقع والطلبات الواردة." />

      <Link
        href="/admin/section/coming-soon"
        className={`flex items-center gap-4 p-5 border transition-colors ${
          comingSoonEnabled
            ? "bg-primary/10 border-primary hover:bg-primary/15"
            : "bg-surface-container-lowest border-outline-variant hover:border-primary"
        }`}
      >
        <Timer className="size-6 text-primary shrink-0" />
        <div className="flex-1">
          <p className="font-bold text-on-surface">
            {comingSoonEnabled ? "صفحة «قريبًا» مفعّلة حاليًا" : "الموقع منشور للزوار"}
          </p>
          <p className="text-sm text-on-surface-variant">
            {comingSoonEnabled
              ? "الزوار يرون صفحة «قريبًا» بدل الموقع. اضغط للتعديل أو الإيقاف."
              : "اضغط لتفعيل صفحة «قريبًا» وإخفاء الموقع مؤقتًا."}
          </p>
        </div>
      </Link>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, Icon: I, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-surface-container-lowest border border-outline-variant p-5 hover:border-primary active:translate-y-px transition-colors"
          >
            <I className="size-6 text-primary mb-3" />
            <div className="text-3xl font-extrabold text-on-surface">{value}</div>
            <div className="text-sm text-on-surface-variant">{label}</div>
          </Link>
        ))}
      </div>

      <Card
        title="آخر الطلبات"
        action={
          <Link href="/admin/inquiries" className="text-sm font-bold text-primary hover:underline">
            عرض الكل
          </Link>
        }
      >
        {latest.length === 0 ? (
          <p className="text-on-surface-variant text-center py-6">لا توجد طلبات بعد.</p>
        ) : (
          <ul className="divide-y divide-outline-variant/60">
            {latest.map((q) => (
              <li key={q.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-bold text-on-surface truncate">
                    {q.name}
                    {q.status === "NEW" && (
                      <span className="ms-2 text-[11px] bg-primary text-on-primary px-2 py-0.5">جديد</span>
                    )}
                  </p>
                  <p className="text-sm text-on-surface-variant truncate">{q.projectType}</p>
                </div>
                <span className="text-xs text-outline shrink-0">{formatDate(q.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="تعديل محتوى الموقع">
        <div className="grid sm:grid-cols-2 gap-3">
          {SECTIONS.map((s) => (
            <Link
              key={s.key}
              href={`/admin/section/${s.key}`}
              className="flex items-start gap-3 p-4 border border-outline-variant hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <Icon name={s.icon} className="size-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-on-surface">{s.title}</p>
                <p className="text-xs text-on-surface-variant">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </>
  );
}
