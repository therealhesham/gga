"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";

type IntroState = { ready: boolean; setReady: (v: boolean) => void };

const IntroContext = createContext<IntroState>({ ready: true, setReady: () => {} });

/** هل انتهت الافتتاحية؟ (تبدأ الحركات الرئيسية بعدها) */
export const useIntroReady = () => useContext(IntroContext).ready;
export const useIntroControls = () => useContext(IntroContext);

/**
 * يحترم تفضيل "تقليل الحركة" في كل حركات الموقع، ويشارك حالة الافتتاحية
 * (intro=false للصفحات التي لا تحتوي افتتاحية فتبدأ حركاتها فورًا).
 */
export function MotionRoot({
  children,
  intro = true,
}: {
  children: React.ReactNode;
  intro?: boolean;
}) {
  const [ready, setReady] = useState(!intro);
  const value = useMemo(() => ({ ready, setReady }), [ready]);

  return (
    <IntroContext value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </IntroContext>
  );
}
