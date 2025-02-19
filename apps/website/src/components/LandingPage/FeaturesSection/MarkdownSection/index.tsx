'use client';

import { Container, MarkdownRenderer, TextArea } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';

export const MarkdownSection: FC = () => {
  const content = useIntlayer('markdown-section');
  const [text, setText] = useState<string>(content.value);
  return (
    <div className="flex size-full max-h-[50vh] flex-1 scale-90 flex-col justify-center gap-4 max-md:flex-col">
      <Container
        background="none"
        border
        roundedSize="2xl"
        className="w-full overflow-scroll"
      >
        <MarkdownRenderer>{text}</MarkdownRenderer>
      </Container>
      <TextArea
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-32 flex-1"
      />
    </div>
  );
};
