import type { SiteData } from "@/lib/data";
import { Accreditations } from "./Accreditations";
import { CountUp } from "./CountUp";

/** شريط الأرقام (من لوحة التحكم) تحت الهيرو: رقم كبير وتسمية، وتحته الاعتمادات */
export function Figures({ settings, stats }: Pick<SiteData, "settings" | "stats">) {
  if (!stats.length && !settings.heroOverline) return null;
  return (
    <div className="band-raised on-ink" role="group" aria-label={settings.heroOverline || "أرقام المؤسسة"}>
      <div className="container">
        <div className="figures">
          <div className="figures__title">
            <p>{settings.heroOverline}</p>
            {settings.heroOverlineSub && <p className="muted">{settings.heroOverlineSub}</p>}
          </div>
          <dl>
            {stats.map((stat) => (
              <div key={stat.id} className="figures__item">
                <dt className="figures__label">{stat.label}</dt>
                <dd className="figures__value" data-text={!/\d/.test(stat.value)}>
                  <CountUp text={stat.value} />
                  {stat.unit && <span className="figures__unit">{stat.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <Accreditations />
      </div>
    </div>
  );
}
