"use client";

import { useActionState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { changePassword } from "@/app/admin/actions";
import type { FormState } from "@/lib/admin/parse";

const input =
  "w-full bg-surface-container-lowest border border-outline-variant px-3 py-2.5 text-sm text-left focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";

export function PasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePassword, {});

  return (
    <form action={action} className="space-y-5 max-w-md">
      {[
        ["current", "كلمة المرور الحالية", "current-password"],
        ["next", "كلمة المرور الجديدة (12 حرفًا على الأقل)", "new-password"],
        ["confirm", "تأكيد كلمة المرور الجديدة", "new-password"],
      ].map(([name, label, autoComplete]) => (
        <div key={name} className="space-y-2">
          <label htmlFor={name} className="block text-sm font-bold text-on-surface">
            {label}
          </label>
          <input
            id={name}
            name={name}
            type="password"
            dir="ltr"
            required
            autoComplete={autoComplete}
            className={input}
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-bold hover:bg-primary-container transition-colors disabled:opacity-70"
      >
        {pending && <LoaderCircle className="size-4 animate-spin" />}
        تغيير كلمة المرور
      </button>

      <div aria-live="polite" className="text-sm font-medium">
        {state.ok && (
          <span className="inline-flex items-center gap-1.5 text-primary">
            <CircleCheck className="size-4" />
            {state.message}
          </span>
        )}
        {!state.ok && state.message && (
          <span className="inline-flex items-center gap-1.5 text-error">
            <CircleAlert className="size-4" />
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
