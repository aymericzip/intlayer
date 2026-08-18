import { Container } from '@intlayer/design-system/container';
import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import type { FC } from 'react';

type CodeRenderProps = {
  content: string;
};

export const CodeRender: FC<CodeRenderProps> = ({ content }) => {
  return (
    <Container>
      <MarkdownRenderer>{content}</MarkdownRenderer>
    </Container>
  );
};
