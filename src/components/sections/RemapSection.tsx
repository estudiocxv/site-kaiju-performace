import Link from 'next/link';
import { brands, remapDisclaimer, vehicles } from '@/content/vehicles';
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
            {vehicles.length} versões de {brands.length} marcas: original, Stage 1, Stage 2 e Stage 3 quando existe, com as
            modificações que cada etapa pede. <Link href="/remap">Ver tabela completa</Link>.
          </p>
        </div>

        <RemapFinder />

        <p className={`label ${styles.disclaimer}`}>{remapDisclaimer}</p>
      </div>
    </section>
  );
}
