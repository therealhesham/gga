import "dotenv/config";
import { CONTACT } from "../lib/contact";
import bcrypt from "bcryptjs";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const url = new URL(process.env.DATABASE_URL ?? "");
const prisma = new PrismaClient({
  adapter: new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    connectionLimit: 5,
  }),
});

const IMG = "https://lh3.googleusercontent.com/aida-public/";

async function seedIfEmpty<T>(
  count: () => Promise<number>,
  insert: () => Promise<T>,
  label: string,
) {
  if ((await count()) > 0) {
    console.log(`- ${label}: موجود، تم التخطي`);
    return;
  }
  await insert();
  console.log(`+ ${label}: تمت الإضافة`);
}

async function main() {
  // ---------- إعدادات الموقع ----------
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: "غسان غازي الميمني",
      companyTagline: "للمقاولات العامة | GGA Contracting",
      logoUrl:
        "https://lh3.googleusercontent.com/aida/AEtjO1XLnMNP3UxJ2OBedUm-fnummSn6BPq9bGjB-rfB2qfUZMZcKfUVhZQSxvJqelo0iCRFj-7EdjACq9J1lfOREVoXuwQLYzIpwWTp_nZbXGSVvKCsKRIhQ8IcoBZuKM1HrfgLnqC0C5HU6WN8TE7s1H7YByRvYx9-59euUUOaA51RG4-mWv2KHcezFeh2i9Kb-gBmfzQlX21u39nbr5RlUSCcePr5Ec24pCxjCD-majjKkQ60HcCfB40m_Q",
      topAddress: "المملكة العربية السعودية، الرياض - طريق الملك فهد",
      phone: CONTACT.defaultPhone,
      email: "info@gga-contracting.sa",
      tendersEmail: "tenders@gga-contracting.sa",
      address: "الرياض، طريق الملك فهد، برج الأعمال، الدور 18",
      workingHours: "الأحد - الخميس: 8:00 ص - 5:00 م",
      crBadge: "سجل تجاري معتمد",
      navCtaLabel: "طلب استشارة أو تسعير",

      heroOverline: "مؤسسة غسان غازي الميمني للمقاولات العامة (GGA)",
      heroOverlineSub: "الريادة الإنشائية بالمملكة",
      heroTitleLine1: "نبني بإتقان،",
      heroTitleHighlight: "لنصنع معالم تدوم",
      heroTitleSuffix: "أجيالاً.",
      heroSubtitle:
        "صرح وطني يقدم حلول المقاولات العامة المتكاملة، إنشاء الأبراج والمجمعات التجارية، والقصور السكنية الفاخرة، ومشاريع البنية التحتية العملاقة وفق أرقى المقاييس الهندسية العالمية، تماشياً مع طموحات رؤية المملكة 2030.",
      heroImage: `${IMG}AB6AXuD_XFs7J-oBSOvIHZQ2QcmON2Eho2zSPdrKwBdnZVD8SQwSD8e6WaWw1dM2i4-FVba875rV9zdVTeLYyPVpUpTtfGE-X8n5Ds86u8Um_jXEQF8WqQliHApETZTNsxQzwrPR91U-uEHKNB113Kk2MMjIs-m05r9upAWWfzpO7EsnP6V49xXzhmWY-m3DWugAUEij3sGVmhDSpxDEG2ExwhyOAlFnVch3bOzWlVYqYw`,
      heroPrimaryCta: "استكشف مشاريعنا الكبرى",
      heroSecondaryCta: "طلب دراسة واستشارة هندسية",

      aboutEyebrow: "عن المؤسسة ورؤيتنا التنموية",
      aboutTitle: "نصنع الفارق من الأساس الخرساني إلى أرقى التفاصيل المعمارية",
      aboutP1:
        "انطلقت مؤسسة غسان غازي الميمني للمقاولات العامة برؤية راسخة تهدف إلى تجسيد مفاهيم البناء الفاخر والمتين في أبهى صوره. على مدار أكثر من عقدين ونيف، استطعنا قيادة وتشييد نخبة من أضخم المشاريع الإنشائية، الإدارية، والتجارية، محققين معادلة التوازن المثالية بين الجودة الهندسية العالية، والكفاءة الزمنية، والتكلفة المدروسة.",
      aboutP2:
        "نعتز بكوننا شركاء فاعلين في مسيرة الازدهار الوطني تحت مظلة رؤية السعودية 2030، حيث نوظف نخبة من الاستشاريين، المهندسين المعماريين، وفرق الإشراف التنفيذي المتخصصة لضمان تنفيذ كل متر مربع بأعلى المعايير المتبعة دولياً.",
      aboutImage: `${IMG}AB6AXuBD_PyA6Qs58-Lra14EwhBbDsPXX0rskjvvxM3M1K7hFfwmN4B8U3Bro3SMXvgRj9XN09tv97zKn7BS2nl610KEDtQZqqrpqJLycUXXjwIAcDTBVv_A9c4ZhMbgM_vy0e-UQKHWgunkaI9gU-jxsIt9CBrhHU2jqv6ONAlHDlVxx5txGBrmoB-u2eYkVzAyoqPMeUGFGAbANc0NIs_QrVEDVNx9wT4KJEYYYSKGfA`,
      aboutPlaqueTitle: "رؤية وإرادة هندسية",
      aboutPlaqueText:
        "تطويع أدق المعايير المعمارية وأحدث التقنيات لنكون حجر الأساس في تنمية المشهد الحضري للمملكة.",

      // كلمة المدير التنفيذي: تُدخل من لوحة التحكم (لا يظهر القسم قبل ذلك)
      ceoMessage: "",

      servicesEyebrow: "محفظة الخدمات التخصصية",
      servicesTitle: "مجالات مقاولات متكاملة تغطي دورة البناء بالكامل",
      servicesIntro:
        "نقدم حلولاً تسليم مفتاح (Turnkey EPC) تبدأ من حفر الموقع والأساسات وحتى تسليم الأسطح وأحدث الأنظمة الذكية.",

      projectsEyebrow: "سجل الإنجازات الوطنية",
      projectsTitle: "أبرز مشاريعنا المعمارية والاستثمارية",
      projectsCta: "مشاهدة سجل المحفظة والمشاريع المكتملة",

      qualityEyebrow: "الامتثال والمعايير الفنية",
      qualityTitle: "لا مساومة على الجودة: فحوصات مخبرية دقيقة ورقابة صارمة",
      qualityText:
        "نخضع كافة مراحل التشييد في مؤسسة غسان غازي الميمني لبروتوكولات فحص معتمدة تشمل اختبارات هبوط الخرسانة (Slump Test)، ومقاومة الضغط، ومطابقة حديد التسليح للمواصفات السعودية (SASO).",
      metricsEyebrow: "مؤشرات الأداء المؤسسي",
      metricsTitle: "معدلات الأمان والاعتمادية السنوية",

      partnersEyebrow: "شراكات رسخت مكانتنا",
      partnersTitle: "ثقة قادة التطوير العقاري والصناديق الاستثمارية",

      consultEyebrow: "ابدأ مشروعك القادم معنا",
      consultTitle: "طلب دراسة مشروع واستشارة تسعير فورية",
      consultText:
        "يقوم فريقنا الهندسي بدراسة المخططات الأولية وجداول الكميات وتقديم استشارة فنية متكاملة مع تقدير مالي دقيق خلال 48 ساعة عمل.",
      ndaNote:
        "نلتزم بالحفاظ على سرية المخططات والبيانات الهندسية وفق اتفاقية السرية المهنية (NDA).",

      footerAbout:
        "صرح إنشائي رائد يقدم حلول البنية التحتية والمقاولات العامة والإنشاءات التخصصية في المملكة العربية السعودية برؤية معمارية رفيعة وأعلى مقاييس الجودة العالمية.",
      footerBadge: "مصنف ومعتمد لدى الهيئة السعودية للمقاولين",
      footerIso: "ISO 9001:2015",
      footerCopyright:
        "© 2025 مؤسسة غسان غازي الميمني للمقاولات العامة (GGA). جميع الحقوق محفوظة.",

      comingSoonEnabled: false,
      comingSoonTitle: "نبني شيئًا استثنائيًا",
      comingSoonText:
        "نعمل حاليًا على إطلاق موقعنا الجديد ليعكس مسيرتنا في المقاولات العامة والإنشاءات التخصصية. ترقبوا الإطلاق قريبًا.",
      comingSoonLaunch: "الإطلاق قريبًا",
    },
  });
  console.log("+ إعدادات الموقع");

  // ---------- مؤشرات الـ Hero ----------
  await seedIfEmpty(
    () => prisma.stat.count(),
    () =>
      prisma.stat.createMany({
        data: [
          { value: "+25", unit: "عاماً", label: "الخبرة والريادة في قطاع التشييد السعودي", sortOrder: 1 },
          { value: "+180", unit: "مشروعاً", label: "صرح معماري ومجمع تجاري وسكني منجز بنجاح", sortOrder: 2 },
          { value: "99.4%", unit: "دقة", label: "الالتزام التام بالجداول الزمنية والمواصفات الفنية", sortOrder: 3 },
          { value: "تصنيف درجة أولى", icon: "badge-check", label: "معتمد من الهيئة السعودية للمقاولين ومطابق لـ ISO", sortOrder: 4 },
        ],
      }),
    "المؤشرات",
  );

  await seedIfEmpty(
    () => prisma.pillar.count(),
    () =>
      prisma.pillar.createMany({
        data: [
          { icon: "cog", title: "الإتقان الهندسي الصارم", description: "اختبارات معملية دقيقة للمواد وفحص متكامل للأحمال الإنشائية.", sortOrder: 1 },
          { icon: "clock", title: "الالتزام الصارم بالمواعيد", description: "إدارة المشاريع عبر أحدث برمجيات الـ BIM ومخططات جانت الزمنية.", sortOrder: 2 },
          { icon: "heart-handshake", title: "الأمان والسلامة (HSE)", description: "سجل أمان ناصع خالٍ من الحوادث بفضل الرقابة الميدانية المستمرة.", sortOrder: 3 },
          { icon: "shield-check", title: "الشفافية والحوكمة التعاقدية", description: "تقارير دورية مدعمة بالصور والبيان المالي لراحة المستثمرين والعملاء.", sortOrder: 4 },
        ],
      }),
    "ركائز المؤسسة",
  );

  await seedIfEmpty(
    () => prisma.service.count(),
    () =>
      prisma.service.createMany({
        data: [
          { icon: "building-2", code: "01 / COMMERCIAL", title: "الإنشاءات التجارية والإدارية", description: "تشييد الأبراج العالية، المجمعات المكتبية، المولات ومراكز التسوق الفاخرة باستخدام أحدث هياكل الحديد والخرسانة المسلحة مسبقة الصنع.", sortOrder: 1 },
          { icon: "house", code: "02 / RESIDENTIAL", title: "القصور والمجمعات السكنية", description: "بناء وتطوير الفلل والقصور الرئاسية الخاصة والمجمعات المغلقة (Compounds) بأدق التشطيبات الفندقية وأنظمة العزل الحراري والبيئي المتقدمة.", sortOrder: 2 },
          { icon: "route", code: "03 / INFRASTRUCTURE", title: "البنية التحتية والأعمال المدنية", description: "تنفيذ شبكات المياه، الصرف، الكهرباء، الحفريات العميقة، تدعيم جوانب الحفر، وتسوية المخططات العمرانية الضخمة عبر أسطول معدات حديث.", sortOrder: 3 },
          { icon: "pencil-ruler", code: "04 / FIT-OUT & INTERIOR", title: "التشطيبات المعمارية والديكور", description: "تنفيذ أعمال الرخام المستورد، الواجهات الزجاجية الذكية، الأسقف الصوتية، وأنظمة الإضاءة المعمارية المتطورة للردهات والمقرات التنفيذية.", sortOrder: 4 },
        ],
      }),
    "الخدمات",
  );

  // ---------- المشاريع ----------
  if ((await prisma.projectCategory.count()) === 0) {
    const names = ["مشاريع تجارية", "مجمعات سكنية", "مراكز طبية", "بنية تحتية"];
    for (const [i, name] of names.entries()) {
      await prisma.projectCategory.create({ data: { name, sortOrder: i + 1 } });
    }
    console.log("+ تصنيفات المشاريع");
  }
  await seedIfEmpty(
    () => prisma.project.count(),
    async () => {
      const cat = async (name: string) =>
        (await prisma.projectCategory.findFirst({ where: { name } }))?.id ?? null;
      await prisma.project.createMany({
        data: [
          {
            title: "برج الأفق للأعمال والمقرات الاستثمارية",
            kind: "مشروع تجاري ومكتبي متكامل",
            location: "الرياض، المملكة",
            badge: "مكتمل 2024",
            badgePrimary: true,
            meta: "مساحة البناء: 45,000 م²",
            imageUrl: `${IMG}AB6AXuAs00oQaLN4a97YrmLOuLuF-8BogfopWFgDJfBg44wjyTMll8W3AsXyy9Od_YeEteHKNIPd40EVW85JwxMQBgA37QAkfast0FjGsCTGj__IW8IyozcJ4bIRR29pYq2BITBNTYLOPUPgj_bjscqqJY3n6eH6lz0b-yVmpup6ooKa0jFeb_ROxHSXMZFosZNGhhXmZo1GDPJZcNQscdrf5USj8ZXzBOl42bHJW9S9ww`,
            description: "تنفيذ كامل للهيكل الخرساني والإنشائي، والواجهات المزدوجة الموفرة للطاقة، إضافة إلى 4 أدوار مواقف سيارات ذكية وأنظمة تحكم ذكية BMS بالكامل.",
            features: [
              { icon: "building", text: "32 طابقاً" },
              { icon: "badge-check", text: "شهادة LEED الذهبية" },
              { icon: "timer", text: "22 شهراً مدة الإنجاز" },
            ],
            categoryId: await cat("مشاريع تجارية"),
            sortOrder: 1,
          },
          {
            title: "مجمع ريحانة السكني الفاخر",
            kind: "مجمع سكني راقٍ",
            location: "جدة، حي الشاطئ",
            badge: "مكتمل 2023",
            badgePrimary: true,
            meta: "32 فيلا مستقلة",
            imageUrl: `${IMG}AB6AXuC2fBvblzOILmhA7Yj1iIgpzYXlEDnjXczd3V4rSG_SgtugTt5-QHt8ZYdpopLaHl1bqV4T191Ph0_p8Iy4oEwh7vTS_8znA1c1JGvh2zoS5ll7ssRu8Jbk_nLxvQ-IeRIC8O-8eFXYeTwSzaTmwIYNLHmZbHE7SUJbw5Ddken7ozRcCxw1q5XjyV6kVahbYF3LsoB8vAOEu9pqzKmmLs6xIttcu4eVplaf9acSAw`,
            description: "تطوير متكامل للبنية التحتية، شبكات الري، والأعمال المدنية والإنشائية، مع أرقى درجات العزل المائي والحراري وتشطيبات الرخام الطبيعي.",
            features: [
              { icon: "house", text: "تسليم مفتاح" },
              { icon: "tree-pine", text: "مساحات خضراء متطورة" },
            ],
            categoryId: await cat("مجمعات سكنية"),
            sortOrder: 2,
          },
          {
            title: "المركز الطبي التخصصي المتطور",
            kind: "منشأة طبية تخصصية",
            location: "المنطقة الشرقية",
            badge: "قطاع الرعاية الصحية",
            imageUrl: `${IMG}AB6AXuAGyJI-0Ux2uCXbI8AWxv3oEcI6vQd6r39JWK47tCb3w-4m1N_wVw7cljVV9_PUujhhjXlD-hJjeUv_Y_FH_skm51wzgvvq3XDLO_UYpvSfn77y1_vfaYK5Z7pdxw5a07rwaeDS0MbTxhATeCAuwi68Ur-xP3vCQA2Sc6kK4CGAxQakT5wHUbOrm4CeTw3MrTB23Fg3PXNssZ9tKtEg10YJIqzXTdy5WQUdSoTEGg`,
            description: "إنشاء غرف العمليات المعقمة، شبكات الغازات الطبية، والأنظمة الكهروميكانيكية ذات التكرارية العالية (Redundant HVAC) لمطابقة كود البناء السعودي الصحي.",
            categoryId: await cat("مراكز طبية"),
            sortOrder: 3,
          },
          {
            title: "واحة المزن التجارية والترفيهية",
            kind: "مجمع تجاري وممشى مفتوح",
            location: "الرياض، حي النرجس",
            badge: "وجهة تسوق وترفيه",
            imageUrl: `${IMG}AB6AXuBgxS_CW4LhS2I1iF_h3OkyOAUupPISdhdFbsKm0bOYXK1WLj-Jsr_N7T0lGm_aPlHkMPKifZe6ewOXr0IhxuPYGUCH31v44xl_Wq5KT4ZowSZqIzCSFESYA2UymGrTD9QBUfIBqVHA2LFSpxOS_0OQ-NhoTus6xQkxY_zV9i5IrbauZ3OHwbnCEsdsG-1T-RdkT193PRI2s3Fz0PaXQKEIvp3oc4HLwwwVdkyeKA`,
            description: "تطوير أرض بمساحة 50,000 م² تشمل ممرات مشاة مبردة، نوافير تفاعلية، وتشطيبات حجر الرياض الطبيعي مع واجهات بانورامية ذات كفاءة عزل صوتي قصوى.",
            categoryId: await cat("مشاريع تجارية"),
            sortOrder: 4,
          },
        ],
      });
    },
    "المشاريع",
  );

  // ---------- الجودة ----------
  await seedIfEmpty(
    () => prisma.qualityItem.count(),
    () =>
      prisma.qualityItem.createMany({
        data: [
          { icon: "chart-column", title: "إدارة نمذجة المباني (BIM) والأبعاد الرقمية", description: "اكتشاف التعارضات الهندسية (Clash Detection) قبل بدء الصب الفعلي لتفادي الهدر والتأخير.", sortOrder: 1 },
          { icon: "gavel", title: "الامتثال لكود البناء السعودي (SBC)", description: "تطبيق اشتراطات كود البناء السعودي الإنشائية والميكانيكية وأنظمة مكافحة الحرائق والسلامة.", sortOrder: 2 },
          { icon: "clipboard-check", title: "شهادات الأيزو العالمية المعيارية", description: "حاصلون على اعتمادات ISO 9001 لنظم إدارة الجودة و ISO 45001 للسلامة والصحة المهنية.", sortOrder: 3 },
        ],
      }),
    "بنود الجودة",
  );
  await seedIfEmpty(
    () => prisma.qualityMetric.count(),
    () =>
      prisma.qualityMetric.createMany({
        data: [
          { label: "معدل الامتثال لاختبارات الجودة ومطابقة المواد", valueText: "99.8%", percent: 100, sortOrder: 1 },
          { label: "ساعات العمل الآمنة دون توقف أو إصابات (LTI Free)", valueText: "2.4M+ ساعة", percent: 95, sortOrder: 2 },
          { label: "تسليم المشاريع في الموعد المحدد أو قبله", valueText: "98.5%", percent: 99, sortOrder: 3 },
        ],
      }),
    "مؤشرات الأداء",
  );
  await seedIfEmpty(
    () => prisma.certification.count(),
    () =>
      prisma.certification.createMany({
        data: [
          { icon: "badge-check", code: "ISO 9001:2015", label: "إدارة الجودة", sortOrder: 1 },
          { icon: "shield-plus", code: "ISO 45001", label: "الصحة والسلامة", sortOrder: 2 },
          { icon: "leaf", code: "ISO 14001", label: "الإدارة البيئية", sortOrder: 3 },
        ],
      }),
    "الشهادات",
  );

  // ---------- الشركاء والآراء ----------
  await seedIfEmpty(
    () => prisma.partner.count(),
    () =>
      prisma.partner.createMany({
        data: [
          { icon: "building-2", name: "صندوق الراجحي العقاري", sortOrder: 1 },
          { icon: "building", name: "شركة دار الأركان", sortOrder: 2 },
          { icon: "landmark", name: "هيئة تطوير الرياض", sortOrder: 3 },
          { icon: "briefcase", name: "مجموعة ركاز القابضة", sortOrder: 4 },
          { icon: "layers", name: "مشاريع أسواق العثيم", sortOrder: 5 },
          { icon: "drafting-compass", name: "شركة الماجدية ريزيدنس", sortOrder: 6 },
        ],
      }),
    "الشركاء",
  );
  await seedIfEmpty(
    () => prisma.testimonial.count(),
    () =>
      prisma.testimonial.createMany({
        data: [
          { quote: "إن التعامل مع مؤسسة غسان غازي الميمني شكل نقطة تحول في تنفيذ برجنا المكتبي بالرياض. الانضباط الهندسي المذهل والتسليم قبل الموعد بـ 40 يوماً أثبت كفاءتهم الاستثنائية.", name: "م. عبد العزيز بن فهد التميمي", role: "الرئيس التنفيذي للتطوير - مجموعة التميمي القابضة", rating: 5, sortOrder: 1 },
          { quote: "دقة التشطيبات المعمارية وتنفيذ التكييف المركزي والمصاعد والواجهات في مشروع المجمع السكني كانت استثنائية. خبرة مهندسي الميمني الميدانية تستحق كل الإشادة.", name: "د. طارق السبيعي", role: "رئيس مجلس الإدارة - صندوق ريتاج الاستثماري", rating: 5, sortOrder: 2 },
          { quote: "الشفافية في التعامل والتقارير الميدانية الأسبوعية أراحتنا تماماً كمستثمرين. مؤسسة غسان غازي الميمني عنوان حقيقي للاحترافية والالتزام بالعقود الإنشائية.", name: "أ. منصور المقرن", role: "مدير إدارة الأصول العقارية - الرياض", rating: 5, sortOrder: 3 },
        ],
      }),
    "آراء العملاء",
  );

  // ---------- الأدمن ----------
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const exists = await prisma.adminUser.findUnique({ where: { email } });
    if (!exists) {
      await prisma.adminUser.create({
        data: {
          email,
          name: process.env.ADMIN_NAME || "مدير الموقع",
          passwordHash: await bcrypt.hash(password, 12),
        },
      });
      console.log(`+ مستخدم الأدمن: ${email}`);
    } else {
      console.log(`- مستخدم الأدمن ${email} موجود، تم التخطي`);
    }
  } else {
    console.warn("! ADMIN_EMAIL / ADMIN_PASSWORD غير مضبوطين، لم يُنشأ مستخدم أدمن");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
