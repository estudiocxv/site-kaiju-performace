import Link from 'next/link';
import { projects, projectTitle } from '@/content/projects';
import { Photo } from '../Photo';
import { ArrowRight } from '../icons';
import styles from './Projects.module.css';

export function ProjectCardSmall({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  return (
    <Link href={`/projetos/${p.slug}`} className={styles.small}>
      <span className={styles.smallImg}>
        <Photo photo={p.cover} fill sizes="(max-width: 760px) 70vw, 25vw" className={styles.img} />
      </span>
      <span className={`label ${styles.smallKind}`}>{p.kind}</span>
      <span className={`display ${styles.smallTitle}`}>{projectTitle(p)}</span>
      <span className={styles.smallCar}>{p.car}</span>
    </Link>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projetos" className={styles.section} aria-labelledby="projetos-title">
      <div className={`wrap ${styles.head}`}>
        <p className="label muted">Projetos</p>
        <h2 id="projetos-title" className={`display ${styles.title}`}>
          Carros que passaram por aqui
        </h2>
        <p className={styles.intro}>Cada um com o nome que ganhou na oficina e o que foi feito, do jeito que a Kaiju publicou.</p>
      </div>

      <div className={`wrap ${styles.dossiers}`}>
        {featured.map((p, i) => (
          <article key={p.slug} className={`${styles.dossier} ${i % 2 ? styles.flip : ''}`}>
            <Link href={`/projetos/${p.slug}`} className={`reveal-img ${styles.cover}`} tabIndex={-1} aria-hidden="true">
              <Photo photo={p.cover} fill sizes="(max-width: 900px) 100vw, 60vw" className={styles.img} />
            </Link>

            <div className={styles.info}>
              <p className={`label ${styles.kind}`}>
                {p.kind} <span aria-hidden="true">/</span> {p.car}
              </p>
              <h3 className={styles.lettering}>
                <Link href={`/projetos/${p.slug}`}>
                  <span className="letreiro" data-text={projectTitle(p)}>
                    {projectTitle(p)}
                  </span>
                </Link>
              </h3>
              {p.highlight && (
                <p className={styles.highlight}>
                  <span className="display">{p.highlight.split(' ')[0]}</span>
                  <span className="label">{p.highlight.split(' ').slice(1).join(' ')}</span>
                </p>
              )}
              <p className={styles.summary}>{p.summary}</p>
              <ul className={styles.work}>
                {p.work.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <Link href={`/projetos/${p.slug}`} className="link-arrow">
                Ver fotos do projeto <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className={`wrap ${styles.moreHead}`}>
        <h3 className="label">Mais carros da oficina</h3>
        <Link href="/projetos" className="link-arrow">
          Todos os projetos <ArrowRight size={14} />
        </Link>
      </div>
      <div className={styles.rail}>
        <ul className={styles.railList}>
          {others.map((p) => (
            <li key={p.slug}>
              <ProjectCardSmall slug={p.slug} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
