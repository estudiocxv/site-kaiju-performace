import type { Service } from './types';

/** Serviços divulgados pela Kaiju no Instagram (legendas de 2025 e 2026). */
export const services: Service[] = [
  {
    id: 'remap',
    name: 'Remap e Stage',
    lead: 'Reprogramação de ECU e câmbio com mapa desenvolvido para cada carro. Nada de mapa genérico.',
    items: [
      'Stage 1, Stage 2 e Stage 3',
      'Pré-avaliação completa antes de qualquer mapa',
      'Remoção do limitador de velocidade',
      'Pops & bangs sob medida',
      'Linha diesel, BMW, VW, Audi, Citroën, Peugeot, Fiat, Chevrolet, Ford, Jeep, Mercedes-Benz, Renault',
    ],
    photo: { src: '/media/oficina/acerto-de-mapa.jpg', alt: 'Técnico da Kaiju acertando mapa com notebook dentro do carro' },
    cta: 'remap',
  },
  {
    id: 'preparacao',
    name: 'Preparação e projetos turbo',
    lead: 'Do kit turbo ao acerto final. Motor montado com cuidado em cada medida.',
    items: [
      'Instalação de turbo e kit sob medida',
      'Injeção programável FuelTech, Octtane e Injepro: instalação, configuração e acerto',
      'Carburadores bem acertados',
      'Preparação de motores: brunimento, bielas, pistões e bloc guard',
      'Upgrades de freios, suspensão e escapamento',
    ],
    photo: { src: '/media/oficina/motor-montado.jpg', alt: 'Motor turbo montado na oficina da Kaiju Performance' },
    cta: 'preparação de carro',
  },
  {
    id: 'mecanica',
    name: 'Mecânica e revisão',
    lead: 'Performance sem manutenção em dia não se sustenta. Do popular ao esportivo, do nacional ao importado.',
    items: [
      'Troca de óleo com Shell, Valvoline, Liqui Moly e Motul',
      'Freios, embreagem e suspensão',
      'Sistema de arrefecimento',
      'Revisão completa',
      'Carros antigos: carburação, ignição e freios',
    ],
    photo: { src: '/media/oficina/monza-elevador.jpg', alt: 'Monza no elevador durante revisão na Kaiju Performance' },
    cta: 'revisão',
  },
  {
    id: 'diagnostico',
    name: 'Diagnóstico e elétrica',
    lead: 'Não trocamos peças no chute. Primeiro a gente encontra o problema.',
    items: [
      'Scanner e checagem eletrônica',
      'Máquina de fumaça para encontrar vazamentos e ar falso',
      'Elétrica completa e reparo de chicote',
    ],
    photo: {
      src: '/media/servicos/diagnostico-eletrica.jpg',
      alt: 'VW Amarok com o capô aberto na oficina, durante diagnóstico',
    },
    cta: 'diagnóstico',
  },
  {
    id: 'ar-condicionado',
    name: 'Ar-condicionado',
    lead: 'Ar que não gela, cheiro ruim ou demora para esfriar. Diagnóstico completo e conserto, sem esperar piorar.',
    items: [
      'Diagnóstico completo do sistema',
      'Higienização',
      'Carga de gás',
      'Reparos e manutenção especializada',
      'Linha nacional e importada',
    ],
    photo: { src: '/media/servicos/ar-condicionado.jpg', alt: 'Painel com o botão do ar-condicionado ligado' },
    cta: 'ar-condicionado',
  },
  {
    id: 'importados',
    name: 'Especialidades em importados',
    lead: 'Problemas conhecidos de THP, Audi, BMW e câmbios automáticos, com ferramenta específica.',
    items: [
      'Reparo da bomba de alta THP gasolina e flex, com 6 meses de garantia',
      'Retentores de válvula THP',
      'Turbina fumando em Audi e falhas no câmbio DQ200',
      'Radiador externo para câmbio automático TF72 (Compass, Renegade, Toro, Mini, BMW)',
      'Ativação de funções ocultas em BMW e Mini',
    ],
    photo: { src: '/media/oficina/painel-ferramentas.jpg', alt: 'Painel de ferramentas específicas na Kaiju Performance' },
    cta: 'serviço em importado',
  },
  {
    id: 'estetica',
    name: 'Estética automotiva',
    lead: 'Em parceria com a CarWash Bauru, dentro da oficina. O carro sai da mecânica já limpo.',
    items: ['Lavagem completa e higienização interna', 'Enceramento', 'Polimento técnico', 'Cristalização e vitrificação'],
    photo: { src: '/media/oficina/opala-ss-lavagem.jpg', alt: 'Opala SS 1974 na área de lavagem da oficina' },
    cta: 'estética automotiva',
  },
];

/** Como a Kaiju descreve o próprio processo nas publicações sobre remap. */
export const process = [
  {
    title: 'Conversa',
    text: 'Entender o carro e o uso: dia a dia, estrada, carga ou projeto de pista.',
  },
  {
    title: 'Pré-avaliação',
    text: 'Antes de qualquer mapa, o carro precisa estar em ordem: velas, bobinas, bicos e toda a parte mecânica.',
  },
  {
    title: 'Diagnóstico',
    text: 'Scanner, máquina de fumaça e teste. Menos tentativa e erro, mais solução direta.',
  },
  {
    title: 'Mapa sob medida',
    text: 'Calibração pensada para o combustível, os upgrades e o jeito que o carro vai ser usado.',
  },
  {
    title: 'Acerto na rua',
    text: 'O mapa é conferido rodando, buscando desempenho, dirigibilidade e confiabilidade.',
  },
];

export const stageExplained = {
  stage1: {
    name: 'Stage 1',
    lead: 'Para quem quer mais desempenho mantendo o conjunto próximo do original.',
    points: ['Melhor resposta', 'Mais conforto e dirigibilidade', 'Pode gerar economia', 'Mantém mais confiabilidade'],
  },
  stage2: {
    name: 'Stage 2',
    lead: 'Mapa mais agressivo, feito para carros com upgrades de admissão e escape.',
    points: [
      'Downpipe, filtro esportivo e intercooler conforme o carro',
      'Focado em potência',
      'Ganhos de até 30%',
      'Possibilidade de pops & bangs',
    ],
  },
  warning:
    'Não existe milagre. Antes de qualquer remap, o carro precisa estar revisado. Senão, a luz da injeção vira visita frequente no painel.',
};
