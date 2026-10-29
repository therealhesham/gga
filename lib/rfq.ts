// ثوابت نموذج طلب التسعير الهندسي (RFQ): مشتركة بين الواجهة والخادم

export const RFQ_PROJECT_TYPES = [
  "برج تجاري",
  "قصر أو مجمع سكني",
  "بنية تحتية وصناعية",
  "تشطيبات وإدارة مشاريع",
] as const;

export const RFQ_SCALES = [
  {
    group: "المساحة التقريبية",
    options: ["أقل من 5,000 م²", "5,000 - 20,000 م²", "20,000 - 50,000 م²", "أكثر من 50,000 م²"],
  },
  {
    group: "الميزانية التقديرية",
    options: ["5 - 15 مليون ريال", "15 - 50 مليون ريال", "50 - 100 مليون ريال", "أكثر من 100 مليون ريال"],
  },
] as const;

export const RFQ_FILE = {
  maxBytes: 10 * 1024 * 1024,
  maxFiles: 3,
  exts: ["pdf", "dwg", "dxf", "xls", "xlsx", "doc", "docx", "zip"],
} as const;

export const RFQ_FILE_HINT = "PDF · DWG · DXF · XLS/XLSX (BOQ) · DOC/DOCX · ZIP";
