# Colocar site + painel no ar na Vercel

A Vercel não guarda arquivos no próprio servidor. Por isso:

- **Banco:** Turso (SQLite na nuvem, plano grátis) — variáveis `TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN`
  (ou `DATABASE_URI` e `DATABASE_AUTH_TOKEN`).
- **Fotos e vídeos enviados pelo painel:** Vercel Blob — variável `BLOB_READ_WRITE_TOKEN`.

Sem essas variáveis o projeto usa `data/` no disco, como no computador.

## 1. Banco (Turso)

Projeto `site-kaiju-performace` na Vercel → **Storage** → **Create Database** → **Turso** (Marketplace) → plano
**Free** → conectar ao projeto. As variáveis `TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN` entram sozinhas.

Se a integração não aparecer: crie a conta em turso.tech, crie um banco e cadastre as duas variáveis à mão
(Settings → Environment Variables).

## 2. Fotos (Vercel Blob)

**Storage** → **Create Database** → **Blob** → conectar ao projeto. Entra `BLOB_READ_WRITE_TOKEN`.

## 3. Variáveis do painel

Settings → Environment Variables (Production e Preview):

| Nome | Valor |
| --- | --- |
| `PAYLOAD_SECRET` | chave longa e nova (peça para o Claude gerar; você cola) |
| `ADMIN_EMAIL` | `gabrielhprib@outlook.com` |
| `ADMIN_PASSWORD` | senha do painel — **você digita** |
| `SITE_URL` | `https://www.kaijuperformance.pro` |

**Não** cadastre `ADMIN_AUTOLOGIN`.

## 4. Publicar

O painel está na branch `admin`. Depois das variáveis, ela é juntada na `main` e a Vercel faz o deploy. O
build roda `payload migrate` (cria as tabelas no Turso), o seed (carrega catálogo, textos e envia as 51 fotos
e vídeos para o Blob, e cria o usuário) e o `next build`. Nos deploys seguintes o seed não mexe no que o dono
mudou.

## 5. Domínio

1. Vercel → projeto → **Settings → Domains** → adicionar `kaijuperformance.pro` e `www.kaijuperformance.pro`.
2. A Vercel mostra os registros. No painel da **one.com**, em DNS, crie/ajuste **só** estes (em geral
   `A` para `@` e `CNAME` para `www`). **Não mexa nos registros `MX`**: são do e-mail.
3. Quando propagar (minutos a algumas horas), a Vercel emite o HTTPS sozinha.
4. No painel do site: Configurações → Dados da empresa → Endereço do site = `https://www.kaijuperformance.pro`.

## Custos

- Turso Free e Vercel Blob (até 1 GB no plano Hobby) cobrem este site com folga.
- **Atenção:** pelos termos da Vercel, o plano **Hobby (grátis) é só para uso não comercial**. Site de empresa
  pede o plano **Pro** (US$ 20/mês por membro). Funciona no Hobby, mas fica fora dos termos.
