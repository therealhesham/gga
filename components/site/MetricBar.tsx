/** شريط نسبة رفيع: يُرسم بالإزاحة (scaleX) لا بالعرض، ويمتلئ مع الظهور في المتصفحات التي تدعم ذلك */
export function MetricBar({ percent }: { percent: number }) {
  const width = Math.min(100, Math.max(0, percent));
  return (
    <div className="metric__bar" role="presentation">
      <span style={{ transform: `scaleX(${width / 100})` }} />
    </div>
  );
}
