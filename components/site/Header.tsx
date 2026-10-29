import { Globe, MapPin, Phone, BadgeCheck } from "lucide-react";
import type { SiteSettingsData } from "@/lib/data";
import { HeaderBar } from "./HeaderBar";

export function Header({ settings }: { settings: SiteSettingsData }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-outline-variant/60 shadow-sm">
      <div className="bg-surface-container-high/60 border-b border-outline-variant/40 py-2 px-margin-mobile md:px-margin text-on-surface-variant">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium tracking-wide">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary" />
              <span>{settings.topAddress}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Phone className="size-3.5 text-primary" />
              <span dir="ltr">{settings.phone}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {settings.crBadge && (
              <div className="hidden sm:flex items-center gap-1.5 font-medium">
                <BadgeCheck className="size-3.5 text-primary" />
                <span>{settings.crBadge}</span>
              </div>
            )}
            <button
              type="button"
              className="flex items-center gap-1 hover:text-primary transition-colors text-xs font-semibold"
            >
              <Globe className="size-3.5" />
              <span>English</span>
            </button>
          </div>
        </div>
      </div>
      <HeaderBar
        companyName={settings.companyName}
        companyTagline={settings.companyTagline}
        ctaLabel={settings.navCtaLabel}
      />
    </header>
  );
}
