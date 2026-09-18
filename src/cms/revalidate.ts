import { revalidatePath } from 'next/cache';

/**
 * Tudo que o dono salva no painel vai direto para o site: a página em cache
 * é descartada e refeita na próxima visita. Fora do Next (seed, scripts) o
 * revalidatePath não existe, e aí não há nada para descartar.
 */
function refresh() {
  try {
    revalidatePath('/', 'layout');
  } catch {
    // rodando fora de uma requisição do Next
  }
}

export const revalidateAfterChange = <T>({ doc }: { doc: T }) => {
  refresh();
  return doc;
};

export const revalidateAfterDelete = <T>({ doc }: { doc: T }) => {
  refresh();
  return doc;
};

export const revalidateHooks = {
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
};
