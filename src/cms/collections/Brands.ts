import { APIError, type CollectionConfig } from 'payload';
import { loggedIn } from '../access';
import { revalidateHooks } from '../revalidate';

export const Brands: CollectionConfig = {
  slug: 'marcas',
  labels: { singular: 'Marca', plural: 'Marcas' },
  admin: {
    useAsTitle: 'name',
    group: 'Remap',
    description: 'As marcas do catálogo. Mudar o nome aqui muda em todas as versões da marca.',
    defaultColumns: ['name', 'updatedAt'],
    pagination: { defaultLimit: 50 },
  },
  defaultSort: 'name',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: {
    ...revalidateHooks,
    beforeDelete: [
      async ({ req, id }) => {
        const { totalDocs } = await req.payload.count({ collection: 'modelos', where: { brand: { equals: id } }, req });
        if (totalDocs > 0) {
          throw new APIError(
            `Essa marca ainda tem ${totalDocs} ${totalDocs === 1 ? 'modelo' : 'modelos'}. Apague ou mude os modelos antes.`,
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
      name: 'name',
      label: 'Nome da marca',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Como aparece no site. Ex.: Volkswagen, Mercedes-Benz' },
    },
  ],
};
