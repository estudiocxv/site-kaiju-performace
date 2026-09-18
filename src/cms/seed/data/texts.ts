/**
 * Textos que estavam escritos direto nos componentes antes do painel.
 * Entram no banco na primeira vez que o site sobe; depois disso quem manda é o painel.
 */

export const homeTexts = {
  hero: {
    line1: 'Seu carro.',
    line2: 'Nosso',
    highlight: 'projeto.',
    lead: 'Remap, preparação e mecânica para nacionais, importados, turbo e carros antigos. Do carro original que precisa voltar a funcionar ao projeto que busca mais potência.',
    primaryButton: 'Pedir orçamento',
    secondaryButton: 'Ganhos por modelo',
    media: {
      videoWide: { src: '/media/video/oficina-horizontal.mp4', alt: 'Vídeo da oficina Kaiju Performance (horizontal)' },
      posterWide: { src: '/media/video/oficina-horizontal.jpg', alt: 'Oficina da Kaiju Performance' },
      videoTall: { src: '/media/video/oficina-vertical.mp4', alt: 'Vídeo da oficina Kaiju Performance (vertical)' },
      posterTall: { src: '/media/video/oficina-vertical.jpg', alt: 'Oficina da Kaiju Performance' },
    },
  },
  about: {
    label: 'A oficina',
    title: 'Não trocamos peças no chute.',
    paragraphs: [
      'A Kaiju Performance nasceu da paixão por carros e por fazer as coisas do jeito certo.',
      'Somos uma oficina que une mecânica, diagnóstico eletrônico, elétrica e performance. Trabalhamos desde a manutenção e solução de defeitos até remap, Stage 1, Stage 2, preparação de motores e projetos especiais.',
      'Aqui, a gente não gosta de simplesmente trocar peças. Gostamos de entender o problema, diagnosticar, testar e encontrar a melhor solução para cada carro.',
      'Seja para deixar um carro original funcionando perfeitamente ou para transformar um projeto em algo mais forte, rápido e divertido, fazemos aquilo que realmente gostamos:',
    ],
    motto: 'resolver problemas, preparar carros e transformar ideias em projetos.',
    signatureName: '🐉 Kaiju Performance',
    signatureTagline: 'Mecânica • Tecnologia • Performance',
    signatureLine: 'Fazemos carros porque é o que gostamos de fazer.',
    facts: [
      { term: 'Sede', value: 'Vila Industrial, Bauru/SP. Inaugurada em 1º de maio de 2025' },
      { term: 'Atendimento', value: 'Com hora marcada' },
      { term: 'Lubrificantes', value: 'Shell, Valvoline, Liqui Moly e Motul' },
      { term: 'Injeção programável', value: 'FuelTech, Octtane e Injepro' },
    ],
    mainCaption: 'BMW Série 3 (E46)',
    media: {
      mainPhoto: { src: '/media/oficina/bmw-e46.jpg', alt: 'BMW Série 3 (E46) preta parada na estrada ao entardecer' },
      secondPhoto: { src: '/media/oficina/letreiro-neon.jpg', alt: 'Letreiro neon Kaiju Performance dentro da oficina' },
    },
  },
  process: {
    title: 'Antes de qualquer mapa',
    intro: 'Muita gente chega querendo “fazer stage” sem saber o que o carro precisa. O caminho aqui é sempre o mesmo.',
  },
  services: {
    label: 'Serviços',
    title: 'Mecânica, tecnologia\ne performance',
    intro: 'O mesmo lugar resolve a revisão do dia a dia, o diagnóstico que ninguém achou e o projeto turbo.',
  },
  stages: {
    label: 'Remap',
    title: 'Stage 1 ou Stage 2?',
    intro:
      'Muda tudo no resultado do carro. A escolha depende do que já está instalado e do que você quer do carro no dia a dia.',
    stage3Hint: 'Etapa para projetos mais completos, com mais modificações no conjunto.',
  },
  remap: { label: 'Ganhos por modelo', title: 'Quanto o seu carro ganha' },
  reviews: {
    label: 'Avaliações no Google',
    title: 'Quem já trouxe o carro',
    intro: 'Avaliações 5 estrelas de clientes da Kaiju, como foram publicadas no Google.',
    moreButton: 'Ver mais avaliações no Google',
  },
  events: { label: 'Na rua', title: 'Tirando os projetos da oficina' },
  contact: {
    label: 'Contato',
    title: 'Traz o carro.\nA gente conversa.',
    lead: 'Orçamento pelo WhatsApp. Conta o modelo, o ano e o que você quer do carro: revisão, diagnóstico, remap ou projeto.',
  },
};

