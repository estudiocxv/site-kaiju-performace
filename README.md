# Kaiju Performance — site

Site da Kaiju Performance (Bauru/SP), feito em Next.js 16 (App Router), TypeScript e CSS Modules.
Conteúdo do Instagram oficial [@kaijuperformancebauru](https://www.instagram.com/kaijuperformancebauru/), das avaliações da Kaiju no Google e do catálogo de remap da Armada Performance (pedido do cliente).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera as páginas estáticas (uma por versão de remap)
npm run media    # reprocessa fotos e vídeos (ver "Mídia")
npm run armada   # regenera src/content/data/armada.json
```

## Estrutura

```
src/
  app/                    rotas
    page.tsx              página inicial (monta as seções)
    remap/                tabela com busca + /remap/[slug] (ficha por versão)
    sitemap.ts, robots.ts SEO
  components/
    sections/             seções da página inicial (Hero, About, Services, Reviews…)
    StageSheet.tsx        ficha de ganhos (Original / Stage 1 / 2 / 3)
    RemapFinder.tsx       seletor da home (busca no computador; marca → modelo → versão no celular)
    RemapTable.tsx        tabela de /remap com busca e filtro por marca
    Photo.tsx             imagem com dimensões automáticas
  content/                DADOS — é aqui que se edita o site
    site.ts               nome, CNPJ, WhatsApp, endereço, redes, link do Google
    vehicles.ts           junta as fichas da Kaiju e da Armada (catálogo final)
    vehicles-kaiju.ts     28 fichas publicadas pela Kaiju no Instagram
    data/armada.json      versões da Armada (gerado, não editar à mão)
    reviews.ts            avaliações do Google
    services.ts           serviços, processo, Stage 1 x Stage 2
    events.ts             eventos
    types.ts              formato de cada tipo de conteúdo
    media-dimensions.json gerado pelo script de mídia
  lib/whatsapp.ts         links e mensagens prontas do WhatsApp
scripts/
  import-media.mjs        otimiza fotos, corta vídeos, gera logo/OG/ícone
  import-armada.mjs       converte o catálogo extraído da Armada
public/media/             mídia já otimizada
```

## Como adicionar conteúdo

- **Nova ficha de remap da Kaiju:** copie um item em `src/content/vehicles-kaiju.ts` e indique o modelo (agrupamento) em `KAIJU_FAMILY`, dentro de `vehicles.ts`. A página `/remap/<slug>` aparece sozinha, entra na tabela, no seletor e no sitemap.
- **Catálogo da Armada:** `node ../_research/armada/crawl.mjs` baixa de novo e `npm run armada` converte. Versões que repetem uma ficha da Kaiju ficam em `DUPLICATES_OF_KAIJU` (em `scripts/import-armada.mjs`) e são descartadas: vale a da Kaiju.
- **Nova avaliação do Google:** adicione um item em `src/content/reviews.ts`. As fotos vão em `../_research/avaliacoes/` e entram com `npm run media`.
- **Novo serviço ou evento:** `src/content/services.ts` e `src/content/events.ts`.
- **Telefone, endereço, CNPJ, horário:** `src/content/site.ts`.

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
O “letreiro” (branco com contorno vermelho, classe `.letreiro`) repete o desenho do logotipo.

## Pendências para confirmar com a Kaiju

- Domínio definitivo (`site.url` em `src/content/site.ts`).
- Número do endereço: o perfil comercial mostra **3-12**; posts da inauguração citam **3-1279**. O site usa 3-12.
- Horário fixo de funcionamento (não publicado; o site diz “atendimento com hora marcada”).
- Arquivo vetorial do logotipo (o atual foi extraído do vídeo institucional).
- Autorização das fotos de terceiros creditadas (@elite_sp_cars, @lava_car_sc).
