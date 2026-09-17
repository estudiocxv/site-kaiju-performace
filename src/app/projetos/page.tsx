import type { Metadata } from 'next';
import { PageHead } from '@/components/PageHead';
import { ProjectCardSmall } from '@/components/sections/Projects';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { projects } from '@/content/projects';
import styles from './projetos.module.css';

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Carros que passaram pela Kaiju Performance em Bauru/SP: Monza 89 turbo com FuelTech, Gol Copa 1994 turbo, Caravan 1979 e BMW 320i.',
  alternates: { canonical: '/projetos' },
};

const kinds = ['Preparação', 'Stage 2', 'Carro antigo', 'Revisão'] as const;

export default function ProjectsIndex() {
  return (
    <>
      <PageHead crumbs={[{ href: '/', label: 'Início' }, { label: 'Projetos' }]} title="Projetos">
        <p>Preparações, clássicos e revisões. Cada carro com o que foi feito, como a Kaiju publicou.</p>
      </PageHead>

      <div className="wrap">
        {kinds.map((k) => {
          const list = projects.filter((p) => p.kind === k);
          if (!list.length) return null;
          return (
            <section key={k} className={styles.group} aria-labelledby={`g-${k}`}>
              <h2 id={`g-${k}`} className={`label ${styles.groupTitle}`}>
                {k} <span className="muted">{list.length}</span>
              </h2>
              <ul className={styles.grid}>
                {list.map((p) => (
                  <li key={p.slug}>
                    <ProjectCardSmall slug={p.slug} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <div className={styles.cta}>
          <p className="display">Seu carro pode ser o próximo.</p>
          <WhatsAppButton message="Olá, Kaiju! Quero conversar sobre um projeto para o meu carro.">Falar sobre meu projeto</WhatsAppButton>
        </div>
      </div>
    </>
  );
}
