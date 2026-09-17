import type { Vehicle } from '@/content/types';
import { cvText, gain, kgfmText } from '@/content/vehicles';
import styles from './StageSheet.module.css';

type Metric = 'cv' | 'kgfm';

const rowClass = (name: string) =>
  name === 'Original' ? styles.original : name === 'Stage 1' ? styles.stage1 : name === 'Stage 2' ? styles.stage2 : styles.stage3;

function Meter({ vehicle, metric }: { vehicle: Vehicle; metric: Metric }) {
  const max = Math.max(...vehicle.stages.map((s) => s[metric]));
  const base = vehicle.stages[0][metric];

  return (
    <div className={styles.meter}>
      <p className={`label ${styles.metric}`}>{metric === 'cv' ? 'Potência' : 'Torque'}</p>
      <dl className={styles.rows}>
        {vehicle.stages.map((s, i) => {
          const g = i === 0 ? null : gain(base, s[metric]);
          return (
            <div key={s.name} className={`${styles.row} ${rowClass(s.name)}`}>
              <dt className={`label ${styles.rowLabel}`}>{s.name}</dt>
              <dd className={styles.track} aria-hidden="true">
                <span className={styles.bar} style={{ width: `${(s[metric] / max) * 100}%` }} />
              </dd>
              <dd className={styles.value}>
                <span className={styles.num}>{metric === 'cv' ? cvText(s) : kgfmText(s)}</span>{' '}
                <span className={styles.unit}>{metric === 'cv' ? 'cv' : 'kgfm'}</span>
              </dd>
              <dd className={`label ${styles.gain}`}>{g === null || g <= 0 ? '—' : `+${g}%`}</dd>
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
  const withUpgrades = vehicle.stages.filter((s) => s.upgrades?.length);

  return (
    <div className={styles.sheet}>
      <header className={styles.top}>
        <p className="label">Ficha de ganhos</p>
        <H className={hideTitle ? 'visually-hidden' : `display ${styles.model}`}>
          {vehicle.brand} <span>{vehicle.version}</span>
        </H>
        {vehicle.years && <p className="label">{vehicle.years}</p>}
      </header>

      <div className={styles.meters}>
        <Meter vehicle={vehicle} metric="cv" />
        <Meter vehicle={vehicle} metric="kgfm" />
      </div>

      {withUpgrades.length > 0 && (
        <dl className={styles.upgrades}>
          {withUpgrades.map((s) => (
            <div key={s.name}>
              <dt className="label">{s.name} com</dt>
              <dd>
                <ul>
                  {s.upgrades!.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
