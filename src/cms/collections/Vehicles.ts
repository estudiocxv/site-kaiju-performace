import type { CollectionConfig } from 'payload';
import { loggedIn } from '../access';
import { revalidateHooks } from '../revalidate';

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const Vehicles: CollectionConfig = {
  slug: 'veiculos',
  labels: { singular: 'Versão do remap', plural: 'Catálogo do remap' },
  admin: {
    useAsTitle: 'title',
    group: 'Remap',
    description:
      'Cada linha é uma versão de carro com os números de original, Stage 1, Stage 2 e Stage 3. Desmarque "Aparece no site" para esconder sem apagar.',
    defaultColumns: ['title', 'family', 'category', 'published'],
    listSearchableFields: ['title', 'brand', 'family', 'version'],
    pagination: { defaultLimit: 50 },
  },
  defaultSort: 'title',
  access: { read: loggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: {
    ...revalidateHooks,
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (data.brand && data.version) data.title = `${data.brand} ${data.version}`;
        if (!data.slug && data.brand && data.version) data.slug = slugify(`${data.brand} ${data.version}`);
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
          type: 'text',
          required: true,
          index: true,
          admin: { description: 'Escreva igual às outras versões da marca. Ex.: Volkswagen, Mercedes-Benz' },
        },
        {
          name: 'family',
          label: 'Modelo',
          type: 'text',
          required: true,
          admin: { description: 'Agrupa as versões. Ex.: Golf, Série 3, Hilux' },
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
          label: 'Modificações da etapa',
          type: 'text',
          hasMany: true,
          admin: { description: 'Digite e aperte Enter para cada peça. Ex.: Downpipe' },
        },
      ],
    },

    // ——— ficha ———
    {
      type: 'collapsible',
      label: 'Ficha técnica',
      admin: { initCollapsed: true },
      fields: [
        { name: 'engine', label: 'Motor (texto corrido)', type: 'textarea' },
        {
          name: 'specs',
          label: 'Ficha em tópicos',
          type: 'array',
          labels: { singular: 'Linha', plural: 'Linhas' },
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
