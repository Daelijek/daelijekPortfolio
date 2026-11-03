import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Bebas_Neue, Chakra_Petch, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeAudioProvider } from '@/context/ThemeAudioContext';
import ParticlesCanvas from '@/components/common/ParticlesCanvas';
import NoiseOverlay from '@/components/common/NoiseOverlay';
import CustomCursor from '@/components/common/CustomCursor';
import RouteVeil from '@/components/common/RouteVeil';
import ScrollFadeMask from '@/components/common/ScrollFadeMask';
import NavHeader from '@/components/navigation/NavHeader';
import SmoothScroll from '@/components/common/SmoothScroll';
import AmplitudeAnalytics from '@/components/analytics/AmplitudeAnalytics';
import InteractiveTerminal from '@/components/terminal/InteractiveTerminal';
import { I18nProvider } from '@/i18n/I18nProvider';
import { HTML_LANG, LOCALES, isLocale } from '@/i18n/config';
import { getDictionary } from '@/content';
import { SITE_NAME, SITE_URL, absoluteUrl, pageMetadata } from '@/lib/site';

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

// Plus Jakarta Sans has no Cyrillic glyphs: Russian/Kazakh text uses the next font in the
// Tailwind `sans` stack. (The old JS config requested a 'cyrillic' subset that does not exist.)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

interface LayoutParams {
  params: Promise<{ lang: string }>;
}

// Every locale is pre-rendered; any other first segment is handled by the proxy.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Icons come from the app/icon.png, app/apple-icon.png and app/favicon.ico conventions.
export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    authors: [{ name: 'Dias Yermek', url: 'https://github.com/Daelijek' }],
    keywords: ['Dias Yermek', 'Frontend Developer', 'Mobile Developer', 'Flutter', 'Next.js', 'React Native', 'Astana IT University', 'Astana Hub'],
    ...pageMetadata({ locale: lang, path: '/', title: meta.home.title, description: meta.home.description }),
  };
}

export const viewport: Viewport = {
  themeColor: '#040608',
};

function personSchema(jobTitle: string, siteTitle: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Dias Yermek',
        alternateName: 'Диас Ермек',
        jobTitle,
        description: 'Software engineer from Astana, Kazakhstan specializing in Next.js, React, Flutter, React Native, and AI integrations.',
        url: SITE_URL,
        image: absoluteUrl('/assets/linkedIn_Dias_square.webp'),
        sameAs: ['https://github.com/Daelijek', 'https://www.linkedin.com/in/dias-yermek/', 'https://t.me/daelijek_og'],
        address: { '@type': 'PostalAddress', addressLocality: 'Astana', addressCountry: 'Kazakhstan' },
        alumniOf: { '@type': 'EducationalOrganization', name: 'Astana IT University' },
        knowsAbout: ['TypeScript', 'React', 'Next.js', 'Flutter', 'React Native', 'Expo', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'AI Integrations'],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: siteTitle,
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };
}

export default async function RootLayout({ children, params }: LayoutParams & { children: ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  // Only the layout-wide strings go to the client here; pages pass their own sections.
  const common = { system: dict.system, nav: dict.nav, contact: dict.contact, meta: dict.meta };

  return (
    <html
      lang={HTML_LANG[lang]}
      className={`${bebasNeue.variable} ${chakraPetch.variable} ${jetbrainsMono.variable} ${plusJakarta.variable} dark`}
      data-theme="acid"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema('Middle Frontend & Mobile Developer', dict.meta.siteTitle)) }}
        />
      </head>
      <body className="bg-[#040608] text-white selection:bg-[#00FF9F] selection:text-[#040608] min-h-screen overflow-x-hidden">
        <I18nProvider locale={lang} common={common}>
          <ThemeAudioProvider>
            <SmoothScroll>
              <ParticlesCanvas />
              <NoiseOverlay />
              <CustomCursor />
              <RouteVeil />
              <NavHeader />
              <ScrollFadeMask>{children}</ScrollFadeMask>
              <AmplitudeAnalytics />
              <InteractiveTerminal />
            </SmoothScroll>
          </ThemeAudioProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
