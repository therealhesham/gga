"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { KSA_CITIES, KSA_PATH, KSA_VIEWBOX, matchCity } from "@/lib/ksa";
import { CountUp } from "./CountUp";
import { Img } from "./Img";

type MapProject = {
  id: number;
  title: string;
  kind: string;
  location: string;
  imageUrl: string;
  meta: string;
};

/** خريطة المملكة بمشاريع المؤسسة؛ المدينة تُستنتج من حقل "الموقع" في كل مشروع */
export function ProjectsMap({ projects }: { projects: MapProject[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, MapProject[]>();
    for (const p of projects) {
      const city = matchCity(p.location);
      if (city) map.set(city, [...(map.get(city) ?? []), p]);
    }
    return [...map.entries()].map(([city, items]) => ({ city, items, pos: KSA_CITIES[city] }));
  }, [projects]);

  const [activeCity, setActiveCity] = useState<string | null>(null);
  if (groups.length === 0) return null;

  const current = groups.find((g) => g.city === activeCity) ?? groups[0];
  const cityWord = groups.length === 1 ? "مدينة" : groups.length === 2 ? "مدينتين" : groups.length <= 10 ? "مدن" : "مدينة";

  return (
    <div id="projects-map" className="map">
      <div>
        <div className="grid-12" style={{ alignItems: "center" }}>
          <div className="c-1-5">
            <h2>حضور وطني</h2>
            <p className="lead" style={{ marginBlockStart: "var(--space-md)" }}>
              مشاريعنا في أنحاء المملكة
            </p>
            <p className="muted" style={{ marginBlockStart: "var(--space-lg)" }}>
              <CountUp text={String(projects.length)} /> مشروعاً في <CountUp text={String(groups.length)} /> {cityWord}.
              اختر مدينة لاستعراض مشاريعها.
            </p>

            <ul className="map__chips">
              {groups.map((g) => (
                <li key={g.city}>
                  <button
                    type="button"
                    className="map__chip"
                    aria-pressed={g.city === current.city}
                    onClick={() => setActiveCity(g.city)}
                  >
                    {g.city}
                    <span>{g.items.length}</span>
                  </button>
                </li>
              ))}
            </ul>

            <ul className="map__list">
              {current.items.slice(0, 3).map((p) => (
                <li key={p.id}>
                  <Link href={`/projects/${p.id}`}>
                    <span className="map__thumb">
                      <Img src={p.imageUrl} alt="" sizes="64px" className="object-cover" />
                    </span>
                    <span>
                      <small>{p.kind}</small>
                      <strong>{p.title}</strong>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="c-6-12">
            <svg
              viewBox={`0 0 ${KSA_VIEWBOX.width} ${KSA_VIEWBOX.height}`}
              className="map__svg"
              role="img"
              aria-label="خريطة المملكة العربية السعودية بمواقع المشاريع"
            >
              <path d={KSA_PATH} className="map__shape-fill" />
              <path d={KSA_PATH} className="map__shape-line" />
              {groups.map((g) => {
                const on = g.city === current.city;
                const [cx, cy] = g.pos;
                return (
                  <g
                    key={g.city}
                    transform={`translate(${cx} ${cy})`}
                    className="map__pin"
                    role="button"
                    tabIndex={0}
                    aria-label={`${g.city}: ${g.items.length} مشروع`}
                    aria-pressed={on}
                    onClick={() => setActiveCity(g.city)}
                    onFocus={() => setActiveCity(g.city)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveCity(g.city);
                      }
                    }}
                  >
                    <circle r="30" fill="transparent" />
                    <circle r={on ? 11 : 7} className="map__dot" />
                    {on && <circle r="19" className="map__ring" />}
                    {g.items.length > 1 && (
                      <text y="4.2" textAnchor="middle" className="map__count">
                        {g.items.length}
                      </text>
                    )}
                    {on && (
                      <text y="-30" textAnchor="middle" className="map__city">
                        {g.city}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
