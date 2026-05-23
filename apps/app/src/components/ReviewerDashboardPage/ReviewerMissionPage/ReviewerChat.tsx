import type { ReviewerMessageAPI } from '@intlayer/backend';
import { Button } from '@intlayer/design-system/button';
import {
  useGetChatHistory,
  useIntlayerOAuth,
  useSendReviewerMessage,
} from '@intlayer/design-system/hooks';
import { Send } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';

type ReviewerChatProps = {
  missionId: string;
  currentUserId: string;
};

export const ReviewerChat: FC<ReviewerChatProps> = ({
  missionId,
  currentUserId,
}) => {
  const { data } = useGetChatHistory(missionId);
  const { mutate: sendMessage, isPending } = useSendReviewerMessage();
  const intlayerOAuth = useIntlayerOAuth();
  const [content, setContent] = useState('');
  const [liveMessages, setLiveMessages] = useState<ReviewerMessageAPI[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const history = data?.data ?? [];

  useEffect(() => {
    setLiveMessages(history);
  }, [history.length]);

  useEffect(() => {
    const url = intlayerOAuth.reviewer.getChatStreamUrl(missionId);
    const es = new EventSource(url, { withCredentials: true });

    es.onmessage = (event) => {
      try {
        const msg: ReviewerMessageAPI = JSON.parse(event.data);
        setLiveMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      } catch {
        // ignore malformed events
      }
    };

    es.onerror = () => es.close();

    eventSourceRef.current = es;
    return () => es.close();
  }, [missionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveMessages.length]);

  const handleSend = () => {
    if (!content.trim()) return;
    const text = content.trim();
    setContent('');
    sendMessage(
      { missionId, content: text },
      {
        onSuccess: (res) => {
          if (res?.data) {
            setLiveMessages((prev) => {
              if (prev.some((m) => m.id === res.data!.id)) return prev;
              return [...prev, res.data!];
            });
          }
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {liveMessages.length === 0 && (
          <p className="py-8 text-center text-neutral text-sm">
            No messages yet. Start the conversation!
          </p>
        )}
        {liveMessages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                  isMe
                    ? 'rounded-br-sm bg-text/10 text-text'
                    : 'rounded-bl-sm border border-neutral/20 bg-card'
                }`}
              >
                <p>{msg.content}</p>
                <p
                  className="mt-0.5 text-[10px] text-neutral"
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-end gap-2 border-neutral/20 border-t p-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type a message..."
          className="flex-1 resize-none rounded-xl border border-neutral/20 bg-card px-3 py-2 text-sm focus:outline-none"
        />
        <Button
          type="button"
          size="icon-md"
          color="text"
          Icon={Send}
          onClick={handleSend}
          disabled={isPending || !content.trim()}
          label="Send message"
        />
      </div>
    </div>
  );
};
