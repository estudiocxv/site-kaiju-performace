import Link from 'next/link';
import { getVehicles } from '@/content/cms';
import { brandsOf, brandSlug, familiesOf } from '@/content/vehicles';
import styles from './BrandGrid.module.css';

/** Grade com as marcas; cada uma abre a página com os modelos dela. */
export async function BrandGrid() {
  const vehicles = await getVehicles();
  const brands = brandsOf(vehicles);
  return (
    <ul className={styles.grid}>
      {brands.map((b) => {
        const versions = vehicles.filter((v) => v.brand === b).length;
        const models = familiesOf(vehicles, b).length;
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
