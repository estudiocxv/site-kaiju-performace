'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const SOURCES = {
  wide: '/media/video/oficina-horizontal.mp4',
  tall: '/media/video/oficina-vertical.mp4',
};

/**
 * Vídeo da oficina carregado depois da primeira pintura.
 * Celular em pé recebe o corte vertical; quem pede menos movimento
 * ou economia de dados fica só com o quadro estático.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;

    const tall = window.matchMedia('(max-aspect-ratio: 4/5)').matches;
    const start = () => {
      video.src = tall ? SOURCES.tall : SOURCES.wide;
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
  }, []);

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
