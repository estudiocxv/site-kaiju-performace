'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

/**
 * Vídeo da oficina carregado depois da primeira pintura.
 * Celular em pé recebe o corte vertical; quem pede menos movimento
 * ou economia de dados fica só com o quadro estático.
 */
export function HeroVideo({ wide, tall }: { wide?: string; tall?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;

    const portrait = window.matchMedia('(max-aspect-ratio: 4/5)').matches;
    const src = (portrait ? tall : wide) ?? wide ?? tall;
    if (!src) return;
    const start = () => {
      video.src = src;
      video.play().catch(() => {});
    };
    // Safari não tem requestIdleCallback
    const timer = setTimeout(start, 700);

    const pause = () => (document.hidden ? video.pause() : video.play().catch(() => {}));
    document.addEventListener('visibilitychange', pause);
    return () => {
      document.removeEventListener('visibilitychange', pause);
      clearTimeout(timer);
    };
  }, [wide, tall]);

  return (
    <video
      ref={ref}
      className={`${styles.video} ${playing ? styles.videoOn : ''}`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
    />
  );
}
