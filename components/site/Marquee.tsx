/** شريط أفقي لا نهائي (CSS فقط)؛ يتوقف عند المرور ومع تقليل الحركة */
export function Marquee({
  children,
  reverse = false,
  duration = 50,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
