/**
 * رأس القسم: العنوان القصير (التسمية من لوحة التحكم) ثم العبارة الأطول بحجم المقدمة.
 * لو فُرّغت التسمية من لوحة التحكم يصير العنوان نفسه هو الرأس.
 */
export function SectionHead({
  label,
  title,
  split = false,
  children,
}: {
  label: string;
  title: string;
  split?: boolean;
  children?: React.ReactNode;
}) {
  const heading = label.trim() || title;
  const lead = label.trim() ? title : "";
  return (
    <div className={split ? "head head--split" : "head"}>
      <div>
        <h2>{heading}</h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {children}
    </div>
  );
}
