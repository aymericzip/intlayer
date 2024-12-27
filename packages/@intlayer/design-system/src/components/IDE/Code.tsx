import { forwardRef, type HTMLAttributes } from 'react';
import { BundledLanguage } from 'shiki';
import { cn } from '../../utils/cn';
import { Container } from '../Container';
import { CodeBlock } from './CodeBlock';
import { CodeConditionalRender } from './CodeConditionalRenderer';
import type {
  PackageManager,
  CodeFormat,
  ContentDeclarationFormat,
} from './CodeContext';
import { CodeFormatSelector } from './CodeFormatSelector';
import { ContentDeclarationFormatSelector } from './ContentDeclarationFormatSelector';
import { CopyButton } from './CopyButton';
import { PackageManagerSelector } from './PackageManagerSelector';

export type CodeCompAttributes = {
  fileName?: string;
  packageManager?: PackageManager;
  codeFormat?: CodeFormat;
  contentDeclarationFormat?: ContentDeclarationFormat;
};

type CodeCompProps = {
  children: string;
  fileName?: string;
  language: BundledLanguage;
  isDarkMode?: boolean;
  showHeader?: boolean;
  showLineNumbers?: boolean;
} & CodeCompAttributes &
  HTMLAttributes<HTMLDivElement>;

export const Code = forwardRef<HTMLDivElement, CodeCompProps>(
  (
    {
      children,
      language,
      isDarkMode,
      showHeader = true,
      showLineNumbers = true,
      className,
      fileName,
      packageManager,
      codeFormat,
      contentDeclarationFormat,
      ...props
    },
    ref
  ) => {
    const code = children.endsWith('\n') ? children.slice(0, -1) : children;

    const hadSelectInHeader =
      packageManager || codeFormat || contentDeclarationFormat;

    return (
      <CodeConditionalRender
        packageManager={packageManager}
        codeFormat={codeFormat}
        contentDeclarationFormat={contentDeclarationFormat}
      >
        <Container
          className={cn(
            'relative text-sm leading-6',
            showLineNumbers && 'with-line-number ml-0',
            className
          )}
          transparency="lg"
          ref={ref}
          {...props}
        >
          {showHeader && (
            <>
              <div className="bg-card/50 dark:bg-card-dark/50 text-neutral dark:text-neutral-dark grid w-full grid-cols-[1fr_auto] items-center justify-between rounded-t-xl py-1.5 pl-4 pr-12 text-sm">
                <span className="truncate">{fileName ?? language}</span>
                <div className="flex items-center gap-2">
                  {packageManager && <PackageManagerSelector />}
                  {codeFormat && <CodeFormatSelector />}
                  {contentDeclarationFormat && (
                    <ContentDeclarationFormatSelector />
                  )}
                </div>
              </div>
              <div className="sticky top-28">
                <div
                  className={cn([
                    'absolute bottom-0 right-2 flex h-8 items-center',
                    hadSelectInHeader && 'h-11',
                  ])}
                >
                  <CopyButton content={code} />
                </div>
              </div>
            </>
          )}
          <div className="grid size-full grid-cols-[0px] overflow-auto p-3">
            <CodeBlock lang={language} isDarkMode={isDarkMode}>
              {code}
            </CodeBlock>
          </div>
        </Container>
      </CodeConditionalRender>
    );
  }
);

Code.displayName = 'Code';
