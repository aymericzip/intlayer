import { Button } from '@intlayer/design-system/button';
import { ClickOutsideDiv } from '@intlayer/design-system/click-outside-div';
import { Container } from '@intlayer/design-system/container';
import { useDevice, usePersistedStore } from '@intlayer/design-system/hooks';
import { KeyboardShortcut } from '@intlayer/design-system/keyboard-shortcut';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { cn } from '@intlayer/design-system/utils';
import { ArrowLeftToLine } from 'lucide-react';
import { type FC, type ReactNode, useEffect } from 'react';
import { SearchTrigger } from '~/components/DocPage/Search/SearchTrigger';
import { FrameworkFilter } from './FrameworkFilter';

export type NavDrawerProps = {
  /** Identifier prefix used for popover keys, IDs and aria attributes (e.g. 'doc-nav' or 'blog-nav') */
  identifier: string;
  collapseLabel: string;
  selectedFramework: string[] | null;
  onSelectFramework: (ids: string[] | null) => void;
  defaultIsHidden?: boolean | undefined;
  storageKey?: string;
  checkFocusParam?: boolean;
  children: ReactNode;
};

export const NavDrawer: FC<NavDrawerProps> = ({
  identifier,
  collapseLabel,
  selectedFramework,
  onSelectFramework,
  defaultIsHidden,
  storageKey,
  checkFocusParam = true,
  children,
}) => {
  const { isMobile } = useDevice();
  const storeKey = storageKey ?? `${identifier}-is-hidden`;
  const [isHidden, setIsHidden] = usePersistedStore<boolean | undefined>(
    storeKey,
    defaultIsHidden
  );

  useEffect(() => {
    if (checkFocusParam && typeof window !== 'undefined') {
      const isFocus =
        new URLSearchParams(window.location.search).get('focus') === 'true';
      if (isFocus) {
        setIsHidden(true);
      }
    }
  }, [checkFocusParam, setIsHidden]);

  const contentId = `${identifier}-content`;
  const expandIdentifier = `${identifier}-expand`;
  const collapseIdentifier = `${identifier}-collapse`;

  return (
    <>
      {isHidden !== false && (
        <div
          className={cn(
            'fixed top-20 left-2 z-30 flex flex-col gap-1 md:left-4',
            // Undecided: the panel is open on desktop, so this belongs to mobile only.
            isHidden === undefined && 'md:hidden'
          )}
        >
          <SearchTrigger isMini />
          <PopoverStatic identifier={expandIdentifier}>
            <Button
              Icon={ArrowLeftToLine}
              size="icon-md"
              variant="hoverable"
              color="text"
              label={collapseLabel}
              aria-expanded={false}
              aria-controls={contentId}
              className="rotate-180"
              onClick={() => setIsHidden(false)}
            />
            <PopoverStatic.Detail identifier={expandIdentifier}>
              <KeyboardShortcut
                shortcut="Alt + ArrowLeft"
                onTriggered={() => setIsHidden(false)}
                disabled={isHidden === undefined}
                size="sm"
              />
            </PopoverStatic.Detail>
          </PopoverStatic>
        </div>
      )}
      <ClickOutsideDiv
        className={cn(
          'relative top-0 left-0 z-40 flex h-full justify-end max-md:fixed',
          'max-md:transition-transform max-md:duration-300 max-md:ease-in-out',
          isHidden === false
            ? 'max-md:translate-x-0'
            : 'max-md:pointer-events-none max-md:-translate-x-full'
        )}
        onClickOutSide={() => {
          if (isMobile) {
            setIsHidden(true);
          }
        }}
      >
        <Container
          className={cn(
            isHidden === undefined
              ? 'max-md:top-25 md:h-full'
              : isHidden
                ? 'top-25'
                : 'h-full',
            'sticky top-15 rounded-br-2xl'
          )}
          roundedSize="none"
          transparency="xs"
        >
          <div className="relative h-full max-w-80">
            {/* The content keeps a fixed width and only the clipping wrapper is
                animated, so nothing re-lays-out during the transition. */}
            <div
              id={contentId}
              className={cn(
                'h-full overflow-hidden transition-[width] duration-500 ease-in-out',
                isHidden === undefined
                  ? 'max-md:invisible max-md:w-0 md:visible md:w-80'
                  : isHidden
                    ? 'w-0'
                    : 'w-80'
              )}
              aria-hidden={Boolean(isHidden)}
              inert={isHidden ? true : undefined}
            >
              <div className="relative h-full w-80 overflow-hidden max-md:mt-17">
                <Container
                  transparency="xs"
                  className="z-10 m-auto pt-1 lg:pt-4"
                  roundedSize="none"
                >
                  <div className="relative m-auto flex w-full flex-row items-center justify-center gap-2 px-2">
                    <FrameworkFilter
                      selected={selectedFramework}
                      onSelect={onSelectFramework}
                    />
                    <SearchTrigger isShortcutDisabled={Boolean(isHidden)} />
                    <PopoverStatic identifier={collapseIdentifier}>
                      <Button
                        Icon={ArrowLeftToLine}
                        size="icon-md"
                        variant="hoverable"
                        color="text"
                        label={collapseLabel}
                        aria-expanded={!isHidden}
                        aria-controls={contentId}
                        onClick={() => setIsHidden(true)}
                      />
                      <PopoverStatic.Detail identifier={collapseIdentifier}>
                        <KeyboardShortcut
                          shortcut="Alt + ArrowLeft"
                          onTriggered={() => setIsHidden(true)}
                          disabled={Boolean(isHidden)}
                          size="sm"
                        />
                      </PopoverStatic.Detail>
                    </PopoverStatic>
                    <div className="absolute bottom-0 left-0 h-8 w-full translate-y-full bg-linear-to-b from-card/90 backdrop-blur" />
                  </div>
                </Container>

                {children}
              </div>
            </div>
          </div>
        </Container>
      </ClickOutsideDiv>
    </>
  );
};
