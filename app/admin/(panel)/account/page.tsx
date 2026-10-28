import { Card, PageHeader } from "@/components/admin/Ui";
import { PasswordForm } from "./PasswordForm";

export default function AccountPage() {
  return (
    <>
      <PageHeader title="كلمة المرور" description="غيّر كلمة مرور حساب الأدمن الحالي." />
      <Card>
        <PasswordForm />
      </Card>
    </>
  );
}
