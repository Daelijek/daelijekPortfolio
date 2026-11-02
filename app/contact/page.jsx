import ContactContent from './ContactContent';
import { DEFAULT_OG_IMAGE } from '../../src/lib/site';

const title = 'Contact Dias Yermek | Telegram, Email & LinkedIn';
const description = 'Reach Dias Yermek via Telegram, email, GitHub or LinkedIn. Available for full-time engineering roles and contract work.';

export const metadata = {
  title: `${title} // Direct HUD Channel`,
  description: 'Connect with Dias Yermek directly via Telegram (@daelijek_og), Email (dias1605ermek@gmail.com), GitHub, or LinkedIn. Available for full-time engineering roles, contract work, and AI consultations.',
  keywords: [
    'Contact Dias Yermek',
    'Hire Frontend Developer Astana',
    'Hire Flutter Developer',
    'Dias Yermek Telegram',
    'Contract Software Engineer Kazakhstan',
    'Astana IT Developer'
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title,
    description,
    url: '/contact',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
