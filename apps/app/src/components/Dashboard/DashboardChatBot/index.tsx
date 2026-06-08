import { useChat } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { useQueryClient } from '@tanstack/react-query';
import { MessageSquare } from 'lucide-react';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIntlayer } from 'react-intlayer';
import { FormSection } from '#components/ChatBot/FormSection';
import {
  type ChatCompletionRequestMessage,
  MessagesList,
} from '#components/ChatBot/MessagesList';
import { useDashboardRightPanel } from '#hooks/useDashboardRightPanel';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate';

const uuid = () => Math.random().toString(36).slice(2);

const DRAWER_ID = 'dashboard-chat';
const STORE_KEY = 'dashboard-chat-discussion-store';

type ChatResult = {
  response: string;
};

type DiscussionStore = {
  discussionId: string;
  storedPrompt: ChatCompletionRequestMessage[];
};

export const DashboardChatBot: FC = () => {
  const {
    firstMessage: firstMessageContent,
    openAiAssistant,
    aiAssistant,
  } = useIntlayer('dashboard-chat-bot');
  const { mutate: sendChat, isPending } = useChat();
  const { open: openPanel, isOpen: checkIsOpen } = useDashboardRightPanel();
  const isOpen = checkIsOpen(DRAWER_ID);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setPortalTarget(document.getElementById('dashboard-right-panel'));
  }, []);
  const [currentResponse, setCurrentResponse] = useState('');
  const navigate = useLocalizedNavigate();
  const queryClient = useQueryClient();

  const firstMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: firstMessageContent.value,
  };

  const [discussion, setDiscussion, loadDiscussion] = usePersistedStore<
    DiscussionStore | undefined
  >(STORE_KEY);

  const handleAction = useCallback(
    (action: { type: string; path?: string }) => {
      if (action.type === 'navigate' && action.path) {
        navigate({ to: action.path as any });
      } else if (action.type === 'invalidate_queries') {
        queryClient.invalidateQueries();
      }
    },
    [navigate, queryClient]
  );

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

    (sendChat as any)(
      {
        messages: newMessages,
        discussionId: newDiscussionId,
        onMessage: (chunk: string) =>
          setCurrentResponse((prev) => prev + chunk),
        onAction: handleAction,
        onDone: (response: ChatResult) => {
          if (!response?.response) return;

          setDiscussion((prevDiscussion) => ({
            ...prevDiscussion,
            discussionId: prevDiscussion?.discussionId ?? newDiscussionId,
            storedPrompt: [
              ...(prevDiscussion?.storedPrompt ?? []),
              {
                role: 'assistant' as const,
                content: response.response,
                timestamp: new Date(),
              },
            ],
          }));
          setCurrentResponse('');
        },
      },
      {
        onError: () => {
          setCurrentResponse('');
        },
      }
    );
  };

  const handleClear = () => {
    setDiscussion(() => ({
      discussionId: uuid(),
      storedPrompt: [],
    }));
    setCurrentResponse('');
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadDiscussion();
    }
  }, []);

  return (
    <>
      <PopoverStatic identifier={DRAWER_ID}>
        <Button
          onClick={() => openPanel(DRAWER_ID)}
          type="button"
          variant="hoverable"
          label={openAiAssistant.value}
          Icon={MessageSquare}
          size="icon-lg"
          isActive={isOpen}
        />
        <PopoverStatic.Detail identifier={DRAWER_ID} xAlign="end">
          <span className="flex gap-4 text-nowrap py-2 pr-2 pl-4 text-neutral text-sm">
            {aiAssistant}
          </span>
        </PopoverStatic.Detail>
      </PopoverStatic>

      {isOpen &&
        portalTarget &&
        createPortal(
          <div className="flex size-full flex-col items-center justify-between overflow-auto">
            <div className="relative flex size-full flex-auto">
              <div className="absolute inset-0 size-full">
                <MessagesList
                  storedPrompt={[
                    firstMessage,
                    ...(discussion?.storedPrompt ?? []),
                    ...(currentResponse
                      ? [
                          {
                            role: 'assistant' as const,
                            content: currentResponse,
                          },
                        ]
                      : []),
                  ]}
                  isLoading={isPending}
                />
              </div>
            </div>
            <div className="w-full flex-1">
              <FormSection
                askNewQuestion={handleAskNewQuestion}
                clear={handleClear}
                nbMessages={(discussion?.storedPrompt ?? []).length}
                userMessages={(discussion?.storedPrompt ?? [])
                  .filter((msg) => msg.role === 'user')
                  .map((msg) => msg.content as string)}
                isActive={isOpen}
              />
            </div>
          </div>,
          portalTarget
        )}
    </>
  );
};
