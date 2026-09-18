import type { Metadata, Viewport } from 'next';
import { Archivo, Chivo_Mono, Saira } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { MobileCta } from '@/components/MobileCta';
import { getSeo, getSite } from '@/content/cms';
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

export async function generateMetadata(): Promise<Metadata> {
  const [site, seo] = await Promise.all([getSite(), getSeo()]);
  const share = seo.shareImage
    ? { url: seo.shareImage.src, width: seo.shareImage.width, height: seo.shareImage.height, alt: seo.shareImage.alt }
    : { url: '/og.jpg', width: 1200, height: 630, alt: `${site.name}, ${site.category.toLowerCase()} em ${site.city}/${site.state}` };
  return {
    metadataBase: new URL(site.url),
    title: { default: seo.title, template: `%s | ${site.name} ${site.city}` },
    description: seo.description,
    applicationName: site.name,
    keywords: seo.keywords,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: site.name,
      title: seo.shareTitle,
      description: seo.description,
      images: [share],
    },
    twitter: { card: 'summary_large_image' },
    icons: { icon: '/icon.png', apple: '/icon.png' },
  };
}

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [site, seo] = await Promise.all([getSite(), getSeo()]);
  const phone = site.whatsapp.number.replace(/^55(d{2})(d{4,5})(d{4})$/, '+55 $1 $2-$3');
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: site.name,
    description: seo.description,
    url: site.url,
    image: `${site.url}/og.jpg`,
    telephone: phone,
    ...(site.cnpj ? { taxID: site.cnpj } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'BR',
    },
    areaServed: `${site.city} e região`,
    sameAs: [site.social.instagram, site.social.facebook, site.social.googleReviews].filter(Boolean),
  };

  return (
    <html lang="pt-BR" className={`${saira.variable} ${archivo.variable} ${chivoMono.variable}`}>
      <body>
        <a href="#conteudo" className="visually-hidden">
          Pular para o conteúdo
        </a>
        <SiteHeader whatsapp={site.whatsapp} place={`${site.address.district} · ${site.city}/${site.state}`} />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <MobileCta whatsappNumber={site.whatsapp.number} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </body>
    </html>
  );
}
