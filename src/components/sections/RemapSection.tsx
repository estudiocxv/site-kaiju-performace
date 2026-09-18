import Link from 'next/link';
import { getHome, getRemapTexts, getSite, getVehicles } from '@/content/cms';
import { brandsOf, summarize } from '@/content/vehicles';
import { Lines } from '../Lines';
import { RemapFinder } from '../RemapFinder';
import styles from './RemapSection.module.css';

export async function RemapSection() {
  const [vehicles, { remap }, texts, site] = await Promise.all([getVehicles(), getHome(), getRemapTexts(), getSite()]);
  const brands = brandsOf(vehicles);
  return (
    <section id="remap" className={styles.section} aria-labelledby="remap-title">
      <div className="wrap">
        <div className={styles.head}>
          {remap.label && <p className="label">{remap.label}</p>}
          <h2 id="remap-title" className={`display ${styles.title}`}>
            <Lines text={remap.title} />
          </h2>
          <p className={styles.intro}>
            {vehicles.length} versões de {brands.length} marcas: original, Stage 1, Stage 2 e Stage 3 quando existe, com as
            modificações que cada etapa pede. <Link href="/remap">Ver tabela completa</Link>.
          </p>
        </div>

        <RemapFinder vehicles={summarize(vehicles)} whatsappNumber={site.whatsapp.number} />

        <p className={`label ${styles.disclaimer}`}>{texts.disclaimer}</p>
      </div>
    </section>
  );
}
