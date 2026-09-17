import { fullAddress, mapsQuery, site } from '@/content/site';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { MapEmbed } from '../MapEmbed';
import { Instagram, MapPin, WhatsApp } from '../icons';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contato" className={styles.section} aria-labelledby="contato-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.main}>
          <p className="label muted">Contato</p>
          <h2 id="contato-title" className={`display ${styles.title}`}>
            Traz o carro. <br />A gente conversa.
          </h2>
          <p className={styles.lead}>
            Orçamento pelo WhatsApp. Conta o modelo, o ano e o que você quer do carro: revisão, diagnóstico, remap ou
            projeto.
          </p>

          <a className={styles.phone} href={whatsappUrl(messages.default)} target="_blank" rel="noopener noreferrer">
            <WhatsApp size={28} />
            <span className="display">{site.whatsapp.display}</span>
          </a>

          <dl className={styles.info}>
            <div>
              <dt className="label muted">Endereço</dt>
              <dd>
                <address>{fullAddress}</address>
              </dd>
            </div>
            <div>
              <dt className="label muted">Atendimento</dt>
              <dd>{site.schedule}</dd>
            </div>
            <div>
              <dt className="label muted">Redes</dt>
              <dd className={styles.social}>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={18} /> {site.social.instagramHandle}
                </a>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className={styles.side}>
          <div className={styles.mapBox}>
            <MapEmbed />
          </div>
          <a
            className="btn btn--ghost"
            href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={20} />
            Como chegar
          </a>
          <p className={styles.blue}>
            <span className={styles.blueLight} aria-hidden="true" />
            Chegando, procure a luz azul na frente da oficina. Quem jogou Need for Speed Underground 2 sabe: luz azul é
            oficina de performance.
          </p>
        </div>
      </div>
    </section>
  );
}
