'use client';

import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import {
  type FC,
  useEffect,
  useState,
  lazy,
  Suspense,
  type ReactNode,
  useMemo,
} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  okaidia,
  coldarkCold,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useIsMounted } from '../../hooks/useIsMounted';
import { cn } from '../../utils/cn';
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
  showLineNumbers?: boolean;
};

export const Code: FC<CodeCompProps> = ({
  children,
  language,
  isDarkMode,
  showLineNumbers = true,
  ...props
}) => {
  useIsMounted();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  const style = useMemo(
    () => (isDarkMode ? okaidia : coldarkCold),
    [isDarkMode]
  );

  return (
    <div
      className={cn(
        'relative h-full w-full text-sm',
        showLineNumbers && 'ml-0'
      )}
    >
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <button className="absolute right-3 top-3" aria-label="Copy code">
          {copied ? (
            <CopyCheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
        </button>
      </CopyToClipboard>
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
            style={style}
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