export const remapTexts = {
  disclaimer:
    'Valores aproximados. Os resultados podem variar conforme ano, versão, combustível, câmbio, condição mecânica e configuração dos upgrades.',
  notListed: {
    title: 'Seu carro não está na lista?',
    text: 'Chama no WhatsApp com modelo, ano e motor que a Kaiju avalia o seu carro.',
  },
  benefits: {
    turbo: [
      'Melhor resposta de pedal',
      'Retomadas mais fortes',
      'Mais potência e torque em toda a faixa de giro',
      'Mapeamento personalizado conforme combustível e preparação',
      'Possibilidade de remoção do limitador de velocidade',
    ],
    diesel: [
      'Mais torque em baixa e média rotação',
      'Melhor resposta de pedal',
      'Retomadas mais fortes',
      'Mais força para carga, reboque, estrada e off-road',
      'Possibilidade de remoção do limitador de velocidade',
      'Mapeamento personalizado conforme o uso',
    ],
    aspirado: [
      'Melhor resposta de pedal',
      'Retomadas mais fortes',
      'Ganho de potência e torque',
      'Acerto personalizado',
      'Remoção do limitador de velocidade',
    ],
  },
};

export const seoTexts = {
  title: 'Kaiju Performance | Remap, preparação e mecânica em Bauru/SP',
  description:
    'Oficina de performance em Bauru/SP. Remap Stage 1 e Stage 2, preparação turbo, FuelTech, mecânica, diagnóstico e carros antigos. Orçamento pelo WhatsApp (14) 99836-4764.',
  shareTitle: 'Kaiju Performance — Seu carro. Nosso projeto.',
  keywords: [
    'remap Bauru',
    'Stage 1',
    'Stage 2',
    'reprogramação eletrônica',
    'preparação automotiva',
    'oficina Bauru',
    'FuelTech Bauru',
    'Kaiju Performance',
  ],
};

/** Modelo de cada ficha da Kaiju dentro do catálogo (antes em content/vehicles.ts). */
export const KAIJU_FAMILY: Record<string, string> = {
  'volkswagen-golf-gti-2-0-tsi': 'Golf',
  'volkswagen-jetta-2-0-tsi': 'Jetta',
  'volkswagen-polo-1-0-tsi': 'Polo',
  'volkswagen-up-tsi': 'UP!',
  'volkswagen-virtus-nivus-t-cross-200-tsi': 'Virtus',
  'volkswagen-amarok-2-0-bitdi': 'Amarok',
  'volkswagen-amarok-3-0-v6-tdi': 'Amarok',
  'audi-a3-1-4-tfsi': 'A3 / S3 / RS3',
  'bmw-320i-f30': 'Série 3',
  'bmw-328i-f30': 'Série 3',
  'bmw-118i-1-6-turbo': 'Série 1',
  'mini-cooper-s-1-6-turbo': 'Cooper',
  'peugeot-308-thp': '308',
  'citroen-c4-lounge-thp': 'C4 Lounge',
  'ford-fusion-2-0-ecoboost': 'Fusion',
  'ford-ranger-3-2-duratorq': 'Ranger',
  'ford-ranger-2-0-ecoblue': 'Ranger',
  'chevrolet-camaro-ss-6-2': 'Camaro',
  'chevrolet-cruze-1-4-turbo': 'Cruze',
  'chevrolet-s10-2-8-ctdi': 'S10',
  'toyota-hilux-3-0-d-4d': 'Hilux',
  'toyota-sw4-3-0-d-4d': 'Hilux',
  'mitsubishi-l200-triton-3-2-di-d': 'L200',
  'mitsubishi-l200-triton-2-4-mivec': 'L200',
  'nissan-frontier-2-5-dci': 'Frontier',
  'nissan-frontier-2-3-bi-turbo': 'Frontier',
  'jeep-compass-2-0-multijet': 'Compass',
  'fiat-toro-2-0-multijet': 'Toro',
};
