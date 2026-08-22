import { Button } from '@intlayer/design-system/button';
import { useStickToBottom } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { type FC, memo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ChatBumble, ChatBumbleType } from './ChatBumble';

export type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: Date;
};

/**
 * How many messages stay mounted, and how many more each "show earlier" step
 * reveals. An answer is rendered through `MarkdownRenderer`, which parses the
 * markdown and highlights every code block it holds, so the cost of a message
 * is far from free and a long discussion has to stay bounded.
 */
const MESSAGES_WINDOW_SIZE = 30;

type MessageProps = {
  content: string;
  role: ChatCompletionRequestMessage['role'];
};

/**
 * A single bubble, memoised on the message itself.
 *
 * The parent rebuilds its `storedPrompt` array on every render, and an answer
 * streaming in re-renders it once per chunk. Without this, each chunk would
 * re-parse the markdown of every message on screen rather than of the one
 * being written.
 */
const Message = memo<MessageProps>(({ content, role }) => (
  <div className="pb-4 first:pt-5">
    <ChatBumble
      type={role === 'user' ? ChatBumbleType.QUESTION : ChatBumbleType.ANSWER}
    >
      {content}
    </ChatBumble>
  </div>
));

Message.displayName = 'Message';

export type MessagesListProps = {
  storedPrompt: ChatCompletionRequestMessage[];
  isLoading: boolean;
};

/**
 * Scrolling list of chat messages, pinned to its bottom edge while the user has
 * not scrolled up, and windowed to the most recent messages.
 *
 * The window is a plain slice rather than a virtualiser: a virtualiser has to
 * measure its viewport and its items to decide what to mount, and those reads
 * forced a reflow on every documentation page — the chat panel is mounted in
 * the aside of all of them. Counting messages needs no geometry at all.
 */
export const MessagesList: FC<MessagesListProps> = ({
  storedPrompt,
  isLoading,
}) => {
  const { showEarlierMessagesButton } = useIntlayer('chat');
  const [windowSize, setWindowSize] = useState(MESSAGES_WINDOW_SIZE);
  const { scrollRef, contentRef, unpin } = useStickToBottom<
    HTMLDivElement,
    HTMLDivElement
  >();

  const hiddenCount = Math.max(0, storedPrompt.length - windowSize);

  /*
   * `position` is the rank of the message in the whole discussion rather than
   * in the window, which is what makes it usable as a key: appending a message
   * raises `hiddenCount` by one and lowers every index within the window by
   * one, so the key a message is mounted under never moves.
   */
  const visibleMessages = storedPrompt
    .slice(hiddenCount)
    .map((message, index) => ({ message, position: hiddenCount + index }));

  const showEarlierMessages = () => {
    // The list grows upwards here, so the follow has to let go — otherwise the
    // messages that were just revealed scroll straight out of view again.
    unpin();
    setWindowSize((size) => size + MESSAGES_WINDOW_SIZE);
  };

  return (
    <div
      ref={scrollRef}
      className="size-full overflow-y-auto overflow-x-hidden"
    >
      <div ref={contentRef} className="flex flex-col">
        {hiddenCount > 0 && (
          <Button
            label={showEarlierMessagesButton.label.value}
            variant="link"
            color="text"
            size="sm"
            className="mx-auto mt-5"
            onClick={showEarlierMessages}
          >
            {showEarlierMessagesButton.text}
          </Button>
        )}

        {visibleMessages.map(({ message, position }) => (
          <Message
            key={position}
            content={message.content}
            role={message.role}
          />
        ))}

        <Loader
          isLoading={isLoading}
          className="sticky bottom-0 left-0 m-auto h-14 w-auto rounded-full p-2"
        />
      </div>
    </div>
  );
};
