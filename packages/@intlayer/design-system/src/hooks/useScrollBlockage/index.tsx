'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { useGetElementOrWindow } from '../useGetElementOrWindow';

import { scrollBlockageManager } from './useScrollBlockageStore';

type useScrollBlockagePropsReadOnly = {
  disableScroll: undefined;
  key: undefined;
  element?: HTMLElement; // The element to block the scroll. If not defined, the window will be used
};

type useScrollBlockageProps = {
  disableScroll: boolean;
  key: string; // The key to identify the blockage to avoid conflicts. Required if disableScroll is defined
  element?: HTMLElement; // The element to block the scroll. If not defined, the window will be used
};

const getServerSnapshot = () => false;

export const useScrollBlockage = (
  props?: useScrollBlockageProps | useScrollBlockagePropsReadOnly
) => {
  const {
    disableScroll = false,
    element,
    key = 'unnamed_blocker',
  } = props ?? {};

  const containerElement = useGetElementOrWindow(element);

  useEffect(() => {
    const el = element ?? window.document.body;

    if (disableScroll) {
      scrollBlockageManager.addBlockage(key, el);
    } else {
      scrollBlockageManager.removeBlockage(key, el);
    }

    return () => {
      scrollBlockageManager.removeBlockage(key, el);
    };
  }, [disableScroll, element, key]);

  // Subscribing to a boolean instead of the blocker list keeps the consumer
  // from re-rendering when an unrelated element gets blocked or unblocked.
  const getIsScrollBlocked = useCallback(
    () =>
      containerElement
        ? scrollBlockageManager.isElementScrollBlocked(containerElement)
        : false,
    [containerElement]
  );

  const isScrollBlocked = useSyncExternalStore(
    scrollBlockageManager.subscribe,
    getIsScrollBlocked,
    getServerSnapshot
  );

  return { isScrollBlocked };
};
