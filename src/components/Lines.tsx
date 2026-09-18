import { Fragment } from 'react';

/** Texto do painel com quebras de linha (Enter) viradas em <br />. */
export function Lines({ text }: { text?: string | null }) {
  if (!text) return null;
  return (
    <>
      {text.split('\n').map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
