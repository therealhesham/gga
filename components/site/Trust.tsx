import { Star } from "lucide-react";
import { Icon } from "@/lib/icons";
import type { SiteData } from "@/lib/data";

type Props = Pick<SiteData, "settings" | "partners" | "testimonials">;

export function Trust({ settings, partners, testimonials }: Props) {
  if (!partners.length && !testimonials.length) return null;

  return (
    <section className="w-full py-20 bg-surface relative">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-label-sm text-primary font-bold tracking-widest uppercase block mb-2">
            {settings.partnersEyebrow}
          </span>
          <h2 className="text-headline-lg text-on-surface font-extrabold tracking-tight">
            {settings.partnersTitle}
          </h2>
        </div>

        {partners.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {partners.map((p) => (
              <div
                key={p.id}
                className="p-6 bg-surface-container-lowest border border-outline-variant flex flex-col items-center justify-center text-center shadow-sm"
              >
                <Icon name={p.icon} className="size-8 text-primary mb-2" />
                <span className="text-xs font-bold text-on-surface">{p.name}</span>
              </div>
            ))}
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="bg-surface-container-lowest border border-outline-variant p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div
                    className="flex items-center text-primary mb-4 gap-1"
                    role="img"
                    aria-label={`التقييم ${t.rating} من 5`}
                  >
                    {Array.from({ length: Math.min(5, Math.max(0, t.rating)) }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-body-md text-on-surface leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption>
                  <h5 className="text-title-lg font-bold text-primary">{t.name}</h5>
                  <span className="text-body-sm text-on-surface-variant block">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
