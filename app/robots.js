import { absoluteUrl } from '../src/lib/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
