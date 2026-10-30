import type { Metadata } from "next";
import { getSiteData } from "@/lib/data";
import { ComingSoon } from "@/components/site/ComingSoon";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Figures } from "@/components/site/Figures";
import { About } from "@/components/site/About";
import { CeoMessage } from "@/components/site/CeoMessage";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { ProjectsMap } from "@/components/site/ProjectsMap";
import { Quality } from "@/components/site/Quality";
import { Trust } from "@/components/site/Trust";
import { Consultation } from "@/components/site/Consultation";
import { Footer } from "@/components/site/Footer";
import { Chrome } from "@/components/site/Chrome";
import { MotionRoot } from "@/components/site/MotionRoot";
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
    <MotionRoot intro={false}>
      <div className="site">
        <JsonLd data={organizationLd(settings)} />
        <Chrome />
        <Header settings={settings} />
        <main>
          <Hero settings={settings} />
          <Figures settings={settings} stats={data.stats} />
          <About settings={settings} pillars={data.pillars} />
          <CeoMessage settings={settings} />
          <Services settings={settings} services={data.services} categories={data.categories} />
          <Projects
            eyebrow={settings.projectsEyebrow}
            title={settings.projectsTitle}
            cta={settings.projectsCta}
            categories={data.categories}
            projects={data.projects}
          >
            <ProjectsMap projects={data.projects} />
          </Projects>
          <Quality
            settings={settings}
            qualityItems={data.qualityItems}
            metrics={data.metrics}
            certifications={data.certifications}
          />
          <Trust settings={settings} partners={data.partners} testimonials={data.testimonials} />
          <Consultation settings={settings} />
        </main>
        <Footer settings={settings} services={data.services} />
      </div>
    </MotionRoot>
  );
}
