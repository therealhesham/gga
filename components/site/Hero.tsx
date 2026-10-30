import { preload } from "react-dom";
import { SECTION_IDS } from "@/lib/constants";
import type { SiteData } from "@/lib/data";
import { HeroMedia } from "./HeroMedia";

export function Hero({ settings }: Pick<SiteData, "settings">) {
  preload("/hero/poster.jpg", { as: "image", fetchPriority: "high" });
  return (
    <div className="hero on-ink">
      <div className="hero__media">
        <HeroMedia src="/hero/construction.mp4" poster="/hero/poster.jpg" />
      </div>

      <div className="container hero__body">
        <div className="hero__stack">
          <h1>
            {settings.heroTitleLine1} {settings.heroTitleHighlight} {settings.heroTitleSuffix}
          </h1>
          <p className="hero__lead">{settings.heroSubtitle}</p>
          <div className="hero__actions">
            <a className="btn" href={`#${SECTION_IDS.projects}`}>
              {settings.heroPrimaryCta}
            </a>
            <a className="text-action" href={`#${SECTION_IDS.contact}`}>
              {settings.heroSecondaryCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
