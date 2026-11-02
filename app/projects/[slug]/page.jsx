import { notFound } from 'next/navigation';
import ProjectDetailContent from './ProjectDetailContent';
import { portfolioContent } from '../../../src/data/portfolioData';
import { projectOgImage } from '../../../src/lib/site';

// Only featured projects have case studies; archive repositories link to GitHub directly.
// Legacy aliases (e.g. /projects/role-sieve) are permanent redirects in next.config.mjs.
const featuredProjects = portfolioContent.en.projects.featured;

function getProject(slug) {
  return featuredProjects.find((p) => p.slug === slug) || null;
}

// Any slug not listed here is a 404 instead of an on-demand render.
export const dynamicParams = false;

export async function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} // Technical Case Study`;
  const description =
    project.tagline ||
    project.description ||
    `Detailed technical architecture, metrics, and case study for ${project.title}.`;
  const image = projectOgImage(project.slug, project.title);
  const path = `/projects/${project.slug}`;

  return {
    title: `${project.title} | Case Study // Dias Yermek`,
    description,
    keywords: [
      project.title,
      ...(project.tags || []),
      'Dias Yermek',
      'Software Engineer',
      'Case Study',
      'System Architecture',
      'Mobile Development',
      'Frontend Development',
    ],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: [image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();

  return <ProjectDetailContent slug={slug} />;
}
