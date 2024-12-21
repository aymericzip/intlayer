'use client';

import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import {
  type FC,
  useEffect,
  useState,
  lazy,
  Suspense,
  type ReactNode,
} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  okaidia,
  coldarkCold,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Loader } from '../Loader';

const SyntaxHighlighter = lazy(() =>
  import('react-syntax-highlighter').then((module) => ({
    default: module.Prism,
  }))
);

type CodeCompProps = {
  children: string;
  language: string;
  isDarkMode?: boolean;
  showHeader?: boolean;
  showLineNumbers?: boolean;
};

export const Code: FC<CodeCompProps> = ({
  children,
  language,
  isDarkMode,
  showHeader = true,
  showLineNumbers = true,
  ...props
}) => {
  const [isDarkModeState, setIsDarkModeState] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(
    () =>
      // Necessary to fix first render bug
      setIsDarkModeState(isDarkMode ?? false),
    [isDarkMode]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div
      className={cn(
        'relative h-full w-full text-sm',
        showLineNumbers && 'ml-0'
      )}
    >
      {showHeader && (
        <>
          <div className="bg-card dark:bg-card-dark text-neutral dark:text-neutral-dark flex h-9 w-full items-center rounded-t-xl pl-4 text-sm">
            {language ?? 'javascript'}
          </div>
          <div className="sticky top-28">
            <div className="absolute bottom-0 right-2 flex h-9 items-center">
              <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
                <Button
                  Icon={copied ? CopyCheckIcon : CopyIcon}
                  variant="hoverable"
                  color="text"
                  label="Copied"
                  aria-label="Copy code"
                  size="icon-sm"
                />
              </CopyToClipboard>
            </div>
          </div>
        </>
      )}
      <div className="grid size-full grid-cols-[0px] overflow-auto p-3">
        <Suspense fallback={<Loader />}>
          <SyntaxHighlighter
            customStyle={{
              display: undefined,
              overflowX: 'auto',
              overflowY: 'auto',
              padding: undefined,
              color: undefined,
              background: 'inherit',
              margin: undefined,
            }}
            PreTag={(props: { children: ReactNode }) => props.children}
            language={language ?? 'javascript'}
            style={isDarkModeState ? okaidia : coldarkCold}
            showLineNumbers={showLineNumbers}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </Suspense>
      </div>
    </div>
  );
};
