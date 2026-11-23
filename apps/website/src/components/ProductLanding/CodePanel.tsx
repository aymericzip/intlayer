import { CodeBlock, type CodeBlockProps } from '@intlayer/design-system/ide';
import { cn } from '@intlayer/design-system/utils';
import type { FC, ReactNode } from 'react';

type CodePanelProps = {
  /** File name or short label shown above the code, in mono. */
  label: ReactNode;
  code: string;
  lang: CodeBlockProps['lang'];
  /** Right side of the label row, for locale keys. */
  aside?: ReactNode;
  className?: string;
};

/** Bordered code sample with a mono file label. */
export const CodePanel: FC<CodePanelProps> = ({
  label,
  code,
  lang,
  aside,
  className,
}) => (
  <div
    className={cn(
      'flex min-w-0 flex-col overflow-hidden rounded-xl border border-text/10 bg-background',
      className
    )}
  >
    <div className="flex h-9 items-center gap-2 border-b border-text/10 px-4">
      {aside}
      <span className="truncate font-mono text-xs text-muted-foreground">
        {label}
      </span>
    </div>
    <div className="min-w-0 overflow-x-auto px-4 py-3">
      <CodeBlock lang={lang} className="text-sm">
        {code}
      </CodeBlock>
    </div>
  </div>
);
