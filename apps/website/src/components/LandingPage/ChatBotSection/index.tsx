import { ChatBot } from '@components/ChatBot';
import { Container } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const ChatBotSection: FC = () => {
  const { title } = useIntlayer('chatbot-section');

  return (
    <section className="m-auto flex w-full flex-col items-center justify-center">
      <h2 className="text-neutral dark:text-neutral-dark">{title}</h2>
      <div className="w-full max-w-[1000px] px-10 md:px-20">
        <Container roundedSize="2xl" className="w-full" padding="none">
          <ChatBot />
        </Container>
      </div>
    </section>
  );
};
