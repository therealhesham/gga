"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SECTION_IDS } from "@/lib/constants";
import { FILTER_EVENT } from "@/lib/service-filter";
import { Img } from "./Img";
import { SectionHead } from "./SectionHead";

type ProjectItem = {
  id: number;
  title: string;
  kind: string;
  location: string;
  badge: string;
  badgePrimary: boolean;
  meta: string;
  imageUrl: string;
  description: string;
  features: { icon: string; text: string }[];
  categoryId: number | null;
};

type Props = {
  eyebrow: string;
  title: string;
  cta: string;
  categories: { id: number; name: string }[];
  projects: ProjectItem[];
  /** محتوى يلي الفهرس داخل القسم نفسه (خريطة الحضور) */
  children?: React.ReactNode;
};

/**
 * فهرس المشاريع: صف لكل مشروع بحقائقه، وصورة كبيرة واحدة تتبع الصف المحدد
 * (بالمرور أو التركيز بلوحة المفاتيح). الصف الأول محدد افتراضيًا فيعمل القسم بدون سكربت.
 */
export function Projects({ eyebrow, title, cta, categories, projects, children }: Props) {
  const [filter, setFilter] = useState<number | "all">("all");
  const [selected, setSelected] = useState<number | null>(null);
  const visible = filter === "all" ? projects : projects.filter((p) => p.categoryId === filter);
  const current = visible.find((p) => p.id === selected) ?? visible[0];

  // فلتر قادم من صفوف الخدمات
  useEffect(() => {
    const onFilter = (e: Event) => {
      const id = (e as CustomEvent<{ categoryId: number | null }>).detail?.categoryId;
      setFilter(id ?? "all");
      setSelected(null);
    };
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  const pick = (value: number | "all") => {
    setFilter(value);
    setSelected(null);
  };

  return (
    <section id={SECTION_IDS.projects} className="band-ink on-ink section--tall">
      <div className="container">
        <SectionHead label={eyebrow} title={title} split>
          {categories.length > 0 && (
            <ul className="tabs" aria-label="تصنيف المشاريع">
              <li>
                <button type="button" className="tab" aria-pressed={filter === "all"} onClick={() => pick("all")}>
                  الكل
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button type="button" className="tab" aria-pressed={filter === c.id} onClick={() => pick(c.id)}>
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </SectionHead>

        {visible.length === 0 ? (
          <p className="index__empty">لا توجد مشاريع في هذا التصنيف حاليًا.</p>
        ) : (
          <div className="grid-12 index">
            <figure className="index__preview c-1-6">
              <div className="index__frame">
                {visible.map((p, i) => (
                  <div key={p.id} data-on={p.id === current?.id}>
                    <Img
                      src={p.imageUrl}
                      alt={p.id === current?.id ? p.title : ""}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
                {current?.badge && (
                  <span className="index__badge" data-primary={current.badgePrimary}>
                    {current.badge}
                  </span>
                )}
              </div>
              {current && (
                <figcaption>
                  <strong>{current.title}</strong>
                  <p>{current.description}</p>
                </figcaption>
              )}
            </figure>

            <div className="c-7-12">
              <ol className="index__list">
                {visible.map((p) => (
                  <li key={p.id} data-on={p.id === current?.id}>
                    <Link
                      href={`/projects/${p.id}`}
                      className="index__row"
                      onMouseEnter={() => setSelected(p.id)}
                      onFocus={() => setSelected(p.id)}
                    >
                      <h3>{p.title}</h3>
                      <span className="index__where">{p.location}</span>
                      <small>{[p.kind, p.meta].filter(Boolean).join("، ")}</small>
                    </Link>
                  </li>
                ))}
              </ol>
              {cta && (
                <p className="index__cta">
                  <a className="text-action" href={`#${SECTION_IDS.contact}`}>
                    {cta}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
