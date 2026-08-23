import cn from 'cnfast';
import type { FC } from 'react';
import { MarkdownRenderer as MarkdownRendererIntlayer } from 'react-intlayer/markdown';
import { Code } from './Code';
import type { CodeLanguage } from './shikiLanguages';

type MarkdownRendererProps = {
  isDarkMode?: boolean;
  codeClassName?: string;
  children: string;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode,
  codeClassName,
}) => (
  <MarkdownRendererIntlayer
    components={{
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
      pre: (props) => props.children,
    }}
  >
    {children ?? ''}
  </MarkdownRendererIntlayer>
);
