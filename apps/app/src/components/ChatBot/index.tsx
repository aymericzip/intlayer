'use client';

import { Link } from '@components/Link/Link';
import { Container, PopoverStatic } from '@intlayer/design-system';
import {
  useAskDocQuestion,
  usePersistedStore,
} from '@intlayer/design-system/hooks';
import { App_Auth_SignIn_Path } from '@intlayer/design-system/routes';
import { InfoIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, type ReactNode, useEffect, useRef, useState } from 'react';
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

    const newDiscussionId = discussion?.discussionId ?? uuid();
    const currentStoredPrompt = discussion?.storedPrompt ?? [];

    setDiscussion((prevDiscussion) => {
      const prevStoredPrompt = prevDiscussion?.storedPrompt ?? [];
      return {
        ...prevDiscussion,
        discussionId: newDiscussionId,
        storedPrompt: [
          ...prevStoredPrompt,
          {
            role: 'user' as const,
            content: newQuestion,
            timestamp: new Date(),
          },
        ],
      } as DiscussionStore;
    });

    const newMessages: ChatCompletionRequestMessage[] = [
      ...currentStoredPrompt,
      {
        role: 'user' as const,
        content: newQuestion,
      },
    ];

    askDocQuestion(
      {
        messages: newMessages,
        discussionId: newDiscussionId,
        onMessage: (chunk: string) =>
          setCurrentResponse((prev) => prev + chunk),
        onDone: (response: AskDocQuestionResult) => {
          const responseData = 'data' in response ? response.data : response;

          if (!responseData) {
            console.error('Invalid response format:', response);
            return;
          }

          setDiscussion((prevDiscussion) => {
            const nextStoredPrompt = [
              ...(prevDiscussion?.storedPrompt ?? []),
              {
                role: 'assistant' as const,
                content: responseData.response,
                timestamp: new Date(),
              },
            ];
            const nextRelatedFiles = [
              ...new Set([
                ...(prevDiscussion?.relatedFiles ?? []),
                ...(responseData.relatedFiles ?? []),
              ]),
            ];

            return {
              ...prevDiscussion,
              storedPrompt: nextStoredPrompt,
              relatedFiles: nextRelatedFiles,
            } as DiscussionStore;
          });
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
          <Container
            className="mx-auto mt-3 flex max-w-md flex-col gap-4 text-center text-sm"
            borderColor="neutral"
            border
            roundedSize="xl"
            padding="md"
          >
            <span>{rateLimitExceededMessage}</span>
            <Link
              href={App_Auth_SignIn_Path}
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
