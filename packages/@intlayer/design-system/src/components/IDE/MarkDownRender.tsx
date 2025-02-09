import Markdown from 'markdown-to-jsx';
import type { FC } from 'react';
import { Code } from './Code';

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
        code: {
          component: (props) => (
            <Code
              {...props}
              isDarkMode={isDarkMode}
              language={props.className?.replace('lang-', '')}
              showHeader={false}
              className="text-xs leading-5"
            />
          ),
        },
        pre: (props) => props.children,
      },
    }}
  >
    {children ?? ''}
  </Markdown>
);
