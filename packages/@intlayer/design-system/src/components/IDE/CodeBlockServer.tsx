import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { cn } from '@utils/cn';
import { type FC, type HTMLAttributes, Suspense } from 'react';
import { type BundledLanguage, codeToHtml } from './shikiBundle';
import { SHIKI_THEMES } from './shikiThemes';

export const CodeBlockShiki = (async ({
  children,
  lang,
  onChange,
  ...props
}: CodeBlockProps) => {
  const shikiOptions: Parameters<typeof codeToHtml>[1] = {
    lang,
    themes: SHIKI_THEMES,
    // Both palettes ship as CSS variables, so one markup serves both themes.
    defaultColor: false,
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
  onChange,
  ...props
}) => (
  <div contentEditable={isEditable} {...props}>
    <pre>
      <code>
        {typeof children === 'string'
          ? children.split('\n').map((line, index) => (
              <span className="line block w-full" key={index}>
                {line}
              </span>
            ))
          : children}
      </code>
    </pre>
  </div>
);

export type CodeBlockProps = {
  children: string;
  lang: BundledLanguage;
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
