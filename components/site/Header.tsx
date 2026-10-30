import type { SiteSettingsData } from "@/lib/data";
import { HeaderBar } from "./HeaderBar";

export function Header({ settings, home = true }: { settings: SiteSettingsData; home?: boolean }) {
  return (
    <HeaderBar
      companyName={settings.companyName}
      companyTagline={settings.companyTagline}
      ctaLabel={settings.navCtaLabel}
      phone={settings.phone}
      home={home}
    />
  );
}
