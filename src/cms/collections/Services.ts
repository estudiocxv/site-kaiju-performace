import type { CollectionConfig } from 'payload';
import { loggedIn } from '../access';
import { photo, textList } from '../fields';
import { revalidateHooks } from '../revalidate';

export const Services: CollectionConfig = {
  slug: 'servicos',
  labels: { singular: 'Serviço', plural: 'Serviços' },
  orderable: true,
  admin: {
    useAsTitle: 'name',
    group: 'Conteúdo',
    description: 'A lista de serviços da página inicial. Arraste para mudar a ordem.',
    defaultColumns: ['name', 'lead'],
  },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: revalidateHooks,
  fields: [
    { name: 'name', label: 'Nome do serviço', type: 'text', required: true },
    { name: 'lead', label: 'Frase de apresentação', type: 'textarea', required: true },
    textList('items', 'O que inclui', 'Item'),
    photo('photo', 'Foto', undefined, true),
    {
      name: 'cta',
      label: 'Texto do WhatsApp',
      type: 'text',
      admin: {
        description: 'Completa a mensagem "Olá, Kaiju! Quero um orçamento de ___". Deixe vazio para esconder o botão Orçamento.',
      },
    },
  ],
};
