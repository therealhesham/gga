import { Star } from "lucide-react";
import { Icon } from "@/lib/icons";
import type { SiteData } from "@/lib/data";
import { Reveal } from "./Reveal";

type Props = Pick<SiteData, "settings" | "partners" | "testimonials">;

export function Trust({ settings, partners, testimonials }: Props) {
  if (!partners.length && !testimonials.length) return null;

  return (
    <section id="trust" className="snap-section relative w-full min-h-svh flex items-center bg-ivory py-24 md:py-28">
      <div className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="block text-sm font-medium text-gold mb-4">{settings.partnersEyebrow}</span>
          <h2 className="font-display font-medium text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.4] text-ink">
            {settings.partnersTitle}
          </h2>
        </Reveal>

        {partners.length > 0 && (
          <Reveal delay={100}>
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-y border-ink/10 mb-14">
              {partners.map((p) => (
                <li
                  key={p.id}
                  className="group flex flex-col items-center justify-center gap-3 py-8 px-3 text-center border-ink/10 [&:not(:nth-child(2n))]:border-e md:[&:not(:nth-child(2n))]:border-e-0 md:[&:not(:nth-child(4n))]:border-e lg:[&:not(:nth-child(4n))]:border-e-0 lg:[&:not(:nth-child(6n))]:border-e"
                >
                  <Icon
                    name={p.icon}
                    className="size-8 text-ink/35 transition-colors duration-500 group-hover:text-gold [stroke-width:1.2]"
                  />
                  <span className="text-sm font-medium text-ink/65">{p.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 120}>
                <figure className="flex h-full flex-col justify-between border-t border-ink/15 pt-8">
                  <div>
                    <span aria-hidden="true" className="block font-serif text-7xl leading-[0.7] text-gold/60 mb-4">
                      &ldquo;
                    </span>
                    <blockquote className="text-base md:text-[1.075rem] font-light leading-9 text-ink/80 mb-8">
                      {t.quote}
                    </blockquote>
                  </div>
                  <figcaption className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">{t.name}</h3>
                      <span className="block text-sm font-light text-ink/50 mt-0.5">{t.role}</span>
                    </div>
                    <div
                      className="flex items-center gap-0.5 text-gold shrink-0"
                      role="img"
                      aria-label={`التقييم ${t.rating} من 5`}
                    >
                      {Array.from({ length: Math.min(5, Math.max(0, t.rating)) }).map((_, k) => (
                        <Star key={k} className="size-3.5 fill-current" />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
