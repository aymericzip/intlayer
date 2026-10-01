import { Button } from '@intlayer/design-system/button';
import { HeightResizer } from '@intlayer/design-system/height-resizer';
import { useDevice } from '@intlayer/design-system/hooks';
import { Modal } from '@intlayer/design-system/modal';
import { cn } from '@intlayer/design-system/utils';
import { MoveDiagonal } from 'lucide-react';
import { type FC, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { NavTitles } from '../NavTitles/NavTitles';

const ChatBot = lazy(() =>
  import('~/components/ChatBot').then((module) => ({
    default: module.ChatBot,
  }))
);

/** Height of the chat panel until the user resizes it */
const CHAT_INITIAL_HEIGHT = 250;
/** Lets the nav finish its smooth scroll before deciding to hide the chat */
const CHAT_VISIBILITY_DELAY_MS = 300;

export const AsideNavigation: FC = () => {
  const { title } = useIntlayer('aside-navigation');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasOpenedModal, setHasOpenedModal] = useState(false);

  const openModal = () => {
    setHasOpenedModal(true);
    setIsModalOpen(true);
  };

  const { isMobile } = useDevice();

  const navigationAreaRef = useRef<HTMLDivElement>(null);
  const [activeLink, setActiveLink] = useState<HTMLElement | null>(null);
  const [hasResizedChat, setHasResizedChat] = useState(false);
  const [isChatHidden, setIsChatHidden] = useState(false);

  /**
   * Slides the chat out while it covers the active nav link (e.g. the last
   * title of the page, which the list cannot scroll above the chat).
   * Skipped once the user resized the chat: they chose its size.
   */
  useEffect(() => {
    const navigationArea = navigationAreaRef.current;

    if (!activeLink || !navigationArea || hasResizedChat) {
      setIsChatHidden(false);
      return;
    }

    let visibilityTimeout: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(visibilityTimeout);
        const isCoveredByChat = entry.intersectionRatio < 1;
        visibilityTimeout = setTimeout(
          () => setIsChatHidden(isCoveredByChat),
          CHAT_VISIBILITY_DELAY_MS
        );
      },
      {
        root: navigationArea,
        // Visible area = navigation area minus the chat overlay
        rootMargin: `0px 0px -${CHAT_INITIAL_HEIGHT}px 0px`,
        threshold: [0, 1],
      }
    );

    observer.observe(activeLink);

    return () => {
      clearTimeout(visibilityTimeout);
      observer.disconnect();
    };
  }, [activeLink, hasResizedChat]);

  const { button } = useIntlayer('chatbot-modal');

  return (
    <>
      <div className="relative flex min-h-0 w-70 flex-1 flex-col">
        <div className="relative z-10 mt-10 flex w-full flex-row items-center pt-2">
          <h2 className="ms-3 text-nowrap font-mono text-foreground text-sm uppercase">
            {title}
          </h2>
        </div>
        <div
          ref={navigationAreaRef}
          className="relative flex min-h-0 w-full flex-1 overflow-hidden rounded-2xl md:pt-0"
        >
          <div className="mt-4 flex ps-3">
            <NavTitles onActiveLinkChange={setActiveLink} />
          </div>
          {/* Slides the chat out without slowing the resizer's own height transition */}
          <div
            inert={isChatHidden}
            className={cn(
              'pointer-events-none absolute inset-0 transition-transform duration-500 ease-in-out',
              isChatHidden && 'translate-y-full'
            )}
          >
            <HeightResizer
              initialHeight={CHAT_INITIAL_HEIGHT}
              isDisabled={isMobile}
              onHeightChange={() => setHasResizedChat(true)}
              className="pointer-events-auto absolute inset-s-0 bottom-0 size-full bg-background"
            >
              <div className="justify-bottom size-full text-sm">
                <Suspense
                  fallback={
                    <div className="flex size-full items-center justify-center p-4">
                      <div className="size-full animate-pulse rounded-xl bg-neutral/10" />
                    </div>
                  }
                >
                  <ChatBot
                    additionalButtons={
                      <Button
                        Icon={MoveDiagonal}
                        color="text"
                        size="icon-md"
                        variant="outline"
                        label={button.label.value}
                        onClick={openModal}
                      />
                    }
                    isLarge={false}
                    stateReloaderTrigger={isModalOpen}
                  />
                </Suspense>
              </div>
            </HeightResizer>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        size="xl"
        onClose={() => setIsModalOpen(false)}
        roundedSize="2xl"
        className="relative m-auto h-[calc(95vh-100px)] overflow-hidden border bg-background blur-none backdrop-blur-none"
        disableScroll
        hasCloseButton
      >
        {hasOpenedModal && (
          <Suspense
            fallback={
              <div className="flex size-full items-center justify-center p-4">
                <div className="size-full animate-pulse rounded-xl bg-neutral/10" />
              </div>
            }
          >
            <ChatBot
              stateReloaderTrigger={isModalOpen}
              isActive={isModalOpen}
            />
          </Suspense>
        )}
      </Modal>
    </>
  );
};
