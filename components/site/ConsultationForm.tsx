"use client";

import { useActionState, useEffect, useRef } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { RFQ_PROJECT_TYPES, RFQ_SCALES } from "@/lib/rfq";
import { FileDrop } from "./FileDrop";

const initial: InquiryState = { status: "idle" };

const field =
  "w-full bg-transparent border-0 border-b border-ink/20 rounded-none px-0 py-3 text-ink placeholder:text-ink/30 font-light focus:outline-none focus:border-gold text-base transition-colors";
const label = "block text-sm font-medium text-ink/60";

export function ConsultationForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const v = state.values ?? {};

  // بعد النجاح نفرّغ الحقول (والملفات تُفرَّغ بإعادة تركيب منطقة الرفع عبر key)
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-8">
      {/* مصيدة للبوتات - مخفية عن المستخدمين */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <fieldset>
        <legend className={label}>نوع المشروع *</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {RFQ_PROJECT_TYPES.map((t, i) => (
            <label
              key={t}
              className="cursor-pointer rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/75 transition-colors hover:border-gold has-checked:border-ink has-checked:bg-ink has-checked:text-ivory has-focus-visible:ring-2 has-focus-visible:ring-gold"
            >
              <input
                type="radio"
                name="projectType"
                value={t}
                required={i === 0}
                defaultChecked={v.projectType === t}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="rfq-scale" className={label}>
            المساحة التقريبية أو الميزانية التقديرية
          </label>
          <select id="rfq-scale" name="budget" defaultValue={v.budget ?? ""} className={field}>
            <option value="">اختر النطاق المتوقع</option>
            {RFQ_SCALES.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="rfq-location" className={label}>
            موقع المشروع المقترح
          </label>
          <input
            id="rfq-location"
            name="location"
            type="text"
            defaultValue={v.location}
            placeholder="المدينة / الحي (مثال: شمال الرياض)"
            className={field}
          />
        </div>
      </div>

      <div className="space-y-2">
        <span className={label}>إرفاق المخططات أو كراسة الشروط (اختياري)</span>
        <FileDrop key={state.status === "success" ? "done" : "form"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="rfq-name" className={label}>
            الاسم الكامل *
          </label>
          <input
            id="rfq-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={v.name}
            placeholder="الاسم الثلاثي"
            className={field}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="rfq-company" className={label}>
            اسم الجهة / الشركة
          </label>
          <input
            id="rfq-company"
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={v.company}
            placeholder="مثال: شركة التطوير العقاري الحديثة"
            className={field}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="rfq-phone" className={label}>
            رقم الجوال *
          </label>
          <input
            id="rfq-phone"
            name="phone"
            type="tel"
            dir="ltr"
            required
            autoComplete="tel"
            defaultValue={v.phone}
            placeholder="05XXXXXXXX"
            className={`${field} text-right`}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="rfq-email" className={label}>
            البريد الإلكتروني
          </label>
          <input
            id="rfq-email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            defaultValue={v.email}
            placeholder="name@company.com"
            className={`${field} text-right`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="rfq-details" className={label}>
          ملاحظات وموجز المتطلبات الهندسية
        </label>
        <textarea
          id="rfq-details"
          name="details"
          rows={3}
          defaultValue={v.details}
          placeholder="مساحة الأرض، عدد الأدوار، حالة التراخيص والمخططات إن وجدت..."
          className={field}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full py-4 bg-ink text-ivory text-sm font-semibold hover:bg-gold hover:text-white transition-colors duration-500 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span>{pending ? "جارٍ الإرسال..." : "إرسال طلب التسعير للاستشاري الهندسي"}</span>
        {pending ? (
          <LoaderCircle className="size-5 animate-spin" />
        ) : (
          <Send className="size-5 rtl:-scale-x-100" />
        )}
      </button>

      <div aria-live="polite">
        {state.status === "success" && (
          <div className="flex items-center justify-center gap-2 p-4 border border-gold text-gold text-center font-semibold text-sm">
            <CircleCheck className="size-5 shrink-0" />
            تم استلام طلبكم بنجاح. سيتواصل معكم أحد مهندسينا التنفيذيين خلال 24 ساعة.
          </div>
        )}
        {state.status === "error" && (
          <div className="flex items-center justify-center gap-2 p-4 bg-error-container border border-error text-on-error-container text-center font-bold text-sm">
            <CircleAlert className="size-5 shrink-0" />
            {state.message}
          </div>
        )}
      </div>
    </form>
  );
}
