import { SECTION_IDS } from "@/lib/constants";
import { categoryForService } from "@/lib/service-filter";
import type { SiteData } from "@/lib/data";
import { SectionHead } from "./SectionHead";
import { ServiceCard } from "./ServiceCard";

export function Services({
  settings,
  services,
  categories,
}: Pick<SiteData, "settings" | "services" | "categories">) {
  return (
    <section id={SECTION_IDS.services} className="band-2 section--tall">
      <div className="container">
        <SectionHead label={settings.servicesEyebrow} title={settings.servicesTitle} split>
          {settings.servicesIntro && <p>{settings.servicesIntro}</p>}
        </SectionHead>

        <ol className="rows">
          {services.map((s) => (
            <li key={s.id}>
              <ServiceCard
                className="row"
                categoryId={categoryForService(s.title, categories)}
                href={`#${SECTION_IDS.projects}`}
              >
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="row__go">استعراض مشاريع الخدمة</span>
              </ServiceCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
