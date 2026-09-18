import path from 'node:path';
import type { CollectionConfig } from 'payload';
import { anyone, loggedIn } from '../access';
import { revalidateHooks } from '../revalidate';

/**
 * Pasta dos arquivos enviados pelo painel. Na Hostinger ela fica FORA da pasta
 * do build (que é apagada a cada deploy): defina MEDIA_DIR no hPanel.
 */
export const mediaDir = process.env.MEDIA_DIR || path.resolve(process.cwd(), 'data/media');

export const Media: CollectionConfig = {
  slug: 'midia',
  labels: { singular: 'Foto ou vídeo', plural: 'Fotos e vídeos' },
  admin: {
    group: 'Conteúdo',
    description: 'Todas as fotos e vídeos do site. Troque uma foto aqui e ela muda em todo lugar onde aparece.',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    listSearchableFields: ['alt', 'filename'],
  },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: revalidateHooks,
  upload: {
    staticDir: mediaDir,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4', 'video/webm'],
    focalPoint: true,
    crop: true,
    adminThumbnail: 'thumb',
    imageSizes: [{ name: 'thumb', width: 400, height: 300, position: 'centre' }],
    // foto de celular vem com 4000px+; o site nunca mostra mais que 2400
    resizeOptions: { width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true },
    formatOptions: { format: 'jpeg', options: { quality: 86, mozjpeg: true } },
  },
  fields: [
    {
      name: 'alt',
      label: 'Descrição da imagem',
      type: 'text',
      required: true,
      admin: { description: 'O que aparece na foto. Ajuda o Google e quem usa leitor de tela. Ex.: "Golf GTI branco no elevador".' },
    },
    {
      name: 'credit',
      label: 'Crédito da foto',
      type: 'text',
      admin: { description: 'Opcional. Perfil de quem fotografou, quando a foto não é da Kaiju. Ex.: @fotografo' },
    },
  ],
};
