import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";
import { CountUp } from "./CountUp";
import { MetricBar } from "./MetricBar";
import { SectionHead } from "./SectionHead";

type Props = Pick<SiteData, "settings" | "qualityItems" | "metrics" | "certifications">;

export function Quality({ settings, qualityItems, metrics, certifications }: Props) {
  return (
    <section id={SECTION_IDS.quality} className="band section--tall">
      <div className="container">
        <SectionHead label={settings.qualityEyebrow} title={settings.qualityTitle} />

        <div className="grid-12">
          <div className="c-1-6" style={{ display: "grid", gap: "var(--space-xl)", alignContent: "start" }}>
            <p>{settings.qualityText}</p>
            <ul className="rows">
              {qualityItems.map((item) => (
                <li key={item.id} className="row row--plain">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="c-7-12">
            <h3 style={{ fontSize: "var(--text-xl)" }}>{settings.metricsEyebrow}</h3>
            <p className="muted" style={{ marginBlockStart: "var(--space-xs)", marginBlockEnd: "var(--space-xl)" }}>
              {settings.metricsTitle}
            </p>
            <ul className="metrics">
              {metrics.map((m) => (
                <li key={m.id} className="metric">
                  <div className="metric__line">
                    <span>{m.label}</span>
                    <span className="metric__value" dir="ltr">
                      <CountUp text={m.valueText} />
                    </span>
                  </div>
                  <MetricBar percent={m.percent} />
                </li>
              ))}
            </ul>

            {certifications.length > 0 && (
              <ul className="certs">
                {certifications.map((c) => (
                  <li key={c.id}>
                    <strong>{c.code}</strong>
                    <span>{c.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
