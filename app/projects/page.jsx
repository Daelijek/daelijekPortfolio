import ProjectsContent from './ProjectsContent';

export const metadata = {
  title: 'Projects by Dias Yermek | Production Mobile & Web Builds // HUD Showcase',
  description: 'Featured production engineering projects: Finance AI Manager (React Native & FastAPI), BeyimTech AI Platform (Flutter & Riverpod), OpenGov.kz (Next.js & i18n), and BerikWeb 3D Gallery.',
  keywords: [
    'Dias Yermek Projects',
    'React Native Portfolio',
    'Flutter Projects',
    'Next.js 15 Applications',
    'OpenGov.kz',
    'BeyimTech',
    'Finance Management AI',
    'Mobile App Developer Kazakhstan'
  ],
  openGraph: {
    title: 'Projects by Dias Yermek | Production Mobile & Web Builds',
    description: 'Featured engineering projects built with React Native, Flutter, Next.js, and AI integrations.',
    url: 'https://daelijek.dev/projects',
    images: [
      {
        url: '/assets/Finance.png',
        width: 1200,
        height: 630,
        alt: 'Finance AI Manager Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects by Dias Yermek | Production Mobile & Web Builds',
    description: 'Featured engineering projects built with React Native, Flutter, Next.js, and AI integrations.',
    images: ['/assets/Finance.png'],
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
