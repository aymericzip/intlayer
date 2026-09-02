'use client';

/**
 * Client-side Shiki highlighter that also handles TypeScript→ESM/CJS transformation.
 *
 * Everything runs inside a single useEffect so that:
 * - Nothing is imported at all while the canonical TypeScript source is shown
 *   and its markup was already highlighted ahead of time.
 * - The transformer is only dynamically imported when a non-TypeScript format is selected.
 * - The previous highlighted HTML stays visible while the new one loads (no white-text flash).
 */

import { type ReactNode, useEffect, useRef, useState } from 'react';
import type { CodeFormat } from './CodeContext';
import { type CodeLanguage, resolveCodeLanguage } from './shikiLanguages';
import { SHIKI_THEMES } from './shikiThemes';

type Props = {
  /** Raw TypeScript source code (the canonical "source of truth"). */
  children: ReactNode;
  /** Language of the source (e.g. 'tsx', 'typescript'). */
  originalLang: CodeLanguage;
  /** Currently selected format: 'typescript' | 'esm' | 'commonjs'. */
  targetFormat: Exclude<CodeFormat, 'json'>;
  /** Markup for the TypeScript source, highlighted ahead of time. */
  initialHtml?: string;
};

export const CodeBlockHighlight = ({
  children,
  originalLang,
  targetFormat,
  initialHtml,
}: Props) => {
  const [html, setHtml] = useState<string | null>(initialHtml ?? null);
  const prevHtml = useRef<string | null>(initialHtml ?? null);

  useEffect(() => {
    // The pre-highlighted markup already is the TypeScript rendering — no need
    // to pull Shiki into the browser until another format is picked.
    if (initialHtml && targetFormat === 'typescript') {
      prevHtml.current = initialHtml;
      setHtml(initialHtml);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        let code = children;
        let shikiLang = resolveCodeLanguage(originalLang).id;

        // Only import the transformer when we actually need it.
        if (targetFormat !== 'typescript') {
          const { transformCode, deriveLanguage } = await import(
            './codeTransformer'
          );
          if (cancelled) return;
          code = transformCode(String(children), targetFormat);
          shikiLang = resolveCodeLanguage(
            deriveLanguage(originalLang, targetFormat)
          ).id;
        }

        const { codeToHtml } = await import('./shikiBundle');
        if (cancelled) return;

        const out = await codeToHtml(String(code), {
          lang: shikiLang,
          themes: SHIKI_THEMES,
          defaultColor: false,
        });

        if (!cancelled) {
          prevHtml.current = out;
          setHtml(out);
        }
      } catch {
        // Shiki failed (unknown language, etc.) — fall through to plain-text.
        if (!cancelled) setHtml('');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [children, originalLang, targetFormat, initialHtml]);

  // Keep the previous highlighted output visible while the new one is loading.
  // This prevents the white-text flash on format switches.
  const display = html ?? prevHtml.current;

  if (!display) {
    return (
      <pre className="min-w-0 max-w-full overflow-x-auto">
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for code highlighting
      dangerouslySetInnerHTML={{ __html: display }}
      style={{ backgroundColor: 'transparent' }}
    />
  );
};
