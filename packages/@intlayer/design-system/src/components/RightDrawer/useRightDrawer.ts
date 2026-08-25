'use client';

import { useCallback, useSyncExternalStore } from 'react';

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

  isOpen = (key: string) => Boolean(this.drawers[key]);

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

  set = (states: DrawerState) => {
    let changed = false;
    const newDrawers = { ...this.drawers };

    for (const [key, value] of Object.entries(states)) {
      if (newDrawers[key] !== value) {
        newDrawers[key] = value;
        changed = true;
      }
    }

    if (changed) {
      this.drawers = newDrawers;
      this.emit();
    }
  };

  private emit = () => {
    this.listeners.forEach((listener) => {
      listener();
    });
  };
}

export const drawerManager = new DrawerObservable();

/**
 * Actions to drive any drawer, detached from the store snapshot.
 */
type RightDrawerActions = {
  open: (key: string) => void;
  close: (key: string) => void;
  set: (states: DrawerState) => void;
};

const rightDrawerActions: RightDrawerActions = {
  open: drawerManager.open,
  close: drawerManager.close,
  set: drawerManager.set,
};

const getServerSnapshot = () => false;

/**
 * Returns the drawer actions without subscribing to the store.
 *
 * Prefer it over {@link useRightDrawer} in components that only need to open,
 * close or set drawers: they then no longer re-render every time an unrelated
 * drawer toggles.
 */
export const useRightDrawerActions = (): RightDrawerActions =>
  rightDrawerActions;

/**
 * Subscribes to the open state of a single drawer.
 *
 * The snapshot is a boolean, so a component only re-renders when its own
 * drawer toggles, instead of on every change of the shared drawer record.
 *
 * @param identifier - Identifier of the drawer to watch
 */
export const useIsRightDrawerOpen = (identifier: string): boolean => {
  const getSnapshot = useCallback(
    () => drawerManager.isOpen(identifier),
    [identifier]
  );

  return useSyncExternalStore(
    drawerManager.subscribe,
    getSnapshot,
    getServerSnapshot
  );
};

/**
 * Gives access to the whole drawer record.
 *
 * Any change to any drawer re-renders the consumer. When only one drawer
 * matters, use {@link useIsRightDrawerOpen}; when only the actions matter, use
 * {@link useRightDrawerActions}.
 */
export const useRightDrawer = () => {
  const drawers = useSyncExternalStore(
    drawerManager.subscribe,
    drawerManager.getSnapshot,
    () => ({}) as DrawerState
  );

  return {
    ...rightDrawerActions,
    isOpen: (key: string) => !!drawers[key],
  };
};
