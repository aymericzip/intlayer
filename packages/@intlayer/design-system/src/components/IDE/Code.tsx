import {
  type FC,
  type HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDictionary } from 'react-intlayer';
import type { BundledLanguage } from 'shiki';
import { cn } from '../../utils/cn';
import { Container } from '../Container';
import { ExpandCollapse } from '../ExpandCollapse';
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
import codeContent from './code.content';

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

const MIN_HEIGHT = 700;

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
  const [codeContainerHeight, setCodeContainerHeight] = useState(0);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const { expandCollapseContent } = useDictionary(codeContent);
  const isTooBig = (codeContainerHeight ?? 0) > MIN_HEIGHT;
  const code = children.endsWith('\n') ? children.slice(0, -1) : children;

  const hadSelectInHeader =
    packageManager || codeFormat || contentDeclarationFormat;

  useEffect(() => {
    if (codeContainerRef.current) {
      setCodeContainerHeight(codeContainerRef.current.clientHeight);
    }
  }, []);

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
        {isTooBig ? (
          <ExpandCollapse
            minHeight={MIN_HEIGHT}
            content={expandCollapseContent}
          >
            <div
              className="grid size-full grid-cols-[0px] overflow-auto p-3"
              ref={codeContainerRef}
            >
              <CodeBlock lang={language} isDarkMode={isDarkMode}>
                {code}
              </CodeBlock>
            </div>
          </ExpandCollapse>
        ) : (
          <div
            className="grid size-full grid-cols-[0px] overflow-auto p-3"
            ref={codeContainerRef}
          >
            <CodeBlock lang={language} isDarkMode={isDarkMode}>
              {code}
            </CodeBlock>
          </div>
        )}
      </Container>
    </CodeConditionalRender>
  );
};
