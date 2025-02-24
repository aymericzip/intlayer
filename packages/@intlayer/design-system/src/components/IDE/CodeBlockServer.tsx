import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from '@shikijs/transformers';
import { type HTMLAttributes, Suspense, type FC } from 'react';
import {
  type BundledLanguage,
  type BundledTheme,
  type CodeToHastOptions,
  codeToHtml,
} from 'shiki';
import { cn } from '../../utils/cn';

export const CodeBlockShiki = (async ({
  children,
  lang,
  isDarkMode,
  onChange,
  ...props
}: CodeBlockProps) => {
  const shikiOptions: CodeToHastOptions<BundledLanguage, BundledTheme> = {
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
  };

  const out = await codeToHtml(children, shikiOptions);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: out }}
      {...props}
      style={{ backgroundColor: 'transparent' }}
    />
  );
}) as unknown as FC<CodeBlockProps>;

const CodeDefault: FC<CodeBlockProps> = ({
  children,
  isEditable,
  isDarkMode,
  onChange,
  ...props
}) => (
  <div contentEditable={isEditable} {...props}>
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
  <Suspense fallback={<CodeDefault {...props} />}>
    <CodeBlockShiki
      className={cn('flex w-full', className)}
      contentEditable={isEditable}
      onInput={(e) => onChange?.(e.currentTarget.textContent ?? '')}
      {...props}
    />
  </Suspense>
);
