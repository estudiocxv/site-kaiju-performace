import type { Photo, Project } from './types';

/**
 * Carros que passaram pela Kaiju, com o que foi feito conforme publicado
 * no Instagram.
 */

const photos = (slug: string, n: number, alts: string[]): Photo[] =>
  Array.from({ length: n }, (_, i) => ({
    src: `/media/projetos/${slug}/${String(i + 1).padStart(2, '0')}.jpg`,
    alt: alts[i] ?? alts[alts.length - 1],
  }));

export const projects: Project[] = [
  {
    slug: 'monza-89-turbo',
    lettering: 'Monza 89',
    car: 'Chevrolet Monza 1989',
    kind: 'Preparação',
    featured: true,
    summary:
      'Monza 89 com o visual clássico preservado e mecânica atual: turbo sob medida, FuelTech e interior com Recaro. Um sleeper que surpreende na rua.',
    highlight: '240 cv',
    work: [
      'Kit turbo sob medida',
      'Injeção programável FuelTech 300',
      'Painel estilo GSi',
      'Interior exclusivo com bancos Recaro',
    ],
    cover: { src: '/media/projetos/monza-turbo/01.jpg', alt: 'Chevrolet Monza 1989 turbo preparado pela Kaiju Performance' },
    photos: photos('monza-turbo', 9, [
      'Monza 1989 turbo de frente',
      'Monza 1989 turbo em três quartos',
      'Traseira do Monza 1989',
      'Motor do Monza com linha de combustível e bicos',
      'Interior do Monza com painel e bancos',
      'Emblema Turbo no para-lama do Monza',
      'Ponteira de escape do Monza',
      'Banco Recaro do Monza',
      'Adesivo Kaiju no vidro do Monza',
    ]),
    source: { shortcode: 'DOOhLozDgNH', date: '2025-09-05' },
  },
  {
    slug: 'gol-copa-1994-turbo',
    lettering: 'Gol Copa',
    car: 'VW Gol Copa 1994 turbo',
    kind: 'Carro antigo',
    featured: true,
    summary:
      'Placa preta e turbo, do jeito que a gente gosta. Revisão completa da embreagem com componentes de alta qualidade, respeitando a história do carro.',
    work: ['Revisão completa da embreagem', 'Componentes de alta qualidade', 'Mecânica em dia para o turbo'],
    cover: { src: '/media/projetos/gol-copa-turbo/01.jpg', alt: 'VW Gol Copa 1994 turbo na Kaiju Performance' },
    photos: photos('gol-copa-turbo', 8, [
      'Gol Copa 1994 em três quartos',
      'Gol Copa 1994 de frente',
      'Motor turbo do Gol Copa',
      'Traseira do Gol Copa 1994',
      'Lanternas do Gol Copa',
      'Interior do Gol Copa',
      'Painel e manômetro do Gol Copa',
      'Gol Copa 1994 de frente no galpão',
    ]),
    source: { shortcode: 'DTddPtRD0i-', date: '2026-01-13' },
  },
  {
    slug: 'caravan-1979',
    lettering: 'Caravan 79',
    featured: true,
    car: 'Chevrolet Caravan 1979',
    kind: 'Carro antigo',
    summary: 'Caravan com motor 2.5 e carburador 228, revisada para voltar ao uso com confiabilidade.',
    work: [
      'Revisão geral do carburador',
      'Cabo de embreagem reforçado',
      'Acerto nas molas traseiras',
      'Estética pela CarWash Bauru',
    ],
    cover: { src: '/media/projetos/caravan-1979/01.jpg', alt: 'Chevrolet Caravan 1979 na Kaiju Performance' },
    photos: photos('caravan-1979', 7, [
      'Caravan 1979 de frente',
      'Caravan 1979 de traseira',
      'Volante da Caravan 1979',
      'Farol e lanterna da Caravan',
      'Roda da Caravan',
      'Emblema da Caravan',
      'Detalhe da Caravan',
    ]),
    source: { shortcode: 'DQ5X_90D5dV', date: '2025-11-11' },
  },
  {
    slug: 'bmw-320i-gp-sport-2015',
    lettering: '320i GP',
    featured: true,
    car: 'BMW 320i GP Sport 2015',
    kind: 'Revisão',
    summary: 'Revisão preventiva completa para rodar sem dor de cabeça.',
    work: [
      'Troca de óleo e filtros',
      'Verificação completa de freios e suspensão',
      'Scanner e checagem eletrônica geral',
      'Reposição de fluidos',
      'Conferência de correias e componentes',
    ],
    cover: { src: '/media/projetos/bmw-320i-gp/01.jpg', alt: 'BMW 320i GP Sport 2015 na Kaiju Performance' },
    photos: photos('bmw-320i-gp', 10, [
      'BMW 320i GP Sport de frente',
      'BMW 320i GP Sport em detalhe',
      'Interior da BMW 320i',
      'Roda e pinça vermelha da BMW 320i',
      'Grade da BMW 320i',
      'Emblema BMW',
      'Emblema 320i',
      'Lateral da BMW 320i',
      'Traseira da BMW 320i',
      'BMW 320i GP Sport',
    ]),
    source: { shortcode: 'DKfLPicvnrp', date: '2025-06-04' },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectTitle = (p: Project) => p.lettering ?? p.car;
