'use client';

import { type FC, type ReactNode, useEffect, useState } from 'react';
import { CodeDefault, shikiWrapperClassName } from './CodeBlockClient';
import { type CodeLanguage, resolveCodeLanguage } from './shikiLanguages';
import { SHIKI_THEMES } from './shikiThemes';

/**
 * Highlight a snippet, lazily loading only the grammar and themes it needs.
 *
 * The language is resolved to a canonical Shiki id first, so that the id passed
 * to `codeToHtml` always matches a grammar the bundle can load. Shiki itself is
 * imported from `./shikiBundle` — the fine-grained bundle — and only once a
 * snippet actually has to be highlighted in the browser.
 */
const highlightCode = async (
  code: ReactNode,
  lang: CodeLanguage
): Promise<string> => {
  const { codeToHtml } = await import('./shikiBundle');

  return codeToHtml(String(code), {
    lang: resolveCodeLanguage(lang).id,
    themes: SHIKI_THEMES,
    defaultColor: false,
  });
};

export type CodeBlockShikiProps = {
  children: ReactNode;
  lang: CodeLanguage;
};

export const CodeBlockShiki: FC<CodeBlockShikiProps> = ({ children, lang }) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    highlightCode(children, lang)
      .then((result) => {
        if (!isCancelled) setHtml(result);
      })
      .catch((error) => {
        console.error('Failed to highlight code:', error);
        if (!isCancelled) setHtml('');
      });

    return () => {
      isCancelled = true;
    };
  }, [children, lang]);

  return (
    <div className={shikiWrapperClassName}>
      {html ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for code highlighting
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <CodeDefault>{children}</CodeDefault>
      )}
    </div>
  );
};
