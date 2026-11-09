import { Loader } from '@intlayer/design-system/loader';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Virtuoso } from 'react-virtuoso';
import { ChatBumble, ChatBumbleType } from './ChatBumble';

export type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
};

export type MessagesListProps = {
  storedPrompt: ChatCompletionRequestMessage[];
  isLoading: boolean;
  /** Summarized reasoning of the answer being generated, shown while it streams. */
  reasoning?: string;
};

export const MessagesList: FC<MessagesListProps> = ({
  storedPrompt,
  isLoading,
  reasoning,
}) => {
  const { thinkingLabel } = useIntlayer('chat');

  return (
    <Virtuoso
      data={storedPrompt}
      followOutput="smooth"
      initialTopMostItemIndex={Math.max(0, storedPrompt.length - 1)}
      itemContent={(_index, message) => (
        <div className="pb-4 first:pt-5">
          <ChatBumble
            type={
              message.role === 'user'
                ? ChatBumbleType.QUESTION
                : ChatBumbleType.ANSWER
            }
          >
            {message.content}
          </ChatBumble>
        </div>
      )}
      components={{
        Footer: () => (
          <>
            {reasoning && (
              <details open className="mb-4 text-xs text-neutral">
                <summary className="cursor-pointer select-none">
                  {thinkingLabel}
                </summary>
                <p className="mt-2 border-s-2 border-neutral/30 ps-3 whitespace-pre-wrap">
                  {reasoning}
                </p>
              </details>
            )}
            <Loader
              isLoading={isLoading}
              className="sticky inset-s-0 bottom-0 m-auto h-14 w-auto rounded-full p-2"
            />
          </>
        ),
      }}
    />
  );
};
