"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ICON_OPTIONS, Icon } from "@/lib/icons";

type Props = {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  allowEmpty?: boolean;
};

export function IconPicker({ name, value, onChange, allowEmpty }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-3 w-full bg-surface-container-lowest border border-outline-variant px-4 py-2.5 text-start hover:border-primary transition-colors"
      >
        <span className="size-9 flex items-center justify-center bg-surface-container border border-outline-variant text-primary">
          {value ? <Icon name={value} className="size-5" /> : <X className="size-4 text-outline" />}
        </span>
        <span className="text-sm text-on-surface-variant">
          {value ? ICON_OPTIONS.find((o) => o.value === value)?.label ?? value : "بدون أيقونة - اضغط للاختيار"}
        </span>
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full min-w-[300px] max-h-72 overflow-y-auto bg-surface-container-lowest border border-outline-variant p-3">
          {allowEmpty && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="w-full mb-2 text-xs text-error hover:underline text-start"
            >
              إزالة الأيقونة
            </button>
          )}
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
            {ICON_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                title={o.label}
                aria-label={o.label}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`size-10 flex items-center justify-center border transition-colors ${
                  value === o.value
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface-container-low border-outline-variant/60 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                <Icon name={o.value} className="size-5" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
