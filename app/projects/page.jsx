import ProjectsContent from './ProjectsContent';
import { DEFAULT_OG_IMAGE } from '../../src/lib/site';

const title = 'Projects by Dias Yermek | Production Mobile & Web Builds';
const description = 'Featured engineering projects built with React Native, Next.js, FastAPI and AI integrations.';

export const metadata = {
  title: `${title} // HUD Showcase`,
  description: 'Featured production engineering projects: RoleSieve (Next.js 16 & FastAPI), Finance AI Manager (React Native & FastAPI), OpenGov.kz (React 19, Vite & i18n), and the Berik Zhunusbek art gallery.',
  keywords: [
    'Dias Yermek Projects',
    'RoleSieve HeadHunter Analytics',
    'React Native Portfolio',
    'Flutter Projects',
    'Next.js 16 Applications',
    'FastAPI Python Microservices',
    'OpenGov.kz',
    'Finance Management AI',
    'Mobile App Developer Kazakhstan'
  ],
  alternates: { canonical: '/projects' },
  openGraph: {
    title,
    description,
    url: '/projects',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
