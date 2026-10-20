/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/dias_yermek_cv.pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Dias_Yermek_CV.pdf"',
          },
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
        ],
      },
      {
        source: '/api/cv',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Dias_Yermek_CV.pdf"',
          },
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
