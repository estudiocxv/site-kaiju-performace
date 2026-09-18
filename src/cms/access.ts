import type { Access } from 'payload';

/** Só quem entrou no painel mexe em algo. O site lê pelo Local API, que não passa por aqui. */
export const loggedIn: Access = ({ req }) => Boolean(req.user);

/** Arquivos de mídia precisam abrir para qualquer visitante do site. */
export const anyone: Access = () => true;
