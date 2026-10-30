import type { SiteSettingsData } from "@/lib/data";
import { Img } from "./Img";
import { Reveal, RevealImage } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

/**
 * كلمة المدير التنفيذي مع صورته. القسم كله من لوحة التحكم، ولا يظهر
 * إلا بعد إدخال الاسم والكلمة كي لا يُنشر محتوى ناقص.
 */
export function CeoMessage({ settings }: { settings: SiteSettingsData }) {
  const { ceoName, ceoRole, ceoMessage, ceoImage, ceoEyebrow } = settings;
  if (!ceoName.trim() || !ceoMessage.trim()) return null;

  const paragraphs = ceoMessage.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const hasPhoto = !!ceoImage;

  return (
    <section
      id="ceo-message"
      aria-label={ceoEyebrow || "كلمة المدير التنفيذي"}
      className="snap-section relative w-full min-h-svh flex items-center bg-ivory py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin">
        <div
          className={`grid grid-cols-1 gap-14 lg:gap-24 items-center ${
            hasPhoto ? "lg:grid-cols-12" : "max-w-3xl mx-auto"
          }`}
        >
          {hasPhoto && (
            <div className="lg:col-span-5">
              <RevealImage className="aspect-[4/5] w-full bg-ivory-deep">
                <Img src={ceoImage} alt={ceoName} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </RevealImage>
            </div>
          )}

          <div className={hasPhoto ? "lg:col-span-7" : ""}>
            <Reveal>
              <SectionEyebrow>{ceoEyebrow || "كلمة المدير التنفيذي"}</SectionEyebrow>
            </Reveal>

            <Reveal delay={100}>
              <span
                aria-hidden="true"
                className="block font-serif text-[7rem] leading-[0.6] text-gold/45 select-none mb-6"
              >
                &ldquo;
              </span>
              <blockquote className="space-y-6 text-lg md:text-xl lg:text-[1.4rem] font-light leading-[2.1] text-ink/85">
                {paragraphs.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </blockquote>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-12 flex items-center gap-5 border-t border-ink/12 pt-7">
                <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
                <div>
                  <span className="block font-display text-xl font-medium text-ink">{ceoName}</span>
                  {ceoRole && <span className="block mt-1 text-sm font-light text-ink/55">{ceoRole}</span>}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
