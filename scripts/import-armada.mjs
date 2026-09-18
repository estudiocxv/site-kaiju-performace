/**
 * Converte o catálogo extraído da Armada Performance (_research/armada/armada.json)
 * para src/cms/seed/data/armada.json, no formato de versão usado pelo site.
 *
 * Uso: npm run armada
 * Para atualizar os dados: node ../_research/armada/crawl.mjs e depois este script.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const raw = JSON.parse(fs.readFileSync(path.join(root, '..', '_research', 'armada', 'armada.json'), 'utf8'));

/**
 * Marcas que o site publica. Honda, Lamborghini, Porsche e RAM ficaram de fora
 * a pedido da Kaiju; os dados continuam em _research/armada/armada.json, basta
 * voltar a marca aqui para ela reaparecer.
 */
const BRANDS_NO_SITE = new Set([
  'Audi',
  'BMW',
  'Chevrolet',
  'Fiat',
  'Ford',
  'Jeep',
  'Mercedes-Benz',
  'Mini',
  'Mitsubishi',
  'Renault',
  'Toyota',
  'Volkswagen',
]);

/** Versões que já existem nas fichas publicadas pela Kaiju: vale a da Kaiju. */
const DUPLICATES_OF_KAIJU = new Set([
  'audi-a3-1-4-8v',
  'bmw-320i',
  'bmw-328i-f30',
  'chevrolet-cruze-1-4-turbo',
  'chevrolet-cruze-rs-1-4-turbo',
  'chevrolet-s10',
  'fiat-toro',
  'ford-ranger-3-2',
  'ford-fusion',
  'jeep-compass',
  'mitsubishi-l200-triton',
  'mitsubishi-l200-triton-sport',
  'mitsubishi-l200-triton-sport-2',
  'toyota-hilux-7a-gen',
  'vw-amarok-2-0-tdi-2h',
  'vw-golf-gti-mk7-5',
  'golf-gti-mk7',
  'vw-jetta-2-0-tsi-1b-mk6-211cv',
  'vw-nivus-tsi',
  'vw-polo-tsi',
  'vw-t-cross-200-tsi',
  'vw-up-tsi',
  'vw-virtus',
]);

const BRAND_PREFIX = /^(vw|volkswagen|audi|bmw|mercedes(-benz)?|mini|ford|chevrolet|toyota|mitsubishi|jeep|fiat|honda|lamborghini|porsche|ram|renault)\s+/i;

function tidyVersion(name) {
  return name
    .replace(BRAND_PREFIX, '')
    .replace(/\bGOLF\b/g, 'Golf')
    .replace(/\bBoxter\b/g, 'Boxster')
    .replace(/\bTdi\b/g, 'TDI')
    .replace(/\bTfsi\b/g, 'TFSI')
    .replace(/\bv6\b/g, 'V6')
    .replace(/\s+–\s+/g, ' - ')
    .replace(/\((\d)a Gen\)/gi, '($1ª geração)')
    // códigos de chassi em maiúsculas: (f30) -> (F30)
    .replace(/\(([^)]+)\)/g, (m, inner) => (/[a-zà-ú]{4,}/i.test(inner) ? m : `(${inner.toUpperCase()})`))
    .replace(/\b(\d{3})cvs?\b/gi, '$1 cv')
    .replace(/\s+/g, ' ')
    .trim();
}

function category(v) {
  const t = `${v.name} ${v.engine}`.toLowerCase();
  if (/diesel|\btdi\b|\bd\b|30d|m50d|di-d/.test(t)) return 'diesel';
  if (/turbo|tsi|tfsi|biturbo|compressor/.test(t)) return 'turbo-gasolina';
  return 'aspirado';
}

const seen = new Map();
const out = [];
for (const v of raw) {
  if (!BRANDS_NO_SITE.has(v.brand)) continue;
  const slug = v.url.split('/').filter(Boolean).pop().replace(/^reprogramacao-de-(ecu|tcu)-/, '');
  if (DUPLICATES_OF_KAIJU.has(slug)) continue;

  // a Armada repete algumas versões idênticas em dois endereços
  const key = v.name + JSON.stringify(v.stages.map((s) => [s.cvText, s.kgfmText]));
  if (seen.has(key)) continue;
  seen.set(key, true);

  out.push({
    slug,
    brand: v.brand,
    family: v.model.replace(/\bBoxter\b/g, 'Boxster'),
    version: tidyVersion(v.name),
    engine: v.engine,
    category: category(v),
    stages: v.stages.map((s) => ({
      name: s.label,
      cv: s.cv,
      kgfm: s.kgfm,
      ...(s.cvText !== String(s.cv) ? { cvText: s.cvText } : {}),
      ...(s.kgfmText !== String(s.kgfm).replace('.', ',') ? { kgfmText: s.kgfmText } : {}),
      ...(s.mods.length ? { upgrades: s.mods } : {}),
    })),
  });
}

// versões com o mesmo nome dentro da marca ganham o motor/potência para diferenciar
const count = {};
out.forEach((v) => (count[v.brand + v.version] = (count[v.brand + v.version] || 0) + 1));
out.forEach((v) => {
  if (count[v.brand + v.version] > 1) v.version += ` ${v.stages[0].cvText ?? v.stages[0].cv} cv`;
});

const dest = path.join(root, 'src', 'cms', 'seed', 'data', 'armada.json');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 1) + '\n');
console.log('versões da Armada:', out.length, '| marcas:', new Set(out.map((v) => v.brand)).size);
