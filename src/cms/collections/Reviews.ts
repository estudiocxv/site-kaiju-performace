import type { CollectionConfig } from 'payload';
import { loggedIn } from '../access';
import { revalidateHooks } from '../revalidate';

export const Reviews: CollectionConfig = {
  slug: 'avaliacoes',
  labels: { singular: 'Avaliação', plural: 'Avaliações do Google' },
  orderable: true,
  admin: {
    useAsTitle: 'author',
    group: 'Conteúdo',
    description: 'Copie o texto da avaliação como o cliente escreveu no Google. Arraste para mudar a ordem.',
    defaultColumns: ['author', 'rating', 'text'],
  },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: revalidateHooks,
  fields: [
    { name: 'author', label: 'Nome do cliente', type: 'text', required: true },
    {
      name: 'rating',
      label: 'Estrelas',
      type: 'select',
      required: true,
      defaultValue: '5',
      options: ['5', '4', '3', '2', '1'].map((n) => ({ label: `${n} estrela${n === '1' ? '' : 's'}`, value: n })),
    },
    { name: 'text', label: 'Texto da avaliação', type: 'textarea', required: true },
    {
      name: 'photos',
      label: 'Fotos da avaliação',
      type: 'upload',
      relationTo: 'midia',
      hasMany: true,
    },
    {
      name: 'url',
      label: 'Link da avaliação no Google',
      type: 'text',
      required: true,
      admin: { description: 'No Google Maps, abra a avaliação, toque em Compartilhar e cole o link aqui.' },
    },
  ],
};
