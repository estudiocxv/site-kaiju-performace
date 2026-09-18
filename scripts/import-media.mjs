/**
 * Importa e otimiza as mídias do Instagram da Kaiju para /public/media.
 *
 * Origem: ../_research/media (baixado com _research/fetch-media.mjs)
 * Uso:    npm run media
 *
 * Para adicionar uma foto nova: coloque o arquivo em _research/media
 * e inclua uma linha no mapa IMAGES abaixo (origem -> destino).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(root, '..', '_research', 'media');
const OUT = path.join(root, 'public', 'media');
const ffmpeg = createRequire(path.join(root, '..', '_research', 'package.json'))('ffmpeg-static');

const series = (dir, ids) => Object.fromEntries(ids.map((id, i) => [id, `${dir}/${String(i + 1).padStart(2, '0')}`]));

/** origem (sem extensão) -> destino (sem extensão), relativo a public/media */
const IMAGES = {
  // Oficina (quadros dos vídeos institucionais)
  f18_2: 'oficina/letreiro-neon',
  f18_6: 'oficina/painel-ferramentas',
  f18_7: 'oficina/entrada',
  f18_11: 'oficina/equipe-trabalhando',
  f57_0: 'oficina/fachada',
  f57_2: 'oficina/monza-elevador',
  f57_4: 'oficina/motor-montado',
  f57_9: 'oficina/box-elevadores',
  f57_11: 'oficina/grafite',
  f57_13: 'oficina/mural-kaiju',
  f45_3: 'oficina/opala-ss-lavagem',
  f48_1: 'oficina/acerto-de-mapa',
  91: 'oficina/fueltech-carburador',
  'ac-painel': 'servicos/ar-condicionado', // quadro do vídeo de ar-condicionado, sem a legenda

  // Eventos
  ...series('eventos/inauguracao', ['80_0', '80_14', '80_12', '80_13', '80_17', '80_15', '78_1']),
  ...series('eventos/expo-dapper', ['31_1', '31_7', '31_6', '31_5', '31_9', '31_2', '31_3', '31_8', '31_10', '31_11']),

  // Artes técnicas de remap publicadas pela Kaiju
  1: 'remap/fusion-ecoboost',
  2: 'remap/jetta-tsi-audi-a3',
  3: 'remap/virtus-nivus-tcross',
  4: 'remap/golf-gti-jetta-tsi',
  5: 'remap/l200-triton',
  6: 'remap/ranger',
  7: 'remap/s10',
  8: 'remap/cruze',
  9: 'remap/camaro-ss',
  10: 'remap/hilux-sw4',
  11: 'remap/amarok',
  12: 'remap/compass-toro',
  13: 'remap/frontier',
  14: 'remap/familia-prince',
  15: 'remap/bmw-f30',
  16: 'remap/polo-up-tsi',
  21: 'servicos/bomba-de-alta-thp',
};

const VIDEOS = [
  // [origem, destino, início(s), duração(s), largura]
  ['18', 'video/oficina-horizontal', 7.2, 28.5, 1280],
  ['57', 'video/oficina-vertical', 0, 27, 540],
];

function ensureDir(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

async function images() {
  const manifest = {};
  for (const [from, to] of Object.entries(IMAGES)) {
    const src = path.join(SRC, `${from}.jpg`);
    const dest = path.join(OUT, `${to}.jpg`);
    if (!fs.existsSync(src)) {
      console.warn('faltando', from);
      continue;
    }
    ensureDir(dest);
    const info = await sharp(src)
      .rotate()
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(dest);
    manifest[`/media/${to}.jpg`] = { width: info.width, height: info.height };
  }
  return manifest;
}

/** Fotos enviadas pela Kaiju (pasta _research/enviadas). */
const FOTOS_ENVIADAS = {
  'amarok-diagnostico.jpg': 'servicos/diagnostico-eletrica',
  'kess-gravacao.png': 'servicos/remap-stage',
  'fusion-elevador.jpg': 'servicos/mecanica-revisao',
  'bmw-e46.jpg': 'oficina/bmw-e46',
};

async function enviadas() {
  const dir = path.join(root, '..', '_research', 'enviadas');
  const manifest = {};
  for (const [from, to] of Object.entries(FOTOS_ENVIADAS)) {
    const src = path.join(dir, from);
    if (!fs.existsSync(src)) {
      console.warn('faltando', from);
      continue;
    }
    const dest = path.join(OUT, `${to}.jpg`);
    ensureDir(dest);
    const info = await sharp(src)
      .rotate()
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(dest);
    manifest[`/media/${to}.jpg`] = { width: info.width, height: info.height };
  }
  return manifest;
}

/** Fotos das avaliações do Google (baixadas em _research/avaliacoes). */
async function reviews() {
  const dir = path.join(root, '..', '_research', 'avaliacoes');
  const manifest = {};
  if (!fs.existsSync(dir)) return manifest;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.jpg'))) {
    const dest = path.join(OUT, 'avaliacoes', file);
    ensureDir(dest);
    const info = await sharp(path.join(dir, file))
      .rotate()
      .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(dest);
    manifest[`/media/avaliacoes/${file}`] = { width: info.width, height: info.height };
  }
  return manifest;
}

