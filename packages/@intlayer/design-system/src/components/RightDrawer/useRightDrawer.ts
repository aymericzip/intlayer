'use client';

import { useSyncExternalStore } from 'react';

type DrawerState = Record<string, boolean>;

class DrawerObservable {
  private listeners = new Set<() => void>();
  private drawers: DrawerState = {};

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => {
    return this.drawers;
  };

  open = (key: string) => {
    if (this.drawers[key]) return;
    this.drawers = { ...this.drawers, [key]: true };
    this.emit();
  };

  close = (key: string) => {
    if (!this.drawers[key]) return;
    this.drawers = { ...this.drawers, [key]: false };
    this.emit();
  };

  private emit = () => {
    this.listeners.forEach((listener) => {
      listener();
    });
  };
}

export const drawerManager = new DrawerObservable();

export const useRightDrawer = () => {
  const drawers = useSyncExternalStore(
    drawerManager.subscribe,
    drawerManager.getSnapshot,
    () => ({}) as DrawerState
  );

  return {
    open: drawerManager.open,
    close: drawerManager.close,
    isOpen: (key: string) => !!drawers[key],
  };
};
