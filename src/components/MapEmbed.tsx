'use client';

import { useState } from 'react';
import { mapsQuery } from '@/content/site';
import { MapPin } from './icons';
import styles from './sections/Contact.module.css';

/** O mapa do Google só carrega quando a pessoa pede. Mantém a página leve. */
export function MapEmbed() {
  const [on, setOn] = useState(false);

  if (on) {
    return (
      <iframe
        className={styles.map}
        title="Mapa da Kaiju Performance"
        src={`https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button type="button" className={styles.mapFacade} onClick={() => setOn(true)}>
      <span className={styles.mapGrid} aria-hidden="true" />
      <span className={styles.mapPin} aria-hidden="true">
        <MapPin size={30} />
      </span>
      <span className="label">Carregar mapa</span>
    </button>
  );
}
