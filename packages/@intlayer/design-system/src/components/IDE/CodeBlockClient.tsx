import { cn } from '@utils/cn';
import {
  type FC,
  type HTMLAttributes,
  lazy,
  type ReactNode,
  Suspense,
} from 'react';
import type { BundledLanguage } from 'shiki/bundle/web';

export type { BundledLanguage as CodeLanguage } from 'shiki/bundle/web';

import { CodeDefault } from './CodeDefault';

// Lazy load the Shiki component
const CodeBlockShiki = lazy(() =>
  import('./CodeBlockShiki').then((mod) => ({
    default: mod.CodeBlockShiki,
  }))
);

export type CodeBlockProps = {
  children: React.ReactNode;
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
