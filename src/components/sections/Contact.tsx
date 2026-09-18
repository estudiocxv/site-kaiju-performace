import { getHome, getSite } from '@/content/cms';
import { Lines } from '../Lines';
import { whatsappUrl, messages } from '@/lib/whatsapp';
import { MapEmbed } from '../MapEmbed';
import { Instagram, MapPin, WhatsApp } from '../icons';
import styles from './Contact.module.css';

export async function Contact() {
  const [site, { contact }] = await Promise.all([getSite(), getHome()]);
  const { fullAddress, mapsQuery } = site;
  return (
    <section id="contato" className={styles.section} aria-labelledby="contato-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.main}>
          {contact.label && <p className="label muted">{contact.label}</p>}
          <h2 id="contato-title" className={`display ${styles.title}`}>
            <Lines text={contact.title} />
          </h2>
          {contact.lead && <p className={styles.lead}>{contact.lead}</p>}

          <a className={styles.phone} href={whatsappUrl(site.whatsapp.number, messages.default)} target="_blank" rel="noopener noreferrer">
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
              <dt className="label muted">CNPJ</dt>
              <dd>{site.cnpj}</dd>
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
            <MapEmbed mapsQuery={mapsQuery} />
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
        </div>
      </div>
    </section>
  );
}
