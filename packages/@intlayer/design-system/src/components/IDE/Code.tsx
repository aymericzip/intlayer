'use client';

import { cn } from '@utils/cn';
import type { FC, HTMLAttributes } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { BundledLanguage } from 'shiki/bundle/web';
import { Container } from '../Container';
import { ExpandCollapse } from '../ExpandCollapse';
import { CodeBlock } from './CodeBlockClient';
import { CodeBlockHighlight } from './CodeBlockHighlight';
import { CodeConditionalRender } from './CodeConditionalRenderer';
import type {
  CodeFormat,
  ContentDeclarationFormat,
  PackageManager,
} from './CodeContext';
import { useCodeContext } from './CodeContext';
import { CodeFormatSelector } from './CodeFormatSelector';
import { ContentDeclarationFormatSelector } from './ContentDeclarationFormatSelector';
import { CopyCode } from './CopyCode';
import { PackageManagerSelector } from './PackageManagerSelector';

export type CodeCompAttributes = {
  fileName?: string;
  packageManager?: PackageManager;
  /** Single format, or a JSON-array string like `["typescript","esm","commonjs"]`. */
  codeFormat?: CodeFormat | string;
  contentDeclarationFormat?: ContentDeclarationFormat | string;
};

type CodeCompProps = {
  children: string;
  fileName?: string;
  language: BundledLanguage;
  isDarkMode?: boolean;
  showHeader?: boolean;
  showLineNumbers?: boolean;
  isRollable?: boolean;
} & CodeCompAttributes &
  HTMLAttributes<HTMLDivElement>;

const MIN_HEIGHT = 700;

/** Languages that use JSX syntax — CommonJS doesn't make sense for these. */
const JSX_LANGUAGES = new Set(['tsx', 'jsx']);

/** Parse a codeFormat prop that may be a single value or a JSON-array string. */
function parseFormats(raw: string | undefined): CodeFormat[] | undefined {
  if (!raw) return undefined;
  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as CodeFormat[];
    } catch {
      /* ignore */
    }
  }
  return [raw as CodeFormat];
}

