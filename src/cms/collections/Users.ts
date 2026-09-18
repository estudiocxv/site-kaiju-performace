import type { CollectionConfig } from 'payload';
import type { Access } from 'payload';
import { loggedIn } from '../access';

/** Um único acesso ao painel: ninguém cria outro usuário pela tela. */
const nobody: Access = () => false;

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
    description: 'Acesso ao painel. Aqui dá para trocar a própria senha.',
  },
  access: { read: loggedIn, create: nobody, update: loggedIn, delete: nobody },
  fields: [{ name: 'name', label: 'Nome', type: 'text' }],
};
