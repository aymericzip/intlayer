'use client';

import { AutoCompleteTextarea, Container } from '@intlayer/design-system';
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

type AutocompletionSectionProps = {
  scrollProgress: number;
};

export const AutocompletionSection: FC<AutocompletionSectionProps> = ({
  scrollProgress,
}) => {
  const { input, suggestion, ariaLabel } = useIntlayer(
    'autocompletion-section'
  );
  const [text, setText] = useState<string>('');
  const [isControlled, setIsControlled] = useState(false);

  useEffect(() => {
    if (!isControlled) {
      setText(getTextContent(input.value, scrollProgress * 1.5));
    }
  }, [input.value, scrollProgress, isControlled]);

  return (
    <section
      className="
        flex flex-col md:flex-row 
        items-stretch md:items-center 
        justify-center 
        gap-3 sm:gap-4 md:gap-8 
        w-full
        px-3 sm:px-4 md:px-0
      "
    >
      <div
        className="
          w-full md:flex-1 
          scale-100 sm:scale-100 md:scale-95
        "
      >
        <Container
          background="none"
          border
          roundedSize="2xl"
          className="
            h-auto flex-1 overflow-auto 
            p-3 sm:p-4 md:p-5 
            max-w-full
          "
        >
          <AutoCompleteTextarea
            value={text}
            aria-label={ariaLabel.value}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={() => {
              setIsControlled(true);
            }}
            isActive={isControlled}
            suggestion={
              !isControlled && scrollProgress > 0.66
                ? suggestion.value
                : undefined
            }
          />
        </Container>
      </div>
    </section>
  );
};
