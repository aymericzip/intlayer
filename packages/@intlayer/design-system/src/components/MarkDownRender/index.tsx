'use client';

import Markdown from 'markdown-to-jsx';
import type { FC } from 'react';
import { cn } from '../../utils/cn';
import { Container } from '../Container';
import { H1, H2, H3 } from '../Headers';
import { SectionScroller } from '../Headers/SectionScroller';
import { Code } from '../IDE/CodeRender';
import { Link } from '../Link';

type MarkdownRendererProps = {
  isDarkMode?: boolean;
  children: string;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode,
}) => (
  <Markdown
    options={{
      overrides: {
        h1: {
          component: (props) => <H1 isClickable={true} {...props} />,
        },
        h2: {
          component: (props) => <H2 isClickable={true} {...props} />,
        },
        h3: {
          component: (props) => <H3 isClickable={true} {...props} />,
        },
        code: {
          component: (props) =>
            typeof props.className === 'undefined' ? (
              <strong className="bg-card/60 dark:bg-card-dark/60 rounded p-1 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur">
                {props.children}
              </strong>
            ) : (
              <Container>
                <Code
                  isDarkMode={isDarkMode}
                  showLineNumbers={false}
                  {...props}
                />
              </Container>
            ),
        },
        blockquote: ({ className, ...props }) => (
          <blockquote
            className={cn(
              'border-card dark:border-card-dark text-neutral dark:text-neutral-dark mt-5 flex flex-col gap-3 border-l-4 pl-5',
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
        img: ({ className, ...props }) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            {...props}
            loading="lazy"
            className={cn('max-w-full rounded-md', className)}
            src={`${props.src}?raw=true`}
          />
        ),
        a: (props) => <Link color="neutral" {...props} />,
        pre: (props) => props.children,
      },
      wrapper: ({ className, ...props }) => (
        <>
          <SectionScroller />
          <div
            className={cn(
              'text-text dark:text-text-dark flex flex-col gap-6 p-10',
              className
            )}
            {...props}
          />
        </>
      ),
    }}
  >
    {children ?? ''}
  </Markdown>
);
