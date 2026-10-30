import { Building2 } from "lucide-react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-margin-mobile py-12">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="size-12 bg-primary text-on-primary flex items-center justify-center">
            <Building2 className="size-6" />
          </div>
          <div>
            <h1 className="text-title-lg font-bold text-on-surface">لوحة التحكم</h1>
            <p className="text-body-sm text-on-surface-variant">سجّل الدخول لإدارة محتوى الموقع</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
