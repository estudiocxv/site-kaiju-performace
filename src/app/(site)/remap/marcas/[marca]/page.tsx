import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHead } from '@/components/PageHead';
import { VersionTable } from '@/components/VersionTable';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getRemapTexts, getVehicles } from '@/content/cms';
import { brandFromSlug, brandsOf, brandSlug, groupByFamily } from '@/content/vehicles';
import styles from './brand.module.css';

type Props = { params: Promise<{ marca: string }> };

export async function generateStaticParams() {
  return brandsOf(await getVehicles()).map((b) => ({ marca: brandSlug(b) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicles = await getVehicles();
  const brand = brandFromSlug(vehicles, (await params).marca);
  if (!brand) return {};
  const list = vehicles.filter((v) => v.brand === brand);
  return {
    title: `Remap ${brand}: Stage 1, Stage 2 e Stage 3`,
    description: `Ganhos de potência e torque com remap para ${list.length} versões ${brand}. Kaiju Performance, Bauru/SP.`,
    alternates: { canonical: `/remap/marcas/${brandSlug(brand)}` },
  };
}

const anchor = (title: string) => `modelo-${title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;

export default async function BrandPage({ params }: Props) {
  const [vehicles, texts] = await Promise.all([getVehicles(), getRemapTexts()]);
  const brand = brandFromSlug(vehicles, (await params).marca);
  if (!brand) notFound();

  const groups = groupByFamily(
    vehicles.filter((v) => v.brand === brand),
    false,
  );
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <PageHead
        crumbs={[{ href: '/', label: 'Início' }, { href: '/remap', label: 'Remap' }, { label: brand }]}
        title={brand}
      >
        <p>
          {groups.length} {groups.length === 1 ? 'modelo' : 'modelos'} e {total} {total === 1 ? 'versão' : 'versões'}.
          Clique na versão para ver a ficha completa.
        </p>
      </PageHead>

      <section className="wrap" aria-label={`Versões ${brand}`}>
        <div className={styles.bar}>
          <Link href="/remap" className="link-arrow">
            ← Todas as marcas
          </Link>
          {groups.length > 1 && (
            <nav aria-label="Modelos" className={styles.models}>
              {groups.map((g) => (
                <a key={g.title} href={`#${anchor(g.title)}`}>
                  {g.title}
                </a>
              ))}
            </nav>
          )}
        </div>

        <VersionTable groups={groups} caption={`Ganhos de potência e torque das versões ${brand}`} />

        <p className={`label muted ${styles.disclaimer}`}>{texts.disclaimer}</p>
        <div className={styles.cta}>
          <p className="display">Não achou a sua versão?</p>
          <WhatsAppButton message={`Olá, Kaiju! Tenho um ${brand} e não achei a versão no site. Vocês fazem remap nele?`}>
            Perguntar no WhatsApp
          </WhatsAppButton>
        </div>
      </section>
    </>
  );
}
