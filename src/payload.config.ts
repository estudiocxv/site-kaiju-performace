import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { pt } from '@payloadcms/translations/languages/pt';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Brands } from './cms/collections/Brands';
import { Events } from './cms/collections/Events';
import { Media } from './cms/collections/Media';
import { Models } from './cms/collections/Models';
import { Reviews } from './cms/collections/Reviews';
import { Services } from './cms/collections/Services';
import { Users } from './cms/collections/Users';
import { Vehicles } from './cms/collections/Vehicles';
import { Company } from './cms/globals/Company';
import { Home } from './cms/globals/Home';
import { RemapTexts } from './cms/globals/RemapTexts';
import { Seo } from './cms/globals/Seo';
import { migrations } from './migrations';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Banco SQLite num arquivo só. Na Hostinger ele fica fora da pasta do build
 * (apagada a cada deploy): defina DATABASE_URI=file:/home/<usuário>/kaiju-data/kaiju.db
 */
const databaseUrl = process.env.DATABASE_URI || `file:${path.resolve(process.cwd(), 'data/kaiju.db')}`;

// o SQLite cria o arquivo, mas não a pasta
fs.mkdirSync(path.dirname(databaseUrl.replace(/^file:/, '')), { recursive: true });

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' · Painel Kaiju',
      icons: [{ rel: 'icon', type: 'image/png', url: '/icon.png' }],
      robots: 'noindex, nofollow',
    },
    components: {
      graphics: {
        Logo: '@/cms/components/AdminLogo#AdminLogo',
        Icon: '@/cms/components/AdminLogo#AdminIcon',
      },
      beforeDashboard: ['@/cms/components/Welcome#Welcome'],
    },
    dateFormat: 'dd/MM/yyyy HH:mm',
    // só no computador de desenvolvimento, nunca no servidor
    autoLogin:
      process.env.NODE_ENV === 'development' && process.env.ADMIN_AUTOLOGIN === 'true' && process.env.ADMIN_EMAIL
        ? { email: process.env.ADMIN_EMAIL }
        : false,
    theme: 'dark',
  },
  i18n: { supportedLanguages: { pt }, fallbackLanguage: 'pt' },
  collections: [Vehicles, Brands, Models, Services, Reviews, Events, Media, Users],
  globals: [Home, RemapTexts, Company, Seo],
  db: sqliteAdapter({
    client: { url: databaseUrl },
    // o banco muda só por migração, igual em casa e na Hostinger
    push: false,
    // em produção o banco é criado e atualizado pelas migrações em src/migrations
    prodMigrations: migrations,
  }),
  sharp,
  graphQL: { disable: true },
  telemetry: false,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
});
