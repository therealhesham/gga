"use client";

import { useActionState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { BUDGET_OPTIONS, PROJECT_TYPES } from "@/lib/constants";

const initial: InquiryState = { status: "idle" };

const field =
  "w-full bg-transparent border-0 border-b border-ink/20 rounded-none px-0 py-3 text-ink placeholder:text-ink/30 font-light focus:outline-none focus:border-gold text-base transition-colors";
const label = "block text-sm font-medium text-ink/60";

export function ConsultationForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const v = state.values ?? {};

  return (
    <form action={action} className="space-y-8">
      {/* مصيدة للبوتات - مخفية عن المستخدمين */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="rfq-name" className={label}>
            الاسم الكامل / اسم الجهة *
          </label>
          <input
            id="rfq-name"
            name="name"
            type="text"
            required
            defaultValue={v.name}
            placeholder="مثال: شركة التطوير العقاري الحديثة"
            className={field}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="rfq-phone" className={label}>
            رقم الجوال للتواصل *
          </label>
          <input
            id="rfq-phone"
            name="phone"
            type="tel"
            dir="ltr"
            required
            defaultValue={v.phone}
            placeholder="0500000000"
            className={`${field} text-right`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="rfq-type" className={label}>
            نوع المشروع *
          </label>
          <select
            id="rfq-type"
            name="projectType"
            defaultValue={v.projectType || PROJECT_TYPES[0]}
            className={field}
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
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

      <fieldset className="space-y-2">
        <legend className={label}>الميزانية التقديرية المتوقعة للمشروع</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs mt-3">
          {BUDGET_OPTIONS.map((b) => (
            <label
              key={b.value}
              className="cursor-pointer rounded-2xl border border-ink/15 hover:border-gold has-checked:border-gold has-checked:bg-gold/10 py-3.5 px-2 flex flex-col items-center transition-colors"
            >
              <input
                type="radio"
                name="budget"
                value={b.value}
                defaultChecked={v.budget === b.value}
                className="sr-only"
              />
              <span className="text-ink font-semibold">{b.value}</span>
              <span className="text-ink/45 text-[11px] font-light">{b.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="rfq-details" className={label}>
          تفاصيل وموجز المتطلبات الهندسية
        </label>
        <textarea
          id="rfq-details"
          name="details"
          rows={3}
          defaultValue={v.details}
          placeholder="يرجى ذكر مساحة الأرض، عدد الأدوار، حالة التراخيص والمخططات إن وجدت..."
          className={field}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full py-4 bg-ink text-ivory text-sm font-semibold hover:bg-gold hover:text-white transition-colors duration-500 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span>{pending ? "جارٍ الإرسال..." : "إرسال الطلب للاستشاري الهندسي"}</span>
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
            تم استلام طلبكم بنجاح. سيتواصل معكم أحد مهندسينا التنفيذيين خلال ٢٤ ساعة.
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
