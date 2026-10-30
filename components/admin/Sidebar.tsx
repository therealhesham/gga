"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Inbox, KeyRound, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { SECTIONS } from "@/lib/admin/config";
import { Icon } from "@/lib/icons";
import { logout } from "@/app/admin/login/actions";

type Props = { adminName: string; newInquiries: number };

export function Sidebar({ adminName, newInquiries }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const link = (href: string, active: boolean) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${
      active
        ? "bg-primary text-on-primary"
        : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
    }`;

  const nav = (
    <nav className="flex-1 overflow-y-auto py-4 space-y-1" aria-label="لوحة التحكم">
      <Link href="/admin" onClick={() => setOpen(false)} className={link("/admin", pathname === "/admin")}>
        <LayoutDashboard className="size-4" />
        لوحة المعلومات
      </Link>
      <Link
        href="/admin/inquiries"
        onClick={() => setOpen(false)}
        className={link("/admin/inquiries", pathname.startsWith("/admin/inquiries"))}
      >
        <Inbox className="size-4" />
        <span className="flex-1">الطلبات الواردة</span>
        {newInquiries > 0 && (
          <span className="min-w-5 h-5 px-1.5 rounded-full bg-error text-on-error text-[11px] font-bold flex items-center justify-center">
            {newInquiries}
          </span>
        )}
      </Link>

      <p className="px-4 pt-5 pb-1 text-sm font-bold text-outline">محتوى الموقع</p>
      {SECTIONS.map((s) => {
        const href = `/admin/section/${s.key}`;
        return (
          <Link
            key={s.key}
            href={href}
            onClick={() => setOpen(false)}
            className={link(href, pathname === href)}
          >
            <Icon name={s.icon} className="size-4" />
            {s.title}
          </Link>
        );
      })}

      <p className="px-4 pt-5 pb-1 text-sm font-bold text-outline">الحساب</p>
      <Link
        href="/admin/account"
        onClick={() => setOpen(false)}
        className={link("/admin/account", pathname === "/admin/account")}
      >
        <KeyRound className="size-4" />
        كلمة المرور
      </Link>
    </nav>
  );

  return (
    <>
      {/* شريط علوي للجوال */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant px-4 h-14">
        <span className="font-bold text-on-surface">لوحة التحكم</span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          className="p-2 text-on-surface-variant"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <aside
        className={`${
          open ? "flex" : "hidden"
        } lg:flex fixed lg:sticky top-14 lg:top-0 bottom-0 right-0 z-30 w-72 lg:w-64 lg:h-screen shrink-0 flex-col bg-surface-container-lowest border-l border-outline-variant`}
      >
        <div className="hidden lg:block px-5 py-5 border-b border-outline-variant">
          <p className="font-bold text-on-surface">لوحة التحكم</p>
          <p className="text-xs text-on-surface-variant mt-0.5 truncate">{adminName}</p>
        </div>
        {nav}
        <div className="border-t border-outline-variant p-3 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
          >
            <ExternalLink className="size-4" />
            عرض الموقع
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-error hover:bg-error-container transition-colors"
            >
              <LogOut className="size-4" />
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
