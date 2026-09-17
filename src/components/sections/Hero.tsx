import Link from 'next/link';
import { getImageProps } from 'next/image';
import { site } from '@/content/site';
import { HeroVideo } from '../HeroVideo';
import { WhatsAppButton } from '../WhatsAppButton';
import { ArrowRight } from '../icons';
import styles from '../Hero.module.css';

function Poster() {
  const common = { alt: '', sizes: '100vw', quality: 70 };
  const {
    props: { srcSet: tall },
  } = getImageProps({ ...common, src: '/media/video/oficina-vertical.jpg', width: 540, height: 960 });
  const {
    props: { srcSet: wide, ...rest },
  } = getImageProps({ ...common, src: '/media/video/oficina-horizontal.jpg', width: 1280, height: 720, preload: true });
  return (
    <picture>
      <source media="(max-aspect-ratio: 4/5)" srcSet={tall} />
      <source srcSet={wide} />
      <img {...rest} className={styles.poster} alt="" fetchPriority="high" />
    </picture>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Poster />
        <HeroVideo />
      </div>

      <div className={`wrap ${styles.content}`}>
        <p className={`label ${styles.kicker}`}>
          {site.category} · {site.city}/{site.state}
        </p>

        <h1 id="hero-title" className={`display ${styles.title}`}>
          <span className={styles.line}>Seu carro.</span>
          <span className={styles.line}>
            Nosso{' '}
            <em className="letreiro" data-text="projeto.">
              projeto.
            </em>
          </span>
        </h1>

        <div className={styles.foot}>
          <p className={styles.lead}>
            Remap, preparação e mecânica para nacionais, importados, turbo e carros antigos. Do carro original que precisa
            voltar a funcionar ao projeto que busca mais potência.
          </p>

          <div className={styles.actions}>
            <WhatsAppButton>Pedir orçamento</WhatsAppButton>
            <Link href="/remap" className="btn btn--ghost">
              Ganhos por modelo
              <ArrowRight />
            </Link>
          </div>
        </div>

        <ul className={`label ${styles.bio}`} aria-label="Especialidades">
          {site.bio.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
