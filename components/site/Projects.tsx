"use client";

import { useState } from "react";
import { FolderOpen } from "lucide-react";
import { Icon } from "@/lib/icons";
import { SECTION_IDS } from "@/lib/constants";
import { Img } from "./Img";
import { SectionEyebrow } from "./SectionEyebrow";

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
};

// نمط توزيع البطاقات في الشبكة (12 عمود): كبير، متوسط، ثم بطاقتان متساويتان
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-6", "lg:col-span-6"];
const isLarge = (index: number) => index % 4 < 2;

export function Projects({ eyebrow, title, cta, categories, projects }: Props) {
  const [active, setActive] = useState<number | "all">("all");
  const visible =
    active === "all" ? projects : projects.filter((p) => p.categoryId === active);

  const tab = (isActive: boolean) =>
    isActive
      ? "px-5 py-2 text-xs font-bold bg-primary text-on-primary shadow-sm"
      : "px-5 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors";

  return (
    <section
      id={SECTION_IDS.projects}
      className="w-full py-24 bg-surface relative"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2 className="text-headline-lg md:text-[44px] text-on-surface font-extrabold tracking-tight">
              {title}
            </h2>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-surface-container-low border border-outline-variant">
              <button type="button" className={tab(active === "all")} onClick={() => setActive("all")}>
                الكل
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={tab(active === c.id)}
                  onClick={() => setActive(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-on-surface-variant py-16 border border-dashed border-outline-variant">
            لا توجد مشاريع في هذا التصنيف حاليًا.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {visible.map((p, i) => {
              const large = isLarge(i);
              return (
                <article
                  key={p.id}
                  className={`${SPANS[i % 4]} bg-surface-container-lowest border border-outline-variant group overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between`}
                >
                  <div
                    className={`relative w-full overflow-hidden ${
                      large ? "h-[360px] md:h-[420px]" : "h-[300px]"
                    }`}
                  >
                    <Img
                      src={p.imageUrl}
                      alt={p.title}
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {p.location && (
                        <span className="px-3 py-1 bg-surface-container-lowest/95 backdrop-blur-sm text-on-surface text-xs font-bold font-mono border border-outline-variant">
                          {p.location}
                        </span>
                      )}
                      {p.badge && (
                        <span
                          className={`px-3 py-1 text-xs font-mono ${
                            p.badgePrimary
                              ? "bg-primary text-on-primary font-bold"
                              : "bg-surface-container-high text-on-surface font-medium"
                          }`}
                        >
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-3 gap-3">
                      <span className="text-label-sm text-primary font-bold tracking-wider">
                        {p.kind}
                      </span>
                      {p.meta && (
                        <span className="font-mono text-xs text-on-surface-variant font-medium">
                          {p.meta}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`font-bold text-on-surface mb-3 group-hover:text-primary transition-colors ${
                        large ? "text-headline-sm" : "text-title-lg"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`text-body-sm text-on-surface-variant leading-relaxed ${
                        p.features.length ? "mb-6" : ""
                      }`}
                    >
                      {p.description}
                    </p>
                    {p.features.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 border-t border-outline-variant/40 font-mono text-xs text-secondary font-medium">
                        {p.features.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <Icon name={f.icon} className="size-4 text-primary" />
                            <span>{f.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {cta && (
          <div className="mt-12 text-center">
            <a
              href={`#${SECTION_IDS.contact}`}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 text-label-md font-bold tracking-wider shadow-sm border border-outline-variant"
            >
              <span>{cta}</span>
              <FolderOpen className="size-5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
