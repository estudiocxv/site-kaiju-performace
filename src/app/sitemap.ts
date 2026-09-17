import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { brands, brandSlug, vehicles } from '@/content/vehicles';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => `${site.url}${path}`;
  return [
    { url: u('/'), changeFrequency: 'weekly', priority: 1 },
    { url: u('/remap'), changeFrequency: 'monthly', priority: 0.9 },
    ...brands.map((b) => ({ url: u(`/remap/marcas/${brandSlug(b)}`), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...vehicles.map((v) => ({ url: u(`/remap/${v.slug}`), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
