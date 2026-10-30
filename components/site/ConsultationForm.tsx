"use client";

import { useActionState, useEffect, useRef } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { RFQ_PROJECT_TYPES, RFQ_SCALES } from "@/lib/rfq";
import { FileDrop } from "./FileDrop";

const initial: InquiryState = { status: "idle" };

const field = "input";

export function ConsultationForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const v = state.values ?? {};

  // بعد النجاح نفرّغ الحقول (والملفات تُفرَّغ بإعادة تركيب منطقة الرفع عبر key)
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="form">
      {/* مصيدة للبوتات - مخفية عن المستخدمين */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        hidden
      />

      <fieldset>
        <legend>نوع المشروع *</legend>
        <div className="choices">
          {RFQ_PROJECT_TYPES.map((t, i) => (
            <label
              key={t}
              className="choice"
            >
              <input
                type="radio"
                name="projectType"
                value={t}
                required={i === 0}
                defaultChecked={v.projectType === t}
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form__grid">
        <div className="field">
          <label htmlFor="rfq-scale">
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
        <div className="field">
          <label htmlFor="rfq-location">
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

      <div className="field">
        <span >إرفاق المخططات أو كراسة الشروط (اختياري)</span>
        <FileDrop key={state.status === "success" ? "done" : "form"} />
      </div>

      <div className="form__grid">
        <div className="field">
          <label htmlFor="rfq-name">
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
        <div className="field">
          <label htmlFor="rfq-company">
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
        <div className="field">
          <label htmlFor="rfq-phone">
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
            className={field}
          />
        </div>
        <div className="field">
          <label htmlFor="rfq-email">
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
            className={field}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="rfq-details">
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

      <button type="submit" disabled={pending} aria-busy={pending} className="btn btn--block">
        <span>{pending ? "جارٍ الإرسال..." : "إرسال طلب التسعير للاستشاري الهندسي"}</span>
        {pending && <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />}
      </button>

      <div aria-live="polite" className="form__live">
        {state.status === "success" && (
          <div className="alert alert--ok">
            <CircleCheck size={20} aria-hidden="true" />
            تم استلام طلبكم بنجاح. سيتواصل معكم أحد مهندسينا التنفيذيين خلال 24 ساعة.
          </div>
        )}
        {state.status === "error" && (
          <div className="alert alert--err">
            <CircleAlert size={20} aria-hidden="true" />
            {state.message}
          </div>
        )}
      </div>
    </form>
  );
}
