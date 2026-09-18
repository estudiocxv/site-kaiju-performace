import { getHome, getReviews, getSite } from '@/content/cms';
import { Lines } from '../Lines';
import { Photo } from '../Photo';
import { ArrowRight, Star } from '../icons';
import styles from './Reviews.module.css';

function Stars({ n }: { n: number }) {
  return (
    <span className={styles.stars} role="img" aria-label={`${n} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={17} className={i < n ? styles.on : styles.off} />
      ))}
    </span>
  );
}

export async function Reviews() {
  const [reviews, { reviews: head }, site] = await Promise.all([getReviews(), getHome(), getSite()]);
  if (reviews.length === 0) return null;
  return (
    <section id="avaliacoes" className={styles.section} aria-labelledby="avaliacoes-title">
      <div className={`wrap ${styles.head}`}>
        {head.label && <p className="label muted">{head.label}</p>}
        <h2 id="avaliacoes-title" className={`display ${styles.title}`}>
          <Lines text={head.title} />
        </h2>
        {head.intro && <p className={styles.intro}>{head.intro}</p>}
      </div>

      <ul className={`wrap ${styles.grid}`}>
        {reviews.map((r) => (
          <li key={r.url} className={`reveal ${styles.review}`}>
            <Stars n={r.rating} />
            <blockquote className={styles.text}>
              <p>{r.text}</p>
            </blockquote>

            {r.photos.length > 0 && (
              <div className={`${styles.photos} ${r.photos.length > 1 ? styles.many : ''}`}>
                {r.photos.map((ph) => (
                  <div key={ph.src} className={styles.photo}>
                    <Photo photo={ph} fill sizes="(max-width: 760px) 50vw, 16vw" className={styles.img} />
                  </div>
                ))}
              </div>
            )}

            <footer className={styles.author}>
              <span className={styles.name}>{r.author}</span>
              <a className="label muted" href={r.url} target="_blank" rel="noopener noreferrer">
                Ver no Google
              </a>
            </footer>
          </li>
        ))}
      </ul>

      {site.social.googleReviews && (
        <div className={`wrap ${styles.more}`}>
          <a className="btn btn--ghost" href={site.social.googleReviews} target="_blank" rel="noopener noreferrer">
            {head.moreButton || 'Ver mais avaliações no Google'}
            <ArrowRight />
          </a>
        </div>
      )}
    </section>
  );
}
