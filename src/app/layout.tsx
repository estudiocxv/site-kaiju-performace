import type { Metadata, Viewport } from 'next';
import { Archivo, Chivo_Mono, Saira } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { MobileCta } from '@/components/MobileCta';
import { site } from '@/content/site';
import './globals.css';

const saira = Saira({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['wdth'],
  variable: '--font-saira',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const chivoMono = Chivo_Mono({
  subsets: ['latin'],
  variable: '--font-chivo-mono',
  display: 'swap',
});

const description =
  'Oficina de performance em Bauru/SP. Remap Stage 1 e Stage 2, preparação turbo, FuelTech, mecânica, diagnóstico e carros antigos. Orçamento pelo WhatsApp (14) 99836-4764.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Kaiju Performance | Remap, preparação e mecânica em Bauru/SP',
    template: '%s | Kaiju Performance Bauru',
  },
  description,
  applicationName: site.name,
  keywords: ['remap Bauru', 'Stage 1', 'Stage 2', 'reprogramação eletrônica', 'preparação automotiva', 'oficina Bauru', 'FuelTech Bauru', 'Kaiju Performance'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.name,
    title: 'Kaiju Performance — Seu carro. Nosso projeto.',
    description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Kaiju Performance, oficina de performance em Bauru/SP' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/icon.png', apple: '/icon.png' },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: site.name,
  description,
  url: site.url,
  image: `${site.url}/og.jpg`,
  telephone: '+55 14 99836-4764',
  taxID: site.cnpj,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'BR',
  },
  areaServed: 'Bauru e região',
  sameAs: [site.social.instagram, site.social.facebook, site.social.googleReviews],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={`${saira.variable} ${archivo.variable} ${chivoMono.variable}`}>
      <body>
        <a href="#conteudo" className="visually-hidden">
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <MobileCta />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </body>
    </html>
  );
}
