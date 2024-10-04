/* eslint-disable sonarjs/mouse-events-a11y */
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
} from 'react';
import { useDevice } from '../../hooks/useDevice';
import { useScrollBlockage } from '../../hooks/useScrollBlockage';
import { isElementAtTopAndNotCovered } from '../../utils/isElementAtTopAndNotCovered';
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
};

export const RightDrawer: FC<RightDrawerProps> = ({
  title,
  identifier,
  children,
  header,
  closeOnOutsideClick = true,
  backButton,
}) => {
  const { isMobile } = useDevice('md');
  const panelRef = useRef<HTMLDivElement>(null);
  const childrenContainerRef = useRef<HTMLDivElement>(null);
  const { isOpen, close } = useRightDrawerStore(identifier)();

  useScrollBlockage({
    disableScroll: isOpen,
    key: identifier ? 'right_drawer' : 'right_drawer_${identifier}',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!panelRef.current) return;

      // Check if drawer is open and click outside is enabled
      const isClickAble = isOpen && closeOnOutsideClick;
      // Check if click is outside the drawer panel
      const isClickOutside = !panelRef.current.contains(event.target as Node);
      // Check if event propagation has been stopped
      const isAtTopAndVisible = isElementAtTopAndNotCovered(panelRef.current);

      if (isClickAble && isClickOutside && isAtTopAndVisible) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close, closeOnOutsideClick]); // Make sure the effect runs only if isOpen or close changes

  const handleSpareSpaceClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Check if the click trigger the background
    if (e.target !== e.currentTarget) {
      return;
    }

    if (isMobile) {
      close();
    }
  };

  return (
    <div className="fixed right-0 top-0 z-50 flex h-full justify-end">
      <MaxWidthSmoother isHidden={!isOpen} align="right">
        <Container
          className="text-text dark:text-text-dark relative  flex h-screen w-screen flex-col md:w-[400px]"
          ref={panelRef}
          roundedSize="none"
        >
          <div className="flex flex-col gap-3 p-6">
            <div className="flex justify-between gap-3">
              <div>
                {backButton && (
                  <button
                    className="flex cursor-pointer flex-row items-center gap-1 text-left"
                    onClick={backButton.onBack}
                  >
                    <ChevronLeft />
                    {backButton?.text}
                  </button>
                )}
              </div>
              <X className="ml-auto cursor-pointer" onClick={close} />
            </div>
            <h2 className="flex items-center justify-center text-lg font-bold">
              {title}
            </h2>
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
