import { CustomCursor } from "./CustomCursor";
import { Grain } from "./Grain";
import { WhatsAppButton } from "./WhatsAppButton";

/** عناصر عامة فوق كل صفحات الموقع: حبيبات، مؤشر مخصص، زر واتساب */
export function Chrome() {
  return (
    <>
      <Grain />
      <CustomCursor />
      <WhatsAppButton />
    </>
  );
}
