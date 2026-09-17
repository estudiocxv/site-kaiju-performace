import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Photo } from '@/components/Photo';
import { ProjectCardSmall } from '@/components/sections/Projects';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getProject, projects, projectTitle } from '@/content/projects';
import { instagramPost } from '@/content/site';
import { messages } from '@/lib/whatsapp';
import styles from './project.module.css';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.car,
    description: `${p.car} na Kaiju Performance, Bauru/SP. ${p.summary}`,
    alternates: { canonical: `/projetos/${p.slug}` },
    openGraph: { images: [{ url: p.cover.src, alt: p.cover.alt }] },
  };
}

const date = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 4);
  const [, ...gallery] = p.photos;

  return (
    <article>
      <header className={styles.hero}>
        <div className={styles.heroImg}>
          <Photo photo={p.cover} fill sizes="100vw" preload className={styles.img} />
        </div>
        <div className={`wrap ${styles.heroText}`}>
          <nav aria-label="Você está em" className="label">
            <Link href="/projetos">Projetos</Link> <span aria-hidden="true">/</span> {p.kind}
          </nav>
          <h1 className={styles.lettering}>
            <span className="letreiro" data-text={projectTitle(p)}>
              {projectTitle(p)}
            </span>
          </h1>
          <p className={`label ${styles.car}`}>
            {p.car} · {date(p.source.date)}
          </p>
        </div>
      </header>

      <div className={`wrap ${styles.body}`}>
        <div className={styles.story}>
          {p.highlight && (
            <p className={styles.highlight}>
              <span className="display">{p.highlight}</span>
            </p>
          )}
          <p className={styles.summary}>{p.summary}</p>
          <a className="link-arrow" href={instagramPost(p.source.shortcode)} target="_blank" rel="noopener noreferrer">
            Post original no Instagram
          </a>
        </div>

        <div className={styles.work}>
          <h2 className="label">O que foi feito</h2>
          <ul>
            {p.work.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <WhatsAppButton message={messages.project(projectTitle(p))}>Quero algo assim</WhatsAppButton>
        </div>
      </div>

      {gallery.length > 0 && (
        <section className={`wrap ${styles.gallery}`} aria-label="Fotos do projeto">
          {gallery.map((ph, i) => (
            <figure key={ph.src} className={`${styles.shot} ${i % 5 === 0 ? styles.wide : ''}`}>
              <Photo photo={ph} fill sizes="(max-width: 760px) 100vw, 50vw" className={styles.img} />
            </figure>
          ))}
        </section>
      )}

      <section className={`wrap ${styles.more}`} aria-labelledby="mais">
        <div className={styles.moreHead}>
          <h2 id="mais" className="label">
            Outros projetos
          </h2>
          <Link href="/projetos" className="link-arrow">
            Ver todos
          </Link>
        </div>
        <ul className={styles.moreGrid}>
          {others.map((o) => (
            <li key={o.slug}>
              <ProjectCardSmall slug={o.slug} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
