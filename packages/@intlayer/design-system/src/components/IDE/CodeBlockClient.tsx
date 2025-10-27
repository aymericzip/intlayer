import { type FC, type HTMLAttributes, lazy, Suspense } from 'react';
import type { BundledLanguage } from 'shiki/bundle/web';
import { cn } from '../../utils/cn';

export const CodeDefault: FC<{ children: string }> = ({ children }) => (
  <div className="min-w-0 max-w-full overflow-x-auto">
    <pre className="min-w-0 max-w-full overflow-x-auto">
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
  <div
    className={cn('flex w-full min-w-0 max-w-full overflow-x-auto', className)}
    {...props}
  >
    <Suspense fallback={<CodeDefault>{children}</CodeDefault>}>
      <CodeBlockShiki lang={lang} isDarkMode={isDarkMode}>
        {children}
      </CodeBlockShiki>
    </Suspense>
  </div>
);
