'use client';

import { Container, MarkdownRenderer } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

type CodeRenderProps = {
  content: string;
};

export const CodeRender: FC<CodeRenderProps> = ({ content }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Container>
      <MarkdownRenderer isDarkMode={isDarkMode}>{content}</MarkdownRenderer>
    </Container>
  );
};
