/**
 * Dados institucionais da Kaiju Performance.
 * Fonte: perfil @kaijuperformancebauru (bio, endereço comercial e legendas).
 */
export const site = {
  name: 'Kaiju Performance',
  url: 'https://www.kaijuperformance.com.br', // ajustar para o domínio definitivo
  category: 'Oficina automotiva',
  city: 'Bauru',
  state: 'SP',
  // bio do Instagram
  bio: ['Remap • Performance • Mecânica', 'Stage 1 | Stage 2 | Projetos especiais', 'Importados • Turbo • Carros antigos'],
  slogan: 'Seu carro. Nosso projeto.',
  signature: 'Mecânica | Tecnologia | Performance',

  whatsapp: {
    display: '(14) 99836-4764',
    number: '5514998364764',
  },

  address: {
    street: 'Rua Mauro de Almeida Rocha, 3-12',
    district: 'Vila Industrial',
    city: 'Bauru',
    state: 'SP',
    zip: '17055-321',
    country: 'BR',
  },
  // A Kaiju divulga atendimento com hora marcada; horário fixo não foi publicado.
  schedule: 'Atendimento com hora marcada',
  openedAt: '2025-05-01', // inauguração da sede atual

  social: {
    instagram: 'https://www.instagram.com/kaijuperformancebauru/',
    instagramHandle: '@kaijuperformancebauru',
    facebook: 'https://www.facebook.com/571001329430727',
  },
} as const;

export const fullAddress = `${site.address.street} – ${site.address.district}, ${site.address.city}/${site.address.state} · CEP ${site.address.zip.replace('-', '‑')}`;

export const mapsQuery = encodeURIComponent(
  `${site.address.street.replace(',', '')}, ${site.address.district}, ${site.address.city} - ${site.address.state}, ${site.address.zip}`,
);

export const instagramPost = (shortcode: string) => `https://www.instagram.com/p/${shortcode}/`;
