import { portfolioContent } from '../src/data/portfolioData';
import { absoluteUrl } from '../src/lib/site';

// Built from the same data as the routes, so a new case study is listed automatically.
export default function sitemap() {
  const lastModified = new Date();

  const pages = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  ];

  const caseStudies = portfolioContent.en.projects.featured.map((project) => ({
    path: `/projects/${project.slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...pages, ...caseStudies].map(({ path, ...rest }) => ({
    url: absoluteUrl(path),
    lastModified,
    ...rest,
  }));
}
