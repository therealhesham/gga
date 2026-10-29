import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** تدرّج لوني موحّد (دفء معماري) ليبدو كل التصوير بأسلوب واحد */
  grade?: boolean;
};

/**
 * صورة تملأ الحاوية الأب (يجب أن تكون relative).
 * الصور المحلية (/images و/media) تمر بمحسّن next/image (AVIF/WebP + أحجام متجاوبة)،
 * أما الروابط الخارجية التي يدخلها الأدمن فتبقى كما هي لتجنب إعداد قائمة نطاقات لكل مصدر.
 */
export function Img({ src, alt, className = "", sizes = "100vw", priority, grade = true }: Props) {
  if (!src) {
    return <div className="absolute inset-0 bg-surface-container-high" />;
  }
  const local = src.startsWith("/") && !src.startsWith("//");
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized={!local}
        priority={priority}
        className={`${className} ${grade ? "photo-grade" : ""}`}
      />
      {grade && <span aria-hidden="true" className="photo-tint" />}
    </>
  );
}