export const Code: FC<CodeCompProps> = ({
  children,
  language,
  isDarkMode,
  showHeader = true,
  showLineNumbers = true,
  className,
  fileName,
  packageManager,
  codeFormat: rawCodeFormat,
  contentDeclarationFormat: rawContentDeclarationFormat,
  isRollable = true,
  ...props
}) => {
  const {
    codeFormat: selectedCodeFormat,
    contentDeclarationFormat: selectedContentDeclarationFormat,
  } = useCodeContext();

  // Parse whichever attribute is present as an array of formats.
  const codeFormats = useMemo(
    () => parseFormats(rawCodeFormat as string | undefined),
    [rawCodeFormat]
  );
  const contentFormats = useMemo(
    () => parseFormats(rawContentDeclarationFormat as string | undefined),
    [rawContentDeclarationFormat]
  );

  // A block is "multi-format" when it has multiple formats including TypeScript
  // (the canonical source). Such blocks transform at runtime.
  const isMultiCodeFormat =
    codeFormats !== undefined &&
    codeFormats.length > 1 &&
    codeFormats.includes('typescript');

  const isMultiContentFormat =
    contentFormats !== undefined &&
    contentFormats.length > 1 &&
    contentFormats.includes('typescript');

  const isMultiFormat = isMultiCodeFormat || isMultiContentFormat;

  // Determine which context format drives this block's selection.
  // content declaration blocks use selectedContentDeclarationFormat;
  // regular code blocks use selectedCodeFormat.
  const selectedFormat: CodeFormat = isMultiContentFormat
    ? (selectedContentDeclarationFormat as CodeFormat)
    : selectedCodeFormat;

  // The formats actually relevant for transformation (no 'json', no 'commonjs' for JSX).
  const effectiveFormats = useMemo<CodeFormat[] | undefined>(() => {
    const base = isMultiContentFormat ? contentFormats : codeFormats;
    if (!base) return base;
    let filtered = base.filter((f) => f !== 'json') as CodeFormat[];
    if (JSX_LANGUAGES.has(language as string)) {
      filtered = filtered.filter((f) => f !== 'commonjs');
    }
    return filtered;
  }, [isMultiContentFormat, contentFormats, codeFormats, language]);

  // When the globally-selected format isn't valid for this block
  // (e.g. CJS selected but this is a JSX file), fall back to the last valid one.
  const resolvedFormat: Exclude<CodeFormat, 'json'> = useMemo(() => {
    if (!effectiveFormats || effectiveFormats.includes(selectedFormat)) {
      return selectedFormat as Exclude<CodeFormat, 'json'>;
    }
    return (
      effectiveFormats[effectiveFormats.length - 1] ?? 'typescript'
    ) as Exclude<CodeFormat, 'json'>;
  }, [effectiveFormats, selectedFormat]);

  // ── Async filename derivation (dynamic import of transformer) ──────────────
  // We derive the displayed fileName so the header updates when format changes.
  // deriveFileName is tiny but it lives inside codeTransformer, which is only
  // imported when actually needed (non-TypeScript selection).
  const [displayedFileName, setDisplayedFileName] = useState<
    string | undefined
  >(fileName);

  useEffect(() => {
    if (!isMultiFormat || resolvedFormat === 'typescript') {
      setDisplayedFileName(fileName);
      return;
    }
    if (!fileName) return;

    let cancelled = false;
    (async () => {
      const { deriveFileName } = await import('./codeTransformer');
      if (!cancelled) setDisplayedFileName(deriveFileName(fileName, resolvedFormat));
    })();
    return () => { cancelled = true; };
  }, [fileName, isMultiFormat, resolvedFormat]);

  // ── Async copy text (transformed code for CopyCode) ───────────────────────
  const rawCode = useMemo(
    () => (children?.endsWith('\n') ? children.slice(0, -1) : children),
    [children]
  );

  const [copyCode, setCopyCode] = useState<string>(rawCode);

  useEffect(() => {
    if (!isMultiFormat || resolvedFormat === 'typescript') {
      setCopyCode(rawCode);
      return;
    }
    let cancelled = false;
    (async () => {
      const { transformCode } = await import('./codeTransformer');
      if (!cancelled) setCopyCode(transformCode(rawCode, resolvedFormat));
    })();
    return () => { cancelled = true; };
  }, [rawCode, isMultiFormat, resolvedFormat]);

  const hadSelectInHeader =
    packageManager || rawCodeFormat || rawContentDeclarationFormat;

  return (
    <CodeConditionalRender
      packageManager={packageManager}
      codeFormat={rawCodeFormat as string | undefined}
      contentDeclarationFormat={
        rawContentDeclarationFormat as string | undefined
      }
    >
      <Container
        className={cn(
          'relative min-w-0 max-w-full text-sm leading-6',
          showLineNumbers && 'with-line-number ml-0',
          className
        )}
        transparency="lg"
        {...props}
      >
        {showHeader && (
          <>
            <div className="grid w-full grid-cols-[1fr_auto] items-center justify-between rounded-t-xl bg-card/50 py-1.5 pr-12 pl-4 text-neutral text-xs">
              <span className="truncate">
                {displayedFileName ?? language}
              </span>
              <div className="flex items-center gap-2">
                {packageManager && <PackageManagerSelector />}
                {rawCodeFormat && (
                  <CodeFormatSelector availableFormats={effectiveFormats} />
                )}
                {rawContentDeclarationFormat && (
                  <ContentDeclarationFormatSelector />
                )}
              </div>
            </div>
            <div className="sticky top-46 z-20">
              <div
                className={cn(
                  'absolute right-2 bottom-0 flex h-7 items-center',
                  hadSelectInHeader && 'h-11'
                )}
              >
                <CopyCode code={copyCode} />
              </div>
            </div>
          </>
        )}
        <ExpandCollapse
          minHeight={MIN_HEIGHT}
          isRollable={isRollable}
          className="min-w-0 max-w-full overflow-x-auto p-2"
        >
          {isMultiFormat ? (
            /*
             * Multi-format: CodeBlockHighlight manages both the transformation
             * (dynamic import of codeTransformer) and the Shiki highlighting in
             * a single useEffect. The previous highlighted output stays visible
             * while the new one loads — no white-text flash.
             */
            <CodeBlockHighlight
              originalLang={language}
              targetFormat={resolvedFormat}
              isDarkMode={isDarkMode}
            >
              {rawCode}
            </CodeBlockHighlight>
          ) : (
            /*
             * Single-format: use the original Suspense-based async Shiki renderer
             * (good for SSR / static content).
             */
            <CodeBlock lang={language} isDarkMode={isDarkMode}>
              {rawCode}
            </CodeBlock>
          )}
        </ExpandCollapse>
      </Container>
    </CodeConditionalRender>
  );
};
