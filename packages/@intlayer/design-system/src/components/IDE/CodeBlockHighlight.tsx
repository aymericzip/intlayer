'use client';

/**
 * Client-side Shiki highlighter that also handles TypeScript→ESM/CJS transformation.
 *
 * Everything runs inside a single useEffect so that:
 * - The transformer is only dynamically imported when a non-TypeScript format is selected.
 * - The previous highlighted HTML stays visible while the new one loads (no white-text flash).
 */

import { useEffect, useRef, useState } from 'react';
import type { BundledLanguage } from 'shiki/bundle/web';
import type { CodeFormat } from './CodeContext';

type Props = {
  /** Raw TypeScript source code (the canonical "source of truth"). */
  children: string;
  /** Language of the source (e.g. 'tsx', 'typescript'). */
  originalLang: BundledLanguage;
  /** Currently selected format: 'typescript' | 'esm' | 'commonjs'. */
  targetFormat: Exclude<CodeFormat, 'json'>;
  isDarkMode?: boolean;
};

/**
 * Map display language names to Shiki grammar identifiers.
 * Shiki's web bundle does not ship a separate 'jsx' grammar — tsx handles both.
 */
const toShikiLang = (lang: string): string => {
  switch (lang) {
    case 'jsx':
      return 'tsx';
    case 'mjs':
    case 'cjs':
      return 'javascript';
    default:
      return lang;
  }
};

export const CodeBlockHighlight = ({
  children,
  originalLang,
  targetFormat,
  isDarkMode,
}: Props) => {
  const [html, setHtml] = useState<string | null>(null);
  const prevHtml = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        let code = children;
        let shikiLang = toShikiLang(originalLang);

        // Only import the transformer when we actually need it.
        if (targetFormat !== 'typescript') {
          const { transformCode, deriveLanguage } = await import(
            './codeTransformer'
          );
          if (cancelled) return;
          code = transformCode(children, targetFormat);
          shikiLang = toShikiLang(deriveLanguage(originalLang, targetFormat));
        }

        const { codeToHtml } = await import('shiki/bundle/web');
        if (cancelled) return;

        const out = await codeToHtml(code, {
          lang: shikiLang,
          theme: isDarkMode ? 'github-dark' : 'github-light',
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
  }, [children, originalLang, targetFormat, isDarkMode]);

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
      dangerouslySetInnerHTML={{ __html: display }}
      style={{ backgroundColor: 'transparent' }}
    />
  );
};
