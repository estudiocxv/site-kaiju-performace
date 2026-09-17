import { stageExplained } from '@/content/services';
import styles from './StagesExplained.module.css';

export function StagesExplained({ compact = false }: { compact?: boolean }) {
  const { stage1, stage2, warning } = stageExplained;
  return (
    <section className={`${styles.section} ${compact ? styles.compact : ''}`} aria-labelledby="stages-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className="label muted">Remap</p>
          <h2 id="stages-title" className={`display ${styles.title}`}>
            Stage 1 ou Stage 2?
          </h2>
          <p className={styles.intro}>
            Muda tudo no resultado do carro. A escolha depende do que já está instalado e do que você quer do carro no dia a
            dia.
          </p>
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

        <p className={`reveal ${styles.warning}`}>
          <strong className="label">Atenção</strong>
          {warning}
        </p>
      </div>
    </section>
  );
}
