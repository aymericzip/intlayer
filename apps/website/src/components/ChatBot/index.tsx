'use client';

import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { Container } from '@intlayer/design-system';
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

type DiscutionStore = {
  discutionId: string;
  storedPrompt: ChatCompletionRequestMessage[];
  relatedFiles: string[];
};

export const ChatBot: FC<ChatBotProps> = ({
  additionalButtons,
  displayRelatedFiles = true,
  stateReloaderTrigger,
}) => {
  const [hasReachedRateLimit, setHasReachedRateLimit] = useState(false);
  const { mutate: askDocQuestion, isPending } = useAskDocQuestion();
  const { firstMessageContent, rateLimitExceededMessage, signInButton } =
    useIntlayer('chat');
  const isFirstRender = useRef(true);
  const [currentResponse, setCurrentResponse] = useState('');

  const firstMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: firstMessageContent.content.value,
  };

  const [discution, setDiscution, loadDiscution] = usePersistedStore<
    DiscutionStore | undefined
  >('chat-bot-discution-store');

  const handleAskNewQuestion = (newQuestion: string) => {
    setCurrentResponse('');
    setDiscution(
      (discution) =>
        ({
          ...discution,
          discutionId: discution?.discutionId ?? uuid(),
          storedPrompt: [
            ...(discution?.storedPrompt ?? []),
            {
              role: 'user' as const,
              content: newQuestion,
              timestamp: new Date(),
            },
          ],
        }) as DiscutionStore
    );

    const newMessages: ChatCompletionRequestMessage[] = [
      ...(discution?.storedPrompt ?? []),
      {
        role: 'user' as const,
        content: newQuestion,
      },
    ];

    askDocQuestion(
      {
        messages: newMessages,
        discutionId: discution?.discutionId ?? '',
        onMessage: (chunk: string) =>
          setCurrentResponse((prev) => prev + chunk),
        onDone: (response: AskDocQuestionResult) => {
          const responseData = 'data' in response ? response.data : response;

          if (!responseData) {
            console.error('Invalid response format:', response);
            return;
          }

          setDiscution(
            (discution) =>
              ({
                ...discution,
                storedPrompt: [
                  ...(discution?.storedPrompt ?? []),
                  {
                    role: 'assistant' as const,
                    content: responseData.response,
                    timestamp: new Date(),
                  },
                ],
              }) as DiscutionStore
          );
          setDiscution(
            (discution) =>
              ({
                ...discution,
                relatedFiles: [
                  ...new Set([
                    ...(discution?.relatedFiles ?? []),
                    ...(responseData.relatedFiles ?? []),
                  ]),
                ],
              }) as DiscutionStore
          );
          setCurrentResponse('');
        },
      },
      {
        onSuccess: () => {
          setHasReachedRateLimit(false);
        },
        onError: (errorMessage) => {
          let error;

          // If json is valid, parse it
          try {
            if (typeof errorMessage === 'undefined') return;

            if (typeof errorMessage.message === 'string') {
              error = errorMessage.message;
            } else {
              error = JSON.parse(errorMessage as any);
            }
          } catch (e) {
            // If json is not valid, set error to the original errorMessage

            error = errorMessage;
          }

          // render toast for each error if there is more than one
          // otherwise render the toast with the error message
          [error]
            .flatMap((error) => error)
            .forEach((error) => {
              if (error.code === 'RATE_LIMIT_EXCEEDED_UNAUTHENTICATED') {
                setHasReachedRateLimit(true);
              }
            });
        },
      }
    );
  };

  const handleClear = () => {
    setDiscution((discution) => ({
      ...discution,
      discutionId: uuid(),
      storedPrompt: [],
      relatedFiles: [],
    }));
    setCurrentResponse('');
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadDiscution();
      return;
    }

    if (typeof stateReloaderTrigger === 'undefined') return;

    loadDiscution();
  }, [stateReloaderTrigger]);

  return (
    <div className="flex size-full flex-col items-center justify-between overflow-auto">
      <div className="relative flex size-full flex-auto">
        <div className="absolute inset-0 size-full">
          <MessagesList
            storedPrompt={[
              firstMessage,
              ...(discution?.storedPrompt ?? []),
              ...(currentResponse
                ? [{ role: 'assistant' as const, content: currentResponse }]
                : []),
            ]}
            isLoading={isPending}
          />
        </div>
      </div>
      <div className="w-full flex-1">
        {displayRelatedFiles && (
          <FileReference relatedFiles={discution?.relatedFiles ?? []} />
        )}
        {hasReachedRateLimit && (
          <Container
            className="text-center text-sm max-w-md mt-3 gap-4 flex flex-col mx-auto"
            borderColor="neutral"
            border
            roundedSize="xl"
            padding="md"
          >
            <span>{rateLimitExceededMessage}</span>
            <Link
              href={PagesRoutes.Auth_SignIn}
              label={signInButton.label.value}
              color="text"
              variant="button-outlined"
            >
              {signInButton.text}
            </Link>
          </Container>
        )}

        <FormSection
          askNewQuestion={handleAskNewQuestion}
          clear={handleClear}
          nbMessages={(discution?.storedPrompt ?? []).length}
          additionalButtons={additionalButtons}
        />
      </div>
    </div>
  );
};
