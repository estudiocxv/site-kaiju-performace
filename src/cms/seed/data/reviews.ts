import type { Review } from './types';

/**
 * Avaliações 5 estrelas da Kaiju no Google Maps, com texto e fotos
 * como os clientes publicaram. Para incluir outra, adicione um item;
 * as fotos vão em _research/avaliacoes e entram com `npm run media`.
 */
export const reviews: Review[] = [
  {
    author: 'Fabio Mateus Bello',
    rating: 5,
    text: 'super recomendo a kaiju performance meu Audi a3 passou por várias oficinas e nemhuma acertava o carro só dinheiro jogado fora até conhecer os profissionais da kaiju performance resolveram meu carro está acertado rodando liso mais uma vez muito obrigado 🙏🏻',
    photos: [
      { src: '/media/avaliacoes/fabio-1.jpg', alt: 'Audi A3 prata na oficina da Kaiju, foto do cliente' },
      { src: '/media/avaliacoes/fabio-2.jpg', alt: 'Motor do Audi A3 aberto durante o serviço, foto do cliente' },
      { src: '/media/avaliacoes/fabio-3.jpg', alt: 'Audi A3 dentro da oficina, foto do cliente' },
      { src: '/media/avaliacoes/fabio-4.jpg', alt: 'Painel e manômetros do Audi A3, foto do cliente' },
    ],
    url: 'https://maps.app.goo.gl/h1R71RDEjLFKV42K6',
  },
  {
    author: 'Mirele Alves',
    rating: 5,
    text: 'Meu marido conheceu por acaso devido o carro ter quebrado próximo. O trabalho é excelente, são muito profissionais e atenciosos. Trataram o diálogo com transparência e honestidade. São muito educados, recomendo e já tenho meu local favorito e de confiança para manutenção do meu veículo que já é um idoso de 33 anos e merece cuidados especiais.',
    photos: [{ src: '/media/avaliacoes/mirele-1.jpg', alt: 'Serviços feitos no Gol 1.6 CHT da cliente, foto da cliente' }],
    url: 'https://maps.app.goo.gl/iZXXg3RQhuk5Rzsh6',
  },
  {
    author: 'Otávio Pavan',
    rating: 5,
    text: 'Novos donos são muito atenciosos, não tiveram preguiça em acertar meu carro, mesmo tendo varios problemas de carburador, ponto, ignição etc... rsrsrs. Preço justo com um atendimento muito bom!',
    photos: [],
    url: 'https://maps.app.goo.gl/qZpWL8eEyLVyD8Br8',
  },
  {
    author: 'Hugo Oliveira',
    rating: 5,
    text: 'Profissionais excelentes!!! Sem sombra de dúvidas essa é a melhor oficina e mais honesta que já vi em toda minha vida !!! VCS ME SALVARAM !!!!!',
    photos: [],
    url: 'https://maps.app.goo.gl/BxNs4yP58pFw4fJX7',
  },
  {
    author: 'Arthur Nascimento',
    rating: 5,
    text: 'Galera honesta e dedicada resolvem o seu problema e mais umpouco,mecheram no meu carro e deixaram exatamente do jeito que eu queria,recomendo de olhos fechados',
    photos: [],
    url: 'https://maps.app.goo.gl/jeu82netWPyARaRS9',
  },
];
