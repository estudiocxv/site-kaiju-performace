import type { StageFigures, Vehicle } from '@/content/types';
import { formatKgfm, gain } from '@/content/vehicles';
import styles from './StageSheet.module.css';

const ROWS = [
  { key: 'original', label: 'Original' },
  { key: 'stage1', label: 'Stage 1' },
  { key: 'stage2', label: 'Stage 2' },
] as const;

type Metric = 'cv' | 'kgfm';

function Meter({ vehicle, metric }: { vehicle: Vehicle; metric: Metric }) {
  const max = vehicle.stage2[metric];
  const base = vehicle.original[metric];
  const unit = metric === 'cv' ? 'cv' : 'kgfm';
  const fmt = (f: StageFigures) => (metric === 'cv' ? `${f.cv}${f.cvPlus ? '+' : ''}` : formatKgfm(f.kgfm));

  return (
    <div className={styles.meter}>
      <p className={`label ${styles.metric}`}>{metric === 'cv' ? 'Potência' : 'Torque'}</p>
      <dl className={styles.rows}>
        {ROWS.map(({ key, label }) => {
          const f = vehicle[key];
          const pct = (f[metric] / max) * 100;
          const g = key === 'original' ? null : gain(base, f[metric]);
          return (
            <div key={key} className={`${styles.row} ${styles[key]}`}>
              <dt className={`label ${styles.rowLabel}`}>{label}</dt>
              <dd className={styles.track} aria-hidden="true">
                <span className={styles.bar} style={{ width: `${pct}%` }} />
              </dd>
              <dd className={styles.value}>
                <span className={styles.num}>{fmt(f)}</span> <span className={styles.unit}>{unit}</span>
              </dd>
              <dd className={`label ${styles.gain}`}>{g === null ? '—' : `+${g}%`}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export function StageSheet({
  vehicle,
  headingLevel = 3,
  hideTitle = false,
}: {
  vehicle: Vehicle;
  headingLevel?: 2 | 3;
  /** na página do modelo o nome já está no título principal */
  hideTitle?: boolean;
}) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <div className={styles.sheet}>
      <header className={styles.top}>
        <p className="label">Ficha de ganhos · publicada pela Kaiju</p>
        <H className={hideTitle ? 'visually-hidden' : `display ${styles.model}`}>
          {vehicle.brand} {vehicle.model} <span>{vehicle.engine}</span>
        </H>
        {vehicle.years && <p className="label">{vehicle.years}</p>}
      </header>

      <div className={styles.meters}>
        <Meter vehicle={vehicle} metric="cv" />
        <Meter vehicle={vehicle} metric="kgfm" />
      </div>

      <div className={styles.upgrades}>
        <p className="label">Stage 2 recomendado com</p>
        <ul>
          {vehicle.stage2Upgrades.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
