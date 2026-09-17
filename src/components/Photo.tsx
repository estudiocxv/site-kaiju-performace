import Image, { type ImageProps } from 'next/image';
import dimensions from '@/content/media-dimensions.json';
import type { Photo as PhotoData } from '@/content/types';

const dims = dimensions as Record<string, { width: number; height: number }>;

type Props = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  photo: PhotoData;
  fill?: boolean;
};

/**
 * Imagem da biblioteca de mídia. Usa as dimensões geradas por
 * scripts/import-media.mjs para evitar layout shift.
 */
export function Photo({ photo, fill, sizes = '100vw', quality = 70, ...rest }: Props) {
  if (fill) {
    return <Image src={photo.src} alt={photo.alt} fill sizes={sizes} quality={quality} {...rest} />;
  }
  const d = dims[photo.src] ?? { width: 1600, height: 1200 };
  return (
    <Image src={photo.src} alt={photo.alt} width={d.width} height={d.height} sizes={sizes} quality={quality} {...rest} />
  );
}
