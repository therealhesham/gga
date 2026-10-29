export function SectionEyebrow({
  children,
  className = "mb-5",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** للأقسام ذات الخلفية الغامقة */
  dark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`h-px w-10 ${dark ? "bg-gold-soft" : "bg-gold"}`} />
      <span className={`text-sm font-medium ${dark ? "text-gold-soft" : "text-gold"}`}>
        {children}
      </span>
    </div>
  );
}
