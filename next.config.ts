import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 80],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // fotos do painel (/api/midia/file/...) e arquivos fixos de /public
    // fotos do painel na Vercel (Vercel Blob)
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
    localPatterns: [{ pathname: '/api/midia/file/**' }, { pathname: '/media/**' }, { pathname: '/brand/**' }, { pathname: '/*' }],
  },
  experimental: {
    // o site e o painel têm layouts raiz diferentes; o 404 geral fica em app/global-not-found.tsx
    globalNotFound: true,
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

export default withPayload(nextConfig, { devBundleServerPackages: false });
