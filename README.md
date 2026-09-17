# Kaiju Performance — site

Site da Kaiju Performance (Bauru/SP), feito em Next.js 16 (App Router), TypeScript e CSS Modules.
Todo o conteúdo veio do Instagram oficial [@kaijuperformancebauru](https://www.instagram.com/kaijuperformancebauru/).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera as 47 páginas estáticas
npm run media    # reprocessa fotos e vídeos (ver "Mídia")
```

## Estrutura

```
src/
  app/                    rotas
    page.tsx              página inicial (monta as seções)
    remap/                tabela de ganhos + /remap/[slug] (ficha por modelo)
    projetos/             lista + /projetos/[slug]
    sitemap.ts, robots.ts SEO
  components/
    sections/             seções da página inicial (Hero, About, Services…)
    StageSheet.tsx        ficha de ganhos (Original / Stage 1 / Stage 2)
    RemapFinder.tsx       seletor de carro da home
    Photo.tsx             imagem com dimensões automáticas
  content/                DADOS — é aqui que se edita o site
    site.ts               nome, WhatsApp, endereço, redes
    vehicles.ts           modelos e números de remap
    projects.ts           carros/projetos
    services.ts           serviços, processo, Stage 1 x Stage 2
    events.ts             eventos e parceiros
    types.ts              formato de cada tipo de conteúdo
    media-dimensions.json gerado pelo script de mídia
  lib/whatsapp.ts         links e mensagens prontas do WhatsApp
scripts/import-media.mjs  otimiza fotos, corta vídeos, gera logo/OG/ícone
public/media/             mídia já otimizada
```

## Como adicionar conteúdo

- **Novo modelo de remap:** copie um item em `src/content/vehicles.ts`. A página `/remap/<slug>` aparece sozinha, entra na tabela, no seletor da home e no sitemap.
- **Novo projeto:** coloque as fotos em `public/media/projetos/<pasta>/01.jpg, 02.jpg…`, rode `npm run media` se vierem do `_research`, e adicione um item em `src/content/projects.ts`. `featured: true` leva o carro para os destaques da home.
- **Novo serviço ou evento:** `src/content/services.ts` e `src/content/events.ts`.
- **Telefone, endereço, horário:** `src/content/site.ts`.

Os arquivos de `src/content` usam os tipos de `types.ts`. Um painel administrativo ou CMS no futuro só precisa devolver objetos nesses formatos.

## Mídia

`scripts/import-media.mjs` lê os originais em `../_research/media` (baixados do Instagram) e grava versões otimizadas em `public/media`. O mapa `IMAGES` no topo do arquivo diz qual original vira qual arquivo do site. Os vídeos do hero são cortados e comprimidos com ffmpeg (horizontal 1280px ~3 MB; vertical 540px ~2 MB para celular em pé).

O vídeo começa a carregar só depois da primeira pintura, pausa quando a aba fica em segundo plano e não carrega para quem pede menos movimento ou economia de dados.

## Identidade

| Token | Cor | Origem |
| --- | --- | --- |
| piche | `#0b0b0c` | fundo do logotipo e das artes |
| giz | `#eeece7` | branco do letreiro |
| vermelho | `#e3121b` | contorno do KAIJU |
| concreto | `#c9c6bf` | galpão onde a Kaiju fotografa os carros (ficha de ganhos) |

Tipos: Saira (itálico condensado, títulos), Archivo (texto), Chivo Mono (rótulos e dados).
O “letreiro” (branco com contorno vermelho, classe `.letreiro`) repete o desenho do logotipo e é usado no nome de cada projeto.

## Pendências para confirmar com a Kaiju

- Domínio definitivo (`site.url` em `src/content/site.ts`).
- Número do endereço: o perfil comercial mostra **3-12**; posts da inauguração citam **3-1279**. O site usa 3-12.
- Horário fixo de funcionamento (não publicado; o site diz “atendimento com hora marcada”).
- Arquivo vetorial do logotipo (o atual foi extraído do vídeo institucional).
- Autorização das fotos de terceiros creditadas (@elite_sp_cars, @lava_car_sc).
