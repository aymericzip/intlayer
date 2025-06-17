import type { Locales } from '@intlayer/config';
import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx';
import type { FC } from 'react';
import { cn } from '../../utils/cn';
import { H1, H2, H3, H4 } from '../Headers';
import { SectionScroller } from '../Headers/SectionScroller';
import { Code } from '../IDE/Code';
import { CodeProvider } from '../IDE/CodeContext';
import { Link } from '../Link';

type MarkdownRendererProps = {
  children: string;
  isDarkMode?: boolean;
  locale?: Locales;
  options?: MarkdownToJSX.Options;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode,
  locale,
  options,
}) => {
  const { overrides, ...restOptions } = options ?? {};
  return (
    <CodeProvider>
      <Markdown
        options={{
          overrides: {
            h1: (props) => <H1 isClickable={true} {...props} />,
            h2: (props) => <H2 isClickable={true} {...props} />,
            h3: (props) => <H3 isClickable={true} {...props} />,
            h4: (props) => <H4 isClickable={true} {...props} />,

            code: (props) =>
              typeof props.className === 'undefined' ? (
                <strong className="bg-card/60 rounded p-1 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur">
                  {props.children}
                </strong>
              ) : (
                <Code
                  isDarkMode={isDarkMode}
                  language={props.className?.replace('lang-', '')}
                  {...props}
                />
              ),

            blockquote: ({ className, ...props }) => (
              <blockquote
                className={cn(
                  'border-card text-neutral mt-5 flex flex-col gap-3 border-l-4 pl-5',
                  className
                )}
                {...props}
              />
            ),
            ul: ({ className, ...props }) => (
              <ul
                className={cn('mt-5 flex flex-col gap-3 pl-5', className)}
                {...props}
              />
            ),
            ol: ({ className, ...props }) => (
              <ol
                className={cn('mt-5 flex flex-col gap-3 pl-5', className)}
                {...props}
              />
            ),
            li: ({ className, ...props }) => (
              <li className={cn('list-disc', className)} {...props} />
            ),
            img: ({ className, ...props }) => (
              <img
                {...props}
                loading="lazy"
                className={cn('max-w-full rounded-md', className)}
                src={`${props.src}?raw=true`}
              />
            ),
            a: (props) => (
              <Link
                color="neutral"
                isExternalLink={props.href?.startsWith('http')}
                underlined={true}
                locale={locale}
                {...props}
              />
            ),
            pre: (props) => props.children,
            table: ({ className, ...props }) => (
              <div className="grid w-full max-w-full overflow-auto rounded">
                <table
                  className={cn(
                    'max-w-full table-auto overflow-hidden text-left',
                    className
                  )}
                  {...props}
                />
              </div>
            ),
            th: ({ className, ...props }) => (
              <th
                className={cn(
                  'border-neutral bg-neutral/10 border-b p-4',
                  className
                )}
                {...props}
              />
            ),
            tr: ({ className, ...props }) => (
              <tr
                className={cn('hover:bg-neutral/10 hover:/10', className)}
                {...props}
              />
            ),
            td: ({ className, ...props }) => (
              <td
                className={cn('border-b border-neutral-500/50 p-4', className)}
                {...props}
              />
            ),
            ...overrides,
          },
          wrapper: ({ className, ...props }) => (
            <>
              <SectionScroller />
              <div
                className={cn('flex flex-col gap-8 p-10', className)}
                {...props}
              />
            </>
          ),
          ...restOptions,
        }}
      >
        {children ?? ''}
      </Markdown>
    </CodeProvider>
  );
};
