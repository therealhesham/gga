"use client";

import { useRef, useState } from "react";
import { ImageUp, LoaderCircle, Trash2 } from "lucide-react";

type Props = { name: string; value: string; onChange: (url: string) => void };

export function ImageField({ name, value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error || "فشل رفع الصورة");
      onChange(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل رفع الصورة");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="size-24 shrink-0 bg-surface-container border border-outline-variant overflow-hidden flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <ImageUp className="size-6 text-outline" />
          )}
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          <input
            type="text"
            name={name}
            dir="ltr"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... أو ارفع صورة"
            className="w-full bg-surface-container-lowest border border-outline-variant px-3 py-2 text-sm text-left focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <div className="flex items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void upload(file);
              }}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-surface-container border border-outline-variant hover:border-primary hover:text-primary transition-colors disabled:opacity-60"
            >
              {uploading ? <LoaderCircle className="size-4 animate-spin" /> : <ImageUp className="size-4" />}
              {uploading ? "جارٍ الرفع..." : "رفع صورة"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-error hover:bg-error-container transition-colors"
              >
                <Trash2 className="size-4" />
                إزالة
              </button>
            )}
          </div>
          {error && <p className="text-xs text-error font-medium">{error}</p>}
        </div>
      </div>
    </div>
  );
}
