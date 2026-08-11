import type { FC } from 'react';
import { MarkdownRenderer as MarkdownRendererIntlayer } from 'react-intlayer';
import { Code } from './Code';
import type { CodeLanguage } from './shikiLanguages';

type MarkdownRendererProps = {
  isDarkMode?: boolean;
  children: string;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode,
}) => (
  <MarkdownRendererIntlayer
    components={{
      code: (props) => (
        <Code
          {...props}
          isDarkMode={isDarkMode}
          language={props.className?.replace('lang-', '') as CodeLanguage}
          showHeader={false}
          className="text-xs leading-5"
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
