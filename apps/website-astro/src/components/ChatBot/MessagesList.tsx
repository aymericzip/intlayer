import { Loader } from '@intlayer/design-system/loader';
import type { FC } from 'react';
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
};

export const MessagesList: FC<MessagesListProps> = ({
  storedPrompt,
  isLoading,
}) => (
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
        <Loader
          isLoading={isLoading}
          className="sticky bottom-0 left-0 m-auto h-14 w-auto rounded-full p-2"
        />
      ),
    }}
  />
);
