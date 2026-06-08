import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { HeightResizer } from '@intlayer/design-system/height-resizer';
import { useDevice } from '@intlayer/design-system/hooks';
import { KeyboardShortcut } from '@intlayer/design-system/keyboard-shortcut';
import { MaxWidthSmoother } from '@intlayer/design-system/max-width-smoother';
import { Modal } from '@intlayer/design-system/modal';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { SocialNetworks } from '@intlayer/design-system/social-networks';
import { cn } from '@intlayer/design-system/utils';
import { ArrowRightToLine, MoveDiagonal } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ChatBot } from '~/components/ChatBot';
import { NavTitles } from '../NavTitles/NavTitles';

export const AsideNavigation: FC = (props) => {
  const { title, collapseButton } = useIntlayer('aside-navigation');

  const [isHidden, setIsHidden] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isMobile } = useDevice();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isFocus =
        new URLSearchParams(window.location.search).get('focus') === 'true';
      if (isFocus || isMobile) {
        setIsHidden(true);
      }
    }
  }, []);
  const { button } = useIntlayer('chatbot-modal');

  return (
    <>
      <Container
        roundedSize="none"
        transparency="xs"
        className={cn(
          isHidden ? 'top-25' : 'h-full',
          'sticky top-15 rounded-bl-xl',
          'max-md:fixed max-md:top-0 max-md:left-0 max-md:z-50 max-md:h-dvh max-md:w-80 max-md:transition-transform max-md:duration-300',
          isHidden && 'max-md:-translate-x-full'
        )}
        {...props}
      >
        <aside className="relative h-full max-w-80 px-2">
          <Container
            transparency="xs"
            className="sticky top-14 z-10"
            roundedSize="none"
          >
            <div className="relative flex flex-col items-center pt-2">
              <MaxWidthSmoother
                isHidden={isHidden}
                isDisabled={isMobile}
                className="w-full max-w-full"
              >
                <div className="flex h-5 w-full flex-row items-center justify-center gap-5">
                  <SocialNetworks className="flex h-full w-3.5 items-center justify-center" />
                </div>
              </MaxWidthSmoother>
              <div className="relative flex w-full flex-row items-center pt-2">
                <PopoverStatic identifier="aside-nav-collapse">
                  <Button
                    Icon={ArrowRightToLine}
                    size="icon-md"
                    variant="hoverable"
                    color="text"
                    label={collapseButton.label.value}
                    className={cn(
                      'transition-transform',
                      isHidden && 'rotate-180',
                      'max-md:absolute max-md:top-0 max-md:-right-10 max-md:rounded-l-none max-md:bg-card max-md:shadow-md'
                    )}
                    onClick={() => setIsHidden((isHidden) => !isHidden)}
                  />
                  <PopoverStatic.Detail
                    identifier="aside-nav-collapse"
                    xAlign="end"
                  >
                    <KeyboardShortcut
                      shortcut="Alt + ArrowRight"
                      onTriggered={() => setIsHidden((isHidden) => !isHidden)}
                      size="sm"
                    />
                  </PopoverStatic.Detail>
                </PopoverStatic>
                <MaxWidthSmoother
                  isHidden={isHidden}
                  isDisabled={isMobile}
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
              isHidden && 'opacity-0 max-md:opacity-100'
            )}
          >
            <MaxWidthSmoother
              isHidden={isHidden}
              isDisabled={isMobile}
              className="w-full max-w-full"
            >
              <div className="pl-5">
                <NavTitles />
              </div>
              <HeightResizer
                initialHeight={250}
                isDisabled={isMobile}
                className="absolute bottom-0 left-0 size-full"
              >
                <Container
                  className="justify-bottom size-full text-sm"
                  transparency="xs"
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
                    isLarge={false}
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
        <ChatBot stateReloaderTrigger={isModalOpen} isActive={isModalOpen} />
      </Modal>
    </>
  );
};
