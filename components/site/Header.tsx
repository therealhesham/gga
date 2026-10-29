import type { SiteSettingsData } from "@/lib/data";
import { HeaderBar } from "./HeaderBar";

export function Header({ settings }: { settings: SiteSettingsData }) {
  return (
    <HeaderBar
      companyName={settings.companyName}
      companyTagline={settings.companyTagline}
      ctaLabel={settings.navCtaLabel}
      topAddress={settings.topAddress}
      phone={settings.phone}
      crBadge={settings.crBadge}
    />
  );
}
