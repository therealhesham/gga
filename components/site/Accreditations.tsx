import { ACCREDITATIONS } from "@/lib/constants";

/** الاعتمادات والشراكات: نص أحادي اللون في صف ثابت (استبدله بشعارات رسمية موثّقة من العميل عند توفرها) */
export function Accreditations() {
  return (
    <ul className="marks" aria-label="الاعتمادات والشراكات">
      {ACCREDITATIONS.map((a) => (
        <li key={a.label}>{a.label}</li>
      ))}
    </ul>
  );
}
