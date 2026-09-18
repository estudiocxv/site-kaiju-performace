import type { Stage, Vehicle, VehicleCategory } from './types';

/**
 * Funções do catálogo de remap. Não guardam dados: recebem a lista que vem
 * do painel (getVehicles em cms.ts), então servem tanto no servidor quanto
 * nos componentes do navegador.
 */

const collator = new Intl.Collator('pt-BR', { numeric: true, sensitivity: 'base' });

export const sortVehicles = (list: Vehicle[]) =>
  [...list].sort(
    (a, b) =>
      collator.compare(a.brand, b.brand) || collator.compare(a.family, b.family) || collator.compare(a.version, b.version),
  );

/** Só o que a busca e a ficha precisam no navegador (sem textos longos). */
export type VehicleSummary = Pick<Vehicle, 'slug' | 'brand' | 'family' | 'version' | 'years' | 'category' | 'stages'>;

export const summarize = (list: Vehicle[]): VehicleSummary[] =>
  list.map(({ slug, brand, family, version, years, category, stages }) => ({
    slug,
    brand,
    family,
    version,
    years,
    category,
    stages,
  }));

export const brandsOf = (list: Pick<Vehicle, 'brand'>[]) => Array.from(new Set(list.map((v) => v.brand)));

/** Texto sem acentos e em minúsculas, para busca e URLs. */
export const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** "Mercedes-Benz" -> "mercedes-benz", "Citroën" -> "citroen" */
export const brandSlug = (brand: string) =>
  normalize(brand)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const brandFromSlug = (list: Pick<Vehicle, 'brand'>[], slug: string) =>
  brandsOf(list).find((b) => brandSlug(b) === slug);

export const searchVehicles = <T extends VehicleSummary>(list: T[], query: string) => {
  const q = normalize(query.trim());
  return q ? list.filter((v) => normalize(`${v.brand} ${v.family} ${v.version}`).includes(q)) : [];
};

/** Agrupa versões por "Marca · Modelo" (ou só modelo, se todas forem da mesma marca). */
export function groupByFamily<T extends VehicleSummary>(list: T[], withBrand = true) {
  const map = new Map<string, T[]>();
  for (const v of list) {
    const key = withBrand ? `${v.brand} · ${v.family}` : v.family;
    map.set(key, [...(map.get(key) ?? []), v]);
  }
  return [...map.entries()].map(([title, items]) => ({ title, items }));
}

export const familiesOf = (list: VehicleSummary[], brand: string) =>
  Array.from(new Set(list.filter((v) => v.brand === brand).map((v) => v.family)));

export const versionsOf = <T extends VehicleSummary>(list: T[], brand: string, family: string) =>
  list.filter((v) => v.brand === brand && v.family === family);

export const vehicleName = (v: Pick<Vehicle, 'brand' | 'version'>) => `${v.brand} ${v.version}`;

/** Ganho percentual calculado a partir dos números da ficha. */
export const gain = (from: number, to: number) => Math.round(((to - from) / from) * 100);

export const formatKgfm = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const cvText = (s: Stage) => s.cvText ?? String(s.cv);
export const kgfmText = (s: Stage) => s.kgfmText ?? formatKgfm(s.kgfm);

export const categoryLabel: Record<VehicleCategory, string> = {
  'turbo-gasolina': 'Turbo',
  diesel: 'Diesel',
  aspirado: 'Aspirado',
};
