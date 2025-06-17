'use client';

import { AutoCompleteTextarea, Container } from '@intlayer/design-system';
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
    <div className="w-full scale-90">
      <Container
        background="none"
        border
        roundedSize="2xl"
        className="h-auto flex-1 overflow-auto p-5"
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
  );
};
