import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * صورة تملأ الحاوية الأب (يجب أن تكون relative).
 * الصور تأتي من روابط يدخلها الأدمن، لذلك نعطّل محسّن next/image لتجنب
 * إعداد قائمة نطاقات لكل مصدر.
 */
export function Img({ src, alt, className, sizes = "100vw", priority }: Props) {
  if (!src) {
    return <div className="absolute inset-0 bg-surface-container-high" />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized
      priority={priority}
      className={className}
    />
  );
}
