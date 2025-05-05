'use client';

import { useCallback, useEffect, useState } from 'react';

import { useGetElementOrWindow } from './useGetElementOrWindow';
import { useScrollBlockage } from './useScrollBlockage';

type useScrollDetectionProps = {
  isEnabled?: boolean;
  delta?: number; // how much user has to scroll to trigger the event
  deltaFromTop?: number; // how much user has to scroll from top to detect if the user has been scrolled
  onScrollDown?: (e: WheelEvent) => void;
  onScrollUp?: (e: WheelEvent) => void;
  element?: HTMLElement; // The element to detect the scroll on. If not defined, the window.document.body will be used
};

export const useScrollDetection = (props?: useScrollDetectionProps) => {
  const {
    isEnabled = true,
    delta = 5,
    deltaFromTop = 0,
    onScrollDown,
    onScrollUp,
    element,
  } = props ?? {};

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  const { isScrollBlocked } = useScrollBlockage();
  const containerElement = useGetElementOrWindow(element);

  const onMobileMove = useCallback(
    (event: globalThis.TouchEvent) => {
      const startY = event.touches?.[0]?.clientY ?? 0;

      const onMove = (event: globalThis.TouchEvent) => {
        if (isEnabled) {
          const currentY = event.touches?.[0]?.clientY ?? 0;
          const deltaY = startY - currentY;

          setIsScrolled(deltaY > 0);

          containerElement?.removeEventListener('touchmove', onMove);
        }
      };

      containerElement?.addEventListener('touchmove', onMove);
    },
    [isEnabled, containerElement]
  );

  const onScroll = useCallback(
    (e: WheelEvent) => {
      const isScrolledDown = e.deltaY > 0;

      if (isEnabled && !isScrollBlocked && isScrollable) {
        const isDeTected = Math.abs(e.deltaY) > Math.abs(delta);

        if (isDeTected) {
          if (isScrolledDown) {
            onScrollDown?.(e);
          } else {
            onScrollUp?.(e);
          }
        }

        setIsScrolled(window.scrollY > deltaFromTop);
      }
    },
    [isEnabled, isScrollBlocked, isScrollable]
  );

  useEffect(() => {
    if (isEnabled) {
      containerElement?.addEventListener('wheel', onScroll, { passive: true });
      containerElement?.addEventListener('touchstart', onMobileMove, {
        passive: true,
      });
    } else {
      setIsScrolled(false);
    }

    return () => {
      containerElement?.removeEventListener('wheel', onScroll);
      containerElement?.removeEventListener('touchstart', onMobileMove);
    };
  }, [isEnabled, onScroll, onMobileMove, containerElement]);

  useEffect(() => {
    const isScrollable = window.innerHeight < window.document.body.scrollHeight;

    setIsScrollable(isScrollable);
  }, []);

  return { isScrolled, isScrollable };
};
