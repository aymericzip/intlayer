'use client';

import { Link } from '@components/Link/Link';
import { Container } from '@intlayer/design-system';
import {
  useAskDocQuestion,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, type ReactNode, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid'; // if you prefer a UUID library
import { PagesRoutes } from '@/Routes';
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

type DiscussionStore = {
  discussionId: string;
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

  const [discussion, setDiscussion, loadDiscussion] = usePersistedStore<
    DiscussionStore | undefined
  >('chat-bot-discussion-store');

  const handleAskNewQuestion = (newQuestion: string) => {
    setCurrentResponse('');
    setDiscussion(
      (discussion) =>
        ({
          ...discussion,
          discussionId: discussion?.discussionId ?? uuid(),
          storedPrompt: [
            ...(discussion?.storedPrompt ?? []),
            {
              role: 'user' as const,
              content: newQuestion,
              timestamp: new Date(),
            },
          ],
        }) as DiscussionStore
    );

    const newMessages: ChatCompletionRequestMessage[] = [
      ...(discussion?.storedPrompt ?? []),
      {
        role: 'user' as const,
        content: newQuestion,
      },
    ];

    askDocQuestion(
      {
        messages: newMessages,
        discussionId: discussion?.discussionId ?? '',
        onMessage: (chunk: string) =>
          setCurrentResponse((prev) => prev + chunk),
        onDone: (response: AskDocQuestionResult) => {
          const responseData = 'data' in response ? response.data : response;

          if (!responseData) {
            console.error('Invalid response format:', response);
            return;
          }

          setDiscussion(
            (discussion) =>
              ({
                ...discussion,
                storedPrompt: [
                  ...(discussion?.storedPrompt ?? []),
                  {
                    role: 'assistant' as const,
                    content: responseData.response,
                    timestamp: new Date(),
                  },
                ],
              }) as DiscussionStore
          );
          setDiscussion(
            (discussion) =>
              ({
                ...discussion,
                relatedFiles: [
                  ...new Set([
                    ...(discussion?.relatedFiles ?? []),
                    ...(responseData.relatedFiles ?? []),
                  ]),
                ],
              }) as DiscussionStore
          );
          setCurrentResponse('');
        },
      },
      {
        onSuccess: () => {
          setHasReachedRateLimit(false);
        },
        onError: (errorMessage) => {
          let error: any;

          // If json is valid, parse it
          try {
            if (typeof errorMessage === 'undefined') return;

            if (typeof errorMessage.message === 'string') {
              error = errorMessage.message;
            } else {
              error = JSON.parse(errorMessage as any);
            }
          } catch (_e) {
            // If json is not valid, set error to the original errorMessage

            error = errorMessage;
          }

          // render toast for each error if there is more than one
          // otherwise render the toast with the error message
          // biome-ignore lint/complexity/noFlatMapIdentity: <Match the case if error is an array>
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
    setDiscussion((discussion) => ({
      ...discussion,
      discussionId: uuid(),
      storedPrompt: [],
      relatedFiles: [],
    }));
    setCurrentResponse('');
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadDiscussion();
      return;
    }

    if (typeof stateReloaderTrigger === 'undefined') return;

    loadDiscussion();
  }, [stateReloaderTrigger]);

  return (
    <div className="flex size-full flex-col items-center justify-between overflow-auto">
      <div className="relative flex size-full flex-auto">
        <div className="absolute inset-0 size-full">
          <MessagesList
            storedPrompt={[
              firstMessage,
              ...(discussion?.storedPrompt ?? []),
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
          <FileReference relatedFiles={discussion?.relatedFiles ?? []} />
        )}
        {hasReachedRateLimit && (
          <Container
            className="mx-auto mt-3 flex max-w-md flex-col gap-4 text-center text-sm"
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
          nbMessages={(discussion?.storedPrompt ?? []).length}
          additionalButtons={additionalButtons}
        />
      </div>
    </div>
  );
};
