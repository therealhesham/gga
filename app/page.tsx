import type { Metadata } from "next";
import { getSiteData } from "@/lib/data";
import { ComingSoon } from "@/components/site/ComingSoon";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { Quality } from "@/components/site/Quality";
import { Trust } from "@/components/site/Trust";
import { Consultation } from "@/components/site/Consultation";
import { Footer } from "@/components/site/Footer";
import { SectionDots } from "@/components/site/SectionDots";
import { Chrome } from "@/components/site/Chrome";
import { Intro } from "@/components/site/Intro";
import { ProjectsMap } from "@/components/site/ProjectsMap";
import { MotionRoot } from "@/components/site/MotionRoot";
import { matchCity } from "@/lib/ksa";
import { CeoMessage } from "@/components/site/CeoMessage";
import { CraneDivider } from "@/components/site/CraneDivider";
import { ImageBand } from "@/components/site/ImageBand";
import { JsonLd, organizationLd } from "@/components/site/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData();
  return settings.comingSoonEnabled
    ? { robots: { index: false, follow: false } }
    : { alternates: { canonical: "/" } };
}

export default async function Home() {
  const data = await getSiteData();
  const { settings } = data;

  // عند تفعيلها من لوحة التحكم تظهر للزوار بدل الموقع
  if (settings.comingSoonEnabled) return <ComingSoon settings={settings} />;

  // أقسام اختيارية: لا تُعرض الرافعة قبل قسم غير ظاهر، ويُحدَّد لون القسم السابق للرسم
  const hasCeo = !!(settings.ceoName.trim() && settings.ceoMessage.trim());
  const hasMap = data.projects.some((p) => matchCity(p.location));
  const hasTrust = data.partners.length > 0 || data.testimonials.length > 0;

  return (
    <MotionRoot>
      <JsonLd data={organizationLd(settings)} />
      <Intro />
      <Chrome />
      <Header settings={settings} />
      <SectionDots />
      <main data-snap-page className="w-full bg-ivory">
        <div className="flex flex-col w-full text-ink">
          <Hero settings={settings} stats={data.stats} />
          <CraneDivider index="01" label="عن المؤسسة" onDark bg="bg-ink" room="lg:h-36" desktopOnly />
          <About settings={settings} pillars={data.pillars} />
          <ImageBand
            src={settings.heroImage || "/images/hero.webp"}
            label="GGA — CONTRACTING"
            caption="نبني بإتقان، لنصنع معالم تدوم"
          />
          <CeoMessage settings={settings} />
          <CraneDivider index="02" label="خدماتنا" onDark={!hasCeo} bg={hasCeo ? "bg-ivory" : "bg-ink"} />
          <Services settings={settings} services={data.services} categories={data.categories} />
          <CraneDivider index="03" label="المشاريع" onDark bg="bg-ink" />
          <Projects
            eyebrow={settings.projectsEyebrow}
            title={settings.projectsTitle}
            cta={settings.projectsCta}
            categories={data.categories}
            projects={data.projects}
          />
          {hasMap && <CraneDivider index="04" label="حضورنا الوطني" bg="bg-ivory" room="lg:h-24" />}
          <ProjectsMap projects={data.projects} />
          <CraneDivider
            index="05"
            label="الجودة والمعايير"
            onDark={hasMap}
            bg={hasMap ? "bg-ink" : "bg-ivory"}
            room={hasMap ? undefined : "lg:h-24"}
          />
          <Quality
            settings={settings}
            qualityItems={data.qualityItems}
            metrics={data.metrics}
            certifications={data.certifications}
          />
          {hasTrust && <CraneDivider index="06" label="شركاؤنا" bg="bg-stone" />}
          <Trust
            settings={settings}
            partners={data.partners}
            testimonials={data.testimonials}
          />
          <CraneDivider index="07" label="تواصل معنا" onDark={hasTrust} bg={hasTrust ? "bg-ink" : "bg-stone"} />
          <Consultation settings={settings} />
        </div>
      </main>
      <Footer settings={settings} services={data.services} />
    </MotionRoot>
  );
}
