'use client';

import { ChevronLeft, X } from 'lucide-react';
import {
  type FC,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { useDevice } from '../../hooks/useDevice';
import { useScrollBlockage } from '../../hooks/useScrollBlockage';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { Container } from '../Container';
import { KeyboardShortcut } from '../KeyboardShortcut';
import { MaxWidthSmoother } from '../MaxWidthSmoother/index';
import { Popover } from '../Popover';
import { isElementAtTopAndNotCovered } from './isElementAtTopAndNotCovered';
import { useRightDrawerStore } from './useRightDrawerStore';

/**
 * Configuration for the back button functionality in the RightDrawer
 *
 * @interface BackButtonProps
 */
type BackButtonProps = {
  /** Callback function triggered when the back button is clicked */
  onBack: () => void;
  /** Optional custom text for the back buttoDefaults to "Go back" if not provided */
  text?: string;
};

/**
 * Props configuration for the RightDrawer component
 *
 * @interface RightDrawerProps
 */
type RightDrawerProps = {
  /**
   * Title displayed in the drawer header
   */
  title?: ReactNode;

  /**
   * Unique identifier for the drawer instancRequired for store management
   */
  identifier: string;

  /** The content to be displayed inside the drawer */
  children?: ReactNode;

  /**
   * Optional header content displayed below the title
   */
  header?: ReactNode;

  /**
   * Optional footer content pinned to the bottom of the drawer
   */
  footer?: ReactNode;

  /**
   * Whether the drawer should close when clicking outside of it
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * Configuration for an optional back button in the drawer header
   */
  backButton?: BackButtonProps;

  /**
   * External control for the open statWhen provided, overrides internal store state
   */
  isOpen?: boolean;

  /**
   * Callback function triggered when the drawer is closed
   */
  onClose?: () => void;
};

export const RightDrawer: FC<RightDrawerProps> = ({
  title,
  identifier,
  children,
  header,
  footer,
  closeOnOutsideClick = true,
  backButton,
  isOpen: isOpenProp,
  onClose,
}) => {
  const content = useIntlayer('right-drawer');
  const { isMobile } = useDevice('md');
  const panelRef = useRef<HTMLDivElement>(null);
  const childrenContainerRef = useRef<HTMLDivElement>(null);
  const openDrawer = useRightDrawerStore((s) => s.open);
  const closeDrawer = useRightDrawerStore((s) => s.close);
  const storeIsOpen = useRightDrawerStore((s) => s.isOpen(identifier));
  const isOpen = useRightDrawerStore((s) => s.isOpen(identifier));

  useScrollBlockage({
    disableScroll: isOpen,
    key: identifier ? `right_drawer_${identifier}` : 'right_drawer',
  });

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      try {
        if (!panelRef.current) return;

        const isClickAble = isOpen && closeOnOutsideClick;
        const isClickOutside =
          event.target && !panelRef.current.contains(event.target as Node);
        const isAtTopAndVisible = isElementAtTopAndNotCovered(panelRef.current);

        if (
          (isClickAble && isClickOutside && isAtTopAndVisible) ||
          !event.target
        ) {
          closeDrawer(identifier);
          onClose?.();
        }
      } catch (_e) {
        closeDrawer(identifier);
        onClose?.();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeDrawer, onClose, closeOnOutsideClick, identifier]);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (isOpenProp === undefined) return;
    if (isOpenProp === storeIsOpen) return;

    if (isOpenProp) {
      openDrawer(identifier);
    } else {
      closeDrawer(identifier);
      onCloseRef.current?.();
    }
  }, [isOpenProp, storeIsOpen, identifier, openDrawer, closeDrawer]);

  const handleSpareSpaceClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    if (isMobile) {
      closeDrawer(identifier);
      onClose?.();
    }
  };

  // Handle Keyboard on Spare Space (Linter Fix)
  const handleSpareSpaceKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;

    // Allow closing via Enter or Space if focused on the spare area
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isMobile) {
        closeDrawer(identifier);
        onClose?.();
      }
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 flex h-full justify-end">
      <MaxWidthSmoother isHidden={!isOpen} align="right">
        <Container
          className="relative flex h-screen w-screen flex-col text-text md:w-[400px]"
          ref={panelRef}
          roundedSize="none"
        >
          {/* Header */}
          <div className="flex shrink-0 flex-col gap-3 px-6 pt-6">
            <div className="flex justify-between gap-3">
              <div>
                {backButton && (
                  <Button
                    variant={ButtonVariant.HOVERABLE}
                    color={ButtonColor.TEXT}
                    label={backButton.text ?? content.goBack.value}
                    onClick={backButton.onBack}
                    Icon={ChevronLeft}
                  >
                    {backButton?.text}
                  </Button>
                )}
              </div>
              <div>
                <Popover identifier="close-drawer">
                  <Button
                    variant={ButtonVariant.HOVERABLE}
                    color={ButtonColor.TEXT}
                    label="Close"
                    className="ml-auto"
                    onClick={() => {
                      closeDrawer(identifier);
                      onClose?.();
                    }}
                    Icon={X}
                    size={ButtonSize.ICON_MD}
                  />

                  <Popover.Detail identifier="close-drawer">
                    <div className="flex items-center gap-2 p-2">
                      <span className="whitespace-nowrap text-neutral text-xs">
                        {content.closeDrawer}
                      </span>
                      <KeyboardShortcut
                        shortcut="Escape"
                        size="sm"
                        onTriggered={() => {
                          closeDrawer(identifier);
                          onClose?.();
                        }}
                      />
                    </div>
                  </Popover.Detail>
                </Popover>
              </div>
            </div>
            {title && (
              <h2 className="flex items-center justify-center font-bold text-lg">
                {title}
              </h2>
            )}
            {header}
          </div>

          {/* Body */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-2">
            {/** biome-ignore lint/a11y/useSemanticElements: This div is used to handle the spare space click and keydown events */}
            <div
              className="flex flex-1 flex-col outline-none"
              onClick={handleSpareSpaceClick}
              onKeyDown={handleSpareSpaceKeyDown}
              ref={childrenContainerRef}
              role="button" // Semantically acts as a button area
              tabIndex={0} // Makes it focusable to receive key events
            >
              {children}
            </div>
          </div>

          {/* Footer */}
          {footer && <div className="shrink-0">{footer}</div>}
        </Container>
      </MaxWidthSmoother>
    </div>
  );
};
