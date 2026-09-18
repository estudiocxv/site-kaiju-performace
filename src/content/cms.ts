import 'server-only';
import config from '@payload-config';
import { getPayload } from 'payload';
import { cache } from 'react';
import type { Midia as Media, PaginaInicial, TextosRemap } from '@/payload-types';
import type { KaijuEvent, Photo, Review, Service, Stage, Vehicle, VehicleCategory } from './types';
import { sortVehicles } from './vehicles';

/**
 * Tudo que o site mostra vem daqui, lido do banco do painel (/admin).
 * As páginas são geradas uma vez e guardadas; quando o dono salva algo no
 * painel, o cache é descartado (src/cms/revalidate.ts) e elas são refeitas.
 */

const payload = () => getPayload({ config });

/** Foto do painel no formato que os componentes usam. */
export function toPhoto(m: number | Media | null | undefined): Photo | undefined {
  if (!m || typeof m === 'number' || !m.url) return undefined;
  return {
    src: m.url,
    alt: m.alt,
    credit: m.credit ?? undefined,
    width: m.width ?? undefined,
    height: m.height ?? undefined,
  };
}

const photos = (list: (number | Media)[] | null | undefined) =>
  (list ?? []).map(toPhoto).filter((p): p is Photo => Boolean(p));

const texts = (list: { text: string }[] | null | undefined) => (list ?? []).map((i) => i.text);

// ——— empresa ———

export const getSite = cache(async () => {
  const c = await (await payload()).findGlobal({ slug: 'empresa', depth: 0 });
  const address = {
    street: c.address.street,
    district: c.address.district,
    city: c.address.city,
    state: c.address.state,
    zip: c.address.zip,
  };
  const social = {
    instagram: c.social?.instagram ?? '',
    instagramHandle: c.social?.instagramHandle ?? '',
    facebook: c.social?.facebook ?? '',
    googleReviews: c.social?.googleReviews ?? '',
  };
  return {
    name: c.name,
    url: c.url.replace(/\/$/, ''),
    category: c.category,
    cnpj: c.cnpj ?? '',
    city: address.city,
    state: address.state,
    bio: texts(c.bio),
    slogan: c.slogan ?? '',
    signature: c.signature ?? '',
    whatsapp: { display: c.whatsapp.display, number: c.whatsapp.number },
    address,
    schedule: c.schedule ?? '',
    social,
    fullAddress: `${address.street} – ${address.district}, ${address.city}/${address.state} · CEP ${address.zip.replace('-', '‑')}`,
    mapsQuery: encodeURIComponent(
      `${address.street.replace(',', '')}, ${address.district}, ${address.city} - ${address.state}, ${address.zip}`,
    ),
  };
});

export type Site = Awaited<ReturnType<typeof getSite>>;

// ——— textos ———

export const getHome = cache(async () => {
  const h: PaginaInicial = await (await payload()).findGlobal({ slug: 'pagina-inicial', depth: 1 });
  return {
    hero: {
      ...h.hero,
      videoWide: toPhoto(h.hero.videoWide),
      videoTall: toPhoto(h.hero.videoTall),
      posterWide: toPhoto(h.hero.posterWide),
      posterTall: toPhoto(h.hero.posterTall),
    },
    about: {
      ...h.about,
      paragraphs: texts(h.about.paragraphs),
      facts: h.about.facts ?? [],
      mainPhoto: toPhoto(h.about.mainPhoto),
      secondPhoto: toPhoto(h.about.secondPhoto),
    },
    process: { ...h.process, steps: (h.process.steps ?? []).map(({ title, text }) => ({ title, text })) },
    services: h.services,
    stages: {
      ...h.stages,
      stage1: { ...h.stages.stage1, points: h.stages.stage1.points ?? [] },
      stage2: { ...h.stages.stage2, points: h.stages.stage2.points ?? [] },
    },
    remap: h.remap,
    reviews: h.reviews,
    events: h.events,
    contact: h.contact,
  };
});

