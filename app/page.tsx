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
          <About settings={settings} pillars={data.pillars} />
          <ImageBand
            src={settings.heroImage || "/images/hero.webp"}
            label="GGA — CONTRACTING"
            caption="نبني بإتقان، لنصنع معالم تدوم"
          />
          <Services settings={settings} services={data.services} categories={data.categories} />
          <Projects
            eyebrow={settings.projectsEyebrow}
            title={settings.projectsTitle}
            cta={settings.projectsCta}
            categories={data.categories}
            projects={data.projects}
          />
          <ProjectsMap projects={data.projects} />
          <Quality
            settings={settings}
            qualityItems={data.qualityItems}
            metrics={data.metrics}
            certifications={data.certifications}
          />
          <Trust
            settings={settings}
            partners={data.partners}
            testimonials={data.testimonials}
          />
          <Consultation settings={settings} />
        </div>
      </main>
      <Footer settings={settings} services={data.services} />
    </MotionRoot>
  );
}
