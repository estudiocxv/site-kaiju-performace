'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import {
  brands,
  familiesOf,
  groupByFamily,
  searchVehicles,
  vehicleName,
  vehicles,
  versionsOf,
} from '@/content/vehicles';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { StageSheet } from './StageSheet';
import { ArrowRight, WhatsApp } from './icons';
import styles from './RemapFinder.module.css';

export function RemapFinder({ initial = 'bmw-320i-f30' }: { initial?: string }) {
  const [slug, setSlug] = useState(initial);
  // computador: primeiro a lista de marcas, depois os modelos da marca aberta
  const [openBrand, setOpenBrand] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const ids = { brand: useId(), family: useId(), version: useId(), search: useId() };

  const vehicle = vehicles.find((v) => v.slug === slug) ?? vehicles[0];
  const searching = query.trim().length > 0;

  const groups = useMemo(() => {
    if (searching) return groupByFamily(searchVehicles(query));
    if (openBrand) return groupByFamily(vehicles.filter((v) => v.brand === openBrand), false);
    return [];
  }, [searching, query, openBrand]);

  // celular: marca -> modelo -> versão
  const pickBrand = (b: string) => {
    const first = versionsOf(b, familiesOf(b)[0])[0];
    if (first) setSlug(first.slug);
  };
  const pickFamily = (f: string) => {
    const first = versionsOf(vehicle.brand, f)[0];
    if (first) setSlug(first.slug);
  };

  return (
    <div className={styles.finder}>
      <div className={styles.picker}>
        <div className={styles.selects}>
          <label htmlFor={ids.brand} className="label">
            Marca
          </label>
          <div className={styles.selectWrap}>
            <select id={ids.brand} className={styles.select} value={vehicle.brand} onChange={(e) => pickBrand(e.target.value)}>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <label htmlFor={ids.family} className="label">
            Modelo
          </label>
          <div className={styles.selectWrap}>
            <select id={ids.family} className={styles.select} value={vehicle.family} onChange={(e) => pickFamily(e.target.value)}>
              {familiesOf(vehicle.brand).map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <label htmlFor={ids.version} className="label">
            Versão
          </label>
          <div className={styles.selectWrap}>
            <select id={ids.version} className={styles.select} value={vehicle.slug} onChange={(e) => setSlug(e.target.value)}>
              {versionsOf(vehicle.brand, vehicle.family).map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.version}
                  {v.years ? ` (${v.years})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.desktop}>
          <label htmlFor={ids.search} className="visually-hidden">
            Buscar carro
          </label>
          <input
            id={ids.search}
            type="search"
            className={styles.search}
            placeholder="Busque seu carro: Golf, 320i, Hilux…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          {!searching && !openBrand && (
            <ul className={styles.brandList} aria-label="Marcas">
              {brands.map((b) => (
                <li key={b}>
                  <button type="button" className={styles.brandItem} onClick={() => setOpenBrand(b)}>
                    <span className={styles.brandName}>{b}</span>
                    <span className={styles.modelEngine}>
                      {familiesOf(b).length} {familiesOf(b).length === 1 ? 'modelo' : 'modelos'} →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!searching && openBrand && (
            <div className={styles.openHead}>
              <button type="button" className={styles.back} onClick={() => setOpenBrand(null)}>
                ← Marcas
              </button>
              <p className={`display ${styles.openTitle}`}>{openBrand}</p>
            </div>
          )}

          {(searching || openBrand) && (
            <div className={styles.list} aria-label="Versões">
              {groups.length === 0 && (
                <p className={styles.empty}>Nenhuma versão encontrada. Tente outro nome ou chame no WhatsApp.</p>
              )}
              {groups.map(({ title, items }) => (
                <div key={title}>
                  <p className={`label ${styles.group}`}>{title}</p>
                  <ul>
                    {items.map((v) => (
                      <li key={v.slug}>
                        <button
                          type="button"
                          className={styles.model}
                          aria-pressed={v.slug === slug}
                          onClick={() => setSlug(v.slug)}
                        >
                          <span className={styles.modelName}>{v.version}</span>
                          <span className={styles.modelEngine}>{v.stages[0].cvText ?? v.stages[0].cv} cv</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.result} aria-live="polite">
        <StageSheet vehicle={vehicle} />
        <div className={styles.actions}>
          <a className="btn" href={whatsappUrl(messages.remap(vehicleName(vehicle)))} target="_blank" rel="noopener noreferrer">
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
