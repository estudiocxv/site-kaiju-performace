import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import { StagesExplained } from '@/components/sections/StagesExplained';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { brands, categoryLabel, formatKgfm, remapDisclaimer, vehicles } from '@/content/vehicles';
import styles from './remap.module.css';

export const metadata: Metadata = {
  title: 'Remap por modelo: ganhos de Stage 1 e Stage 2',
  description:
    'Potência e torque originais, Stage 1 e Stage 2 publicados pela Kaiju Performance para VW, Audi, BMW, Ford, Chevrolet, Toyota, Mitsubishi, Nissan, Jeep, Fiat, Peugeot, Citroën e Mini. Bauru/SP.',
  alternates: { canonical: '/remap' },
};

export default function RemapIndex() {
  return (
    <>
      <PageHead crumbs={[{ href: '/', label: 'Início' }, { label: 'Remap por modelo' }]} title="Remap por modelo">
        <p>
          Números publicados pela Kaiju para cada versão: original, Stage 1 e Stage 2. Clique no carro para ver a ficha com os
          upgrades indicados.
        </p>
      </PageHead>

      <section className="wrap" aria-label="Tabela de ganhos">
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visually-hidden">Ganhos de potência e torque por modelo</caption>
            <thead>
              <tr className="label">
                <th scope="col">Modelo</th>
                <th scope="col">Tipo</th>
                <th scope="col">Original</th>
                <th scope="col">Stage 1</th>
                <th scope="col" className={styles.s2}>
                  Stage 2
                </th>
              </tr>
            </thead>
            {brands.map((b) => (
              <tbody key={b}>
                <tr className={styles.brandRow}>
                  <th scope="rowgroup" colSpan={5} className="display">
                    {b}
                  </th>
                </tr>
                {vehicles
                  .filter((v) => v.brand === b)
                  .map((v) => (
                    <tr key={v.slug} className={styles.row}>
                      <th scope="row">
                        <Link href={`/remap/${v.slug}`}>
                          {v.model} <span>{v.engine}</span>
                          {v.years && <small> · {v.years}</small>}
                        </Link>
                      </th>
                      <td className={`label ${styles.type}`}>{categoryLabel[v.category]}</td>
                      <td data-label="Original">
                        {v.original.cv} cv <small>{formatKgfm(v.original.kgfm)} kgfm</small>
                      </td>
                      <td data-label="Stage 1">
                        {v.stage1.cv} cv <small>{formatKgfm(v.stage1.kgfm)} kgfm</small>
                      </td>
                      <td className={styles.s2} data-label="Stage 2">
                        {v.stage2.cv}
                        {v.stage2.cvPlus ? '+' : ''} cv <small>{formatKgfm(v.stage2.kgfm)} kgfm</small>
                      </td>
                    </tr>
                  ))}
              </tbody>
            ))}
          </table>
        </div>
        <p className={`label muted ${styles.disclaimer}`}>{remapDisclaimer}</p>
        <div className={styles.notFound}>
          <p className="display">Seu carro não está na lista?</p>
          <p className="muted">A Kaiju faz remap em muitos outros modelos, inclusive linha diesel, Mercedes-Benz e Renault.</p>
          <WhatsAppButton message="Olá, Kaiju! Meu carro não está na lista do site. Vocês fazem remap nele?">
            Perguntar no WhatsApp
          </WhatsAppButton>
        </div>
      </section>

      <StagesExplained compact />
    </>
  );
}
