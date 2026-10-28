import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageHeader({
  title,
  description,
  backHref,
}: {
  title: string;
  description?: string;
  backHref?: string;
}) {
  return (
    <header className="space-y-2">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowRight className="size-4" />
          رجوع
        </Link>
      )}
      <h1 className="text-headline-md font-extrabold text-on-surface">{title}</h1>
      {description && <p className="text-on-surface-variant">{description}</p>}
    </header>
  );
}

export function Card({
  title,
  action,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-surface-container-lowest border border-outline-variant shadow-sm">
      {(title || action) && (
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-outline-variant/60">
          <h2 className="font-bold text-on-surface">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </section>
  );
}
