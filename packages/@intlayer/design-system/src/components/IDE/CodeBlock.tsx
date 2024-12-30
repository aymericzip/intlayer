import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from '@shikijs/transformers';
import { forwardRef, HTMLAttributes, Suspense, type FC } from 'react';
import {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
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

  return <div dangerouslySetInnerHTML={{ __html: out }} {...props} />;
}) as unknown as FC<CodeBlockProps>;

const CodeDefault = forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ children, isEditable, onChange, ...props }, ref) => (
    <div contentEditable={isEditable} {...props} ref={ref}>
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
  )
);
CodeDefault.displayName = 'CodeDefault';

export type CodeBlockProps = {
  children: string;
  lang: BundledLanguage;
  isDarkMode?: boolean;
  isEditable?: boolean;
  onChange?: (content: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export const CodeBlock: FC<CodeBlockProps> = (
  { className, onChange, isEditable, ...props },
  ref
) => (
  <Suspense fallback={<CodeDefault ref={ref} {...props} />}>
    <CodeBlockShiki
      className={cn('flex w-full', className)}
      contentEditable={isEditable}
      onInput={(e) => onChange?.(e.currentTarget.textContent ?? '')}
      {...props}
    />
  </Suspense>
);

CodeBlock.displayName = 'CodeBlock';
