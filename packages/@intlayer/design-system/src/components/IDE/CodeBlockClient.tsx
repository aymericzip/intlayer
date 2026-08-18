import { cn } from '@utils/cn';
import {
  type FC,
  type HTMLAttributes,
  lazy,
  type ReactNode,
  Suspense,
} from 'react';
import type { CodeLanguage } from './shikiLanguages';

export type { CodeLanguage } from './shikiLanguages';

export const CodeDefault: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="min-w-0 max-w-full overflow-x-auto">
    <pre className="min-w-0 max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <code>
        {typeof children === 'string'
          ? children.split('\n').map((line, index) => (
              <span
                className="line block w-full"
                key={`line-${index}-${line.slice(0, 10)}`}
              >
                {line}
              </span>
            ))
          : children}
      </code>
    </pre>
  </div>
);

/** Wrapper styles shared by the pre-highlighted and the runtime Shiki output. */
export const shikiWrapperClassName =
  '[&_pre.shiki]:!bg-transparent min-w-0 max-w-full overflow-auto bg-transparent [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_pre.shiki]:max-w-full [&_pre.shiki]:overflow-x-auto [&_pre::-webkit-scrollbar]:hidden [&_pre]:[-ms-overflow-style:none] [&_pre]:[scrollbar-width:none]';

/**
 * Renders markup produced by Shiki ahead of time (at build/prerender).
 *
 * Both server and client render the exact same string, so hydration is a no-op
 * and the Shiki engine — a ~600 KB WASM bundle plus one grammar per language —
 * never reaches the browser.
 */
export const CodeHighlighted: FC<{ html: string }> = ({ html }) => (
  <div className={shikiWrapperClassName}>
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for code highlighting
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </div>
);

// Lazy load the Shiki component
const CodeBlockShiki = lazy(() =>
  import('./CodeBlockShiki').then((mod) => ({
    default: mod.CodeBlockShiki,
  }))
);

export type CodeBlockProps = {
  children: React.ReactNode;
  lang: CodeLanguage;
  /**
   * Markup produced by Shiki ahead of time. When present the block renders it
   * as-is and no highlighting runs in the browser.
   */
  highlightedHtml?: string;
  isEditable?: boolean;
  onChange?: (content: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export const CodeBlock: FC<CodeBlockProps> = ({
  className,
  onChange,
  isEditable,
  children,
  lang,
  highlightedHtml,
  ...props
}) => (
  <div
    className={cn('flex w-full min-w-0 max-w-full overflow-x-auto', className)}
    {...props}
  >
    {highlightedHtml ? (
      <CodeHighlighted html={highlightedHtml} />
    ) : (
      <Suspense fallback={<CodeDefault>{children}</CodeDefault>}>
        <CodeBlockShiki lang={lang}>{children}</CodeBlockShiki>
      </Suspense>
    )}
  </div>
);
