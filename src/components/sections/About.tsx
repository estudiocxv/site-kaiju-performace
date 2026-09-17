import { Photo } from '../Photo';
import { process } from '@/content/services';
import styles from './About.module.css';

const facts = [
  { term: 'Sede', value: 'Vila Industrial, Bauru/SP. Inaugurada em 1º de maio de 2025' },
  { term: 'Atendimento', value: 'Com hora marcada' },
  { term: 'Lubrificantes', value: 'Parceira oficial Petronas' },
  { term: 'Injeção programável', value: 'Linha FuelTech' },
];

export function About() {
  return (
    <section id="oficina" className={styles.section} aria-labelledby="oficina-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.text}>
          <p className="label muted reveal">A oficina</p>
          <h2 id="oficina-title" className={`display reveal ${styles.title}`}>
            Não trocamos peças no chute.
          </h2>
          <div className={`reveal ${styles.body}`}>
            <p>
              A Kaiju é uma oficina de performance em Bauru. Cada carro que entra recebe diagnóstico preciso, atenção de
              verdade e a solução certa. Do original que precisa voltar a funcionar perfeitamente ao projeto que busca
              mais potência, torque e resposta.
            </p>
            <p>
              Aqui a gente gosta tanto do carburador quanto da injeção. Opala com Weber, Monza com FuelTech, BMW com Stage
              2: a ideia é o dono sair sorrindo, com o carro preparado ou original andando direito.
            </p>
          </div>

          <dl className={`reveal ${styles.facts}`}>
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="label muted">{f.term}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className={styles.main}>
          <div className={`reveal-img ${styles.mainImg}`}>
            <Photo
              photo={{ src: '/media/oficina/equipe-trabalhando.jpg', alt: 'Equipe da Kaiju Performance trabalhando no box, com o painel da marca ao fundo' }}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              className={styles.cover}
            />
          </div>
          <figcaption className="label muted">Box da Kaiju, Vila Industrial</figcaption>
        </figure>

        <figure className={styles.neon}>
          <div className={`reveal-img ${styles.neonImg}`}>
            <Photo
              photo={{ src: '/media/oficina/letreiro-neon.jpg', alt: 'Letreiro neon Kaiju Performance dentro da oficina' }}
              fill
              sizes="(max-width: 900px) 60vw, 26vw"
              className={styles.cover}
            />
          </div>
        </figure>
      </div>

      <div className={`wrap ${styles.process}`}>
        <div className={styles.processHead}>
          <h3 className={`display ${styles.processTitle}`}>Antes de qualquer mapa</h3>
          <p className="muted">
            Muita gente chega querendo “fazer stage” sem saber o que o carro precisa. O caminho aqui é sempre o mesmo.
          </p>
        </div>
        <ol className={styles.steps}>
          {process.map((step, i) => (
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
