/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // Served via the Next.js image optimizer: per-device sizes in AVIF/WebP.
    // Never enable `dangerouslyAllowSVG` — SVG optimization is an RCE vector.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    // Legacy case-study aliases -> canonical slugs (previously rendered duplicate pages).
    return [
      { source: '/projects/finance-ai-manager', destination: '/projects/finance-management-app', permanent: true },
      { source: '/projects/role-sieve', destination: '/projects/rolesieve', permanent: true },
    ];
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
