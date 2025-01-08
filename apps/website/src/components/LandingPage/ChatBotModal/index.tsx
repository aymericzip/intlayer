'use client';

import { ChatBot } from '@components/ChatBot';
import { Button, Container, Modal } from '@intlayer/design-system';
import { Bot } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';

export const ChatBotModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { button } = useIntlayer('chatbot-modal');

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        size="xl"
        onClose={() => setIsModalOpen(false)}
        roundedSize="2xl"
        padding="none"
        className="relative m-auto h-[calc(100vh-100px)] w-full max-w-2xl overflow-hidden"
        disableScroll
      >
        <ChatBot />
      </Modal>
      <Button
        Icon={Bot}
        className="fixed bottom-5 right-5 !rounded-full hover:scale-110"
        color="neutral"
        size="icon-xl"
        label={button.label.value}
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
};
