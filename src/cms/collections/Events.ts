import type { CollectionConfig } from 'payload';
import { loggedIn } from '../access';
import { revalidateHooks } from '../revalidate';

export const Events: CollectionConfig = {
  slug: 'eventos',
  labels: { singular: 'Evento', plural: 'Eventos' },
  orderable: true,
  admin: {
    useAsTitle: 'name',
    group: 'Conteúdo',
    description: 'Eventos da seção "Na rua". O site mostra as 5 primeiras fotos de cada um.',
    defaultColumns: ['name', 'date', 'place'],
  },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: revalidateHooks,
  fields: [
    { name: 'name', label: 'Nome do evento', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'date', label: 'Data', type: 'text', required: true, admin: { description: 'Como deve aparecer. Ex.: 11 e 12 de abril de 2026' } },
        { name: 'place', label: 'Local', type: 'text', required: true },
      ],
    },
    { name: 'text', label: 'Texto', type: 'textarea', required: true },
    { name: 'photos', label: 'Fotos', type: 'upload', relationTo: 'midia', hasMany: true, required: true },
    {
      name: 'instagram',
      label: 'Link do post no Instagram',
      type: 'text',
      admin: { description: 'Opcional. Ex.: https://www.instagram.com/p/DX-A6ZjDym-/' },
    },
  ],
};
