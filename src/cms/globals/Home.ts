import type { Field, GlobalConfig } from 'payload';
import { loggedIn } from '../access';
import { photo } from '../fields';
import { revalidateHooks } from '../revalidate';

const BREAK = 'Aperte Enter para quebrar a linha no site.';

/** Cabeçalho padrão das seções: etiqueta pequena, título grande e texto de apoio. */
const sectionHead = (opts: { intro?: boolean } = {}): Field[] => [
  {
    type: 'row',
    fields: [
      { name: 'label', label: 'Etiqueta', type: 'text', admin: { description: 'O texto pequeno acima do título.' } },
      { name: 'title', label: 'Título', type: 'textarea', required: true, admin: { rows: 2, description: BREAK } },
    ],
  },
  ...(opts.intro ? [{ name: 'intro', label: 'Texto de apoio', type: 'textarea', admin: { rows: 3 } } as Field] : []),
];

const stageFields: Field[] = [
  { name: 'name', label: 'Nome', type: 'text', required: true },
  { name: 'lead', label: 'Frase', type: 'textarea', required: true, admin: { rows: 2 } },
  { name: 'points', label: 'Pontos', type: 'textarea', admin: { rows: 4, description: 'Um ponto por linha.' } },
];

export const Home: GlobalConfig = {
  slug: 'pagina-inicial',
  label: 'Página inicial',
  admin: {
    group: 'Textos do site',
    description: 'Textos e fotos de cada parte da página inicial, na ordem em que aparecem.',
  },
  access: { read: loggedIn, update: loggedIn },
  hooks: { afterChange: revalidateHooks.afterChange },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Topo',
          description: 'A primeira tela do site, com o vídeo da oficina.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'line1', label: 'Título, 1ª linha', type: 'text', required: true },
                { name: 'line2', label: 'Título, 2ª linha', type: 'text', required: true },
                {
                  name: 'highlight',
                  label: 'Palavra em destaque',
                  type: 'text',
                  required: true,
                  admin: { description: 'Vem no fim da 2ª linha, com o contorno vermelho.' },
                },
              ],
            },
            { name: 'lead', label: 'Texto', type: 'textarea', required: true, admin: { rows: 3 } },
            {
              type: 'row',
              fields: [
                { name: 'primaryButton', label: 'Botão do WhatsApp', type: 'text', required: true },
                { name: 'secondaryButton', label: 'Botão do remap', type: 'text', required: true },
              ],
            },
            {
              type: 'row',
              fields: [
                photo('videoWide', 'Vídeo deitado (computador)', 'MP4 curto, sem som, até ~5 MB. Toca em loop.'),
                photo('posterWide', 'Foto deitada (antes do vídeo)', 'Mesmo enquadramento do vídeo, aparece enquanto ele carrega.'),
              ],
            },
            {
              type: 'row',
              fields: [
                photo('videoTall', 'Vídeo em pé (celular)', 'MP4 vertical, sem som.'),
                photo('posterTall', 'Foto em pé (antes do vídeo)'),
              ],
            },
          ],
        },
        {
          name: 'about',
          label: 'A oficina',
          fields: [
            ...sectionHead(),
            {
              name: 'paragraphs',
              label: 'Texto',
              type: 'array',
              labels: { singular: 'Parágrafo', plural: 'Parágrafos' },
              fields: [{ name: 'text', label: 'Parágrafo', type: 'textarea', required: true }],
            },
            { name: 'motto', label: 'Frase em destaque', type: 'textarea', admin: { rows: 2 } },
            {
              type: 'row',
              fields: [
                { name: 'signatureName', label: 'Assinatura', type: 'text' },
                { name: 'signatureTagline', label: 'Linha da assinatura', type: 'text' },
                { name: 'signatureLine', label: 'Frase final', type: 'text' },
              ],
            },
            {
              name: 'facts',
              label: 'Informações rápidas',
              type: 'array',
              labels: { singular: 'Informação', plural: 'Informações' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'term', label: 'Título', type: 'text', required: true },
                    { name: 'value', label: 'Texto', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                photo('mainPhoto', 'Foto grande', undefined, true),
                photo('secondPhoto', 'Foto pequena (sobreposta)'),
              ],
            },
            { name: 'mainCaption', label: 'Legenda da foto grande', type: 'text' },
          ],
        },
        {
          name: 'process',
          label: 'Processo',
          description: 'Os passos que a Kaiju segue antes de qualquer mapa. Aparece na página inicial e nas páginas de remap.',
          fields: [
            { name: 'title', label: 'Título', type: 'text', required: true },
            { name: 'intro', label: 'Texto de apoio', type: 'textarea', admin: { rows: 2 } },
            {
              name: 'steps',
              label: 'Passos',
              type: 'array',
              labels: { singular: 'Passo', plural: 'Passos' },
              fields: [
                { name: 'title', label: 'Nome do passo', type: 'text', required: true },
                { name: 'text', label: 'Explicação', type: 'textarea', required: true, admin: { rows: 2 } },
              ],
            },
          ],
        },
        {
          name: 'services',
          label: 'Serviços',
          description: 'Só o cabeçalho. Os serviços em si ficam em Conteúdo → Serviços.',
          fields: sectionHead({ intro: true }),
        },
        {
          name: 'stages',
          label: 'Stage 1 × Stage 2',
          fields: [
            ...sectionHead({ intro: true }),
            { name: 'stage1', label: 'Coluna 1', type: 'group', fields: stageFields },
            { name: 'stage2', label: 'Coluna 2', type: 'group', fields: stageFields },
            {
              name: 'stage3Hint',
              label: 'Explicação do Stage 3',
              type: 'textarea',
              admin: { rows: 2, description: 'Usada nas páginas das versões que têm Stage 3 sem lista de peças.' },
            },
            { name: 'warning', label: 'Aviso (Atenção)', type: 'textarea', admin: { rows: 2 } },
          ],
        },
        {
          name: 'remap',
          label: 'Ganhos por modelo',
          description: 'O texto de apoio já mostra sozinho quantas versões e marcas existem no catálogo.',
          fields: sectionHead(),
        },
        {
          name: 'reviews',
          label: 'Avaliações',
          fields: [
            ...sectionHead({ intro: true }),
            { name: 'moreButton', label: 'Botão "ver mais"', type: 'text' },
          ],
        },
        {
          name: 'events',
          label: 'Eventos',
          fields: sectionHead(),
        },
        {
          name: 'contact',
          label: 'Contato',
          fields: [
            ...sectionHead(),
            { name: 'lead', label: 'Texto', type: 'textarea', admin: { rows: 3 } },
          ],
        },
      ],
    },
  ],
};
