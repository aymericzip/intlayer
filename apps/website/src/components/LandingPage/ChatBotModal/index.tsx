'use client';

import { Button, Loader, Modal } from '@intlayer/design-system';
import { Bot } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { lazy, Suspense, useState, type FC } from 'react';

const ChatBot = lazy(() =>
  import('@components/ChatBot').then((module) => ({ default: module.ChatBot }))
);

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
        className="relative m-auto h-[calc(95vh-100px)] overflow-hidden"
        disableScroll
        hasCloseButton
      >
        {isModalOpen && (
          <Suspense fallback={<Loader />}>
            <ChatBot />
          </Suspense>
        )}
      </Modal>
      <Button
        Icon={Bot}
        className="!fixed bottom-5 right-5 z-50 !rounded-full opacity-70 hover:scale-110"
        color="text"
        size="icon-xl"
        label={button.label.value}
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
};
