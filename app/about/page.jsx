import AboutContent from './AboutContent';

export const metadata = {
  title: 'About Dias Yermek | Creative Frontend & Mobile Developer // Competency Matrix',
  description: 'Software Engineering background, 8-sector technical competency matrix (Next.js, Flutter, React Native, AI, FastAPI), and production track record at BeyimTech, TrustMe, and OpenGov.',
  keywords: [
    'Dias Yermek',
    'About Dias Yermek',
    'Software Engineer Astana',
    'Frontend Architecture',
    'Flutter Developer',
    'React Native',
    'Next.js 15',
    'Astana IT University',
    'BeyimTech',
    'TrustMe'
  ],
  openGraph: {
    title: 'About Dias Yermek | Creative Frontend & Mobile Developer',
    description: 'Software Engineering background, 8-sector technical competency matrix, and production track record across EdTech, GovTech, FinTech & Blockchain.',
    url: 'https://daelijek-portfolio.vercel.app/about',
    images: [
      {
        url: '/assets/linkedIn_Dias_square.png',
        width: 1200,
        height: 630,
        alt: 'Dias Yermek Profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dias Yermek | Creative Frontend & Mobile Developer',
    description: 'Software Engineering background, 8-sector technical competency matrix, and production track record.',
    images: ['/assets/linkedIn_Dias_square.png'],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
