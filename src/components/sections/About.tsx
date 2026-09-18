import { Photo } from '../Photo';
import { getHome } from '@/content/cms';
import { Lines } from '../Lines';
import styles from './About.module.css';

export async function About() {
  const { about, process } = await getHome();
  return (
    <section id="oficina" className={styles.section} aria-labelledby="oficina-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.text}>
          {about.label && <p className="label muted reveal">{about.label}</p>}
          <h2 id="oficina-title" className={`display reveal ${styles.title}`}>
            <Lines text={about.title} />
          </h2>
          <div className={`reveal ${styles.body}`}>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {about.motto && <p className={styles.motto}>{about.motto}</p>}
          </div>

          {(about.signatureName || about.signatureTagline || about.signatureLine) && (
            <p className={`reveal ${styles.signature}`}>
              {about.signatureName && <span className={styles.signatureName}>{about.signatureName}</span>}
              {about.signatureTagline && <span className="label">{about.signatureTagline}</span>}
              {about.signatureLine && <span className={styles.signatureLine}>{about.signatureLine}</span>}
            </p>
          )}

          {about.facts.length > 0 && (
            <dl className={`reveal ${styles.facts}`}>
              {about.facts.map((f) => (
                <div key={f.term}>
                  <dt className="label muted">{f.term}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className={styles.visual}>
          {about.mainPhoto && (
            <figure className={styles.main}>
              <div className={`reveal-img ${styles.mainImg}`}>
                <Photo photo={about.mainPhoto} fill sizes="(max-width: 900px) 100vw, 55vw" className={styles.cover} />
              </div>
              {about.mainCaption && <figcaption className="label muted">{about.mainCaption}</figcaption>}
            </figure>
          )}

          {about.secondPhoto && (
            <figure className={styles.neon}>
              <div className={`reveal-img ${styles.neonImg}`}>
                <Photo photo={about.secondPhoto} fill sizes="(max-width: 900px) 60vw, 26vw" className={styles.cover} />
              </div>
            </figure>
          )}
        </div>
      </div>

      <div className={`wrap ${styles.process}`}>
        <div className={styles.processHead}>
          <h3 className={`display ${styles.processTitle}`}>{process.title}</h3>
          {process.intro && <p className="muted">{process.intro}</p>}
        </div>
        <ol className={styles.steps}>
          {process.steps.map((step, i) => (
            <li key={step.title} className={`reveal ${styles.step}`}>
              <span className={styles.stepN} aria-hidden="true">
                {i + 1}
              </span>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className="muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
