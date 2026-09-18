# Colocar no ar na Hostinger (plano Business)

O site com painel precisa de **Node.js** e de uma pasta que **não seja apagada** a cada deploy.
Os nomes dos botões podem mudar um pouco no hPanel; o caminho é este.

## 1. Criar o app Node.js

1. hPanel → **Sites** → **Adicionar site** → **Node.js Apps** (ou "Web App Node.js").
2. Origem: **Importar do GitHub** → autorize a conta `estudiocxv` → repositório do site.
3. Branch: **`admin`** (é onde está o painel; a `main` continua sendo a versão sem painel da Vercel).
4. Configurações de build:
   - Versão do Node: **22.x**
   - Diretório raiz: `/` (o `package.json` está na raiz do repositório)
   - Comando de instalação: `npm install`
   - Comando de build: `npm run build`
   - Comando de início: `npm run start`

## 2. Variáveis de ambiente

Na mesma tela (ou depois em **Configurações → Variáveis de ambiente**), cadastre:

| Nome | Valor |
| --- | --- |
| `PAYLOAD_SECRET` | uma chave nova e longa (peça para o Claude gerar; não reutilize a do computador) |
| `ADMIN_EMAIL` | e-mail do dono (ou `admin@kaijuperformance.pro` até ele mandar o dele) |
| `ADMIN_PASSWORD` | senha inicial do painel (ele troca depois em Usuários) |
| `DATABASE_URI` | `file:/home/SEU_USUARIO/kaiju-data/kaiju.db` |
| `MEDIA_DIR` | `/home/SEU_USUARIO/kaiju-data/media` |
| `SITE_URL` | `https://www.kaijuperformance.pro` |

`SEU_USUARIO` é o usuário que aparece no **Gerenciador de Arquivos** (começa com `u` e números, ex.: `u123456789`).
A pasta `kaiju-data` fica ao lado da pasta do site, **fora** de `public_html` e das pastas de build — por
isso sobrevive aos deploys. Ela é criada sozinha no primeiro build.

**Não** cadastre `ADMIN_AUTOLOGIN` no servidor.

## 3. Primeiro deploy

Clique em **Deploy**. O build faz, nesta ordem:

1. `payload migrate` — cria as tabelas no `kaiju.db`;
2. `seed` — carrega as 302 versões, serviços, avaliações, eventos, textos e as 51 fotos/vídeos, e cria o usuário do painel;
3. `next build` — gera as páginas.

Nos deploys seguintes o seed vê que já tem conteúdo e **não mexe em nada** do que o dono mudou.

## 4. Domínio

1. hPanel → o app → **Domínios** → conectar `kaijuperformance.pro` (e `www`).
2. O domínio está registrado na **one.com**: lá, em DNS, troque os registros para os que a Hostinger mostrar
   (ou troque os servidores de nome para os da Hostinger).
3. SSL: ative o certificado grátis na Hostinger depois que o DNS propagar (pode levar algumas horas).
4. No painel do site: **Configurações → Dados da empresa → Endereço do site** = `https://www.kaijuperformance.pro`.

## 5. Conferir

- `https://www.kaijuperformance.pro` abre o site;
- `https://www.kaijuperformance.pro/admin` abre o login com a marca da Kaiju;
- entre, mude um texto, salve e atualize o site: a mudança aparece.

## Backup

Tudo que o dono muda está em `kaiju-data/` (o arquivo `kaiju.db` e a pasta `media`). Baixe essa pasta pelo
Gerenciador de Arquivos de vez em quando, ou ative os backups automáticos do plano.
