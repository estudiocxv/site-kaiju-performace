import fs from 'node:fs';
import path from 'node:path';
import type { Payload } from 'payload';
import type { Photo, Stage, Vehicle } from './data/types';
import armada from './data/armada.json';
import { events } from './data/events';
import { reviews } from './data/reviews';
import { process as processSteps, services, stageExplained } from './data/services';
import { site } from './data/site';
import { homeTexts, KAIJU_FAMILY, remapTexts, seoTexts } from './data/texts';
import { kaijuVehicles, type KaijuVehicle } from './data/vehicles-kaiju';

/**
 * Carrega no banco tudo que o site tinha antes do painel.
 *
 * Cada parte só é preenchida se estiver vazia, então rodar de novo não duplica
 * nada nem desfaz o que o dono já mudou pelo painel. Roda com `npm run seed`
 * (e sozinho no build, antes do `next build`).
 */

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
};

const publicDir = path.resolve(process.cwd(), 'public');

type MediaRef = { src: string; alt: string; credit?: string };

function mediaUploader(payload: Payload) {
  const ids = new Map<string, number>();

  return async function upload(ref: MediaRef | undefined): Promise<number | undefined> {
    if (!ref) return undefined;
    const known = ids.get(ref.src);
    if (known) return known;

    // "/media/eventos/expo-dapper/01.jpg" -> "eventos-expo-dapper-01.jpg"
    const name = ref.src.replace(/^\/media\//, '').replace(/\//g, '-');
    const existing = await payload.find({ collection: 'midia', where: { filename: { equals: name } }, limit: 1, depth: 0 });
    if (existing.docs[0]) {
      ids.set(ref.src, existing.docs[0].id as number);
      return existing.docs[0].id as number;
    }

    const file = path.join(publicDir, ref.src);
    if (!fs.existsSync(file)) {
      payload.logger.warn(`seed: arquivo não encontrado ${file}`);
      return undefined;
    }
    const data = fs.readFileSync(file);
    const doc = await payload.create({
      collection: 'midia',
      data: { alt: ref.alt, credit: ref.credit },
      file: { data, name, size: data.length, mimetype: MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream' },
    });
    ids.set(ref.src, doc.id as number);
    return doc.id as number;
  };
}

const isEmpty = async (payload: Payload, collection: 'veiculos' | 'servicos' | 'avaliacoes' | 'eventos') =>
  (await payload.count({ collection })).totalDocs === 0;

const instagram = (shortcode?: string) => (shortcode ? `https://www.instagram.com/p/${shortcode}/` : undefined);

const toStages = (stages: Stage[]) =>
  stages.map((s) => ({
    name: s.name,
    cv: s.cv,
    kgfm: s.kgfm,
    cvText: s.cvText,
    kgfmText: s.kgfmText,
    upgrades: s.upgrades,
  }));

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

export async function seed(payload: Payload) {
  const upload = mediaUploader(payload);
  const log = (msg: string) => payload.logger.info(`seed: ${msg}`);

  // ——— acesso ———
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if ((await payload.count({ collection: 'usuarios' })).totalDocs === 0) {
    if (ADMIN_EMAIL && ADMIN_PASSWORD) {
      await payload.create({ collection: 'usuarios', data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'Kaiju' } });
      log(`usuário ${ADMIN_EMAIL} criado`);
    } else {
      payload.logger.warn('seed: nenhum usuário no painel. Defina ADMIN_EMAIL e ADMIN_PASSWORD e rode de novo.');
    }
  }

  // ——— catálogo ———
  if (await isEmpty(payload, 'veiculos')) {
    const kaiju = kaijuVehicles.map(fromKaiju);
    const all: (Vehicle & { origin: 'kaiju' | 'armada' })[] = [
      ...kaiju.map((v) => ({ ...v, origin: 'kaiju' as const })),
      ...(armada as unknown as Vehicle[]).map((v) => ({ ...v, origin: 'armada' as const })),
    ];
    for (const v of all) {
      await payload.create({
        collection: 'veiculos',
        data: {
          published: true,
          origin: v.origin,
          slug: v.slug,
          brand: v.brand,
          family: v.family,
          version: v.version,
          years: v.years,
          category: v.category,
          stages: toStages(v.stages),
          engine: v.engine,
          specs: v.specs,
          notes: v.notes?.map((text) => ({ text })),
          poster: await upload(v.poster),
          instagram: instagram(v.source?.shortcode),
          instagramDate: v.source?.date ? `${v.source.date}T12:00:00.000Z` : undefined,
          publishedResult: v.publishedResult
            ? {
                title: v.publishedResult.title,
                text: v.publishedResult.text,
                instagram: instagram(v.publishedResult.source.shortcode),
              }
            : undefined,
        },
      });
    }
    log(`${all.length} versões no catálogo`);
  }

  // ——— serviços ———
  if (await isEmpty(payload, 'servicos')) {
    for (const s of services) {
      await payload.create({
        collection: 'servicos',
        data: {
          name: s.name,
          lead: s.lead,
          items: s.items.map((text) => ({ text })),
          photo: (await upload(s.photo)) as number,
          cta: s.cta,
        },
      });
    }
    log(`${services.length} serviços`);
  }

  // ——— avaliações ———
  if (await isEmpty(payload, 'avaliacoes')) {
    for (const r of reviews) {
      const photos: number[] = [];
      for (const p of r.photos) {
        const id = await upload(p);
        if (id) photos.push(id);
      }
      await payload.create({
        collection: 'avaliacoes',
        data: { author: r.author, rating: String(r.rating) as '5', text: r.text, photos, url: r.url },
      });
    }
    log(`${reviews.length} avaliações`);
  }

  // ——— eventos ———
  if (await isEmpty(payload, 'eventos')) {
    for (const ev of events) {
      const photos: number[] = [];
      for (const p of ev.photos as Photo[]) {
        const id = await upload(p);
        if (id) photos.push(id);
      }
      await payload.create({
        collection: 'eventos',
        data: {
          name: ev.name,
          date: ev.date,
          place: ev.place,
          text: ev.text,
          photos,
          instagram: instagram(ev.source.shortcode),
        },
      });
    }
    log(`${events.length} eventos`);
  }

  // ——— textos da página inicial ———
  const home = await payload.findGlobal({ slug: 'pagina-inicial', depth: 0 });
  if (!home.hero?.line1) {
    const { hero, about } = homeTexts;
    await payload.updateGlobal({
      slug: 'pagina-inicial',
      data: {
        hero: {
          line1: hero.line1,
          line2: hero.line2,
          highlight: hero.highlight,
          lead: hero.lead,
          primaryButton: hero.primaryButton,
          secondaryButton: hero.secondaryButton,
          videoWide: await upload(hero.media.videoWide),
          posterWide: await upload(hero.media.posterWide),
          videoTall: await upload(hero.media.videoTall),
          posterTall: await upload(hero.media.posterTall),
        },
        about: {
          label: about.label,
          title: about.title,
          paragraphs: about.paragraphs.map((text) => ({ text })),
          motto: about.motto,
          signatureName: about.signatureName,
          signatureTagline: about.signatureTagline,
          signatureLine: about.signatureLine,
          facts: about.facts,
          mainPhoto: (await upload(about.media.mainPhoto)) as number,
          secondPhoto: await upload(about.media.secondPhoto),
          mainCaption: about.mainCaption,
        },
        process: { ...homeTexts.process, steps: processSteps },
        services: homeTexts.services,
        stages: {
          ...homeTexts.stages,
          stage1: stageExplained.stage1,
          stage2: stageExplained.stage2,
          warning: stageExplained.warning,
        },
        remap: homeTexts.remap,
        reviews: homeTexts.reviews,
        events: homeTexts.events,
        contact: homeTexts.contact,
      },
    });
    log('textos da página inicial');
  }

  const remap = await payload.findGlobal({ slug: 'textos-remap', depth: 0 });
  if (!remap.disclaimer) {
    await payload.updateGlobal({ slug: 'textos-remap', data: remapTexts });
    log('textos do remap');
  }

  const company = await payload.findGlobal({ slug: 'empresa', depth: 0 });
  if (!company.name) {
    await payload.updateGlobal({
      slug: 'empresa',
      data: {
        name: site.name,
        category: site.category,
        cnpj: site.cnpj,
        slogan: site.slogan,
        signature: site.signature,
        bio: site.bio.map((text) => ({ text })),
        whatsapp: { ...site.whatsapp },
        address: {
          street: site.address.street,
          district: site.address.district,
          city: site.address.city,
          state: site.address.state,
          zip: site.address.zip,
        },
        schedule: site.schedule,
        social: { ...site.social },
        url: process.env.SITE_URL || site.url,
      },
    });
    log('dados da empresa');
  }

  const seo = await payload.findGlobal({ slug: 'seo', depth: 0 });
  if (!seo.title) {
    await payload.updateGlobal({ slug: 'seo', data: seoTexts });
    log('Google e compartilhamento');
  }
}
