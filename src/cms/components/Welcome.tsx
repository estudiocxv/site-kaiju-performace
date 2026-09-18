import Link from 'next/link';

const shortcuts = [
  { href: '/admin/collections/veiculos', title: 'Catálogo do remap', text: 'Números de cada versão, incluir ou esconder carros.' },
  { href: '/admin/collections/midia', title: 'Fotos e vídeos', text: 'Enviar fotos novas e trocar as que estão no site.' },
  { href: '/admin/globals/pagina-inicial', title: 'Textos da página inicial', text: 'Topo, a oficina, processo e cada seção.' },
  { href: '/admin/collections/servicos', title: 'Serviços', text: 'O que a oficina faz, com foto e botão de orçamento.' },
  { href: '/admin/collections/avaliacoes', title: 'Avaliações', text: 'Avaliações do Google mostradas no site.' },
  { href: '/admin/globals/empresa', title: 'Dados da empresa', text: 'WhatsApp, endereço, CNPJ e redes.' },
];

/** Atalhos no topo do painel, antes da lista padrão. */
export function Welcome() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ marginBottom: 6 }}>O que você quer mudar?</h2>
      <p style={{ opacity: 0.75, marginBottom: 20 }}>
        Tudo que você salvar aqui vai direto para o site. Para conferir, abra{' '}
        <a href="/" target="_blank" rel="noopener noreferrer">
          o site
        </a>{' '}
        em outra aba e atualize a página.
      </p>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        }}
      >
        {shortcuts.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              style={{
                display: 'block',
                height: '100%',
                padding: '16px 18px',
                border: '1px solid var(--theme-elevation-150)',
                borderLeft: '3px solid #e3121b',
                textDecoration: 'none',
              }}
            >
              <strong style={{ display: 'block', marginBottom: 4 }}>{s.title}</strong>
              <span style={{ opacity: 0.7, fontSize: 14 }}>{s.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
