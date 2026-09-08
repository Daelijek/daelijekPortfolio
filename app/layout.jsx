import { Bebas_Neue, Chakra_Petch, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import '../src/styles/globals.css';
import { ThemeAudioProvider } from '../src/context/ThemeAudioContext';
import ParticlesCanvas from '../src/components/common/ParticlesCanvas';
import NoiseOverlay from '../src/components/common/NoiseOverlay';
import CustomCursor from '../src/components/common/CustomCursor';
import RouteVeil from '../src/components/common/RouteVeil';
import ScrollFadeMask from '../src/components/common/ScrollFadeMask';
import NavHeader from '../src/components/navigation/NavHeader';
import FloatingFooter from '../src/components/footer/FloatingFooter';
import { Analytics } from '@vercel/analytics/react';

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

export const metadata = {
  metadataBase: new URL('https://daelijek.dev'),
  title: 'Dias Yermek | Creative Frontend & Mobile Developer // HUD Portfolio',
  description: 'Portfolio of Dias Yermek, a software engineer from Astana specializing in Next.js, Flutter, React Native, and AI integrations.',
  keywords: ['Dias Yermek', 'Frontend Developer', 'Mobile Developer', 'Flutter', 'Next.js', 'React Native', 'Astana IT University', 'Astana Hub'],
  authors: [{ name: 'Dias Yermek', url: 'https://github.com/Daelijek' }],
  openGraph: {
    title: 'Dias Yermek | Creative Frontend & Mobile Developer',
    description: 'High-performance web and mobile products with Next.js, Flutter, React Native, and AI.',
    url: 'https://daelijek.dev',
    siteName: 'Dias Yermek Portfolio',
    images: [
      {
        url: '/assets/linkedIn_Dias_square.png',
        width: 1200,
        height: 630,
        alt: 'Dias Yermek Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dias Yermek | Creative Frontend & Mobile Developer',
    description: 'High-performance web and mobile products with Next.js, Flutter, React Native, and AI.',
    images: ['/assets/linkedIn_Dias_square.png'],
  },
  icons: {
    icon: '/favicon.ico',
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
      '@id': 'https://daelijek.dev/#person',
      name: 'Dias Yermek',
      alternateName: 'Диас Ермек',
      jobTitle: 'Middle Frontend & Mobile Developer',
      description: 'Software engineer from Astana, Kazakhstan specializing in Next.js, React, Flutter, React Native, and AI integrations.',
      url: 'https://daelijek.dev',
      image: 'https://daelijek.dev/assets/linkedIn_Dias_square.png',
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
      '@id': 'https://daelijek.dev/#profilepage',
      url: 'https://daelijek.dev',
      name: 'Dias Yermek | Creative Frontend & Mobile Developer',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://daelijek.dev/#website',
        url: 'https://daelijek.dev',
        name: 'Dias Yermek Portfolio',
      },
      mainEntity: {
        '@id': 'https://daelijek.dev/#person',
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
          <ParticlesCanvas />
          <NoiseOverlay />
          <CustomCursor />
          <RouteVeil />
          <NavHeader />
          <ScrollFadeMask>{children}</ScrollFadeMask>
          <FloatingFooter />
          <Analytics />
        </ThemeAudioProvider>
      </body>
    </html>
  );
}
