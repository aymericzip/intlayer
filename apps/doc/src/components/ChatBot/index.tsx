'use client';

import { Container, PopoverStatic } from '@intlayer/design-system';
import {
  useAskDocQuestion,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import { App_Auth_SignIn } from '@intlayer/design-system/routes';
import { InfoIcon } from 'lucide-react';
import { type FC, type ReactNode, useEffect, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#/components/Link';
import { FileReference } from './FileReference';
import { FormSection } from './FormSection';
import {
  type ChatCompletionRequestMessage,
  MessagesList,
} from './MessagesList';

const uuid = () => Math.random().toString(36).slice(2);

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
  isLarge?: boolean;
  stateReloaderTrigger?: any;
  isActive?: boolean;
};

type DiscussionStore = {
  discussionId: string;
  storedPrompt: ChatCompletionRequestMessage[];
  relatedFiles: string[];
};

export const ChatBot: FC<ChatBotProps> = ({
  additionalButtons,
  isLarge = true,
  stateReloaderTrigger,
  isActive = false,
}) => {
  const [hasReachedRateLimit, setHasReachedRateLimit] = useState(false);
  const { mutate: askDocQuestion, isPending } = useAskDocQuestion();
  const {
    firstMessageContent,
    rateLimitExceededMessage,
    signInButton,
    disclaimerNote,
  } = useIntlayer('chat');
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
        onError: (errorMessage: any) => {
          if (typeof errorMessage === 'undefined') return;

          let parsedErrors: any[];

          try {
            const raw =
              typeof errorMessage?.message === 'string'
                ? JSON.parse(errorMessage.message)
                : errorMessage;
            parsedErrors = [raw].flat();
          } catch (_e) {
            parsedErrors = [errorMessage].flat();
          }

          parsedErrors.forEach((error) => {
            if (error?.code === 'RATE_LIMIT_EXCEEDED_UNAUTHENTICATED') {
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
        {isLarge && (
          <FileReference relatedFiles={discussion?.relatedFiles ?? []} />
        )}

        {hasReachedRateLimit && (
          <div className="overflow-display relative h-0">
            <Container
              className="absolute bottom-0 left-0 left-1/2 mx-auto mt-3 flex max-w-md -translate-x-1/2 flex-col gap-4 text-center text-sm"
              borderColor="neutral"
              border
              roundedSize="2xl"
              padding="md"
            >
              <span>{rateLimitExceededMessage}</span>
              <Link
                href={App_Auth_SignIn}
                label={signInButton.label.value}
                color="text"
                variant="button-outlined"
              >
                {signInButton.text}
              </Link>
            </Container>
          </div>
        )}

        <FormSection
          askNewQuestion={handleAskNewQuestion}
          clear={handleClear}
          nbMessages={(discussion?.storedPrompt ?? []).length}
          additionalButtons={
            <>
              <PopoverStatic identifier="chat-info">
                <InfoIcon size={18} className="z-50 mr-3 text-neutral" />
                <PopoverStatic.Detail
                  identifier="chat-info"
                  xAlign={isLarge ? 'end' : 'center'}
                  yAlign="above"
                >
                  <p className="min-w-60 max-w-60 p-4 text-neutral text-xs">
                    {disclaimerNote}
                  </p>
                </PopoverStatic.Detail>
              </PopoverStatic>
              {additionalButtons}
            </>
          }
          isActive={isActive}
        />
      </div>
    </div>
  );
};
