import { notFound } from 'next/navigation';

// Any unknown path inside a locale renders the localized app/[lang]/not-found page
// (with the site layout) instead of the framework's bare 404.
export default function CatchAll() {
  notFound();
}
