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
  const [mobileTypingProgress, setMobileTypingProgress] = useState(0);
  const [isMobileTyping, setIsMobileTyping] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Function to start mobile typing animation
  const startMobileTypingAnimation = () => {
    if (isControlled) return;

    setIsMobileTyping(true);
    setMobileTypingProgress(0);
    setText('');
    setShowSuggestion(false);

    const typingInterval = setInterval(() => {
      setMobileTypingProgress((prev) => {
        const newProgress = prev + 0.02; // Adjust speed here
        if (newProgress >= 1) {
          clearInterval(typingInterval);
          setIsMobileTyping(false);
          // Show suggestion after typing is complete
          setTimeout(() => setShowSuggestion(true), 500);
          return 1;
        }
        return newProgress;
      });
    }, 50); // Adjust interval here

    return () => clearInterval(typingInterval);
  };

  // Mobile auto-typing effect - independent of scrollProgress
  useEffect(() => {
    if (!isControlled) {
      const cleanup = startMobileTypingAnimation();
      return cleanup;
    }
  }, [input.value, isControlled]);

  // Update text based on mobile typing progress
  useEffect(() => {
    if (!isControlled) {
      setText(getTextContent(input.value, mobileTypingProgress * 1.5));
    }
  }, [input.value, mobileTypingProgress, isControlled]);

  // Desktop scroll-based effect
  useEffect(() => {
    if (!isControlled) {
      setText(getTextContent(input.value, scrollProgress * 1.5));
    }
  }, [input.value, scrollProgress, isControlled]);

  return (
    <div className="w-full scale-100 md:scale-90">
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
            !isControlled && (scrollProgress > 0.66 || showSuggestion)
              ? suggestion.value
              : undefined
          }
          className="max-md:min-h-[150px]"
        />
      </Container>
    </div>
  );
};
