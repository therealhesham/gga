import { ACCREDITATIONS } from "@/lib/constants";
import { Icon } from "@/lib/icons";
import { Marquee } from "./Marquee";

function Item({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="flex items-center gap-2.5 text-[13px] font-light text-white/50">
      <Icon name={icon} className="size-4 text-white/40 [stroke-width:1.4]" />
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}

/** شريط اعتمادات أحادي اللون أسفل إحصاءات الهيرو: صف ثابت على الشاشات الكبيرة، وشريط متحرك بطيء على الجوال */
export function Accreditations() {
  return (
    <div className="mt-4" aria-label="الاعتمادات والشراكات">
      <div className="hidden lg:flex items-center justify-between gap-6 px-7 py-2">
        {ACCREDITATIONS.map((a) => (
          <Item key={a.label} {...a} />
        ))}
      </div>
      <div className="lg:hidden">
        <Marquee duration={56}>
          {ACCREDITATIONS.map((a) => (
            <span key={a.label} className="px-6 py-2">
              <Item {...a} />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
