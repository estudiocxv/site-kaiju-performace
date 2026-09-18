import { getHome } from '@/content/cms';
import { Lines } from '../Lines';
import styles from './StagesExplained.module.css';

export async function StagesExplained({ compact = false }: { compact?: boolean }) {
  const { stages } = await getHome();
  const { stage1, stage2, warning } = stages;
  return (
    <section className={`${styles.section} ${compact ? styles.compact : ''}`} aria-labelledby="stages-title">
      <div className="wrap">
        <div className={styles.head}>
          {stages.label && <p className="label muted">{stages.label}</p>}
          <h2 id="stages-title" className={`display ${styles.title}`}>
            <Lines text={stages.title} />
          </h2>
          {stages.intro && <p className={styles.intro}>{stages.intro}</p>}
        </div>

        <div className={styles.cols}>
          {[stage1, stage2].map((s, i) => (
            <article key={s.name} className={`reveal ${styles.col} ${i === 1 ? styles.two : ''}`}>
              <h3 className={`display ${styles.name}`}>{s.name}</h3>
              <p className={styles.lead}>{s.lead}</p>
              <ul className={styles.points}>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {warning && (
          <p className={`reveal ${styles.warning}`}>
            <strong className="label">Atenção</strong>
            {warning}
          </p>
        )}
      </div>
    </section>
  );
}
