import { events } from '@/content/events';
import { instagramPost } from '@/content/site';
import { Photo } from '../Photo';
import styles from './Events.module.css';

export function Events() {
  return (
    <section className={styles.section} aria-labelledby="eventos-title">
      <div className={`wrap ${styles.head}`}>
        <p className="label muted">Na rua</p>
        <h2 id="eventos-title" className={`display ${styles.title}`}>
          Tirando os projetos da oficina
        </h2>
      </div>

      <div className="wrap">
        {events.map((ev, i) => {
          const credits = Array.from(new Set(ev.photos.map((p) => p.credit).filter(Boolean)));
          return (
            <article key={ev.id} className={`${styles.event} ${i % 2 ? styles.flip : ''}`}>
              <div className={styles.meta}>
                <p className={`label ${styles.date}`}>{ev.date}</p>
                <h3 className={`display ${styles.name}`}>{ev.name}</h3>
                <p className="label muted">{ev.place}</p>
                <p className={styles.text}>{ev.text}</p>
                <a className="link-arrow" href={instagramPost(ev.source.shortcode)} target="_blank" rel="noopener noreferrer">
                  Ver no Instagram
                </a>
              </div>

              <div className={styles.photos}>
                {ev.photos.slice(0, 5).map((p, j) => (
                  <div key={p.src} className={`${styles.photo} ${j === 0 ? styles.lead : ''}`}>
                    <Photo
                      photo={p}
                      fill
                      sizes={j === 0 ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 50vw, 15vw'}
                      className={styles.img}
                    />
                  </div>
                ))}
                {credits.length > 0 && <p className={`label muted ${styles.credit}`}>Fotos: {credits.join(', ')}</p>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
