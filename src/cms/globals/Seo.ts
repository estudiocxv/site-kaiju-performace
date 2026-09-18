import type { GlobalConfig } from 'payload';
import { loggedIn } from '../access';
import { photo } from '../fields';
import { revalidateHooks } from '../revalidate';

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'Google e compartilhamento',
  admin: {
    group: 'Configurações',
    description: 'Como o site aparece no Google e quando alguém manda o link no WhatsApp.',
  },
  access: { read: loggedIn, update: loggedIn },
  hooks: { afterChange: revalidateHooks.afterChange },
  fields: [
    {
      name: 'title',
      label: 'Título no Google',
      type: 'text',
      required: true,
      maxLength: 70,
      admin: { description: 'Até uns 60 caracteres. É a linha azul do resultado da busca.' },
    },
    {
      name: 'description',
      label: 'Descrição no Google',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: { rows: 3, description: 'Até uns 160 caracteres. O texto cinza embaixo do título.' },
    },
    {
      name: 'shareTitle',
      label: 'Título do link compartilhado',
      type: 'text',
      admin: { description: 'O que aparece em negrito quando mandam o link no WhatsApp.' },
    },
    photo(
      'shareImage',
      'Imagem do link compartilhado',
      'Ideal 1200 × 630 px. Se ficar vazio, usa a imagem com o logotipo.',
    ),
    {
      name: 'keywords',
      label: 'Palavras-chave',
      type: 'text',
      hasMany: true,
      admin: { description: 'Opcional. Ex.: remap Bauru' },
    },
  ],
};
