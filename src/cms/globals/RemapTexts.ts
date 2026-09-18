import type { GlobalConfig } from 'payload';
import { loggedIn } from '../access';
import { revalidateHooks } from '../revalidate';

const benefits = (name: string, label: string) => ({
  name,
  label,
  type: 'text' as const,
  hasMany: true,
  admin: { description: 'Digite e aperte Enter para cada benefício.' },
});

export const RemapTexts: GlobalConfig = {
  slug: 'textos-remap',
  label: 'Páginas de remap',
  admin: {
    group: 'Remap',
    description: 'Textos que se repetem em todas as páginas do catálogo.',
  },
  access: { read: loggedIn, update: loggedIn },
  hooks: { afterChange: revalidateHooks.afterChange },
  fields: [
    {
      name: 'disclaimer',
      label: 'Aviso sobre os valores',
      type: 'textarea',
      required: true,
      admin: { rows: 2, description: 'Aparece embaixo de todas as tabelas de ganhos.' },
    },
    {
      name: 'notListed',
      label: '"Seu carro não está na lista?"',
      type: 'group',
      fields: [
        { name: 'title', label: 'Título', type: 'text' },
        { name: 'text', label: 'Texto', type: 'text' },
      ],
    },
    {
      name: 'benefits',
      label: 'O que muda no carro',
      type: 'group',
      admin: { description: 'Lista mostrada na página de cada versão, conforme o tipo de motor.' },
      fields: [benefits('turbo', 'Motores turbo'), benefits('diesel', 'Motores diesel'), benefits('aspirado', 'Motores aspirados')],
    },
  ],
};
