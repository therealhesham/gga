"use client";

import { Plus, Trash2 } from "lucide-react";
import { IconPicker } from "./IconPicker";

export type FeatureValue = { icon: string; text: string };

type Props = {
  name: string;
  value: FeatureValue[];
  onChange: (value: FeatureValue[]) => void;
};

export function FeaturesEditor({ name, value, onChange }: Props) {
  const update = (i: number, patch: Partial<FeatureValue>) =>
    onChange(value.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(value)} />

      {value.map((f, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="w-56 shrink-0">
            <IconPicker value={f.icon} onChange={(icon) => update(i, { icon })} allowEmpty />
          </div>
          <input
            type="text"
            value={f.text}
            onChange={(e) => update(i, { text: e.target.value })}
            placeholder="مثال: ٣٢ طابقاً"
            className="flex-1 min-w-0 bg-surface-container-lowest border border-outline-variant px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            aria-label="حذف الميزة"
            className="p-2.5 text-error hover:bg-error-container transition-colors"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}

      {value.length < 12 && (
        <button
          type="button"
          onClick={() => onChange([...value, { icon: "badge-check", text: "" }])}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-primary border border-dashed border-primary/50 hover:bg-primary/5 transition-colors"
        >
          <Plus className="size-4" />
          إضافة ميزة
        </button>
      )}
    </div>
  );
}
