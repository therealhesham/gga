export function SectionEyebrow({
  children,
  index,
  className = "mb-6",
  dark = false,
}: {
  children: React.ReactNode;
  /** رقم القسم (01، 02...) بخط ثابت العرض */
  index?: string;
  className?: string;
  /** للأقسام ذات الخلفية الغامقة */
  dark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {index && (
        <span
          className={`font-mono text-xs font-light tabular-nums tracking-[0.2em] ${dark ? "text-white/45" : "text-ink/45"}`}
        >
          {index}
        </span>
      )}
      <span className={`h-px w-10 ${dark ? "bg-gold-soft/70" : "bg-gold/70"}`} />
      <span className={`text-sm font-medium ${dark ? "text-gold-soft" : "text-gold"}`}>{children}</span>
    </div>
  );
}
