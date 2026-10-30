import { Download } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { CONTACT } from "@/lib/contact";
import { hasProfilePdf } from "@/lib/profile";
import type { SiteData } from "@/lib/data";
import { Img } from "./Img";
import { SectionHead } from "./SectionHead";

export function About({ settings, pillars }: Pick<SiteData, "settings" | "pillars">) {
  return (
    <section id={SECTION_IDS.about} className="band section--tall" aria-label={settings.aboutEyebrow || undefined}>
      <div className="container">
        <SectionHead label={settings.aboutEyebrow} title={settings.aboutTitle} />

        <div className="grid-12">
          <div className="about__text c-1-6">
            <p>{settings.aboutP1}</p>
            {settings.aboutP2 && <p>{settings.aboutP2}</p>}
            {hasProfilePdf() && (
              <p>
                <a className="text-action" href={CONTACT.profilePdf} download>
                  <Download size={16} aria-hidden="true" style={{ display: "inline", marginInlineEnd: "var(--space-xs)" }} />
                  تحميل سابقة الأعمال - PDF
                </a>
              </p>
            )}
          </div>

          <figure className="about__figure c-7-12">
            <div className="about__photo">
              <Img
                src={settings.aboutImage}
                alt={settings.aboutPlaqueTitle || settings.companyName}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {settings.aboutPlaqueTitle && (
              <figcaption>
                <strong>{settings.aboutPlaqueTitle}</strong>
                <p>{settings.aboutPlaqueText}</p>
              </figcaption>
            )}
          </figure>
        </div>

        {pillars.length > 0 && (
          <ul className="rows" style={{ marginBlockStart: "var(--space-3xl)" }}>
            {pillars.map((p) => (
              <li key={p.id} className="row row--plain">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
