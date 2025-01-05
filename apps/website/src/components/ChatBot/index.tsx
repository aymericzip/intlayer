'use client';

import { Loader } from '@intlayer/design-system';
import {
  useAskDocQuestion,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { FC, useCallback } from 'react';
import { FormSection } from './FormSection';
import { ChatCompletionRequestMessage, MessagesList } from './MessagesList';

export type StoredValue = {
  question: string | undefined;
  answer: string | undefined;
};

export const ChatBot: FC = () => {
  const { isLoading, askDocQuestion } = useAskDocQuestion();
  const { firstMessageContent } = useIntlayer('chat');

  const firstMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: firstMessageContent.content.value,
  };

  const [storedPrompt, setStoredPrompt] = usePersistedStore<
    ChatCompletionRequestMessage[]
  >('chat-bot-messages', [firstMessage]);

  const handleAskNewQuestion = useCallback(
    (newQuestion: string) => {
      setStoredPrompt((storedPrompt) => [
        ...storedPrompt,
        { role: 'user', content: newQuestion },
      ]);

      const newMessages = [
        ...storedPrompt.slice(0, -1),
        { role: 'user', content: newQuestion },
      ];

      askDocQuestion({ messages: newMessages }).then((response) => {
        const content = response.data;

        setStoredPrompt((storedPrompt) => [
          ...storedPrompt,
          { role: 'assistant', content },
        ]);
      });
    },
    [askDocQuestion, storedPrompt]
  );

  const handleClear = useCallback(() => {
    setStoredPrompt([firstMessage]);
  }, [setStoredPrompt]);

  return (
    <div className="flex size-full flex-col items-center justify-between gap-5 overflow-auto px-4 py-3">
      <MessagesList storedPrompt={storedPrompt} />
      {isLoading && <Loader />}

      <FormSection
        askNewQuestion={handleAskNewQuestion}
        clear={handleClear}
        nbMessages={storedPrompt.length}
      />
    </div>
  );
};
