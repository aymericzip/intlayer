'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGetElementOrWindow } from '../useGetElementOrWindow';

import { useScrollBlockageStore } from './useScrollBlockageStore';

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

export const useScrollBlockage = (
  props?: useScrollBlockageProps | useScrollBlockagePropsReadOnly
) => {
  const {
    disableScroll = false,
    element,
    key = 'unnamed_blocker',
  } = props ?? {};

  const { isElementScrollBlocked, addBlockage, removeBlockage } =
    useScrollBlockageStore(
      useShallow((s) => ({
        isElementScrollBlocked: s.isElementScrollBlocked,
        addBlockage: s.addBlockage,
        removeBlockage: s.removeBlockage,
      }))
    );

  const containerElement = useGetElementOrWindow(element);

  useEffect(() => {
    const el = element ?? window.document.body;

    if (disableScroll) {
      addBlockage(key, el);
    } else {
      removeBlockage(key, el);
    }
  }, [addBlockage, disableScroll, element, key, removeBlockage]);

  const isScrollBlocked = containerElement
    ? isElementScrollBlocked(containerElement)
    : false;

  return { isScrollBlocked };
};
