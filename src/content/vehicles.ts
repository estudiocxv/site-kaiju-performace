import type { Stage, Vehicle, VehicleCategory } from './types';
import { kaijuVehicles, type KaijuVehicle } from './vehicles-kaiju';
import armada from './data/armada.json';

/**
 * Catálogo de remap do site: fichas publicadas pela Kaiju (vehicles-kaiju.ts)
 * + versões do catálogo da Armada Performance (data/armada.json, gerado por
 * `npm run armada`). Onde as duas tinham a mesma versão, ficou a da Kaiju.
 */

/** Agrupamento das fichas da Kaiju nos mesmos modelos do catálogo. */
const KAIJU_FAMILY: Record<string, string> = {
  'volkswagen-golf-gti-2-0-tsi': 'Golf',
  'volkswagen-jetta-2-0-tsi': 'Jetta',
  'volkswagen-polo-1-0-tsi': 'Polo',
  'volkswagen-up-tsi': 'UP!',
  'volkswagen-virtus-nivus-t-cross-200-tsi': 'Virtus',
  'volkswagen-amarok-2-0-bitdi': 'Amarok',
  'volkswagen-amarok-3-0-v6-tdi': 'Amarok',
  'audi-a3-1-4-tfsi': 'A3 / S3 / RS3',
  'bmw-320i-f30': 'Série 3',
  'bmw-328i-f30': 'Série 3',
  'bmw-118i-1-6-turbo': 'Série 1',
  'mini-cooper-s-1-6-turbo': 'Cooper',
  'peugeot-308-thp': '308',
  'citroen-c4-lounge-thp': 'C4 Lounge',
  'ford-fusion-2-0-ecoboost': 'Fusion',
  'ford-ranger-3-2-duratorq': 'Ranger',
  'ford-ranger-2-0-ecoblue': 'Ranger',
  'chevrolet-camaro-ss-6-2': 'Camaro',
  'chevrolet-cruze-1-4-turbo': 'Cruze',
  'chevrolet-s10-2-8-ctdi': 'S10',
  'toyota-hilux-3-0-d-4d': 'Hilux',
  'toyota-sw4-3-0-d-4d': 'Hilux',
  'mitsubishi-l200-triton-3-2-di-d': 'L200',
  'mitsubishi-l200-triton-2-4-mivec': 'L200',
  'nissan-frontier-2-5-dci': 'Frontier',
  'nissan-frontier-2-3-bi-turbo': 'Frontier',
  'jeep-compass-2-0-multijet': 'Compass',
  'fiat-toro-2-0-multijet': 'Toro',
};

function fromKaiju(k: KaijuVehicle): Vehicle {
  const stage = (name: Stage['name'], f: KaijuVehicle['original'], upgrades?: string[]): Stage => ({
    name,
    cv: f.cv,
    kgfm: f.kgfm,
    ...(f.cvPlus ? { cvText: `${f.cv}+` } : {}),
    ...(upgrades ? { upgrades } : {}),
  });
  return {
    slug: k.slug,
    brand: k.brand,
    family: KAIJU_FAMILY[k.slug] ?? k.model,
    version: `${k.model} ${k.engine}`,
    years: k.years,
    category: k.category,
    specs: k.specs,
    stages: [stage('Original', k.original), stage('Stage 1', k.stage1), stage('Stage 2', k.stage2, k.stage2Upgrades)],
    notes: k.notes,
    publishedResult: k.publishedResult,
    poster: k.poster,
    source: k.source,
  };
}

const collator = new Intl.Collator('pt-BR', { numeric: true, sensitivity: 'base' });

export const vehicles: Vehicle[] = [...kaijuVehicles.map(fromKaiju), ...(armada as unknown as Vehicle[])].sort(
  (a, b) => collator.compare(a.brand, b.brand) || collator.compare(a.family, b.family) || collator.compare(a.version, b.version),
);

export const brands = Array.from(new Set(vehicles.map((v) => v.brand)));

export const familiesOf = (brand: string) => Array.from(new Set(vehicles.filter((v) => v.brand === brand).map((v) => v.family)));

export const versionsOf = (brand: string, family: string) => vehicles.filter((v) => v.brand === brand && v.family === family);

export const vehicleName = (v: Vehicle) => `${v.brand} ${v.version}`;

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);

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

/** Benefícios que a Kaiju lista nas publicações de remap. */
export const remapBenefits: Record<VehicleCategory, string[]> = {
  'turbo-gasolina': [
    'Melhor resposta de pedal',
    'Retomadas mais fortes',
    'Mais potência e torque em toda a faixa de giro',
    'Mapeamento personalizado conforme combustível e preparação',
    'Possibilidade de remoção do limitador de velocidade',
  ],
  diesel: [
    'Mais torque em baixa e média rotação',
    'Melhor resposta de pedal',
    'Retomadas mais fortes',
    'Mais força para carga, reboque, estrada e off-road',
    'Possibilidade de remoção do limitador de velocidade',
    'Mapeamento personalizado conforme o uso',
  ],
  aspirado: [
    'Melhor resposta de pedal',
    'Retomadas mais fortes',
    'Ganho de potência e torque',
    'Acerto personalizado',
    'Remoção do limitador de velocidade',
  ],
};

export const remapDisclaimer =
  'Valores aproximados. Os resultados podem variar conforme ano, versão, combustível, câmbio, condição mecânica e configuração dos upgrades.';