export type Home = Awaited<ReturnType<typeof getHome>>;

export const getRemapTexts = cache(async () => {
  const r: TextosRemap = await (await payload()).findGlobal({ slug: 'textos-remap', depth: 0 });
  const benefits: Record<VehicleCategory, string[]> = {
    'turbo-gasolina': r.benefits?.turbo ?? [],
    diesel: r.benefits?.diesel ?? [],
    aspirado: r.benefits?.aspirado ?? [],
  };
  return {
    disclaimer: r.disclaimer,
    notListed: { title: r.notListed?.title ?? '', text: r.notListed?.text ?? '' },
    benefits,
  };
});

export const getSeo = cache(async () => {
  const s = await (await payload()).findGlobal({ slug: 'seo', depth: 1 });
  return {
    title: s.title,
    description: s.description,
    shareTitle: s.shareTitle ?? s.title,
    shareImage: toPhoto(s.shareImage),
    keywords: s.keywords ?? [],
  };
});

// ——— listas ———

export const getServices = cache(async (): Promise<Service[]> => {
  const { docs } = await (await payload()).find({ collection: 'servicos', depth: 1, limit: 100, sort: '_order' });
  return docs.map((s) => ({
    id: String(s.id),
    name: s.name,
    lead: s.lead,
    items: texts(s.items),
    photo: toPhoto(s.photo) ?? { src: '/og.jpg', alt: '' },
    cta: s.cta ?? undefined,
  }));
});

export const getReviews = cache(async (): Promise<Review[]> => {
  const { docs } = await (await payload()).find({ collection: 'avaliacoes', depth: 1, limit: 100, sort: '_order' });
  return docs.map((r) => ({
    author: r.author,
    rating: Number(r.rating) as Review['rating'],
    text: r.text,
    photos: photos(r.photos),
    url: r.url,
  }));
});

export const getEvents = cache(async (): Promise<KaijuEvent[]> => {
  const { docs } = await (await payload()).find({ collection: 'eventos', depth: 1, limit: 100, sort: '_order' });
  return docs.map((e) => ({
    id: String(e.id),
    name: e.name,
    date: e.date,
    place: e.place,
    text: e.text,
    photos: photos(e.photos),
    instagram: e.instagram ?? undefined,
  }));
});

export const getVehicles = cache(async (): Promise<Vehicle[]> => {
  const { docs } = await (await payload()).find({
    collection: 'veiculos',
    where: { published: { equals: true } },
    depth: 1,
    limit: 0, // todas
    pagination: false,
  });
  return sortVehicles(
    docs
      .filter((v) => v.slug && v.stages && v.stages.length >= 2)
      .map((v) => ({
        slug: v.slug as string,
        brand: v.brand.trim(),
        family: v.family.trim(),
        version: v.version.trim(),
        years: v.years ?? undefined,
        category: v.category as VehicleCategory,
        engine: v.engine ?? undefined,
        specs: v.specs?.map(({ label, value }) => ({ label, value })),
        stages: (v.stages ?? []).map(
          (s): Stage => ({
            name: s.name as Stage['name'],
            cv: s.cv,
            kgfm: s.kgfm,
            cvText: s.cvText ?? undefined,
            kgfmText: s.kgfmText ?? undefined,
            upgrades: s.upgrades?.length ? s.upgrades : undefined,
          }),
        ),
        notes: v.notes?.length ? texts(v.notes) : undefined,
        publishedResult:
          v.publishedResult?.title && v.publishedResult.text
            ? { title: v.publishedResult.title, text: v.publishedResult.text, instagram: v.publishedResult.instagram ?? undefined }
            : undefined,
        poster: toPhoto(v.poster),
        instagram: v.instagram ?? undefined,
        instagramDate: v.instagramDate ?? undefined,
      })),
  );
});
