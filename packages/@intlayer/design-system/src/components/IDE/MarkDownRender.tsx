'use client';

import Markdown from 'markdown-to-jsx';
import type { FC } from 'react';
import { Code } from './CodeRender';

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
          component: (props) => <Code {...props} isDarkMode={isDarkMode} />,
        },
      },
    }}
  >
    {children ?? ''}
  </Markdown>
);
