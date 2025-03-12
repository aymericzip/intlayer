'use client';

import { Container, MarkdownRenderer, TextArea } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState, type FC } from 'react';

const getTextContent = (text: string, textProgress: number) => {
  // Pleat text of 3 characters
  const textChunks = [];
  for (let i = 0; i < text.length; i += 1) {
    textChunks.push(text.slice(i, i + 1));
  }

  return textChunks
    .filter((_, index) => index / textChunks.length < textProgress)
    .join('');
};

type MarkdownSectionProps = {
  scrollProgress: number;
};

export const MarkdownSection: FC<MarkdownSectionProps> = ({
  scrollProgress,
}) => {
  const { markdown, ariaLabel } = useIntlayer('markdown-section');
  const [text, setText] = useState<string>('');
  const [isControlled, setIsControlled] = useState(false);

  useEffect(() => {
    if (!isControlled) {
      setText(getTextContent(markdown.value, scrollProgress));
    }
  }, [markdown.value, scrollProgress, isControlled]);

  return (
    <div className="flex size-full max-h-[50vh] flex-1 scale-90 flex-col justify-center gap-4 max-md:flex-col">
      <Container
        background="none"
        border
        roundedSize="2xl"
        className="w-full flex-1 overflow-scroll p-5"
      >
        <MarkdownRenderer
          options={{
            wrapper: (props) => <>{props.children}</>,
          }}
        >
          {text}
        </MarkdownRenderer>
      </Container>
      <TextArea
        defaultValue={text}
        aria-label={ariaLabel.value}
        onChange={(e) => {
          setIsControlled(true);
          setText(e.target.value);
        }}
        className="h-44"
      />
    </div>
  );
};
