import cn from 'cnfast';
import { type ComponentProps, type FC, type ReactNode, useMemo } from 'react';
import { MarkdownRenderer as MarkdownRendererIntlayer } from 'react-intlayer/markdown';
import { Code } from './Code';
import type { CodeLanguage } from './shikiLanguages';

type MarkdownComponents = NonNullable<
  ComponentProps<typeof MarkdownRendererIntlayer>['components']
>;

type MarkdownRendererProps = {
  codeClassName?: string;
  children: string;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  codeClassName,
}) => {
  /**
   * Overrides are element types: a new function identity remounts the code
   * block (dropping its Shiki highlight) on every parent re-render. Runtimes
   * that skip React's same-element bailout (TanStack Redact) re-render on each
   * scroll tick, so the identity must stay stable.
   */
  const components = useMemo<MarkdownComponents>(
    () => ({
      code: (props) => (
        <Code
          {...props}
          language={props.className?.replace('lang-', '') as CodeLanguage}
          showHeader={false}
          className={cn('text-xs leading-5', codeClassName)}
        >
          {props.children as string}
        </Code>
      ),
      pre: (props) => props.children as ReactNode,
    }),
    [codeClassName]
  );

  return (
    <MarkdownRendererIntlayer components={components}>
      {children ?? ''}
    </MarkdownRendererIntlayer>
  );
};
