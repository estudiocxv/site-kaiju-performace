import type { Metadata } from 'next';
import { BrandGrid } from '@/components/BrandGrid';
import { PageHead } from '@/components/PageHead';
import { RemapBrowser } from '@/components/RemapBrowser';
import { StagesExplained } from '@/components/sections/StagesExplained';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getRemapTexts, getVehicles } from '@/content/cms';
import { brandsOf, summarize } from '@/content/vehicles';
import styles from './remap.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const vehicles = await getVehicles();
  return {
    title: 'Remap por modelo: ganhos de Stage 1 e Stage 2',
    description: `Potência e torque originais e com remap Stage 1, Stage 2 e Stage 3 para ${vehicles.length} versões de ${brandsOf(vehicles).join(', ')}. Kaiju Performance, Bauru/SP.`,
    alternates: { canonical: '/remap' },
  };
}

export default async function RemapIndex() {
  const [vehicles, texts] = await Promise.all([getVehicles(), getRemapTexts()]);
  const brands = brandsOf(vehicles);
  return (
    <>
      <PageHead crumbs={[{ href: '/', label: 'Início' }, { label: 'Remap por modelo' }]} title="Remap por modelo">
        <p>
          {vehicles.length} versões de {brands.length} marcas, com potência e torque do original e de cada stage. Escolha a
          marca para ver os modelos.
        </p>
      </PageHead>

      <section className="wrap" aria-label="Marcas e versões">
        <RemapBrowser vehicles={summarize(vehicles)}>
          <BrandGrid />
        </RemapBrowser>
        <p className={`label muted ${styles.disclaimer}`}>{texts.disclaimer}</p>
        <div className={styles.notFound}>
          {texts.notListed.title && <p className="display">{texts.notListed.title}</p>}
          {texts.notListed.text && <p className="muted">{texts.notListed.text}</p>}
          <WhatsAppButton message="Olá, Kaiju! Meu carro não está na lista do site. Vocês fazem remap nele?">
            Perguntar no WhatsApp
          </WhatsAppButton>
        </div>
      </section>

      <StagesExplained compact />
    </>
  );
}
