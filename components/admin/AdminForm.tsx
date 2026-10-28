"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CircleAlert, CircleCheck, LoaderCircle, Save } from "lucide-react";
import type { Field } from "@/lib/admin/config";
import type { FormState } from "@/lib/admin/parse";
import { FeaturesEditor, type FeatureValue } from "./FeaturesEditor";
import { IconPicker } from "./IconPicker";
import { ImageField } from "./ImageField";

type Initial = Record<string, string | number | boolean | FeatureValue[] | null | undefined>;

type Props = {
  fields: Field[];
  initial: Initial;
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  categoryOptions?: { id: number; name: string }[];
  submitLabel?: string;
  cancelHref?: string;
};

const control =
  "w-full bg-surface-container-lowest border px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-1 transition-colors";
const ok = "border-outline-variant focus:border-primary focus:ring-primary";
const bad = "border-error focus:border-error focus:ring-error";

export function AdminForm({
  fields,
  initial,
  action,
  categoryOptions = [],
  submitLabel = "حفظ التغييرات",
  cancelHref,
}: Props) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});

  // الحقول المركّبة تحتاج state محلي لأنها ترسل قيمتها عبر input مخفي
  const [rich, setRich] = useState<Record<string, string | FeatureValue[]>>(() => {
    const init: Record<string, string | FeatureValue[]> = {};
    for (const f of fields) {
      if (f.type === "features") init[f.name] = (initial[f.name] as FeatureValue[]) ?? [];
      else if (f.type === "icon" || f.type === "image") init[f.name] = String(initial[f.name] ?? "");
    }
    return init;
  });
  const setRichValue = (name: string, v: string | FeatureValue[]) =>
    setRich((r) => ({ ...r, [name]: v }));

  const text = (f: Field) => state.values?.[f.name] ?? String(initial[f.name] ?? "");
  const checked = (f: Field) =>
    state.values ? state.values[f.name] === "on" : Boolean(initial[f.name]);

  return (
    <form action={formAction} className="space-y-6">
      {fields.map((f) => {
        const error = state.errors?.[f.name];
        const id = `f-${f.name}`;
        const cls = `${control} ${error ? bad : ok} ${f.ltr ? "text-left" : ""}`;

        if (f.type === "checkbox") {
          return (
            <div key={f.name} className="space-y-1">
              <label className="flex items-center gap-3 cursor-pointer w-fit">
                <input
                  type="checkbox"
                  name={f.name}
                  defaultChecked={checked(f)}
                  className="size-5 accent-primary"
                />
                <span className="text-sm font-bold text-on-surface">{f.label}</span>
              </label>
              {f.help && <p className="text-xs text-on-surface-variant ps-8">{f.help}</p>}
            </div>
          );
        }

        return (
          <div key={f.name} className="space-y-2">
            <label htmlFor={id} className="block text-sm font-bold text-on-surface">
              {f.label}
              {f.required && <span className="text-error"> *</span>}
            </label>

            {f.type === "textarea" ? (
              <textarea
                id={id}
                name={f.name}
                rows={4}
                defaultValue={text(f)}
                placeholder={f.placeholder}
                className={cls}
              />
            ) : f.type === "number" || f.type === "rating" ? (
              <input
                id={id}
                name={f.name}
                type="number"
                dir="ltr"
                min={f.type === "rating" ? 1 : f.min}
                max={f.type === "rating" ? 5 : f.max}
                defaultValue={text(f)}
                className={`${cls} max-w-40`}
              />
            ) : f.type === "category" ? (
              <select id={id} name={f.name} defaultValue={text(f)} className={cls}>
                <option value="">بدون تصنيف</option>
                {categoryOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            ) : f.type === "icon" ? (
              <IconPicker
                name={f.name}
                value={rich[f.name] as string}
                onChange={(v) => setRichValue(f.name, v)}
                allowEmpty={!f.required}
              />
            ) : f.type === "image" ? (
              <ImageField
                name={f.name}
                value={rich[f.name] as string}
                onChange={(v) => setRichValue(f.name, v)}
              />
            ) : f.type === "features" ? (
              <FeaturesEditor
                name={f.name}
                value={rich[f.name] as FeatureValue[]}
                onChange={(v) => setRichValue(f.name, v)}
              />
            ) : (
              <input
                id={id}
                name={f.name}
                type="text"
                dir={f.ltr ? "ltr" : undefined}
                defaultValue={text(f)}
                placeholder={f.placeholder}
                className={cls}
              />
            )}

            {f.help && !error && <p className="text-xs text-on-surface-variant">{f.help}</p>}
            {error && <p className="text-xs text-error font-medium">{error}</p>}
          </div>
        );
      })}

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-outline-variant/60">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-bold hover:bg-primary-container transition-colors disabled:opacity-70"
        >
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
          {pending ? "جارٍ الحفظ..." : submitLabel}
        </button>
        {cancelHref && (
          <Link
            href={cancelHref}
            className="px-5 py-2.5 border border-outline-variant text-on-surface-variant font-bold hover:border-primary hover:text-primary transition-colors"
          >
            إلغاء
          </Link>
        )}
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
      </div>
    </form>
  );
}
