import Link from 'next/link';
import styles from './PageHead.module.css';

type Crumb = { href?: string; label: string };

export function PageHead({ crumbs, title, children }: { crumbs: Crumb[]; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className={`wrap ${styles.head}`}>
      <nav aria-label="Você está em" className={styles.crumbs}>
        <ol className="label">
          {crumbs.map((c, i) => (
            <li key={i}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
          ))}
        </ol>
      </nav>
      <h1 className={`display ${styles.title}`}>{title}</h1>
      {children && <div className={styles.intro}>{children}</div>}
    </header>
  );
}
