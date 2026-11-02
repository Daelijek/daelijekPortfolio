import AboutContent from './AboutContent';
import { DEFAULT_OG_IMAGE } from '../../src/lib/site';

const title = 'About Dias Yermek | Middle Frontend & Mobile Developer';

export const metadata = {
  title: `${title} // Competency Matrix`,
  description: 'Software Engineering background, 8-sector technical competency matrix (Next.js, Flutter, React Native, AI, FastAPI), and production track record at BeyimTech, TrustMe, and OpenGov.',
  keywords: [
    'Dias Yermek',
    'About Dias Yermek',
    'Software Engineer Astana',
    'Frontend Architecture',
    'Flutter Developer',
    'React Native',
    'Next.js 16',
    'Astana IT University',
    'BeyimTech',
    'TrustMe'
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title,
    description: 'Software Engineering background, 8-sector technical competency matrix, and production track record across EdTech, GovTech, FinTech & Blockchain.',
    url: '/about',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Software Engineering background, 8-sector technical competency matrix, and production track record.',
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
