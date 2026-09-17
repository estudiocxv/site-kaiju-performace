import type { Metadata } from 'next';
import { BrandGrid } from '@/components/BrandGrid';
import { PageHead } from '@/components/PageHead';
import { RemapBrowser } from '@/components/RemapBrowser';
import { StagesExplained } from '@/components/sections/StagesExplained';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { brands, remapDisclaimer, vehicles } from '@/content/vehicles';
import styles from './remap.module.css';

export const metadata: Metadata = {
  title: 'Remap por modelo: ganhos de Stage 1 e Stage 2',
  description: `Potência e torque originais e com remap Stage 1, Stage 2 e Stage 3 para ${vehicles.length} versões de ${brands.join(', ')}. Kaiju Performance, Bauru/SP.`,
  alternates: { canonical: '/remap' },
};

export default function RemapIndex() {
  return (
    <>
      <PageHead crumbs={[{ href: '/', label: 'Início' }, { label: 'Remap por modelo' }]} title="Remap por modelo">
        <p>
          {vehicles.length} versões de {brands.length} marcas, com potência e torque do original e de cada stage. Escolha a
          marca para ver os modelos.
        </p>
      </PageHead>

      <section className="wrap" aria-label="Marcas e versões">
        <RemapBrowser>
          <BrandGrid />
        </RemapBrowser>
        <p className={`label muted ${styles.disclaimer}`}>{remapDisclaimer}</p>
        <div className={styles.notFound}>
          <p className="display">Seu carro não está na lista?</p>
          <p className="muted">Chama no WhatsApp com modelo, ano e motor que a Kaiju avalia o seu carro.</p>
          <WhatsAppButton message="Olá, Kaiju! Meu carro não está na lista do site. Vocês fazem remap nele?">
            Perguntar no WhatsApp
          </WhatsAppButton>
        </div>
      </section>

      <StagesExplained compact />
    </>
  );
}
