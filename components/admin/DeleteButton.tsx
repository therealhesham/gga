"use client";

import { useTransition } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";

type Props = {
  action: () => Promise<void>;
  confirmText?: string;
  label?: string;
};

export function DeleteButton({ action, confirmText = "هل أنت متأكد من الحذف؟ لا يمكن التراجع.", label = "حذف" }: Props) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmText)) start(() => action());
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-error border border-transparent hover:border-error hover:bg-error-container transition-colors disabled:opacity-60"
    >
      {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
      {label}
    </button>
  );
}
