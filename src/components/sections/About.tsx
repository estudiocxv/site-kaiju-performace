import { Photo } from '../Photo';
import { process } from '@/content/services';
import styles from './About.module.css';

const facts = [
  { term: 'Sede', value: 'Vila Industrial, Bauru/SP. Inaugurada em 1º de maio de 2025' },
  { term: 'Atendimento', value: 'Com hora marcada' },
  { term: 'Lubrificantes', value: 'Shell, Valvoline, Liqui Moly e Motul' },
  { term: 'Injeção programável', value: 'FuelTech, Octtane e Injepro' },
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
            <p>A Kaiju Performance nasceu da paixão por carros e por fazer as coisas do jeito certo.</p>
            <p>
              Somos uma oficina que une mecânica, diagnóstico eletrônico, elétrica e performance. Trabalhamos desde a
              manutenção e solução de defeitos até remap, Stage 1, Stage 2, preparação de motores e projetos especiais.
            </p>
            <p>
              Aqui, a gente não gosta de simplesmente trocar peças. Gostamos de entender o problema, diagnosticar, testar e
              encontrar a melhor solução para cada carro.
            </p>
            <p>
              Seja para deixar um carro original funcionando perfeitamente ou para transformar um projeto em algo mais
              forte, rápido e divertido, fazemos aquilo que realmente gostamos:
            </p>
            <p className={styles.motto}>resolver problemas, preparar carros e transformar ideias em projetos.</p>
          </div>

          <p className={`reveal ${styles.signature}`}>
            <span className={styles.signatureName}>🐉 Kaiju Performance</span>
            <span className="label">Mecânica • Tecnologia • Performance</span>
            <span className={styles.signatureLine}>Fazemos carros porque é o que gostamos de fazer.</span>
          </p>

          <dl className={`reveal ${styles.facts}`}>
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="label muted">{f.term}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.visual}>
          <figure className={styles.main}>
            <div className={`reveal-img ${styles.mainImg}`}>
              <Photo
                photo={{
                  src: '/media/oficina/equipe-trabalhando.jpg',
                  alt: 'Equipe da Kaiju Performance trabalhando no box, com o painel da marca ao fundo',
                }}
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
