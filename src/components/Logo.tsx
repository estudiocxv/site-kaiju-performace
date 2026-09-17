import Image from 'next/image';
import styles from './Logo.module.css';

/**
 * Marca KAIJU extraída do vídeo institucional + "PERFORMANCE" composto
 * como no letreiro. Substituir por SVG oficial quando a Kaiju enviar o arquivo.
 */
export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span className={`${styles.logo} ${size === 'lg' ? styles.lg : ''}`}>
      <Image src="/brand/kaiju-mark.png" alt="" width={534} height={125} className={styles.mark} preload={size === 'md'} />
      <span className={styles.sub} aria-hidden="true">
        Performance
      </span>
      <span className="visually-hidden">Kaiju Performance</span>
    </span>
  );
}
