'use client';

import { useId, useState } from 'react';
import { groupByFamily, searchVehicles, type VehicleSummary } from '@/content/vehicles';
import { VersionTable } from './VersionTable';
import styles from './RemapBrowser.module.css';

/**
 * /remap: sem busca mostra as marcas (children); com busca mostra direto
 * as versões encontradas em todas as marcas.
 */
export function RemapBrowser({ vehicles, children }: { vehicles: VehicleSummary[]; children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const searchId = useId();
  const results = searchVehicles(vehicles, query);
  const searching = query.trim().length > 0;

  return (
    <>
      <div className={styles.tools}>
        <label htmlFor={searchId} className="label muted">
          Escolha a marca ou busque pelo nome
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
        {searching && (
          <p className={`label muted ${styles.count}`} aria-live="polite">
            {results.length} {results.length === 1 ? 'versão encontrada' : 'versões encontradas'}
          </p>
        )}
      </div>

      {!searching && children}
      {searching &&
        (results.length ? (
          <VersionTable groups={groupByFamily(results)} caption="Versões encontradas na busca" />
        ) : (
          <p className={styles.empty}>Nenhuma versão encontrada com esse nome.</p>
        ))}
    </>
  );
}
