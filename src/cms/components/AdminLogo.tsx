/* eslint-disable @next/next/no-img-element -- o painel do Payload não passa pelo otimizador de imagens */

/** Marca da Kaiju na tela de login do painel. */
export function AdminLogo() {
  return (
    <div style={{ display: 'grid', gap: 10, justifyItems: 'center' }}>
      <img src="/brand/kaiju-mark.png" alt="Kaiju Performance" width={267} height={63} />
      <span style={{ letterSpacing: '0.3em', fontSize: 12, textTransform: 'uppercase', opacity: 0.7 }}>
        Painel do site
      </span>
    </div>
  );
}

/** Ícone pequeno do menu lateral. */
export function AdminIcon() {
  return <img src="/icon.png" alt="Kaiju" width={28} height={28} />;
}
