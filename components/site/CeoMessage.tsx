import type { SiteSettingsData } from "@/lib/data";
import { Img } from "./Img";

/**
 * كلمة المدير التنفيذي مع صورته. القسم كله من لوحة التحكم، ولا يظهر
 * إلا بعد إدخال الاسم والكلمة كي لا يُنشر محتوى ناقص.
 */
export function CeoMessage({ settings }: { settings: SiteSettingsData }) {
  const { ceoName, ceoRole, ceoMessage, ceoImage, ceoEyebrow } = settings;
  if (!ceoName.trim() || !ceoMessage.trim()) return null;

  const paragraphs = ceoMessage.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <section
      id="ceo-message"
      aria-label={ceoEyebrow || "كلمة المدير التنفيذي"}
      className="band-3 section"
    >
      <div className="container">
        <div className="grid-12" style={{ alignItems: "center" }}>
          {ceoImage && (
            <div className="statement__photo c-1-5">
              <Img src={ceoImage} alt={ceoName} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          )}
          <figure className={`statement ${ceoImage ? "c-6-12" : "c-all"}`} style={{ margin: 0 }}>
            <blockquote>
              {paragraphs.map((p, i) => (
                <p key={i} style={{ whiteSpace: "pre-line" }}>
                  {p}
                </p>
              ))}
            </blockquote>
            <figcaption>
              <strong>{ceoName}</strong>
              {ceoRole && <span className="muted">{ceoRole}</span>}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
