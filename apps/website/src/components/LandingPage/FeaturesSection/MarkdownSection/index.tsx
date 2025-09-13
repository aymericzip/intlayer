'use client';

import { Container, MarkdownRenderer, TextArea } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { RotateCcw } from 'lucide-react';
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
  const { markdown, ariaLabel, preview, editor, livePreview, replay, typing } =
    useIntlayer('markdown-section');
  const [text, setText] = useState<string>('');
  const [isControlled, setIsControlled] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');
  const [mobileTypingProgress, setMobileTypingProgress] = useState(0);
  const [isMobileTyping, setIsMobileTyping] = useState(false);

  // Function to start mobile typing animation
  const startMobileTypingAnimation = () => {
    if (isControlled || activeTab !== 'preview') return;

    setIsMobileTyping(true);
    setMobileTypingProgress(0);
    setText('');

    const typingInterval = setInterval(() => {
      setMobileTypingProgress((prev) => {
        const newProgress = prev + 0.02; // Adjust speed here (0.02 = slower, 0.05 = faster)
        if (newProgress >= 1) {
          clearInterval(typingInterval);
          setIsMobileTyping(false);
          return 1;
        }
        return newProgress;
      });
    }, 50); // Adjust interval here (50ms = faster, 100ms = slower)

    return () => clearInterval(typingInterval);
  };

  // Mobile auto-typing effect - independent of scrollProgress
  useEffect(() => {
    if (!isControlled && activeTab === 'preview') {
      const cleanup = startMobileTypingAnimation();
      return cleanup;
    }
  }, [markdown.value, activeTab, isControlled]);

  // Update text based on mobile typing progress
  useEffect(() => {
    if (!isControlled && activeTab === 'preview') {
      setText(getTextContent(markdown.value, mobileTypingProgress));
    }
  }, [markdown.value, mobileTypingProgress, activeTab, isControlled]);

  // Desktop scroll-based effect
  useEffect(() => {
    if (!isControlled && activeTab !== 'preview') {
      setText(getTextContent(markdown.value, scrollProgress));
    }
  }, [markdown.value, scrollProgress, activeTab, isControlled]);

  return (
    <div className="flex size-full max-h-[50vh] flex-1 scale-90 flex-col justify-center gap-4 max-md:flex-col max-md:max-h-[70vh]">
      {/* Mobile tabs - only visible on mobile */}
      <div className="hidden max-md:flex w-full border-b border-neutral/20">
        <button
          onClick={() => setActiveTab('preview')}
          className={cn(
            'flex-1 py-3 px-4 text-sm font-medium transition-colors',
            activeTab === 'preview'
              ? 'text-text border-b-2 border-text'
              : 'text-neutral hover:text-text'
          )}
        >
          {preview.value}
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={cn(
            'flex-1 py-3 px-4 text-sm font-medium transition-colors',
            activeTab === 'editor'
              ? 'text-text border-b-2 border-text'
              : 'text-neutral hover:text-text'
          )}
        >
          {editor.value}
        </button>
      </div>

      {/* Desktop layout - always visible on desktop */}
      <div className="flex size-full flex-1 flex-col justify-center gap-4 max-md:hidden">
        <Container
          background="none"
          border
          roundedSize="2xl"
          className="w-full flex-1 overflow-auto p-5"
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

      {/* Mobile layout - only visible on mobile */}
      <div className="hidden max-md:flex flex-1 flex-col">
        {activeTab === 'preview' ? (
          <>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-text">
                {livePreview.value}
              </h3>
              {!isControlled && (
                <button
                  onClick={startMobileTypingAnimation}
                  disabled={isMobileTyping}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-neutral/10 hover:bg-neutral/20 rounded-md transition-colors disabled:opacity-50"
                  title="Restart typing animation"
                >
                  <RotateCcw className="h-3 w-3" />
                  {isMobileTyping ? typing.value : replay.value}
                </button>
              )}
            </div>
            <Container
              background="none"
              border
              roundedSize="2xl"
              className="w-full flex-1 overflow-auto p-5"
            >
              <MarkdownRenderer
                options={{
                  wrapper: (props) => <>{props.children}</>,
                }}
              >
                {text}
              </MarkdownRenderer>
            </Container>
          </>
        ) : (
          <TextArea
            defaultValue={text}
            aria-label={ariaLabel.value}
            onChange={(e) => {
              setIsControlled(true);
              setText(e.target.value);
            }}
            className="flex-1 min-h-[300px]"
          />
        )}
      </div>
    </div>
  );
};
