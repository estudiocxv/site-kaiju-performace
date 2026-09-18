import Link from 'next/link';
import { getImageProps } from 'next/image';
import { getHome, getSite } from '@/content/cms';
import type { Photo } from '@/content/types';
import { HeroVideo } from '../HeroVideo';
import { WhatsAppButton } from '../WhatsAppButton';
import { ArrowRight } from '../icons';
import styles from '../Hero.module.css';

function Poster({ wide: wideImg, tall: tallImg }: { wide?: Photo; tall?: Photo }) {
  const main = wideImg ?? tallImg;
  if (!main) return null;
  const common = { alt: '', sizes: '100vw', quality: 70 };
  const tall = tallImg
    ? getImageProps({ ...common, src: tallImg.src, width: tallImg.width ?? 540, height: tallImg.height ?? 960 }).props.srcSet
    : undefined;
  const {
    props: { srcSet: wide, ...rest },
  } = getImageProps({ ...common, src: main.src, width: main.width ?? 1280, height: main.height ?? 720, preload: true });
  return (
    <picture>
      {tall && <source media="(max-aspect-ratio: 4/5)" srcSet={tall} />}
      <source srcSet={wide} />
      <img {...rest} className={styles.poster} alt="" fetchPriority="high" />
    </picture>
  );
}

export async function Hero() {
  const [{ hero }, site] = await Promise.all([getHome(), getSite()]);
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Poster wide={hero.posterWide} tall={hero.posterTall} />
        <HeroVideo wide={hero.videoWide?.src} tall={hero.videoTall?.src} />
      </div>

      <div className={`wrap ${styles.content}`}>
        <p className={`label ${styles.kicker}`}>
          {site.category} · {site.city}/{site.state}
        </p>

        <h1 id="hero-title" className={`display ${styles.title}`}>
          <span className={styles.line}>{hero.line1}</span>
          <span className={styles.line}>
            {hero.line2}{' '}
            <em className="letreiro" data-text={hero.highlight}>
              {hero.highlight}
            </em>
          </span>
        </h1>

        <div className={styles.foot}>
          <p className={styles.lead}>{hero.lead}</p>

          <div className={styles.actions}>
            <WhatsAppButton>{hero.primaryButton}</WhatsAppButton>
            <Link href="/remap" className="btn btn--ghost">
              {hero.secondaryButton}
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
