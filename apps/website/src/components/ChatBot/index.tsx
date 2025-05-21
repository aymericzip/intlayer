'use client';

import {
  useAskDocQuestion,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, ReactNode, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid'; // if you prefer a UUID library
import { FileReference } from './FileReference';
import { FormSection } from './FormSection';
import {
  type ChatCompletionRequestMessage,
  MessagesList,
} from './MessagesList';

type AskDocQuestionResult =
  | {
      success: boolean;
      status: number;
      data: {
        response: string;
        relatedFiles: string[];
      } | null;
      message?: string;
      description?: string;
      error?:
        | {
            code: string;
            title: string;
            message: string;
          }
        | Array<{
            code: string;
            title: string;
            message: string;
          }>;
    }
  | {
      response: string;
      relatedFiles: string[];
    };

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
  const [currentResponse, setCurrentResponse] = useState('');

  const firstMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: firstMessageContent.content.value,
  };

  const [discutionId, setDiscutionId, loadDiscutionId] =
    usePersistedStore<string>('chat-bot-discution-id');
  const [storedPrompt, setStoredPrompt, loadStoredPrompt] = usePersistedStore<
    ChatCompletionRequestMessage[]
  >('chat-bot-messages', []);
  const [relatedFiles, setRelatedFiles, loadRelatedFiles] = usePersistedStore<
    string[]
  >('chat-bot-related-files-keys', []);

  const handleAskNewQuestion = (newQuestion: string) => {
    setCurrentResponse('');
    setStoredPrompt((storedPrompt) => [
      ...storedPrompt,
      {
        role: 'user' as const,
        content: newQuestion,
        timestamp: new Date(),
      },
    ]);

    const newMessages: ChatCompletionRequestMessage[] = [
      ...storedPrompt.slice(0, -1),
      {
        role: 'user' as const,
        content: newQuestion,
      },
    ];

    askDocQuestion({
      messages: newMessages,
      discutionId,
      onMessage: (chunk: string) => setCurrentResponse((prev) => prev + chunk),
      onDone: (response: AskDocQuestionResult) => {
        const responseData = 'data' in response ? response.data : response;

        if (!responseData?.response) {
          console.error('Invalid response format:', response);
          return;
        }

        setStoredPrompt((storedPrompt) => [
          ...storedPrompt,
          {
            role: 'assistant' as const,
            content: responseData.response,
            timestamp: new Date(),
          },
        ]);
        setRelatedFiles((prev) => [
          ...new Set([...prev, ...(responseData.relatedFiles ?? [])]),
        ]);
        setCurrentResponse('');
      },
    }).catch((error) => {
      console.error('Error in askDocQuestion:', error);
      setCurrentResponse('');
      // You might want to show an error toast here
    });
  };

  const handleClear = () => {
    setDiscutionId(uuid());
    setStoredPrompt([]);
    setRelatedFiles([]);
    setCurrentResponse('');
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof stateReloaderTrigger === 'undefined') return;

    loadDiscutionId();
    loadStoredPrompt();
    loadRelatedFiles();
  }, [stateReloaderTrigger]);

  useEffect(() => {
    if (!discutionId) {
      setDiscutionId(uuid());
    }
  }, [discutionId]);

  return (
    <div className="flex size-full flex-col items-center justify-between overflow-auto">
      <div className="relative flex size-full flex-auto">
        <div className="absolute inset-0 size-full">
          <MessagesList
            storedPrompt={[
              firstMessage,
              ...storedPrompt,
              ...(currentResponse
                ? [{ role: 'assistant' as const, content: currentResponse }]
                : []),
            ]}
            isLoading={isLoading}
          />
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
