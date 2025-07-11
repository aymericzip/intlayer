import { type FC, type HTMLAttributes } from 'react';
import type { BundledLanguage } from 'shiki';
import { cn } from '../../utils/cn';
import { Container } from '../Container';
import { CodeBlock } from './CodeBlockClient';
import { CodeConditionalRender } from './CodeConditionalRenderer';
import type {
  CodeFormat,
  ContentDeclarationFormat,
  PackageManager,
} from './CodeContext';
import { CodeFormatSelector } from './CodeFormatSelector';
import { ContentDeclarationFormatSelector } from './ContentDeclarationFormatSelector';
import { CopyCode } from './CopyCode';
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

export const Code: FC<CodeCompProps> = ({
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
}) => {
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
        {...props}
      >
        {showHeader && (
          <>
            <div className="bg-card/50 text-neutral grid w-full grid-cols-[1fr_auto] items-center justify-between rounded-t-xl py-1.5 pl-4 pr-12 text-xs">
              <span className="truncate">{fileName ?? language}</span>
              <div className="flex items-center gap-2">
                {packageManager && <PackageManagerSelector />}
                {codeFormat && <CodeFormatSelector />}
                {contentDeclarationFormat && (
                  <ContentDeclarationFormatSelector />
                )}
              </div>
            </div>
            <div className="sticky top-48">
              <div
                className={cn(
                  'absolute bottom-0 right-2 flex h-7 items-center',
                  hadSelectInHeader && 'h-11'
                )}
              >
                <CopyCode code={code} />
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
};
