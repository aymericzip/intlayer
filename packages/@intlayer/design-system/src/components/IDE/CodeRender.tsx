'use client';

import highlight from 'highlight.js';
import { forwardRef, type HTMLAttributes, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';
import { CopyButton } from './CopyButton';

type CodeCompProps = {
  children: string;
  language: string;
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
  ) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (
        codeRef &&
        codeRef.current &&
        !codeRef.current.hasAttribute('data-highlighted')
      ) {
        highlight.highlightElement(codeRef.current);

        if (showLineNumbers) {
          // To implement line numbers, we need to add a new div with the line numbers
        }

        // Mark as highlighted so we don't re-highlight
        codeRef.current.setAttribute('data-highlighted', 'true');
      }
    }, [children, showLineNumbers]);

    return (
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
          <pre>
            <code className={`language-${language} w-fit`} ref={codeRef}>
              {children}
            </code>
          </pre>
        </div>
      </div>
    );
  }
);

Code.displayName = 'Code';
