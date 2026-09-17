import { reviews } from '@/content/reviews';
import { site } from '@/content/site';
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

export function Reviews() {
  return (
    <section id="avaliacoes" className={styles.section} aria-labelledby="avaliacoes-title">
      <div className={`wrap ${styles.head}`}>
        <p className="label muted">Avaliações no Google</p>
        <h2 id="avaliacoes-title" className={`display ${styles.title}`}>
          Quem já trouxe o carro
        </h2>
        <p className={styles.intro}>Avaliações 5 estrelas de clientes da Kaiju, como foram publicadas no Google.</p>
      </div>

      <ul className={`wrap ${styles.grid}`}>
        {reviews.map((r) => (
          <li key={r.author} className={`reveal ${styles.review}`}>
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

      <div className={`wrap ${styles.more}`}>
        <a className="btn btn--ghost" href={site.social.googleReviews} target="_blank" rel="noopener noreferrer">
          Ver mais avaliações no Google
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}
