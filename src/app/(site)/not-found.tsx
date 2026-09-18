import Link from 'next/link';
import { PageHead } from '@/components/PageHead';

export default function NotFound() {
  return (
    <>
      <PageHead crumbs={[{ href: '/', label: 'Início' }, { label: 'Página não encontrada' }]} title="Essa página não existe">
        <p>O endereço pode ter mudado. Volte para o início ou veja os ganhos por modelo.</p>
      </PageHead>
      <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingBottom: 120 }}>
        <Link href="/" className="btn">
          Ir para o início
        </Link>
        <Link href="/remap" className="btn btn--ghost">
          Remap por modelo
        </Link>
      </div>
    </>
  );
}
