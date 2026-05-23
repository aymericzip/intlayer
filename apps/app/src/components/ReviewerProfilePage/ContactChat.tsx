import type { ReviewerProfileAPI } from '@intlayer/backend';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { useContactReviewer } from '@intlayer/design-system/hooks';
import { AutoSizedTextArea } from '@intlayer/design-system/text-area';
import { Send } from 'lucide-react';
import { type FC, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

type Message = { id: number; text: string; sent: boolean };

type ContactChatProps = {
  reviewer: ReviewerProfileAPI;
};

export const ContactChat: FC<ContactChatProps> = ({ reviewer }) => {
  const content = useIntlayer('contact-chat');

  const { mutate: contact, isPending } = useContactReviewer();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const id = Date.now();
    setMessages((prev) => [...prev, { id, text, sent: false }]);
    setInput('');

    contact(
      { reviewerId: reviewer.id, message: text },
      {
        onSuccess: () => {
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, sent: true } : m))
          );
          setTimeout(
            () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
            50
          );
        },
        onError: () => {
          setMessages((prev) => prev.filter((m) => m.id !== id));
          setInput(text);
        },
      }
    );

    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
      50
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === content.enter.value && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container
      border
      borderColor="neutral"
      roundedSize="2xl"
      transparency="full"
      className="flex flex-1 flex-col overflow-hidden"
    >
      <div className="border-neutral/20 border-b px-4 py-3">
        <p className="font-semibold text-sm">
          {content.contact} {reviewer.name ?? 'reviewer'}
        </p>
        <p className="text-neutral text-xs">
          {content.eachMessageIsForwardedBy}
        </p>
      </div>

      <div className="flex min-h-32 flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="py-4 text-center text-neutral text-xs">
            {content.sendAMessageToStart}
          </p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="flex justify-end">
            <div
              className={`max-w-xs rounded-2xl rounded-br-sm px-4 py-2 text-sm transition-opacity ${
                msg.sent ? 'bg-text/10 text-text' : 'bg-text/5 text-neutral'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-end gap-2 border-neutral/20 border-t p-3">
        <AutoSizedTextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={content.writeAMessage.value}
          className="flex-1 resize-none rounded-xl border border-neutral/20 bg-card px-3 py-2 text-sm focus:outline-none"
        />
        <Button
          type="button"
          size="icon-md"
          color="text"
          Icon={Send}
          onClick={handleSend}
          isLoading={isPending}
          disabled={!input.trim()}
          label={content.sendMessage.value}
        />
      </div>
    </Container>
  );
};
