/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { ChevronLeft, X } from 'lucide-react';
import {
  type ReactNode,
  type FC,
  useEffect,
  useRef,
  type MouseEventHandler,
  RefObject,
} from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDevice } from '../../hooks/useDevice';
import { useScrollBlockage } from '../../hooks/useScrollBlockage';
import { isElementAtTopAndNotCovered } from '../../utils/isElementAtTopAndNotCovered';
import { Button } from '../Button';
import { Container } from '../Container';
import { MaxWidthSmoother } from '../MaxWidthSmoother/index';
import { useRightDrawerStore } from './useRightDrawerStore';

type BackButtonProps = {
  onBack: () => void;
  text?: string;
};

type RightDrawerProps = {
  title?: ReactNode;
  identifier: string;
  children?: ReactNode;
  header?: ReactNode;
  closeOnOutsideClick?: boolean;
  backButton?: BackButtonProps;
  isOpen?: boolean;
  onClose?: () => void;
};

export const RightDrawer: FC<RightDrawerProps> = ({
  title,
  identifier,
  children,
  header,
  closeOnOutsideClick = true,
  backButton,
  isOpen: isOpenProp,
  onClose,
}) => {
  const { isMobile } = useDevice('md');
  const panelRef = useRef<HTMLDivElement>(null);
  const childrenContainerRef = useRef<HTMLDivElement>(null);
  const { close, open, isOpen } = useRightDrawerStore(
    useShallow((s) => ({
      close: () => s.close(identifier),
      open: () => s.open(identifier),
      isOpen: s.isOpen(identifier),
    }))
  );

  useScrollBlockage({
    disableScroll: isOpen,
    key: identifier ? `right_drawer_${identifier}` : 'right_drawer',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      try {
        if (!panelRef.current) return;

        // Check if drawer is open and click outside is enabled
        const isClickAble = isOpen && closeOnOutsideClick;

        // Check if click is outside the drawer panel
        const isClickOutside =
          event.target && !panelRef.current.contains(event.target as Node);

        // Check if event propagation has been stopped
        const isAtTopAndVisible = isElementAtTopAndNotCovered(panelRef.current);

        if (
          (isClickAble && isClickOutside && isAtTopAndVisible) ||
          !event.target
        ) {
          close();
          onClose?.();
        }
      } catch (_e) {
        close();
        onClose?.();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close, onClose, closeOnOutsideClick, identifier]); // Make sure the effect runs only if isOpen or close changes

  useEffect(() => {
    if (isOpenProp !== undefined) {
      if (isOpenProp) {
        open();
      } else {
        close();
        onClose?.();
      }
    }
  }, [close, open, onClose, isOpenProp, identifier]);

  const handleSpareSpaceClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Check if the click trigger the background
    if (e.target !== e.currentTarget) {
      return;
    }

    if (isMobile) {
      close();
      onClose?.();
    }
  };

  return (
    <div className="fixed right-0 top-0 z-50 flex h-full justify-end">
      <MaxWidthSmoother isHidden={!isOpen} align="right">
        <Container
          className="text-text dark:text-text-dark relative flex h-screen w-screen flex-col md:w-[400px]"
          ref={panelRef}
          roundedSize="none"
        >
          <div className="flex flex-col gap-3 p-6">
            <div className="flex justify-between gap-3">
              <div>
                {backButton && (
                  <Button
                    variant="hoverable"
                    color="text"
                    label={backButton.text ?? 'Go back'}
                    onClick={backButton.onBack}
                    Icon={ChevronLeft}
                  >
                    {backButton?.text}
                  </Button>
                )}
              </div>
              <div>
                <Button
                  variant="hoverable"
                  color="text"
                  label="Close"
                  className="ml-auto"
                  onClick={close}
                  Icon={X}
                  size="icon-md"
                />
              </div>
            </div>
            {title && (
              <h2 className="flex items-center justify-center text-lg font-bold">
                {title}
              </h2>
            )}
            {header}
          </div>

          <div className="flex h-full flex-col overflow-y-auto p-2">
            <div
              className="flex-1"
              onClick={handleSpareSpaceClick}
              ref={childrenContainerRef}
            >
              {children}
            </div>
          </div>
        </Container>
      </MaxWidthSmoother>
    </div>
  );
};
