'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { brands, familiesOf, vehicleName, vehicles, versionsOf } from '@/content/vehicles';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { StageSheet } from './StageSheet';
import { ArrowRight, WhatsApp } from './icons';
import styles from './RemapFinder.module.css';

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

export function RemapFinder({ initial = 'bmw-320i-f30' }: { initial?: string }) {
  const [slug, setSlug] = useState(initial);
  const [brand, setBrand] = useState('Todas');
  const [query, setQuery] = useState('');
  const ids = { brand: useId(), family: useId(), version: useId(), search: useId() };

  const vehicle = vehicles.find((v) => v.slug === slug) ?? vehicles[0];

  // lista do desktop: filtro por marca + busca por texto, agrupada por modelo
  const groups = useMemo(() => {
    const q = normalize(query.trim());
    const list = vehicles.filter(
      (v) => (brand === 'Todas' || v.brand === brand) && (!q || normalize(`${v.brand} ${v.family} ${v.version}`).includes(q)),
    );
    const map = new Map<string, typeof list>();
    for (const v of list) {
      const key = `${v.brand} · ${v.family}`;
      map.set(key, [...(map.get(key) ?? []), v]);
    }
    return [...map.entries()];
  }, [brand, query]);

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
          <div className={styles.brands} role="group" aria-label="Filtrar por marca">
            {['Todas', ...brands].map((b) => (
              <button key={b} type="button" aria-pressed={brand === b} className={styles.brand} onClick={() => setBrand(b)}>
                {b}
              </button>
            ))}
          </div>
          <div className={styles.list} aria-label="Versões">
            {groups.length === 0 && <p className={styles.empty}>Nenhuma versão encontrada. Tente outro nome ou chame no WhatsApp.</p>}
            {groups.map(([group, list]) => (
              <div key={group}>
                <p className={`label ${styles.group}`}>{group}</p>
                <ul>
                  {list.map((v) => (
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
