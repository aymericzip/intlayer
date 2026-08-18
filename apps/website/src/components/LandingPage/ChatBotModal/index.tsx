import { Button } from '@intlayer/design-system/button';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { Bot } from 'lucide-react';
import { type FC, lazy, Suspense, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

const ChatBot = lazy(() =>
  import('~/components/ChatBot').then((module) => ({ default: module.ChatBot }))
);

export const ChatBotModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // `Modal` keeps its children mounted while closed, so the chat is created on
  // the first open and kept afterwards — unmounting on close would cut its exit
  // animation short.
  const [hasOpenedModal, setHasOpenedModal] = useState(false);
  const { button } = useIntlayer('chatbot-modal');

  const openModal = () => {
    setHasOpenedModal(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        size="xl"
        onClose={() => setIsModalOpen(false)}
        roundedSize="2xl"
        className="relative m-auto h-[calc(95vh-100px)] overflow-hidden"
        disableScroll
        hasCloseButton
      >
        {hasOpenedModal && (
          <Suspense fallback={<Loader />}>
            <ChatBot isActive={isModalOpen} />
          </Suspense>
        )}
      </Modal>
      <Button
        className="fixed! right-5 bottom-5 z-50 rounded-full! hover:scale-110"
        size="icon-xl"
        onClick={openModal}
      >
        <Bot />
      </Button>
    </>
  );
};
