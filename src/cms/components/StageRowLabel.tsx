'use client';

import { useRowLabel } from '@payloadcms/ui';

type StageRow = { name?: string; cv?: number; kgfm?: number; cvText?: string; kgfmText?: string };

/** "Stage 1 · 290 cv · 44 kgfm" no lugar de "Etapa 02" na lista de etapas. */
export function StageRowLabel() {
  const { data, rowNumber } = useRowLabel<StageRow>();
  if (!data?.name) return <span>Etapa {String((rowNumber ?? 0) + 1).padStart(2, '0')}</span>;
  const cv = data.cvText || data.cv;
  const kgfm = data.kgfmText || data.kgfm;
  return (
    <span>
      {data.name}
      {cv ? ` · ${cv} cv` : ''}
      {kgfm ? ` · ${kgfm} kgfm` : ''}
    </span>
  );
}
