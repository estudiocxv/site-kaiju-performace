import type { Metadata } from 'next';
import { Archivo, Chivo_Mono, Saira } from 'next/font/google';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import './(site)/globals.css';

/**
 * 404 de endereços que não existem em lugar nenhum. O site e o painel têm
 * layouts raiz separados, então esta página monta o próprio html.
 */

const saira = Saira({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['wdth'], variable: '--font-saira' });
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo' });
const chivoMono = Chivo_Mono({ subsets: ['latin'], variable: '--font-chivo-mono' });

export const metadata: Metadata = {
  title: 'Página não encontrada | Kaiju Performance',
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={`${saira.variable} ${archivo.variable} ${chivoMono.variable}`}>
      <body>
        <main className="wrap" style={{ minHeight: '100svh', display: 'grid', alignContent: 'center', gap: 28 }}>
          <Link href="/" aria-label="Kaiju Performance, página inicial">
            <Logo />
          </Link>
          <h1 className="display" style={{ fontSize: 'clamp(44px, 7vw, 96px)' }}>
            Essa página não existe
          </h1>
          <p className="muted">O endereço pode ter mudado. Volte para o início ou veja os ganhos por modelo.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/" className="btn">
              Ir para o início
            </Link>
            <Link href="/remap" className="btn btn--ghost">
              Remap por modelo
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
