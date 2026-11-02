import { Bebas_Neue, Chakra_Petch, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import '../src/styles/globals.css';
import { ThemeAudioProvider } from '../src/context/ThemeAudioContext';
import ParticlesCanvas from '../src/components/common/ParticlesCanvas';
import NoiseOverlay from '../src/components/common/NoiseOverlay';
import CustomCursor from '../src/components/common/CustomCursor';
import RouteVeil from '../src/components/common/RouteVeil';
import ScrollFadeMask from '../src/components/common/ScrollFadeMask';
import NavHeader from '../src/components/navigation/NavHeader';
import SmoothScroll from '../src/components/common/SmoothScroll';
import { Analytics } from '@vercel/analytics/react';
import AmplitudeAnalytics from '../src/components/analytics/AmplitudeAnalytics';
import { SITE_URL, SITE_NAME, SITE_TITLE, DEFAULT_OG_IMAGE, absoluteUrl } from '../src/lib/site';
import InteractiveTerminal from '../src/components/terminal/InteractiveTerminal';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-condensed',
  display: 'swap',
});

const chakraPetch = Chakra_Petch({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

// Icons come from the app/icon.png and app/apple-icon.png file conventions.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_TITLE} // HUD Portfolio`,
  description: 'Portfolio of Dias Yermek, a software engineer from Astana specializing in Next.js, Flutter, React Native, and AI integrations.',
  keywords: ['Dias Yermek', 'Frontend Developer', 'Mobile Developer', 'Flutter', 'Next.js', 'React Native', 'Astana IT University', 'Astana Hub'],
  authors: [{ name: 'Dias Yermek', url: 'https://github.com/Daelijek' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: 'High-performance web and mobile products with Next.js, Flutter, React Native, and AI.',
    url: '/',
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: 'High-performance web and mobile products with Next.js, Flutter, React Native, and AI.',
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export const viewport = {
  themeColor: '#040608',
};

const schemaOrgData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Dias Yermek',
      alternateName: 'Диас Ермек',
      jobTitle: 'Middle Frontend & Mobile Developer',
      description: 'Software engineer from Astana, Kazakhstan specializing in Next.js, React, Flutter, React Native, and AI integrations.',
      url: `${SITE_URL}`,
      image: absoluteUrl('/assets/linkedIn_Dias_square.webp'),
      sameAs: [
        'https://github.com/Daelijek',
        'https://www.linkedin.com/in/dias-yermek/',
        'https://t.me/daelijek_og',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Astana',
        addressCountry: 'Kazakhstan',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Astana IT University',
      },
      knowsAbout: [
        'TypeScript',
        'React',
        'Next.js',
        'Flutter',
        'React Native',
        'Expo',
        'FastAPI',
        'PostgreSQL',
        'Tailwind CSS',
        'AI Integrations',
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}`,
      name: SITE_TITLE,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}`,
        name: SITE_NAME,
      },
      mainEntity: {
        '@id': `${SITE_URL}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${chakraPetch.variable} ${jetbrainsMono.variable} ${plusJakarta.variable} dark`} data-theme="acid">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </head>
      <body className="bg-[#040608] text-white selection:bg-[#00FF9F] selection:text-[#040608] min-h-screen overflow-x-hidden">
        <ThemeAudioProvider>
          <SmoothScroll>
            <ParticlesCanvas />
            <NoiseOverlay />
            <CustomCursor />
            <RouteVeil />
            <NavHeader />
            <ScrollFadeMask>{children}</ScrollFadeMask>
            <Analytics />
            <AmplitudeAnalytics />
            <InteractiveTerminal />
          </SmoothScroll>
        </ThemeAudioProvider>
      </body>
    </html>
  );
}
