'use client';

import { Container, MarkdownRenderer, TextArea } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState, type FC } from 'react';

const getTextContent = (text: string, textProgress: number) => {
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
    <section
      className="
        flex w-full 
        max-h-[70vh] md:max-h-[50vh] 
        flex-col md:flex-row 
        items-stretch md:items-center 
        justify-center 
        gap-3 sm:gap-4 md:gap-8
        px-3 sm:px-4 md:px-0
        scale-100 sm:scale-100 md:scale-95
      "
    >
      <Container
        background="none"
        border
        roundedSize="2xl"
        className="w-full flex-1 overflow-auto p-3 sm:p-5 text-sm sm:text-base md:text-lg"
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
        className="
          h-32 sm:h-40 md:h-44 
          w-full md:w-1/2 
          text-sm sm:text-base md:text-lg
        "
      />
    </section>
  );
};
