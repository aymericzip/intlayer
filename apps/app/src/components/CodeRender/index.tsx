import { Container } from '@intlayer/design-system/container';
import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import type { FC } from 'react';
import { useTheme } from '#/providers/ThemeProvider';

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