async function logo() {
  // Quadro final do vídeo institucional traz o logotipo sobre fundo preto.
  const frame = path.join(SRC, 'logo-frame.png');
  execFileSync(ffmpeg, ['-y', '-ss', '37.2', '-i', path.join(SRC, '18.mp4'), '-frames:v', '1', frame], { stdio: 'pipe' });
  const dest = path.join(root, 'public', 'brand', 'kaiju-mark.png');
  ensureDir(dest);
  const trimmed = await sharp(frame)
    .trim({ background: '#000000', threshold: 40 })
    .extend({ top: 8, bottom: 8, left: 8, right: 8, background: '#000000' })
    .toBuffer();
  // o vídeo tem gradação lavada: devolve o branco e o vermelho da marca
  const graded = await sharp(trimmed).linear(1.45, -38).modulate({ saturation: 1.6 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });

  // fundo preto -> transparente: alfa = canal mais forte, cor "desmultiplicada"
  const { data, info: meta } = graded;
  const rgba = Buffer.alloc(meta.width * meta.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const a = Math.max(data[i], data[i + 1], data[i + 2]);
    const k = a ? 255 / a : 0;
    rgba[j] = Math.min(255, data[i] * k);
    rgba[j + 1] = Math.min(255, data[i + 1] * k);
    rgba[j + 2] = Math.min(255, data[i + 2] * k);
    rgba[j + 3] = a < 18 ? 0 : a;
  }
  const info = await sharp(rgba, { raw: { width: meta.width, height: meta.height, channels: 4 } }).png().toFile(dest);
  return { '/brand/kaiju-mark.png': { width: info.width, height: info.height } };
}

async function videos() {
  const manifest = {};
  for (const [from, to, ss, t, width] of VIDEOS) {
    const src = path.join(SRC, `${from}.mp4`);
    const mp4 = path.join(OUT, `${to}.mp4`);
    const poster = path.join(OUT, `${to}.jpg`);
    ensureDir(mp4);
    execFileSync(ffmpeg, [
      '-y', '-ss', String(ss), '-t', String(t), '-i', src,
      '-an', '-vf', `scale=${width}:-2,fps=30`,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart', mp4,
    ], { stdio: 'pipe' });
    const tmp = poster + '.png';
    execFileSync(ffmpeg, ['-y', '-ss', String(ss + 0.05), '-i', src, '-frames:v', '1', '-vf', `scale=${width}:-2`, tmp], { stdio: 'pipe' });
    const info = await sharp(tmp).jpeg({ quality: 72, mozjpeg: true }).toFile(poster);
    fs.rmSync(tmp);
    manifest[`/media/${to}.jpg`] = { width: info.width, height: info.height };
    console.log(to, (fs.statSync(mp4).size / 1024 / 1024).toFixed(2) + ' MB');
  }
  return manifest;
}

async function brandAssets() {
  const mark = path.join(root, 'public', 'brand', 'kaiju-mark.png');

  // imagem de compartilhamento (Open Graph): logotipo completo sobre preto,
  // recortado do topo de uma das artes publicadas pela Kaiju
  const logo = await sharp(path.join(OUT, 'remap', 'fusion-ecoboost.jpg'))
    .extract({ left: 330, top: 12, width: 600, height: 168 })
    .resize({ width: 880 })
    .toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#000000' } })
    .composite([{ input: logo, gravity: 'center', blend: 'screen' }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(root, 'public', 'og.jpg'));

  // ícone: o "K" do logotipo sobre preto
  const { height } = await sharp(mark).metadata();
  const k = await sharp(mark).extract({ left: 0, top: 0, width: 100, height }).resize({ height: 300 }).toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: '#000000' } })
    .composite([{ input: k, gravity: 'center' }])
    .png()
    .toFile(path.join(root, 'public', 'icon.png'));
  return {};
}

const only = process.argv[2];
const dims = {
  ...(only && only !== 'images' ? {} : await images()),
  ...(only && only !== 'reviews' ? {} : await reviews()),
  ...(only && only !== 'enviadas' ? {} : await enviadas()),
  ...(only && only !== 'logo' ? {} : await logo()),
  ...(only && only !== 'brand' ? {} : await brandAssets()),
  ...(only && only !== 'videos' ? {} : await videos()),
};

const dimsFile = path.join(root, 'src', 'content', 'media-dimensions.json');
const prev = fs.existsSync(dimsFile) ? JSON.parse(fs.readFileSync(dimsFile, 'utf8')) : {};
ensureDir(dimsFile);
fs.writeFileSync(dimsFile, JSON.stringify({ ...prev, ...dims }, null, 2) + '\n');
console.log('imagens:', Object.keys(dims).length);
