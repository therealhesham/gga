import type { SiteSettingsData } from "@/lib/data";
import { HeaderBar } from "./HeaderBar";

export function Header({
  settings,
  home = true,
  hasProjects = true,
}: {
  settings: SiteSettingsData;
  home?: boolean;
  hasProjects?: boolean;
}) {
  return (
    <HeaderBar
      companyName={settings.companyName}
      companyTagline={settings.companyTagline}
      ctaLabel={settings.navCtaLabel}
      home={home}
      hasProjects={hasProjects}
    />
  );
}
