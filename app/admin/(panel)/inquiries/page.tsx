import Link from "next/link";
import { Archive, Download, MailOpen, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteInquiry, setInquiryStatus } from "@/app/admin/actions";
import { formatDate } from "@/lib/format";
import { Card, PageHeader } from "@/components/admin/Ui";
import { DeleteButton } from "@/components/admin/DeleteButton";

const FILTERS = [
  { key: "all", label: "الكل" },
  { key: "NEW", label: "جديدة" },
  { key: "READ", label: "مقروءة" },
  { key: "ARCHIVED", label: "الأرشيف" },
] as const;

// يحوّل سطور "- اسم الملف [rfq:xxxx.pdf]" إلى روابط تنزيل (للأدمن فقط)
function Details({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const m = line.match(/^(.*)\[rfq:([a-z0-9-]+\.[a-z0-9]+)\]\s*$/);
        return (
          <span key={i} className="block">
            {m ? (
              <a
                href={`/api/admin/rfq/${m[2]}`}
                className="text-primary font-semibold hover:underline"
                download
              >
                {m[1].trim() || m[2]}{" "}
                <Download className="inline size-4" aria-hidden="true" />
              </a>
            ) : (
              line || "\u00a0"
            )}
          </span>
        );
      })}
    </>
  );
}

const STATUS_LABEL = { NEW: "جديد", READ: "مقروء", ARCHIVED: "مؤرشف" } as const;

export default async function InquiriesPage({ searchParams }: PageProps<"/admin/inquiries">) {
  const { status } = await searchParams;
  const current = FILTERS.find((f) => f.key === status)?.key ?? "all";

  const inquiries = await prisma.inquiry.findMany({
    where: current === "all" ? {} : { status: current },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const small =
    "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-outline-variant hover:border-primary hover:text-primary transition-colors";

  return (
    <>
      <PageHeader title="الطلبات الواردة" description="طلبات الاستشارة والتسعير المرسلة من نموذج الموقع." />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={f.key === "all" ? "/admin/inquiries" : `/admin/inquiries?status=${f.key}`}
            className={`px-4 py-2 text-sm font-bold border transition-colors ${
              current === f.key
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-primary"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <p className="text-center text-on-surface-variant py-6">لا توجد طلبات.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {inquiries.map((q) => (
            <Card key={q.id}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h2 className="font-bold text-on-surface text-lg">
                    {q.name}
                    <span
                      className={`ms-2 text-[11px] px-2 py-0.5 align-middle ${
                        q.status === "NEW"
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      {STATUS_LABEL[q.status]}
                    </span>
                  </h2>
                  <a
                    href={`tel:${q.phone}`}
                    dir="ltr"
                    className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
                  >
                    <Phone className="size-4" />
                    {q.phone}
                  </a>
                </div>
                <span className="text-xs text-outline">{formatDate(q.createdAt)}</span>
              </div>

              <dl className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <dt className="text-outline text-xs mb-0.5">نوع المشروع</dt>
                  <dd className="font-medium">{q.projectType || "-"}</dd>
                </div>
                <div>
                  <dt className="text-outline text-xs mb-0.5">الموقع</dt>
                  <dd className="font-medium">{q.location || "-"}</dd>
                </div>
                <div>
                  <dt className="text-outline text-xs mb-0.5">الميزانية</dt>
                  <dd className="font-medium">{q.budget || "-"}</dd>
                </div>
              </dl>

              {q.details && (
                <p className="text-sm text-on-surface-variant bg-surface-container-low border border-outline-variant/60 p-4 whitespace-pre-wrap mb-4">
                  <Details text={q.details} />
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2">
                {q.status !== "READ" && (
                  <form action={setInquiryStatus.bind(null, q.id, "READ")}>
                    <button type="submit" className={small}>
                      <MailOpen className="size-4" />
                      تحديد كمقروء
                    </button>
                  </form>
                )}
                {q.status !== "ARCHIVED" && (
                  <form action={setInquiryStatus.bind(null, q.id, "ARCHIVED")}>
                    <button type="submit" className={small}>
                      <Archive className="size-4" />
                      أرشفة
                    </button>
                  </form>
                )}
                {q.status !== "NEW" && (
                  <form action={setInquiryStatus.bind(null, q.id, "NEW")}>
                    <button type="submit" className={small}>
                      إعادة كجديد
                    </button>
                  </form>
                )}
                <DeleteButton
                  action={deleteInquiry.bind(null, q.id)}
                  confirmText="حذف هذا الطلب نهائيًا؟"
                  label="حذف"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
