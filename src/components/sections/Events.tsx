import { getEvents, getHome } from '@/content/cms';
import { Lines } from '../Lines';
import { Photo } from '../Photo';
import styles from './Events.module.css';

export async function Events() {
  const [events, { events: head }] = await Promise.all([getEvents(), getHome()]);
  if (events.length === 0) return null;
  return (
    <section className={styles.section} aria-labelledby="eventos-title">
      <div className={`wrap ${styles.head}`}>
        {head.label && <p className="label muted">{head.label}</p>}
        <h2 id="eventos-title" className={`display ${styles.title}`}>
          <Lines text={head.title} />
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
                {ev.instagram && (
                  <a className="link-arrow" href={ev.instagram} target="_blank" rel="noopener noreferrer">
                    Ver no Instagram
                  </a>
                )}
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
