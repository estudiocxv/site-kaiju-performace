import { services } from '@/content/services';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { Photo } from '../Photo';
import { ArrowRight } from '../icons';
import styles from './Services.module.css';

export function Services() {
  return (
    <section id="servicos" className={styles.section} aria-labelledby="servicos-title">
      <div className={`wrap ${styles.head}`}>
        <p className="label muted">Serviços</p>
        <h2 id="servicos-title" className={`display ${styles.title}`}>
          Mecânica, tecnologia <br />e performance
        </h2>
        <p className={styles.intro}>
          O mesmo lugar resolve a revisão do dia a dia, o diagnóstico que ninguém achou e o projeto turbo.
        </p>
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
                href={whatsappUrl(messages.service(s.cta))}
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
