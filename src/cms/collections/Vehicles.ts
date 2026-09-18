import type { CollectionConfig, PayloadRequest } from 'payload';
import { loggedIn } from '../access';
import { revalidateHooks } from '../revalidate';

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Nome da marca a partir do id escolhido na lista. */
async function brandName(req: PayloadRequest, id: unknown) {
  if (!id) return undefined;
  if (typeof id === 'object' && id && 'name' in id) return String((id as { name: string }).name);
  const doc = await req.payload.findByID({ collection: 'marcas', id: id as number, depth: 0, req }).catch(() => null);
  return doc?.name;
}

export const Vehicles: CollectionConfig = {
  slug: 'veiculos',
  labels: { singular: 'Versão do remap', plural: 'Catálogo do remap' },
  admin: {
    useAsTitle: 'title',
    group: 'Remap',
    description:
      'Cada linha é uma versão de carro com os números de original, Stage 1, Stage 2 e Stage 3. Desmarque "Aparece no site" para esconder sem apagar.',
    defaultColumns: ['title', 'brand', 'family', 'category', 'published'],
    listSearchableFields: ['title', 'version'],
    pagination: { defaultLimit: 50 },
  },
  defaultSort: 'title',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: {
    ...revalidateHooks,
    beforeValidate: [
      async ({ data, req, originalDoc }) => {
        if (!data) return data;
        const brand = await brandName(req, data.brand ?? originalDoc?.brand);
        const version = data.version ?? originalDoc?.version;
        if (brand && version) {
          data.title = `${brand} ${version}`;
          if (!data.slug && !originalDoc?.slug) data.slug = slugify(`${brand} ${version}`);
        }
        return data;
      },
    ],
  },
  fields: [
    // ——— lateral ———
    {
      name: 'published',
      label: 'Aparece no site',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'slug',
      label: 'Endereço da página',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Fica em /remap/<endereço>. Preenchido sozinho a partir da marca e da versão.',
      },
    },
    {
      name: 'origin',
      label: 'Origem dos números',
      type: 'select',
      defaultValue: 'kaiju',
      options: [
        { label: 'Kaiju', value: 'kaiju' },
        { label: 'Catálogo Armada', value: 'armada' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'title', label: 'Carro', type: 'text', admin: { hidden: true } },

    // ——— identificação ———
    {
      type: 'row',
      fields: [
        {
          name: 'brand',
          label: 'Marca',
          type: 'relationship',
          relationTo: 'marcas',
          required: true,
          index: true,
          admin: { description: 'Escolha na lista. Marca nova? Clique no + ao lado.' },
        },
        {
          name: 'family',
          label: 'Modelo',
          type: 'relationship',
          relationTo: 'modelos',
          required: true,
          index: true,
          // só os modelos da marca escolhida
          filterOptions: ({ siblingData }) => {
            const brand = (siblingData as { brand?: number | { id: number } })?.brand;
            const id = typeof brand === 'object' && brand ? brand.id : brand;
            return id ? { brand: { equals: id } } : false;
          },
          admin: { description: 'Escolha a marca primeiro. Modelo novo? Clique no + ao lado.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'version',
          label: 'Versão (sem a marca)',
          type: 'text',
          required: true,
          admin: { description: 'Ex.: Golf GTI 2.0 TSI' },
        },
        { name: 'years', label: 'Anos', type: 'text', admin: { description: 'Opcional. Ex.: 2015 a 2020' } },
        {
          name: 'category',
          label: 'Tipo de motor',
          type: 'select',
          required: true,
          defaultValue: 'turbo-gasolina',
          options: [
            { label: 'Turbo', value: 'turbo-gasolina' },
            { label: 'Diesel', value: 'diesel' },
            { label: 'Aspirado', value: 'aspirado' },
          ],
        },
      ],
    },

    // ——— números ———
    {
      name: 'stages',
      label: 'Números por etapa',
      type: 'array',
      minRows: 2,
      labels: { singular: 'Etapa', plural: 'Etapas' },
      admin: {
        description: 'Comece sempre pelo Original. Os ganhos em % são calculados sozinhos.',
        initCollapsed: false,
        components: { RowLabel: '@/cms/components/StageRowLabel#StageRowLabel' },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              label: 'Etapa',
              type: 'select',
              required: true,
              options: ['Original', 'Stage 1', 'Stage 2', 'Stage 3'],
            },
            { name: 'cv', label: 'Potência (cv)', type: 'number', required: true, min: 0 },
            { name: 'kgfm', label: 'Torque (kgfm)', type: 'number', required: true, min: 0 },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'cvText',
              label: 'Potência como texto',
              type: 'text',
              admin: { description: 'Opcional. Só quando não é um número simples: 300+, 380/440' },
            },
            {
              name: 'kgfmText',
              label: 'Torque como texto',
              type: 'text',
              admin: { description: 'Opcional. Ex.: 56,1' },
            },
          ],
        },
        {
          name: 'upgrades',
          label: 'Peças / modificações da etapa',
          type: 'textarea',
          admin: { rows: 3, description: 'Uma peça por linha. Ex.: Downpipe (Enter) Intercooler' },
        },
      ],
    },

    // ——— ficha ———
    {
      type: 'collapsible',
      label: 'Ficha técnica (especificações)',
      admin: { initCollapsed: false },
      fields: [
        { name: 'engine', label: 'Motor (texto corrido)', type: 'textarea' },
        {
          name: 'specs',
          label: 'Especificações',
          type: 'array',
          labels: { singular: 'Especificação', plural: 'Especificações' },
          admin: { description: 'Uma linha por item. Ex.: Câmbio → DSG; Tração → Dianteira.', initCollapsed: false },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', label: 'Item', type: 'text', required: true, admin: { description: 'Ex.: Câmbio' } },
                { name: 'value', label: 'Valor', type: 'text', required: true, admin: { description: 'Ex.: DSG' } },
              ],
            },
          ],
        },
        {
          name: 'notes',
          label: 'Observações',
          type: 'array',
          labels: { singular: 'Observação', plural: 'Observações' },
          fields: [{ name: 'text', label: 'Observação', type: 'textarea', required: true }],
        },
      ],
    },

    // ——— material da Kaiju ———
    {
      type: 'collapsible',
      label: 'Arte e resultado publicados pela Kaiju',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'poster',
          label: 'Arte técnica',
          type: 'upload',
          relationTo: 'midia',
          admin: { description: 'Opcional. A arte do Instagram com os números desta versão.' },
        },
        {
          name: 'instagram',
          label: 'Post da ficha no Instagram',
          type: 'text',
          admin: { description: 'Opcional. Link do post de onde saíram os números.' },
        },
        {
          name: 'instagramDate',
          label: 'Data do post',
          type: 'date',
          admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'dd/MM/yyyy' } },
        },
        {
          name: 'publishedResult',
          label: 'Carro real feito na Kaiju',
          type: 'group',
          admin: { description: 'Opcional. Aparece como destaque na página da versão.' },
          fields: [
            { name: 'title', label: 'Título', type: 'text' },
            { name: 'text', label: 'Texto', type: 'textarea' },
            { name: 'instagram', label: 'Link do post', type: 'text' },
          ],
        },
      ],
    },
  ],
};
