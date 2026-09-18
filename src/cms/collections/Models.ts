import { APIError, type CollectionConfig } from 'payload';
import { loggedIn } from '../access';
import { revalidateHooks } from '../revalidate';

export const Models: CollectionConfig = {
  slug: 'modelos',
  labels: { singular: 'Modelo', plural: 'Modelos' },
  admin: {
    useAsTitle: 'name',
    group: 'Remap',
    description: 'Os modelos agrupam as versões na página de cada marca. Ex.: Golf, Série 3, Hilux.',
    defaultColumns: ['name', 'brand', 'updatedAt'],
    listSearchableFields: ['name'],
    pagination: { defaultLimit: 50 },
  },
  defaultSort: 'name',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: {
    ...revalidateHooks,
    beforeDelete: [
      async ({ req, id }) => {
        const { totalDocs } = await req.payload.count({ collection: 'veiculos', where: { family: { equals: id } }, req });
        if (totalDocs > 0) {
          throw new APIError(
            `Esse modelo ainda tem ${totalDocs} ${totalDocs === 1 ? 'versão' : 'versões'}. Apague ou mude as versões antes.`,
            400,
            undefined,
            true,
          );
        }
      },
    ],
  },
  fields: [
    {
      name: 'brand',
      label: 'Marca',
      type: 'relationship',
      relationTo: 'marcas',
      required: true,
      index: true,
      admin: { description: 'Não achou a marca? Clique no + para criar.' },
    },
    {
      name: 'name',
      label: 'Nome do modelo',
      type: 'text',
      required: true,
      admin: { description: 'Sem a marca. Ex.: Golf, Série 3, A3 / S3 / RS3' },
    },
  ],
};
