# Kaiju Performance — site e painel

Site da Kaiju Performance (Bauru/SP) em Next.js 16 (App Router), TypeScript e CSS Modules, com painel
administrativo em **/admin** feito com [Payload CMS 3](https://payloadcms.com) e banco SQLite.
Conteúdo inicial tirado do Instagram oficial [@kaijuperformancebauru](https://www.instagram.com/kaijuperformancebauru/),
das avaliações da Kaiju no Google e do catálogo de remap da Armada Performance (pedido do cliente).

```bash
npm install
cp .env.example .env     # e preencha PAYLOAD_SECRET, ADMIN_EMAIL e ADMIN_PASSWORD
npm run build            # cria o banco, carrega o conteúdo inicial e gera as páginas
npm run dev              # http://localhost:3000  ·  painel em http://localhost:3000/admin
```

## Como o painel funciona

O dono entra em `/admin` e edita tudo pelo navegador. **O que ele salva vai direto para o site**: as páginas
são geradas uma vez e ficam guardadas; cada vez que algo é salvo no painel, o cache é descartado
(`src/cms/revalidate.ts`) e a página é refeita na próxima visita, em menos de um segundo.

| No painel | O que muda no site |
| --- | --- |
| Remap → Catálogo do remap | as 302 versões: marca e modelo (escolhidos na lista, com + para criar), anos, números de cada stage, peças (uma por linha), especificações, arte. "Aparece no site" esconde sem apagar |
| Remap → Marcas / Modelos | criar e renomear marcas e modelos (renomear muda em todas as versões). Não deixa apagar marca com modelos nem modelo com versões |
| Remap → Páginas de remap | aviso dos valores, "seu carro não está na lista?", benefícios por tipo de motor |
| Conteúdo → Serviços | lista de serviços (arrastar muda a ordem), foto, itens, texto do WhatsApp |
| Conteúdo → Avaliações do Google | avaliações, estrelas, fotos, link |
| Conteúdo → Eventos | seção "Na rua" |
| Conteúdo → Fotos e vídeos | biblioteca de mídia: enviar, recortar, ponto de foco, descrição (alt) |
| Textos do site → Página inicial | topo (título, vídeo, botões), a oficina, processo, cabeçalho de cada seção, Stage 1 × 2, contato |
| Configurações → Dados da empresa | WhatsApp (todos os botões), endereço, CNPJ, atendimento, redes, endereço do site |
| Configurações → Google e compartilhamento | título e descrição no Google, prévia do link no WhatsApp |
| Configurações → Usuários | quem pode entrar no painel, troca de senha |

## Estrutura

```
src/
  app/
    (site)/               o site: layout, página inicial, /remap, /remap/marcas/[marca], /remap/[slug]
    (payload)/            o painel (/admin) e a API (/api) — arquivos padrão do Payload
    global-not-found.tsx  404 de endereços inexistentes (o site e o painel têm layouts separados)
    sitemap.ts, robots.ts
  cms/                    PAINEL
    collections/          versões, marcas, modelos, serviços, avaliações, eventos, mídia, usuários
    globals/              página inicial, textos do remap, dados da empresa, SEO
    components/           logo do painel, atalhos da tela inicial, rótulo das etapas
    seed/                 conteúdo que o site tinha antes do painel (carregado uma vez)
    revalidate.ts         "salvou no painel, atualiza o site"
  content/
    cms.ts                lê o banco e entrega no formato dos componentes (getSite, getVehicles…)
    vehicles.ts           funções do catálogo (busca, agrupamento, ganhos)
    types.ts              formato de cada tipo de conteúdo
  components/             seções e peças do site
  migrations/             estrutura do banco (gerado por `npx payload migrate:create`)
  payload.config.ts       configuração do painel
  payload-types.ts        tipos gerados (`npm run generate:types`)
public/                   logotipo, ícone, imagem de compartilhamento e mídia original do seed
data/                     (local, fora do git) banco kaiju.db e fotos enviadas
```

### Scripts

| Comando | Faz |
| --- | --- |
| `npm run build` | `migrate` + `seed` + `next build` |
| `npm run migrate` | cria/atualiza as tabelas do banco |
| `npm run seed` | preenche o que estiver vazio (não duplica nem sobrescreve o que o dono mudou) |
| `npm run generate:types` | atualiza `payload-types.ts` depois de mudar um campo |
| `npx payload migrate:create nome` | gera a migração depois de mudar um campo (obrigatório para ir ao ar) |

Mudou um campo em `src/cms`? Rode `npm run generate:types` e `npx payload migrate:create descricao`, e
suba a migração junto. Na Vercel ela roda sozinha no próximo build.

## Hospedagem (Vercel)

Passo a passo em [VERCEL.md](VERCEL.md). O essencial:

- **Banco:** Turso (SQLite na nuvem) via `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`.
- **Fotos do painel:** Vercel Blob via `BLOB_READ_WRITE_TOKEN`; o envio vai do navegador direto para o Blob
  (sem o limite de 4,5 MB das funções da Vercel).
- Sem essas variáveis (no computador), tudo fica em `data/`.

## Identidade

| Token | Cor | Origem |
| --- | --- | --- |
| piche | `#0b0b0c` | fundo do logotipo e das artes |
| giz | `#eeece7` | branco do letreiro |
| vermelho | `#e3121b` | contorno do KAIJU |
| concreto | `#c9c6bf` | galpão onde a Kaiju fotografa os carros (ficha de ganhos) |

Tipos: Saira (itálico condensado, títulos), Archivo (texto), Chivo Mono (rótulos e dados).
O “letreiro” (branco com contorno vermelho, classe `.letreiro`) repete o desenho do logotipo.

## Mídia original

`scripts/import-media.mjs` lê os originais em `../_research/media` (baixados do Instagram) e grava versões
otimizadas em `public/media`, que o seed envia para o painel. Depois da primeira carga, fotos novas entram
direto pelo painel. `npm run armada` regenera `src/cms/seed/data/armada.json`.

## Pendências

- Acesso ao painel: `gabrielhprib@outlook.com` (único usuário).
- "Esqueci a senha" precisa de um e-mail de envio (ex.: SMTP do Outlook ou Resend). Sem isso, a senha é trocada por quem
  administra o servidor.
- Número do endereço: o perfil comercial mostra **3-12**; posts da inauguração citam **3-1279**. O site usa 3-12.
- Horário fixo de funcionamento (não publicado; o site diz “atendimento com hora marcada”).
- Arquivo vetorial do logotipo (o atual foi extraído do vídeo institucional).
- Autorização das fotos de terceiros creditadas (@elite_sp_cars, @lava_car_sc).
