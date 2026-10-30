import { Star } from "lucide-react";
import type { SiteData } from "@/lib/data";
import { SectionHead } from "./SectionHead";

type Props = Pick<SiteData, "settings" | "partners" | "testimonials">;

export function Trust({ settings, partners, testimonials }: Props) {
  if (!partners.length && !testimonials.length) return null;

  return (
    <section id="trust" className="band-3 section--tall">
      <div className="container">
        <SectionHead label={settings.partnersEyebrow} title={settings.partnersTitle} />

        {partners.length > 0 && (
          <ul className="partners">
            {partners.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        )}

        {testimonials.length > 0 && (
          <ul className="quotes">
            {testimonials.map((t) => (
              <li key={t.id}>
                <figure className="quote">
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <span>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </span>
                    <span className="stars" role="img" aria-label={`التقييم ${t.rating} من 5`}>
                      {Array.from({ length: Math.min(5, Math.max(0, t.rating)) }).map((_, k) => (
                        <Star key={k} size={14} fill="currentColor" aria-hidden="true" />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
