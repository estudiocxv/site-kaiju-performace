'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { Logo } from './Logo';
import { WhatsApp } from './icons';
import styles from './SiteHeader.module.css';

const nav = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/remap', label: 'Remap por modelo' },
  { href: '/#avaliacoes', label: 'Avaliações' },
  { href: '/#oficina', label: 'A oficina' },
  { href: '/#contato', label: 'Contato' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // fecha o menu ao trocar de página
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const solid = scrolled || pathname !== '/';

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ''} ${open ? styles.open : ''}`}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label="Kaiju Performance, página inicial">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Principal">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <a className={styles.cta} href={whatsappUrl(messages.default)} target="_blank" rel="noopener noreferrer">
          <WhatsApp size={18} />
          <span>{site.whatsapp.display}</span>
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Fechar menu' : 'Abrir menu'}</span>
          <span className={styles.toggleLines} aria-hidden="true" />
        </button>
      </div>

      <div id="menu-mobile" className={styles.sheet} hidden={!open}>
        <nav aria-label="Menu">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`display ${styles.sheetLink}`} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.sheetFoot}>
          <p className="label muted">Orçamentos no WhatsApp</p>
          <a className="btn" href={whatsappUrl(messages.default)} target="_blank" rel="noopener noreferrer">
            <WhatsApp size={20} />
            {site.whatsapp.display}
          </a>
          <p className="label muted">
            {site.address.district} · {site.address.city}/{site.address.state}
          </p>
        </div>
      </div>
    </header>
  );
}
