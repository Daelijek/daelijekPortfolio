import type { Metadata } from 'next';
import ContactContent from '@/components/contact/ContactContent';
import { getDictionary } from '@/content';
import { resolveLocale, type LangParams } from '@/i18n/params';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: '/contact',
    title: `${meta.contact.title} // Direct HUD Channel`,
    description: meta.contact.description,
    keywords: ['Contact Dias Yermek', 'Hire Frontend Developer Astana', 'Hire Flutter Developer', 'Dias Yermek Telegram', 'Contract Software Engineer Kazakhstan'],
  });
}

// Contact details are part of the layout-wide dictionary (also used by About and the terminal).
export default async function ContactPage({ params }: LangParams) {
  await resolveLocale(params);
  return <ContactContent />;
}
