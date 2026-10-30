"use client";

import { FILTER_EVENT } from "@/lib/service-filter";

/** صف خدمة: يفعّل تصنيف المشاريع المقابل ثم يمرّر لقسم المشاريع */
export function ServiceCard({
  categoryId,
  href,
  className,
  children,
}: {
  categoryId: number | null;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: { categoryId } }))}
    >
      {children}
    </a>
  );
}
