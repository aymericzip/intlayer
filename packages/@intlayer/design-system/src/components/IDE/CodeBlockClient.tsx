'use client';

import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import {
  type FC,
  type HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type BundledLanguage,
  type BundledTheme,
  type CodeToHastOptions,
  codeToHtml,
} from 'shiki';
import { cn } from '../../utils/cn';

const CodeDefault: FC<{ children: string }> = ({ children }) => (
  <div>
    <pre>
      <code>
        {children.split('\n').map((line, index) => (
          <span className="line block w-full" key={index}>
            {line}
          </span>
        ))}
      </code>
    </pre>
  </div>
);

export const CodeBlockShiki = (({
  children,
  lang,
  isDarkMode,
  onChange,
  ...props
}: CodeBlockProps) => {
  const [out, setOut] = useState<string | null>(null);
  const shikiOptions: CodeToHastOptions<BundledLanguage, BundledTheme> =
    useMemo(
      () => ({
        lang,
        theme: isDarkMode ? 'github-dark' : 'github-light',
        transformers: [
          transformerNotationDiff(),
          transformerNotationHighlight(),
          transformerNotationWordHighlight(),
          transformerNotationErrorLevel(),
          transformerMetaHighlight(),
          transformerMetaWordHighlight(),
        ],
      }),
      [lang, isDarkMode]
    );

  useEffect(() => {
    codeToHtml(children, shikiOptions)
      .then((out) => setOut(out))
      .catch((e) => console.error(e));
  }, [shikiOptions, children]);

  if (!out) return <CodeDefault>{children}</CodeDefault>;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: out }}
      {...props}
      style={{ backgroundColor: 'transparent', minWidth: 0, overflow: 'auto' }}
    />
  );
}) as unknown as FC<CodeBlockProps>;

export type CodeBlockProps = {
  children: string;
  lang: BundledLanguage;
  isDarkMode?: boolean;
  isEditable?: boolean;
  onChange?: (content: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export const CodeBlock: FC<CodeBlockProps> = ({
  className,
  onChange,
  isEditable,
  ...props
}) => (
  <CodeBlockShiki
    className={cn('flex w-full', className)}
    contentEditable={isEditable}
    onInput={(e) => onChange?.(e.currentTarget.textContent ?? '')}
    {...props}
  />
);
