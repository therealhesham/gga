"use client";

import { useRef, useState } from "react";
import { FileText, X } from "lucide-react";
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
    setError(errors.join("، "));
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
        className="drop"
        data-drag={drag}
      >
        <strong>اسحب الملفات هنا أو اضغط للاختيار</strong>
        <small>
          {RFQ_FILE_HINT}، حتى {RFQ_FILE.maxFiles} ملفات، 10MB لكل ملف
        </small>
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
        <ul className="files">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              <FileText size={16} aria-hidden="true" />
              <span>{f.name}</span>
              <small>{fmt(f.size)}</small>
              <button type="button" aria-label={`إزالة ${f.name}`} onClick={() => sync(files.filter((_, k) => k !== i))}>
                <X size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p role="alert" className="alert alert--err" style={{ marginBlockStart: "var(--space-sm)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
