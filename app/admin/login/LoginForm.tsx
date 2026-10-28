"use client";

import { useActionState } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { login, type LoginState } from "./actions";

const input =
  "w-full bg-surface-container-lowest border border-outline-variant px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-label-md font-bold text-on-surface">
          البريد الإلكتروني
        </label>
        <input
          id="email"
          name="email"
          type="email"
          dir="ltr"
          autoComplete="username"
          required
          defaultValue={state.email}
          className={`${input} text-right`}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-label-md font-bold text-on-surface">
          كلمة المرور
        </label>
        <input
          id="password"
          name="password"
          type="password"
          dir="ltr"
          autoComplete="current-password"
          required
          className={`${input} text-right`}
        />
      </div>

      {state.message && (
        <div
          role="alert"
          className="flex items-center gap-2 p-3 bg-error-container border border-error text-on-error-container text-sm font-medium"
        >
          <CircleAlert className="size-4 shrink-0" />
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 bg-primary text-on-primary font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {pending && <LoaderCircle className="size-5 animate-spin" />}
        {pending ? "جارٍ الدخول..." : "تسجيل الدخول"}
      </button>
    </form>
  );
}
