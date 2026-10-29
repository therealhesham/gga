import { ACCREDITATIONS } from "@/lib/constants";
import { Icon } from "@/lib/icons";
import { Marquee } from "./Marquee";

/** شريط اعتمادات أحادي اللون (ذهبي/أبيض بشفافية منخفضة) أسفل إحصاءات الهيرو */
export function Accreditations() {
  return (
    <div className="mt-3 md:mt-4" aria-label="الاعتمادات والشراكات">
      <Marquee duration={44}>
        {ACCREDITATIONS.map((a) => (
          <span key={a.label} className="flex items-center gap-2.5 px-6 md:px-9 py-2 text-[13px] font-light text-white/50">
            <Icon name={a.icon} className="size-[18px] text-gold-soft/70 [stroke-width:1.4]" />
            <span className="whitespace-nowrap tracking-wide">{a.label}</span>
            <span aria-hidden="true" className="ms-6 md:ms-9 size-1 rounded-full bg-white/20" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
