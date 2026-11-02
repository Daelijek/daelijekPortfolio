import HomeContent from '@/components/home/HomeContent';
import { resolveLocale, type LangParams } from '@/i18n/params';

// Metadata for "/" comes from the [lang] layout.
export default async function HomePage({ params }: LangParams) {
  await resolveLocale(params);
  return <HomeContent />;
}
