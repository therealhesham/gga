const AR = "٠١٢٣٤٥٦٧٨٩";

/** يحوّل الأرقام اللاتينية في النص إلى عربية-هندية */
export const toArabicDigits = (v: string | number) => String(v).replace(/\d/g, (d) => AR[+d]);
