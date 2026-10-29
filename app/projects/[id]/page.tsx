import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, MapPin, Ruler } from "lucide-react";
import { getSiteData } from "@/lib/data";
import { Icon } from "@/lib/icons";
import { Chrome } from "@/components/site/Chrome";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Img } from "@/components/site/Img";
import { Magnetic } from "@/components/site/Magnetic";
import { MotionRoot } from "@/components/site/MotionRoot";
import { Reveal } from "@/components/site/Reveal";

type Params = Promise<{ id: string }>;

async function findProject(params: Params) {
  const { id } = await params;
  const data = await getSiteData();
  const project = data.projects.find((p) => String(p.id) === id);
  return { data, project };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { data, project } = await findProject(params);
  if (!project) return { title: "المشروع غير موجود" };
  const description = project.description.replace(/\s+/g, " ").slice(0, 160);
  return {
    title: `${project.title} | ${data.settings.companyName}`,
    description,
    openGraph: {
      title: project.title,
      description,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  return (
    <MotionRoot intro={false}>
      <Suspense fallback={<div className="min-h-svh bg-ink" />}>
        <ProjectContent params={params} />
      </Suspense>
    </MotionRoot>
  );
}

async function ProjectContent({ params }: { params: Params }) {
  const { data, project } = await findProject(params);
  if (!project) notFound();

  const { settings } = data;
  const others = data.projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      <Chrome phone={settings.phone} />
      <Header settings={settings} home={false} />

      <main className="bg-ivory text-ink">
        {/* غلاف المشروع */}
        <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-ink text-white">
          <div className="absolute inset-0 -z-10">
            <Img src={project.imageUrl} alt={project.title} sizes="100vw" priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/35" />
            <div className="absolute inset-0 bg-gradient-to-l from-ink/60 via-transparent to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin pb-14 md:pb-20 pt-40">
            <Reveal>
              <nav aria-label="مسار التنقل" className="mb-6 flex items-center gap-2 text-sm font-light text-white/60">
                <Link href="/" className="hover:text-gold-soft transition-colors">
                  الرئيسية
                </Link>
                <span>/</span>
                <Link href="/#featured-projects" className="hover:text-gold-soft transition-colors">
                  المشاريع
                </Link>
              </nav>
              <div className="flex flex-wrap items-center gap-3 mb-5 text-sm">
                {project.kind && <span className="font-medium text-gold-soft">{project.kind}</span>}
                {project.badge && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      project.badgePrimary ? "bg-gold-soft text-ink" : "bg-white/15 text-white backdrop-blur-sm"
                    }`}
                  >
                    {project.badge}
                  </span>
                )}
              </div>
              <h1 className="font-display font-medium text-[clamp(2rem,5vw,4.2rem)] leading-[1.3] max-w-4xl">
                {project.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm font-light text-white/70">
                {project.location && (
                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 text-gold-soft" /> {project.location}
                  </span>
                )}
                {project.meta && (
                  <span className="flex items-center gap-2">
                    <Ruler className="size-4 text-gold-soft" /> {project.meta}
                  </span>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* الوصف والمواصفات */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24">
            <Reveal className="lg:col-span-7">
              <span className="flex items-center gap-3 mb-6 text-sm font-medium text-gold">
                <span className="h-px w-10 bg-gold" /> عن المشروع
              </span>
              <p className="text-lg md:text-xl font-light leading-10 text-ink/75 whitespace-pre-line">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <dl className="border-t border-ink/15">
                {[
                  ["نوع المشروع", project.kind],
                  ["الموقع", project.location],
                  ["المواصفات", project.meta],
                  ["الحالة", project.badge],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4">
                      <dt className="text-sm font-light text-ink/50">{k}</dt>
                      <dd className="font-display text-base">{v}</dd>
                    </div>
                  ))}
              </dl>

              {project.features.length > 0 && (
                <ul className="mt-8 grid grid-cols-1 gap-4">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-base font-light text-ink/75">
                      <Icon name={f.icon} className="size-5 text-gold shrink-0 [stroke-width:1.5]" />
                      {f.text}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        </section>

        {/* دعوة للتواصل */}
        <section className="bg-ink text-white py-20 md:py-24">
          <Reveal className="max-w-4xl mx-auto px-margin-mobile text-center">
            <h2 className="font-display font-medium text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.4]">
              هل لديك مشروع بهذا المستوى؟
            </h2>
            <p className="mt-4 text-base font-light leading-8 text-white/60">
              فريقنا الهندسي جاهز لدراسة مخططاتك وتقديم تسعير تفصيلي خلال ٤٨ ساعة عمل.
            </p>
            <div className="mt-9">
              <Magnetic>
                <Link
                  href="/#consultation-booking"
                  className="group inline-flex items-center gap-3 rounded-full px-9 py-4 bg-gold-soft text-ink text-sm font-bold hover:bg-white transition-colors duration-300"
                >
                  {settings.navCtaLabel || "اطلب استشارة"}
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </section>

        {/* مشاريع أخرى */}
        {others.length > 0 && (
          <section className="py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
              <Reveal className="mb-12">
                <span className="flex items-center gap-3 mb-4 text-sm font-medium text-gold">
                  <span className="h-px w-10 bg-gold" /> مشاريع أخرى
                </span>
                <h2 className="font-display font-medium text-[clamp(1.7rem,3vw,2.6rem)]">من أعمالنا</h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {others.map((p, i) => (
                  <Reveal key={p.id} delay={i * 100}>
                    <Link href={`/projects/${p.id}`} data-cursor="استعرض" className="group block">
                      <span className="relative block aspect-[4/3] overflow-hidden bg-ivory-deep">
                        <Img
                          src={p.imageUrl}
                          alt={p.title}
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
                        />
                      </span>
                      <span className="mt-4 block text-sm font-medium text-gold">{p.kind}</span>
                      <span className="mt-1 block font-display text-xl group-hover:text-gold transition-colors">
                        {p.title}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer settings={settings} services={data.services} homeBase="/" />
    </>
  );
}
