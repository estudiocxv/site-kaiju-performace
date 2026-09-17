import Link from 'next/link';
import { remapDisclaimer, vehicles } from '@/content/vehicles';
import { RemapFinder } from '../RemapFinder';
import styles from './RemapSection.module.css';

export function RemapSection() {
  return (
    <section id="remap" className={styles.section} aria-labelledby="remap-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className="label">Ganhos por modelo</p>
          <h2 id="remap-title" className={`display ${styles.title}`}>
            Quanto o seu carro ganha
          </h2>
          <p className={styles.intro}>
            {vehicles.length} versões com números publicados pela Kaiju: original, Stage 1 e Stage 2, com os upgrades que
            cada etapa pede. Não achou o seu? A Kaiju faz remap em muito mais carros.{' '}
            <Link href="/remap">Ver lista completa</Link>.
          </p>
        </div>

        <RemapFinder />

        <p className={`label ${styles.disclaimer}`}>{remapDisclaimer}</p>
      </div>
    </section>
  );
}
