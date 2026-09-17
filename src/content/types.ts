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
  publishedResult?: {
    title: string;
    text: string;
    source: InstagramSource;
  };
  /** arte técnica publicada no Instagram (só fichas da Kaiju) */
  poster?: Photo;
  source?: InstagramSource;
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

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  photos: Photo[];
  /** link da avaliação no Google Maps */
  url: string;
};
