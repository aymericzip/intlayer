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
  /**
   * Whether to invert syntax highlighting colors relative to the current theme.
   * Useful when CodeBlock is rendered on an inverted background (such as `bg-text`).
   */
  isInverse?: boolean;
  /** Alias for `isInverse`. */
  isInverseColor?: boolean;
  /** Alias for `isInverse`. */
  inverse?: boolean;
  /** Force explicit dark or light mode syntax colors instead of theme-based colors. */
  isDarkMode?: boolean;
  onChange?: (content: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export const CodeBlock: FC<CodeBlockProps> = ({
  className,
  onChange,
  isEditable,
  isInverse = false,
  isInverseColor,
  inverse,
  isDarkMode,
  ...props
}) => {
  const isInverted = isInverse || isInverseColor || inverse;

  return (
    <Suspense fallback={<CodeDefault {...props} />}>
      <CodeBlockShiki
        className={cn(
          'flex w-full',
          isInverted && 'shiki-inverse text-text-opposite',
          isDarkMode === true && 'shiki-dark',
          isDarkMode === false && 'shiki-light',
          className
        )}
        data-inverse={isInverted ? 'true' : undefined}
        data-shiki-theme={
          isDarkMode === true
            ? 'dark'
            : isDarkMode === false
              ? 'light'
              : undefined
        }
        contentEditable={isEditable}
        onInput={(e) => onChange?.(e.currentTarget.textContent ?? '')}
        {...props}
      />
    </Suspense>
  );
};
