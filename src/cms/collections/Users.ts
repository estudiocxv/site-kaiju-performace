import type { CollectionConfig } from 'payload';
import { loggedIn } from '../access';

export const Users: CollectionConfig = {
  slug: 'usuarios',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // uma semana logado
    maxLoginAttempts: 8,
    lockTime: 15 * 60 * 1000,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Configurações',
    description: 'Quem pode entrar no painel.',
  },
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [{ name: 'name', label: 'Nome', type: 'text' }],
};
