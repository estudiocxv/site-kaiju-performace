import Image, { type ImageProps } from 'next/image';
import type { Photo as PhotoData } from '@/content/types';

type Props = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  photo: PhotoData;
  fill?: boolean;
};

/**
 * Imagem da biblioteca de mídia do painel. Usa largura e altura do arquivo
 * enviado para reservar o espaço certo e evitar que a página pule.
 */
export function Photo({ photo, fill, sizes = '100vw', quality = 70, ...rest }: Props) {
  if (fill) {
    return <Image src={photo.src} alt={photo.alt} fill sizes={sizes} quality={quality} {...rest} />;
  }
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width ?? 1600}
      height={photo.height ?? 1200}
      sizes={sizes}
      quality={quality}
      {...rest}
    />
  );
}
