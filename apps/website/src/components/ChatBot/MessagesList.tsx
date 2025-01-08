import { Loader } from '@intlayer/design-system';
import { FC, useEffect, useRef } from 'react';
import { ChatBumble, ChatBumbleType } from './ChatBumble';

export type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type MessagesListProps = {
  storedPrompt: ChatCompletionRequestMessage[];
  isLoading: boolean;
};

export const MessagesList: FC<MessagesListProps> = ({
  storedPrompt,
  isLoading,
}) => {
  const lastPrompt = storedPrompt[storedPrompt.length - 1];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastPrompt.role === 'user') {
      // Scroll to the end
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [lastPrompt]);

  return (
    <div
      className="relative flex max-h-full flex-1 flex-col gap-4 overflow-auto pt-5"
      ref={chatContainerRef}
    >
      {storedPrompt.map((promt, index) => (
        <ChatBumble
          key={index}
          type={
            promt.role === 'user'
              ? ChatBumbleType.QUESTION
              : ChatBumbleType.ANSWER
          }
        >
          {promt.content}
        </ChatBumble>
      ))}
      <Loader
        isLoading={isLoading}
        className="bg-card/50 dark:bg-card-dark/50 sticky bottom-0 left-0 m-auto h-14 w-auto rounded-full p-2 backdrop-blur"
      />
    </div>
  );
};
