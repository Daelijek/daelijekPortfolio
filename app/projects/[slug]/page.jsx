import { notFound } from 'next/navigation';
import ProjectDetailContent from './ProjectDetailContent';
import { portfolioContent } from '../../../src/data/portfolioData';

// Helper to look up project data by slug or alias
function getProject(rawSlug) {
  const slug = (rawSlug || '').toLowerCase();
  const allFeatured = portfolioContent.en.projects.featured;
  const allOther = portfolioContent.en.projects.otherProjects;

  const featured = allFeatured.find(
    (p) =>
      (p.slug && p.slug.toLowerCase() === slug) ||
      (p.id && p.id.toLowerCase() === slug) ||
      (slug === 'finance-ai-manager' && p.slug === 'finance-management-app') ||
      (slug === 'beyimtech' && p.slug === 'beyimtech-ai-platform')
  );
  if (featured) return featured;

  const other = allOther.find(
    (p) =>
      (p.slug && p.slug.toLowerCase() === slug) ||
      (p.id && p.id.toLowerCase() === slug)
  );
  if (other) return other;

  return null;
}

// 1. Static Generation for all project slugs
export async function generateStaticParams() {
  const featuredSlugs = portfolioContent.en.projects.featured.map(
    (p) => p.slug || p.id.toLowerCase()
  );
  const otherSlugs = portfolioContent.en.projects.otherProjects.map(
    (p) => p.slug || p.id.toLowerCase()
  );

  // Include popular direct aliases
  const aliasSlugs = ['finance-ai-manager', 'beyimtech'];

  const allSlugs = Array.from(
    new Set([...featuredSlugs, ...otherSlugs, ...aliasSlugs])
  );

  return allSlugs.map((slug) => ({ slug }));
}

// 2. Dynamic OpenGraph & Twitter Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: 'Project Dossier // Dias Yermek Portfolio',
      description: 'Technical case study and architecture breakdown by Dias Yermek.',
    };
  }

  const title = `${project.title} | Case Study // Dias Yermek`;
  const description =
    project.tagline ||
    project.description ||
    `Detailed technical architecture, metrics, and case study for ${project.title}.`;

  const imagePath = project.image || '/assets/linkedIn_Dias_square.png';
  const imageUrl = imagePath.startsWith('http')
    ? imagePath
    : `https://daelijek-portfolio.vercel.app${imagePath}`;

  return {
    title,
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
    openGraph: {
      title: `${project.title} // Technical Case Study`,
      description,
      url: `https://daelijek-portfolio.vercel.app/projects/${slug}`,
      siteName: 'Dias Yermek Portfolio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} Technical Preview`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} // Technical Case Study`,
      description,
      images: [imageUrl],
    },
  };
}

// 3. Server Component rendering Client Interactive UI
export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent slug={slug} />;
}
