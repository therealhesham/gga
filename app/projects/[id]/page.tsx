import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getSiteData } from "@/lib/data";
import { Chrome } from "@/components/site/Chrome";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Img } from "@/components/site/Img";
import { JsonLd, projectBreadcrumbLd } from "@/components/site/JsonLd";
import { MotionRoot } from "@/components/site/MotionRoot";

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
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: `/projects/${project.id}`,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  return (
    <MotionRoot intro={false}>
      <Suspense fallback={<div className="band-ink" style={{ minHeight: "100svh" }} />}>
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
    <div className="site">
      <JsonLd data={projectBreadcrumbLd(project)} />
      <Chrome />
      <Header settings={settings} home={false} />

      <main>
        {/* غلاف المشروع */}
        <section className="cover on-ink">
          <div className="cover__media">
            <Img src={project.imageUrl} alt={project.title} sizes="100vw" priority className="object-cover" />
          </div>
          <div className="container cover__body">
            <ol className="crumbs" aria-label="مسار التنقل">
              <li>
                <Link href="/">الرئيسية</Link>
              </li>
              <li>
                <Link href="/#featured-projects">المشاريع</Link>
              </li>
            </ol>
            <h1>{project.title}</h1>
            <p className="cover__meta">
              {[project.kind, project.badge, project.location, project.meta].filter(Boolean).join("، ")}
            </p>
          </div>
        </section>

        {/* الوصف والمواصفات */}
        <section className="band section--tall">
          <div className="container grid-12">
            <div className="c-1-7">
              <h2 style={{ marginBlockEnd: "var(--space-xl)" }}>عن المشروع</h2>
              <p className="long-text">{project.description}</p>
            </div>

            <div className="c-8-12">
              <dl className="spec">
                {[
                  ["نوع المشروع", project.kind],
                  ["الموقع", project.location],
                  ["المواصفات", project.meta],
                  ["الحالة", project.badge],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
              </dl>

              {project.features.length > 0 && (
                <ul className="plain-list">
                  {project.features.map((f, i) => (
                    <li key={i}>{f.text}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* مشاريع أخرى */}
        {others.length > 0 && (
          <section className="band-2 section--tall">
            <div className="container">
              <div className="head">
                <h2>من أعمالنا</h2>
              </div>
              <ul className="others">
                {others.map((p) => (
                  <li key={p.id}>
                    <Link href={`/projects/${p.id}`}>
                      <span className="about__photo">
                        <Img src={p.imageUrl} alt="" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                      </span>
                      <small>{p.kind}</small>
                      <strong>{p.title}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      <Footer settings={settings} services={data.services} homeBase="/" />
    </div>
  );
}
