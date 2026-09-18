import { getHome, getServices, getSite } from '@/content/cms';
import { Lines } from '../Lines';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { Photo } from '../Photo';
import { ArrowRight } from '../icons';
import styles from './Services.module.css';

export async function Services() {
  const [services, { services: head }, site] = await Promise.all([getServices(), getHome(), getSite()]);
  return (
    <section id="servicos" className={styles.section} aria-labelledby="servicos-title">
      <div className={`wrap ${styles.head}`}>
        {head.label && <p className="label muted">{head.label}</p>}
        <h2 id="servicos-title" className={`display ${styles.title}`}>
          <Lines text={head.title} />
        </h2>
        {head.intro && <p className={styles.intro}>{head.intro}</p>}
      </div>

      <ul className={`wrap ${styles.list}`}>
        {services.map((s) => (
          <li key={s.id} id={`servico-${s.id}`} className={styles.item}>
            <div className={styles.thumb}>
              <Photo photo={s.photo} fill sizes="(max-width: 760px) 100vw, 320px" className={styles.img} />
            </div>
            <h3 className={`display ${styles.name}`}>{s.name}</h3>
            <div className={styles.detail}>
              <p className={styles.lead}>{s.lead}</p>
              <ul className={styles.items}>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {s.cta && (
              <a
                className={styles.ask}
                href={whatsappUrl(site.whatsapp.number, messages.service(s.cta))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Pedir orçamento de ${s.name} no WhatsApp`}
              >
                Orçamento <ArrowRight size={16} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
