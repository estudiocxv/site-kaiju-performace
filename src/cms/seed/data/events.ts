import type { KaijuEvent, Photo } from './types';

const photos = (dir: string, alts: string[], credit?: string): Photo[] =>
  alts.map((alt, i) => ({ src: `/media/eventos/${dir}/${String(i + 1).padStart(2, '0')}.jpg`, alt, credit }));

export const events: KaijuEvent[] = [
  {
    id: 'expo-dapper-2026',
    name: 'Expo Dapper Style 2026',
    date: '11 e 12 de abril de 2026',
    place: 'Recinto Mello Moraes, Bauru',
    text: 'Os projetos saíram da oficina para o meio da galera. Drift, arrancada e carros de rua no mesmo lugar, com muito ronco e resenha com os parceiros.',
    photos: photos('expo-dapper', [
      'Opala laranja no espaço da Kaiju na Expo Dapper',
      'BMW M4 Liberty Walk na Expo Dapper',
      'Ford Maverick no gramado da Expo Dapper',
      'Estande da Kaiju Performance com carro de capô aberto',
      'Equipe mostrando motor para visitantes',
      'Visitantes conversando no espaço da Kaiju',
      'Volante de Honda Civic',
      'Emblema Kaiju em carro exposto',
      'Integrante da Kaiju Performance no evento',
      'Integrante da Kaiju Performance de braços cruzados',
    ]),
    source: { shortcode: 'DX-A6ZjDym-', date: '2026-05-05' },
  },
  {
    id: 'inauguracao-2025',
    name: 'Inauguração da sede',
    date: '1º de maio de 2025',
    place: 'Rua Mauro de Almeida Rocha, Vila Industrial',
    text: 'Encontro de carros antigos e preparados na porta da oficina, com exposição da Lacreme Garage, show da banda SEO Groove, food truck e a Kaiju Crew.',
    photos: [
      ...photos(
        'inauguracao',
        [
          'Fachada da Kaiju Performance na inauguração com BMW, Nissan e Audi',
          'Opala preto no encontro de inauguração',
          'Brasília azul no encontro de inauguração',
          'Fuscas no encontro de inauguração',
          'BMW Série 1 com motor turbo exposto',
          'Motor preparado de Gol no encontro',
        ],
        '@elite_sp_cars',
      ),
      { src: '/media/eventos/inauguracao/07.jpg', alt: 'Gol GTS no encontro de inauguração ao entardecer', credit: '@lava_car_sc' },
    ],
    source: { shortcode: 'DI4d7_yvftL', date: '2025-04-25' },
  },
];
