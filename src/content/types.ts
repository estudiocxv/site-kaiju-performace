/**
 * Tipos do conteúdo que as páginas recebem.
 *
 * Os dados vêm do painel (/admin) e são convertidos para estes formatos em
 * src/content/cms.ts. Os componentes não conhecem o banco, só estes tipos.
 */

export type Photo = {
  src: string;
  alt: string;
  credit?: string; // @perfil quando a foto é de terceiros
  width?: number;
  height?: number;
};

export type VehicleCategory = 'turbo-gasolina' | 'diesel' | 'aspirado';

export type StageName = 'Original' | 'Stage 1' | 'Stage 2' | 'Stage 3';

export type Stage = {
  name: StageName;
  /** maior valor, usado nas barras e no ganho percentual */
  cv: number;
  kgfm: number;
  /** texto exibido quando não é um número simples: "380/440", "300+", "56,1" */
  cvText?: string;
  kgfmText?: string;
  /** modificações indicadas para a etapa */
  upgrades?: string[];
};

export type Vehicle = {
  slug: string;
  brand: string;
  /** modelo para agrupar versões: "Golf", "Série 3", "A3 / S3 / RS3" */
  family: string;
  /** nome exibido, sem a marca: "Golf GTI 2.0 TSI", "M340i (G20)" */
  version: string;
  years?: string;
  category: VehicleCategory;
  /** ficha do motor em texto corrido */
  engine?: string;
  /** ficha em tópicos: câmbio, tração, código do motor... */
  specs?: { label: string; value: string }[];
  /** sempre começa por Original */
  stages: Stage[];
  notes?: string[];
  /** resultado de um carro real publicado pela Kaiju, quando existir */
  publishedResult?: { title: string; text: string; instagram?: string };
  /** arte técnica publicada no Instagram */
  poster?: Photo;
  /** post de onde saíram os números, e a data dele (ISO) */
  instagram?: string;
  instagramDate?: string;
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
  instagram?: string;
};

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  photos: Photo[];
  /** link da avaliação no Google Maps */
  url: string;
};
