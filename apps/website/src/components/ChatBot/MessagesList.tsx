import { FC, useEffect, useRef } from 'react';
import { ChatBumble, ChatBumbleType } from './ChatBumble';

export type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type MessagesListProps = {
  storedPrompt: ChatCompletionRequestMessage[];
};

export const MessagesList: FC<MessagesListProps> = ({ storedPrompt }) => {
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
      className="relative flex max-h-full flex-col gap-4 overflow-auto py-5"
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
    </div>
  );
};
