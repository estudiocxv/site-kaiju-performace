import type { MetadataRoute } from 'next';
import { getSite, getVehicles } from '@/content/cms';
import { brandsOf, brandSlug } from '@/content/vehicles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, vehicles] = await Promise.all([getSite(), getVehicles()]);
  const u = (path: string) => `${site.url}${path}`;
  return [
    { url: u('/'), changeFrequency: 'weekly', priority: 1 },
    { url: u('/remap'), changeFrequency: 'monthly', priority: 0.9 },
    ...brandsOf(vehicles).map((b) => ({ url: u(`/remap/marcas/${brandSlug(b)}`), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...vehicles.map((v) => ({ url: u(`/remap/${v.slug}`), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
