import Link from 'next/link';
import { brands, brandSlug, familiesOf, vehicles } from '@/content/vehicles';
import styles from './BrandGrid.module.css';

/** Grade com as marcas; cada uma abre a página com os modelos dela. */
export function BrandGrid() {
  return (
    <ul className={styles.grid}>
      {brands.map((b) => {
        const versions = vehicles.filter((v) => v.brand === b).length;
        const models = familiesOf(b).length;
        return (
          <li key={b}>
            <Link href={`/remap/marcas/${brandSlug(b)}`} className={styles.brand}>
              <span className={`display ${styles.name}`}>{b}</span>
              <span className={`label ${styles.count}`}>
                {models} {models === 1 ? 'modelo' : 'modelos'} · {versions} {versions === 1 ? 'versão' : 'versões'}
              </span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
