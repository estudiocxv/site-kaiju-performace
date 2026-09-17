import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHead } from '@/components/PageHead';
import { Photo } from '@/components/Photo';
import { StageSheet } from '@/components/StageSheet';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ArrowRight } from '@/components/icons';
import { instagramPost } from '@/content/site';
import { brandSlug, cvText, getVehicle, kgfmText, remapBenefits, remapDisclaimer, vehicleName, vehicles } from '@/content/vehicles';
import { process, stageExplained } from '@/content/services';
import { messages } from '@/lib/whatsapp';
import styles from './model.module.css';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = getVehicle((await params).slug);
  if (!v) return {};
  const name = vehicleName(v);
  const [original, ...tuned] = v.stages;
  const top = tuned[tuned.length - 1];
  return {
    title: `Remap ${name}: ${tuned.map((s) => s.name).join(', ')}`,
    description: `${name}: original ${cvText(original)} cv e ${kgfmText(original)} kgfm; ${top.name} até ${cvText(top)} cv e ${kgfmText(top)} kgfm. Remap na Kaiju Performance, Bauru/SP.`,
    alternates: { canonical: `/remap/${v.slug}` },
    ...(v.poster ? { openGraph: { images: [{ url: v.poster.src, width: 1254, height: 1254, alt: v.poster.alt }] } } : {}),
  };
}

const date = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR');

const stageHint: Record<string, string> = {
  'Stage 1': stageExplained.stage1.lead,
  'Stage 2': stageExplained.stage2.lead,
  'Stage 3': 'Etapa para projetos mais completos, com mais modificações no conjunto.',
};

export default async function VehiclePage({ params }: Props) {
  const v = getVehicle((await params).slug);
  if (!v) notFound();

  const i = vehicles.indexOf(v);
  const prev = vehicles[(i - 1 + vehicles.length) % vehicles.length];
  const next = vehicles[(i + 1) % vehicles.length];
  const name = vehicleName(v);

  return (
    <article>
      <PageHead
        crumbs={[
          { href: '/', label: 'Início' },
          { href: '/remap', label: 'Remap' },
          { href: `/remap/marcas/${brandSlug(v.brand)}`, label: v.brand },
          { label: v.family },
        ]}
        title={
          <>
            <span className={styles.brand}>{v.brand}</span> {v.version}
          </>
        }
      >
        <p>
          Reprogramação eletrônica{v.years ? ` para as versões ${v.years}` : ''}: potência e torque do original e de cada
          stage, com as modificações indicadas para cada etapa.
        </p>
      </PageHead>

      <div className={`wrap ${styles.top}`}>
        {v.specs?.length ? (
          <dl className={styles.specs}>
            {v.specs.map((s) => (
              <div key={s.label}>
                <dt className="label muted">{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <span />
        )}
        <WhatsAppButton message={messages.remap(name)}>Orçamento para o meu {v.family}</WhatsAppButton>
      </div>

      <section className={styles.sheetSection} aria-label="Ficha de ganhos">
        <div className={`wrap ${styles.sheetGrid}`}>
          <StageSheet vehicle={v} headingLevel={2} hideTitle />
          {v.poster && v.source ? (
            <figure className={styles.poster}>
              <a href={instagramPost(v.source.shortcode)} target="_blank" rel="noopener noreferrer">
                <Photo photo={v.poster} sizes="(max-width: 900px) 100vw, 34vw" />
              </a>
              <figcaption className="label">Arte publicada no Instagram da Kaiju em {date(v.source.date)}</figcaption>
            </figure>
          ) : v.engine ? (
            <aside className={styles.engine}>
              <p className="label">Ficha do motor</p>
              <p>{v.engine}</p>
            </aside>
          ) : null}
        </div>
      </section>

      {v.publishedResult && (
        <section className="wrap" aria-labelledby="resultado">
          <div className={styles.result}>
            <p className="label">Carro real</p>
            <h2 id="resultado" className="display">
              {v.publishedResult.title}
            </h2>
            <p>{v.publishedResult.text}</p>
            <a
              className="link-arrow"
              href={instagramPost(v.publishedResult.source.shortcode)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver o vídeo no Instagram
            </a>
          </div>
        </section>
      )}

      <section className={`wrap ${styles.detail}`}>
        <div>
          <h2 className={`display ${styles.h2}`}>O que muda no carro</h2>
          <ul className={styles.list}>
            {remapBenefits[v.category].map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={`display ${styles.h2}`}>Qual stage escolher</h2>
          <dl className={styles.stages}>
            {v.stages.slice(1).map((s) => (
              <div key={s.name}>
                <dt className="display">{s.name}</dt>
                <dd>{s.upgrades?.length ? `Indicado com: ${s.upgrades.join(', ').toLowerCase()}.` : stageHint[s.name]}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.warning}>{stageExplained.warning}</p>
        </div>
      </section>

      <section className={`wrap ${styles.process}`} aria-labelledby="processo">
        <h2 id="processo" className="label">
          Como a Kaiju faz
        </h2>
        <ol>
          {process.map((p) => (
            <li key={p.title}>
              <strong>{p.title}.</strong> <span className="muted">{p.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className={`wrap ${styles.notes}`}>
        {v.notes?.map((n) => (
          <p key={n} className="label muted">
            {n}
          </p>
        ))}
        <p className="label muted">{remapDisclaimer}</p>
      </div>

      <nav className={`wrap ${styles.pager}`} aria-label="Outras versões">
        <Link href={`/remap/${prev.slug}`} className={styles.pagerLink}>
          <span className="label muted">Anterior</span>
          <span className="display">
            {prev.brand} {prev.version}
          </span>
        </Link>
        <Link href="/remap" className={`label ${styles.pagerAll}`}>
          Todas as versões
        </Link>
        <Link href={`/remap/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <span className="label muted">
            Próximo <ArrowRight size={12} />
          </span>
          <span className="display">
            {next.brand} {next.version}
          </span>
        </Link>
      </nav>
    </article>
  );
}
