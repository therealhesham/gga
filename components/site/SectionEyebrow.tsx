export function SectionEyebrow({
  children,
  className = "mb-3",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="w-2.5 h-0.5 bg-primary" />
      <span className="text-label-sm text-primary font-bold tracking-widest uppercase">
        {children}
      </span>
    </div>
  );
}
