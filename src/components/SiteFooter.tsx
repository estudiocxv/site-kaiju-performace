import Link from 'next/link';
import { getSite } from '@/content/cms';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { Logo } from './Logo';
import { WhatsApp } from './icons';
import styles from './SiteFooter.module.css';

export async function SiteFooter() {
  const site = await getSite();
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo size="lg" />
          <p className={`label ${styles.signature}`}>{site.signature}</p>
        </div>

        <nav className={styles.col} aria-label="Rodapé">
          <p className="label muted">Site</p>
          <Link href="/#servicos">Serviços</Link>
          <Link href="/remap">Remap por modelo</Link>
          <Link href="/#avaliacoes">Avaliações</Link>
          <Link href="/#oficina">A oficina</Link>
          <Link href="/#contato">Contato</Link>
        </nav>

        <div className={styles.col}>
          <p className="label muted">Oficina</p>
          <address>{site.fullAddress}</address>
          <p>{site.schedule}</p>
          <a href={whatsappUrl(site.whatsapp.number, messages.default)} target="_blank" rel="noopener noreferrer" className={styles.wa}>
            <WhatsApp size={16} /> {site.whatsapp.display}
          </a>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
            {site.social.instagramHandle}
          </a>
        </div>
      </div>

      <div className={`wrap ${styles.bottom}`}>
        <p className="label muted">© {new Date().getFullYear()} {site.name} · {site.city}/{site.state}
          {site.cnpj && ` · CNPJ ${site.cnpj}`}</p>
        <p className="label muted">Ganhos de potência são aproximados e variam conforme o veículo.</p>
      </div>
    </footer>
  );
}
