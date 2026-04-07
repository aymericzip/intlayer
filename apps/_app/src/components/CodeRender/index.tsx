'use client';

import { Container } from '@intlayer/design-system/container';
import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

type CodeRenderProps = {
  content: string;
};

export const CodeRender: FC<CodeRenderProps> = ({ content }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  return (
    <Container>
      <MarkdownRenderer isDarkMode={isDarkMode}>{content}</MarkdownRenderer>
    </Container>
  );
};
