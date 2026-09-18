import type { GlobalConfig } from 'payload';
import { loggedIn } from '../access';
import { textList } from '../fields';
import { revalidateHooks } from '../revalidate';

export const Company: GlobalConfig = {
  slug: 'empresa',
  label: 'Dados da empresa',
  admin: {
    group: 'Configurações',
    description: 'Telefone, endereço, CNPJ e redes. Aparecem no topo, no rodapé, no contato e em todos os botões de WhatsApp.',
  },
  access: { read: loggedIn, update: loggedIn },
  hooks: { afterChange: revalidateHooks.afterChange },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Nome', type: 'text', required: true },
        { name: 'category', label: 'Tipo de negócio', type: 'text', required: true },
        { name: 'cnpj', label: 'CNPJ', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'slogan', label: 'Slogan', type: 'text' },
        { name: 'signature', label: 'Assinatura', type: 'text', admin: { description: 'Ex.: Mecânica | Tecnologia | Performance' } },
      ],
    },
    textList('bio', 'Especialidades (faixa do topo)', 'Linha'),
    {
      name: 'whatsapp',
      label: 'WhatsApp',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'display',
              label: 'Como aparece no site',
              type: 'text',
              required: true,
              admin: { description: 'Ex.: (14) 99836-4764' },
            },
            {
              name: 'number',
              label: 'Número para os botões',
              type: 'text',
              required: true,
              admin: { description: 'Só números, com 55 e DDD. Ex.: 5514998364764' },
              validate: (v: string | null | undefined) =>
                /^\d{12,13}$/.test(v ?? '') || 'Use só números: 55 + DDD + telefone (12 ou 13 dígitos).',
            },
          ],
        },
      ],
    },
    {
      name: 'address',
      label: 'Endereço',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'street', label: 'Rua e número', type: 'text', required: true },
            { name: 'district', label: 'Bairro', type: 'text', required: true },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'city', label: 'Cidade', type: 'text', required: true },
            { name: 'state', label: 'UF', type: 'text', required: true, maxLength: 2 },
            { name: 'zip', label: 'CEP', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'schedule', label: 'Atendimento', type: 'text', admin: { description: 'Ex.: Atendimento com hora marcada' } },
    {
      name: 'social',
      label: 'Redes e Google',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'instagram', label: 'Link do Instagram', type: 'text' },
            { name: 'instagramHandle', label: '@ do Instagram', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'facebook', label: 'Link do Facebook', type: 'text' },
            { name: 'googleReviews', label: 'Link do perfil no Google', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'url',
      label: 'Endereço do site',
      type: 'text',
      required: true,
      admin: { description: 'Usado no Google e na prévia dos links. Ex.: https://www.kaijuperformance.pro' },
    },
  ],
};
