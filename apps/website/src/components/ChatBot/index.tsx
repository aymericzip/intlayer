import { useAskDocQuestion } from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { App_Auth_SignIn } from '@intlayer/design-system/routes';
import { InfoIcon } from 'lucide-react';
import { type FC, type ReactNode, useEffect, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { FileReference } from './FileReference';
import { FormSection } from './FormSection';
import {
  type ChatCompletionRequestMessage,
  MessagesList,
} from './MessagesList';

const uuid = () => Math.random().toString(36).slice(2);

/** Error code the backend returns once a signed-out visitor exhausts the chatbot quota. */
const UNAUTHENTICATED_RATE_LIMIT_CODE = 'RATE_LIMIT_EXCEEDED_UNAUTHENTICATED';

/**
 * Whether a chat request failed because the signed-out visitor hit the rate limit.
 * The API client serializes the backend error payload into `Error.message`.
 */
const isUnauthenticatedRateLimitError = (error: unknown): boolean =>
  error instanceof Error &&
  error.message.includes(UNAUTHENTICATED_RATE_LIMIT_CODE);

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
  const [currentReasoning, setCurrentReasoning] = useState('');

  const firstMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: firstMessageContent.content.value,
  };

  const [discussion, setDiscussion, loadDiscussion] = usePersistedStore<
    DiscussionStore | undefined
  >('chat-bot-discussion-store');

  const handleAskNewQuestion = (newQuestion: string) => {
    setCurrentResponse('');
    setCurrentReasoning('');

    const newDiscussionId = discussion?.discussionId ?? uuid();

    setDiscussion(
      (discussion) =>
        ({
          ...discussion,
          discussionId: newDiscussionId,
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
        discussionId: newDiscussionId,
        onMessage: (chunk: string) =>
          setCurrentResponse((prev) => prev + chunk),
        onReasoning: (chunk: string) =>
          setCurrentReasoning((prev) => prev + chunk),
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
          setCurrentReasoning('');
        },
      },
      {
        onSuccess: () => {
          setHasReachedRateLimit(false);
        },
        onError: (error) => {
          setCurrentResponse('');
          setCurrentReasoning('');

          if (isUnauthenticatedRateLimitError(error)) {
            setHasReachedRateLimit(true);
          }
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
    setCurrentReasoning('');
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
            // Thoughts give way to the answer once it starts streaming
            reasoning={currentResponse ? undefined : currentReasoning}
          />
        </div>
      </div>
      <div className="w-full flex-1">
        {isLarge && (
          <FileReference relatedFiles={discussion?.relatedFiles ?? []} />
        )}

        {hasReachedRateLimit && (
          <Container
            className="mx-auto my-3 flex max-w-md flex-col gap-4 text-center text-sm"
            borderColor="neutral"
            border
            roundedSize="2xl"
            padding="md"
            role="alert"
          >
            <span>{rateLimitExceededMessage}</span>
            <Link
              to={App_Auth_SignIn}
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
          userMessages={(discussion?.storedPrompt ?? [])
            .filter((msg) => msg.role === 'user')
            .map((msg) => msg.content as string)}
          additionalButtons={
            <>
              <PopoverStatic identifier="chat-info">
                <InfoIcon
                  size={18}
                  className="z-50 me-3 text-muted-foreground"
                />
                <PopoverStatic.Detail
                  identifier="chat-info"
                  xAlign={isLarge ? 'end' : 'center'}
                  yAlign="above"
                >
                  <p className="max-w-60 min-w-60 p-4 text-xs text-muted-foreground">
                    {disclaimerNote}
                  </p>
                </PopoverStatic.Detail>
              </PopoverStatic>
              {additionalButtons}
            </>
          }
          isActive={isActive}
          isLoading={isPending}
        />
      </div>
    </div>
  );
};
