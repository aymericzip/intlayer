import { type FC, type HTMLAttributes, lazy, Suspense } from 'react';
import type { BundledLanguage } from 'shiki';
import { cn } from '../../utils/cn';

export const CodeDefault: FC<{ children: string }> = ({ children }) => (
  <div>
    <pre>
      <code>
        {children.split('\n').map((line, index) => (
          <span
            className="line block w-full"
            key={`line-${index}-${line.slice(0, 10)}`}
          >
            {line}
          </span>
        ))}
      </code>
    </pre>
  </div>
);

// Lazy load the Shiki component
const CodeBlockShiki = lazy(() =>
  import('./CodeBlockShiki').then((mod) => ({
    default: mod.CodeBlockShiki,
  }))
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
  children,
  lang,
  isDarkMode,
  ...props
}) => (
  <div className={cn('flex w-full', className)} {...props}>
    <Suspense fallback={<CodeDefault>{children}</CodeDefault>}>
      <CodeBlockShiki lang={lang} isDarkMode={isDarkMode}>
        {children}
      </CodeBlockShiki>
    </Suspense>
  </div>
);
