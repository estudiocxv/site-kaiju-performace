'use client';

import { useEffect, useState } from 'react';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { WhatsApp } from './icons';
import styles from './MobileCta.module.css';

/** Barra fixa de WhatsApp no celular, aparece depois da primeira tela. */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // some quando o contato (com o número grande) entra na tela
      const contact = document.getElementById('contato');
      const nearEnd = contact
        ? window.scrollY + window.innerHeight > contact.offsetTop + 160
        : window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={`${styles.bar} ${show ? styles.show : ''}`}
      href={whatsappUrl(messages.default)}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
    >
      <WhatsApp size={22} />
      Orçamento no WhatsApp
    </a>
  );
}
