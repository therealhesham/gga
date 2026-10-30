"use client";

import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { RFQ_FILE, RFQ_FILE_HINT } from "@/lib/rfq";

const fmt = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** منطقة سحب وإفلات لمخططات/كراسة الشروط (اختيارية). التحقق النهائي يتم على الخادم. */
export function FileDrop({ name = "files" }: { name?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");

  const sync = (next: File[]) => {
    const dt = new DataTransfer();
    next.forEach((f) => dt.items.add(f));
    if (input.current) input.current.files = dt.files;
    setFiles(next);
  };

  const add = (incoming: File[]) => {
    const errors: string[] = [];
    const merged = [...files];
    for (const f of incoming) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!(RFQ_FILE.exts as readonly string[]).includes(ext)) {
        errors.push(`${f.name}: صيغة غير مدعومة`);
      } else if (f.size > RFQ_FILE.maxBytes) {
        errors.push(`${f.name}: يتجاوز 10 ميجابايت`);
      } else if (merged.length >= RFQ_FILE.maxFiles) {
        errors.push(`الحد الأقصى ${RFQ_FILE.maxFiles} ملفات`);
        break;
      } else if (!merged.some((m) => m.name === f.name && m.size === f.size)) {
        merged.push(f);
      }
    }
    sync(merged);
    setError(errors.join(" · "));
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="إرفاق المخططات أو كراسة الشروط"
        onClick={() => input.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            input.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          add(Array.from(e.dataTransfer.files));
        }}
        className={`flex cursor-pointer flex-col items-center gap-2 border border-dashed px-6 py-8 text-center transition-colors duration-300 ${
          drag ? "border-gold bg-gold/10" : "border-ink/25 hover:border-gold hover:bg-gold/5"
        }`}
      >
        <span className="grid size-11 place-items-center rounded-full border border-gold/40 text-gold">
          <Upload className="size-5 [stroke-width:1.5]" />
        </span>
        <span className="text-sm font-medium text-ink">اسحب الملفات هنا أو اضغط للاختيار</span>
        <span className="text-xs font-light text-ink/50">
          {RFQ_FILE_HINT} · حتى {RFQ_FILE.maxFiles} ملفات، 10MB لكل ملف
        </span>
      </div>

      <input
        ref={input}
        type="file"
        name={name}
        multiple
        accept={RFQ_FILE.exts.map((e) => `.${e}`).join(",")}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          add(Array.from(e.target.files ?? []));
        }}
      />

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-3 rounded-full border border-ink/10 bg-ivory px-4 py-2 text-sm"
            >
              <FileText className="size-4 shrink-0 text-gold" />
              <span className="min-w-0 flex-1 truncate font-medium text-ink">{f.name}</span>
              <span className="shrink-0 text-xs font-light text-ink/45 tabular-nums">{fmt(f.size)}</span>
              <button
                type="button"
                aria-label={`إزالة ${f.name}`}
                onClick={() => sync(files.filter((_, k) => k !== i))}
                className="grid size-6 place-items-center rounded-full text-ink/50 transition-colors hover:bg-ink hover:text-ivory"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p role="alert" className="mt-3 text-xs font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
