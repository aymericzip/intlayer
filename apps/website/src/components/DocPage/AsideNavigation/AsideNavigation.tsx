'use client';

import { ChatBot } from '@components/ChatBot';
import {
  Button,
  Container,
  HeightResizer,
  MaxWidthSmoother,
  Modal,
  SocialNetworks,
} from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { ArrowRightToLine, MoveDiagonal } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { NavTitles } from '../NavTitles/NavTitles';

export const AsideNavigation: FC = (props) => {
  const { title, collapseButton } = useIntlayer('aside-navigation');
  const [isHidden, setIsHidden] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { button } = useIntlayer('chatbot-modal');

  return (
    <>
      <Container
        roundedSize="none"
        transparency="sm"
        className={cn(
          isHidden ? 'h-[100px]' : 'h-full',
          'sticky top-[60px] rounded-bl-xl'
        )}
        {...props}
      >
        <aside className="relative h-full max-w-80 px-2">
          <Container
            transparency="sm"
            className="sticky top-14 z-10"
            roundedSize="none"
          >
            <div className="relative flex flex-col items-center pt-2">
              <MaxWidthSmoother
                isHidden={isHidden}
                className="w-full max-w-full"
              >
                <div className="flex h-5 w-full flex-row items-center justify-center gap-5">
                  <SocialNetworks className="flex h-full w-3.5 items-center justify-center" />
                </div>
              </MaxWidthSmoother>
              <div className="relative flex w-full flex-row items-center pt-2">
                <Button
                  Icon={ArrowRightToLine}
                  size="icon-md"
                  variant="hoverable"
                  color="text"
                  label={collapseButton.label.value}
                  className={cn(
                    'transition-transform max-md:hidden',
                    isHidden && 'rotate-180'
                  )}
                  onClick={() => setIsHidden((isHidden) => !isHidden)}
                />
                <MaxWidthSmoother
                  isHidden={isHidden}
                  className="w-full max-w-full"
                >
                  <h2 className="ml-3 text-nowrap font-bold">{title}</h2>
                </MaxWidthSmoother>
                <div className="absolute bottom-0 left-0 h-8 w-full translate-y-full bg-linear-to-b from-card/90 backdrop-blur" />
              </div>
            </div>
          </Container>
          <div
            className={cn(
              'flex h-screen max-h-[calc(100vh-8rem)] w-full flex-1 md:sticky md:top-28 md:pt-0',
              isHidden && 'opacity-0'
            )}
          >
            <MaxWidthSmoother isHidden={isHidden} className="w-full max-w-full">
              <div className="pl-5">
                <NavTitles />
              </div>
              <HeightResizer
                initialHeight={250}
                className="absolute bottom-0 left-0 size-full"
              >
                <Container
                  className="justify-bottom size-full text-sm"
                  transparency="sm"
                >
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
                    displayRelatedFiles={false}
                    stateReloaderTrigger={isModalOpen}
                  />
                </Container>
              </HeightResizer>
            </MaxWidthSmoother>
          </div>
        </aside>
      </Container>
      <Modal
        isOpen={isModalOpen}
        size="xl"
        onClose={() => setIsModalOpen(false)}
        roundedSize="2xl"
        className="relative m-auto h-[calc(95vh-100px)] overflow-hidden"
        disableScroll
        hasCloseButton
      >
        <ChatBot stateReloaderTrigger={isModalOpen} />
      </Modal>
    </>
  );
};
