'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import type { Stage } from '@/content/types';
import { brands, categoryLabel, cvText, kgfmText, vehicles } from '@/content/vehicles';
import styles from './RemapTable.module.css';

const COLS = ['Original', 'Stage 1', 'Stage 2', 'Stage 3'] as const;

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

function Cell({ stage, name }: { stage?: Stage; name: string }) {
  const hot = name === 'Stage 2' || name === 'Stage 3';
  return (
    <td data-label={name} className={hot ? styles.hot : undefined}>
      {stage ? (
        <>
          {cvText(stage)} cv <small>{kgfmText(stage)} kgfm</small>
        </>
      ) : (
        <span className={styles.none}>—</span>
      )}
    </td>
  );
}

export function RemapTable() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('Todas');
  const searchId = useId();

  const byBrand = useMemo(() => {
    const q = normalize(query.trim());
    return brands
      .filter((b) => brand === 'Todas' || b === brand)
      .map((b) => ({
        brand: b,
        list: vehicles.filter((v) => v.brand === b && (!q || normalize(`${v.brand} ${v.family} ${v.version}`).includes(q))),
      }))
      .filter((g) => g.list.length);
  }, [query, brand]);

  const total = byBrand.reduce((n, g) => n + g.list.length, 0);

  return (
    <>
      <div className={styles.tools}>
        <label htmlFor={searchId} className="visually-hidden">
          Buscar carro
        </label>
        <input
          id={searchId}
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
        <p className={`label muted ${styles.count}`} aria-live="polite">
          {total} {total === 1 ? 'versão' : 'versões'}
        </p>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <caption className="visually-hidden">Ganhos de potência e torque por versão</caption>
          <thead>
            <tr className="label">
              <th scope="col">Versão</th>
              <th scope="col">Tipo</th>
              {COLS.map((c) => (
                <th key={c} scope="col" className={c === 'Stage 2' || c === 'Stage 3' ? styles.hot : undefined}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          {byBrand.map((g) => (
            <tbody key={g.brand}>
              <tr className={styles.brandRow}>
                <th scope="rowgroup" colSpan={6} className="display">
                  {g.brand}
                </th>
              </tr>
              {g.list.map((v) => (
                <tr key={v.slug} className={styles.row}>
                  <th scope="row">
                    <Link href={`/remap/${v.slug}`}>
                      {v.version}
                      {v.years && <small> · {v.years}</small>}
                    </Link>
                  </th>
                  <td className={`label ${styles.type}`}>{categoryLabel[v.category]}</td>
                  {COLS.map((c) => (
                    <Cell key={c} name={c} stage={v.stages.find((s) => s.name === c)} />
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
        {total === 0 && <p className={styles.empty}>Nenhuma versão encontrada com esse nome.</p>}
      </div>
    </>
  );
}
