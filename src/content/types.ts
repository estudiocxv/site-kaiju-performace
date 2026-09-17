/**
 * Tipos do conteúdo do site.
 *
 * Todo o conteúdo mora em src/content como dados tipados. Um futuro painel
 * administrativo (ou CMS) só precisa devolver objetos nestes formatos para
 * as páginas continuarem funcionando.
 */

/** Referência a um post do Instagram usado como fonte da informação. */
export type InstagramSource = {
  shortcode: string;
  date: string; // AAAA-MM-DD
};

export type Photo = {
  src: string; // caminho em /public
  alt: string;
  credit?: string; // @perfil quando a foto é de terceiros
};

export type StageFigures = {
  cv: number;
  kgfm: number;
  /** "300+ cv" — a Kaiju publicou só o piso */
  cvPlus?: boolean;
};

export type VehicleCategory = 'turbo-gasolina' | 'diesel' | 'aspirado';

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  engine: string;
  years?: string;
  category: VehicleCategory;
  /** ficha original publicada: câmbio, tração, código do motor... */
  specs: { label: string; value: string }[];
  original: StageFigures;
  stage1: StageFigures;
  stage2: StageFigures;
  /** upgrades indicados pela Kaiju para o Stage 2 */
  stage2Upgrades: string[];
  notes?: string[];
  /** resultado de um carro real publicado pela Kaiju, quando existir */
  publishedResult?: {
    title: string;
    text: string;
    source: InstagramSource;
  };
  poster: Photo; // arte técnica publicada no Instagram
  source: InstagramSource;
};

export type Project = {
  slug: string;
  nickname?: string; // apelido dado pela Kaiju
  /** nome curto para o letreiro quando o carro não tem apelido */
  lettering?: string;
  car: string;
  kind: 'Preparação' | 'Stage 2' | 'Revisão' | 'Carro antigo';
  summary: string;
  work: string[];
  highlight?: string; // número/resultado publicado
  cover: Photo;
  photos: Photo[];
  source: InstagramSource;
  featured?: boolean;
};

export type Service = {
  id: string;
  name: string;
  lead: string;
  items: string[];
  photo: Photo;
  cta?: string; // mensagem pré-preenchida do WhatsApp
};

export type KaijuEvent = {
  id: string;
  name: string;
  date: string;
  place: string;
  text: string;
  photos: Photo[];
  source: InstagramSource;
};
