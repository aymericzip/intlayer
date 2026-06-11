import { Button } from '@intlayer/design-system/button';
import { HeightResizer } from '@intlayer/design-system/height-resizer';
import { useDevice } from '@intlayer/design-system/hooks';
import { Modal } from '@intlayer/design-system/modal';
import { MoveDiagonal } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { ChatBot } from '@/components/ChatBot';
import { NavTitles } from '../NavTitles/NavTitles';

export const AsideNavigation: FC = () => {
  const { title } = useIntlayer('aside-navigation');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isMobile } = useDevice();

  const { button } = useIntlayer('chatbot-modal');

  return (
    <>
      <div className="relative h-full w-70 px-2">
        <div className="sticky top-26 z-10 flex w-full flex-row items-center pt-2">
          <h2 className="ml-3 text-nowrap font-bold text-md text-neutral uppercase">
            {title}
          </h2>

          <div className="absolute bottom-0 left-0 h-8 w-full translate-y-full bg-linear-to-b from-background/90 backdrop-blur" />
        </div>
        <div className="flex h-screen max-h-[calc(100vh-8rem)] w-full flex-1 md:sticky md:top-60 md:pt-0">
          <div className="mt-4 pl-5">
            <NavTitles />
          </div>
          <HeightResizer
            initialHeight={250}
            isDisabled={isMobile}
            className="absolute bottom-0 left-0 size-full bg-background/70 backdrop-blur"
          >
            <div className="justify-bottom size-full text-sm">
              <ChatBot
                additionalButtons={
                  <Button
                    Icon={MoveDiagonal}
                    color="text"
                    size="icon-md"
                    variant="outline"
                    label={button.label.value}
                    onClick={() => setIsModalOpen(true)}
                  />
                }
                isLarge={false}
                stateReloaderTrigger={isModalOpen}
              />
            </div>
          </HeightResizer>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        size="xl"
        onClose={() => setIsModalOpen(false)}
        roundedSize="2xl"
        className="relative m-auto h-[calc(95vh-100px)] overflow-hidden"
        disableScroll
        hasCloseButton
      >
        <ChatBot stateReloaderTrigger={isModalOpen} isActive={isModalOpen} />
      </Modal>
    </>
  );
};
