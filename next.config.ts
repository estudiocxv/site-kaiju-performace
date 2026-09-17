import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 80],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: '/media/:path*',
        // arquivos de /public não têm hash no nome: cache longo, mas revalidável
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
