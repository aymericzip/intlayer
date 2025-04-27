'use client';

import {
  useAskDocQuestion,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import {
  type FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { FileReference } from './FileReference';
import { FormSection } from './FormSection';
import {
  type ChatCompletionRequestMessage,
  MessagesList,
} from './MessagesList';

export type StoredValue = {
  question: string | undefined;
  answer: string | undefined;
};

type ChatBotProps = {
  additionalButtons?: ReactNode;
  displayRelatedFiles?: boolean;
  stateReloaderTrigger?: any;
};

export const ChatBot: FC<ChatBotProps> = ({
  additionalButtons,
  displayRelatedFiles = true,
  stateReloaderTrigger,
}) => {
  const { isLoading, askDocQuestion } = useAskDocQuestion();
  const { firstMessageContent } = useIntlayer('chat');
  const isFirstRender = useRef(true);

  const firstMessage: ChatCompletionRequestMessage = useMemo(
    () => ({
      role: 'system',
      content: firstMessageContent.content.value,
    }),
    [firstMessageContent.content.value]
  );

  const [storedPrompt, setStoredPrompt, loadStoredPrompt] = usePersistedStore<
    ChatCompletionRequestMessage[]
  >('chat-bot-messages', [firstMessage]);
  const [relatedFiles, setRelatedFiles, loadRelatedFiles] = usePersistedStore<
    string[]
  >('chat-bot-related-files-keys', []);

  const handleAskNewQuestion = useCallback(
    (newQuestion: string) => {
      setStoredPrompt((storedPrompt) => [
        ...storedPrompt,
        { role: 'user', content: newQuestion },
      ]);

      const newMessages: ChatCompletionRequestMessage[] = [
        ...storedPrompt.slice(0, -1),
        { role: 'user', content: newQuestion },
      ];

      askDocQuestion({ messages: newMessages }).then((response) => {
        const content = response.data?.response;

        setStoredPrompt(
          (storedPrompt) =>
            [
              ...storedPrompt,
              { role: 'assistant', content },
            ] as ChatCompletionRequestMessage[]
        );

        setRelatedFiles((prev) => [
          ...new Set([...prev, ...(response.data?.relatedFiles ?? [])]),
        ]);
      });
    },
    [askDocQuestion, setStoredPrompt, setRelatedFiles, storedPrompt]
  );

  const handleClear = useCallback(() => {
    setStoredPrompt([firstMessage]);
    setRelatedFiles([]);
  }, [firstMessage, setStoredPrompt, setRelatedFiles]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof stateReloaderTrigger === 'undefined') return;

    loadStoredPrompt();
    loadRelatedFiles();
  }, [loadStoredPrompt, loadRelatedFiles, stateReloaderTrigger]);

  return (
    <div className="flex size-full flex-col items-center justify-between overflow-auto">
      <div className="relative flex size-full flex-auto">
        <div className="absolute inset-0 size-full">
          <MessagesList storedPrompt={storedPrompt} isLoading={isLoading} />
        </div>
      </div>
      <div className="w-full flex-1">
        {displayRelatedFiles && <FileReference relatedFiles={relatedFiles} />}

        <FormSection
          askNewQuestion={handleAskNewQuestion}
          clear={handleClear}
          nbMessages={storedPrompt.length}
          additionalButtons={additionalButtons}
        />
      </div>
    </div>
  );
};
