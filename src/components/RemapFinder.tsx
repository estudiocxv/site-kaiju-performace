'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { brands, vehicles, vehicleName } from '@/content/vehicles';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { StageSheet } from './StageSheet';
import { ArrowRight, WhatsApp } from './icons';
import styles from './RemapFinder.module.css';

export function RemapFinder({ initial = 'bmw-320i-f30' }: { initial?: string }) {
  const [brand, setBrand] = useState<string>('Todas');
  const [slug, setSlug] = useState(initial);
  const selectId = useId();

  const list = useMemo(() => (brand === 'Todas' ? vehicles : vehicles.filter((v) => v.brand === brand)), [brand]);
  const vehicle = vehicles.find((v) => v.slug === slug) ?? vehicles[0];

  const pickBrand = (b: string) => {
    setBrand(b);
    const first = b === 'Todas' ? null : vehicles.find((v) => v.brand === b);
    if (first && vehicle.brand !== b) setSlug(first.slug);
  };

  return (
    <div className={styles.finder}>
      <div className={styles.picker}>
        {/* celular: seletor nativo, rápido de usar com o polegar */}
        <label htmlFor={selectId} className={`label ${styles.selectLabel}`}>
          Escolha o carro
        </label>
        <div className={styles.selectWrap}>
          <select id={selectId} className={styles.select} value={slug} onChange={(e) => setSlug(e.target.value)}>
            {brands.map((b) => (
              <optgroup key={b} label={b}>
                {vehicles
                  .filter((v) => v.brand === b)
                  .map((v) => (
                    <option key={v.slug} value={v.slug}>
                      {v.model} {v.engine}
                      {v.years ? ` (${v.years})` : ''}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* desktop: filtro por marca + lista */}
        <div className={styles.brands} role="group" aria-label="Filtrar por marca">
          {['Todas', ...brands].map((b) => (
            <button key={b} type="button" aria-pressed={brand === b} className={styles.brand} onClick={() => pickBrand(b)}>
              {b}
            </button>
          ))}
        </div>
        <ul className={styles.list} aria-label="Modelos">
          {list.map((v) => (
            <li key={v.slug}>
              <button
                type="button"
                className={styles.model}
                aria-pressed={v.slug === slug}
                onClick={() => setSlug(v.slug)}
              >
                <span className={styles.modelName}>
                  {brand === 'Todas' && <span className={styles.modelBrand}>{v.brand}</span>} {v.model}
                </span>
                <span className={styles.modelEngine}>{v.engine}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.result} aria-live="polite">
        <StageSheet vehicle={vehicle} />
        <div className={styles.actions}>
          <a
            className="btn"
            href={whatsappUrl(messages.remap(vehicleName(vehicle)))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp size={20} />
            Orçamento para este carro
          </a>
          <Link className="btn btn--dark" href={`/remap/${vehicle.slug}`}>
            Ficha completa
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
