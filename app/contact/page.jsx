import ContactContent from './ContactContent';

export const metadata = {
  title: 'Contact Dias Yermek | Telegram Stream, Email & Inquiries // Direct HUD Channel',
  description: 'Connect with Dias Yermek directly via Telegram (@daelijek_og), Email (dias1605ermek@gmail.com), GitHub, or LinkedIn. Available for full-time engineering roles, contract work, and AI consultations.',
  keywords: [
    'Contact Dias Yermek',
    'Hire Frontend Developer Astana',
    'Hire Flutter Developer',
    'Dias Yermek Telegram',
    'Contract Software Engineer Kazakhstan',
    'Astana IT Developer'
  ],
  openGraph: {
    title: 'Contact Dias Yermek | Direct Communication Port',
    description: 'Connect with Dias Yermek via Telegram, Email, or secure transmission form. Available for full-time and contract roles.',
    url: 'https://daelijek-portfolio.vercel.app/contact',
    images: [
      {
        url: '/assets/linkedIn_Dias_square.png',
        width: 1200,
        height: 630,
        alt: 'Dias Yermek Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dias Yermek | Direct Communication Port',
    description: 'Connect with Dias Yermek via Telegram, Email, or direct transmission form.',
    images: ['/assets/linkedIn_Dias_square.png'],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
