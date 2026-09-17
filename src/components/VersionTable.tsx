import Link from 'next/link';
import type { Stage, Vehicle } from '@/content/types';
import { cvText, kgfmText } from '@/content/vehicles';
import styles from './VersionTable.module.css';

const ALL_COLS = ['Original', 'Stage 1', 'Stage 2', 'Stage 3'] as const;

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

type Group = { title: string; items: Vehicle[] };

/** Tabela de versões agrupada (por modelo ou por marca · modelo). */
export function VersionTable({ groups, caption }: { groups: Group[]; caption: string }) {
  // a coluna Stage 3 só aparece se alguma versão listada tiver essa etapa
  const hasStage3 = groups.some((g) => g.items.some((v) => v.stages.some((s) => s.name === 'Stage 3')));
  const COLS = hasStage3 ? ALL_COLS : ALL_COLS.slice(0, 3);

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table} style={{ '--cols': COLS.length } as React.CSSProperties}>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr className="label">
            <th scope="col">Versão</th>
            {COLS.map((c) => (
              <th key={c} scope="col" className={c === 'Stage 2' || c === 'Stage 3' ? styles.hot : undefined}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g.title} id={`modelo-${g.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}>
            <tr className={styles.groupRow}>
              <th scope="rowgroup" colSpan={COLS.length + 1} className="display">
                {g.title}
              </th>
            </tr>
            {g.items.map((v) => (
              <tr key={v.slug} className={styles.row}>
                <th scope="row">
                  <Link href={`/remap/${v.slug}`}>
                    {v.version}
                    {v.years && <small> · {v.years}</small>}
                  </Link>
                </th>
                {COLS.map((c) => (
                  <Cell key={c} name={c} stage={v.stages.find((s) => s.name === c)} />
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
