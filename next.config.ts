import type { NextConfig } from 'next';

// Legacy case-study aliases -> canonical slugs (they used to render duplicate pages).
const ALIASES: Record<string, string> = {
  'finance-ai-manager': 'finance-management-app',
  'role-sieve': 'rolesieve',
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // Served via the Next.js image optimizer: per-device sizes in AVIF/WebP.
    // Never enable `dangerouslyAllowSVG` — SVG optimization is an RCE vector.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return Object.entries(ALIASES).flatMap(([alias, slug]) => [
      { source: `/projects/${alias}`, destination: `/projects/${slug}`, permanent: true },
      { source: `/:lang(ru|kk)/projects/${alias}`, destination: `/:lang/projects/${slug}`, permanent: true },
    ]);
  },
  async headers() {
    // /api/cv sets its own download headers; this covers direct links to the static file.
    return [
      {
        source: '/dias_yermek_cv.pdf',
        headers: [
          { key: 'Content-Disposition', value: 'attachment; filename="Dias_Yermek_CV.pdf"' },
          { key: 'Content-Type', value: 'application/pdf' },
        ],
      },
    ];
  },
};

export default nextConfig;
