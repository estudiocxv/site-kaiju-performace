import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { vehicles } from '@/content/vehicles';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => `${site.url}${path}`;
  return [
    { url: u('/'), changeFrequency: 'weekly', priority: 1 },
    { url: u('/remap'), changeFrequency: 'monthly', priority: 0.9 },
    { url: u('/projetos'), changeFrequency: 'weekly', priority: 0.8 },
    ...vehicles.map((v) => ({ url: u(`/remap/${v.slug}`), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...projects.map((p) => ({ url: u(`/projetos/${p.slug}`), changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}
