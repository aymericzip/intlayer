import { forwardRef, type HTMLAttributes } from 'react';
import { BundledLanguage } from 'shiki';
import { cn } from '../../utils/cn';
import { CodeBlockLoader } from './CodeBlockLoader';
import { CopyButton } from './CopyButton';

type CodeCompProps = {
  children: string;
  language: BundledLanguage;
  isDarkMode?: boolean;
  showHeader?: boolean;
  showLineNumbers?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Code = forwardRef<HTMLDivElement, CodeCompProps>(
  (
    {
      children,
      language,
      isDarkMode,
      showHeader = true,
      showLineNumbers = true,
      className,
      ...props
    },
    ref
  ) => (
    <div
      className={cn(
        'relative h-full w-full text-sm leading-6',
        showLineNumbers && 'ml-0',
        className
      )}
      ref={ref}
      {...props}
    >
      {showHeader && (
        <>
          <div className="bg-card dark:bg-card-dark text-neutral dark:text-neutral-dark flex h-9 w-full items-center rounded-t-xl pl-4 text-sm">
            {language ?? 'javascript'}
          </div>
          <div className="sticky top-28">
            <div className="absolute bottom-0 right-2 flex h-9 items-center">
              <CopyButton content={children} />
            </div>
          </div>
        </>
      )}
      <div className="grid size-full grid-cols-[0px] overflow-auto p-3">
        <CodeBlockLoader lang={language} isDarkMode={isDarkMode}>
          {children}
        </CodeBlockLoader>
      </div>
    </div>
  )
);

Code.displayName = 'Code';
