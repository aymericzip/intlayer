import { useSyncExternalStore } from 'react';

/**
 * Snapshot handed to the server render and to hydration. It has to be the same
 * reference on every call, otherwise `useSyncExternalStore` sees a new value
 * each render and loops.
 */
const SERVER_KEYS: string[] = [];

class DisplayedKeysObservable {
  private listeners = new Set<() => void>();
  private state: string[] = [];

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): string[] => this.state;

  getServerSnapshot = (): string[] => SERVER_KEYS;

  setKeys = (keys: string[]) => {
    if (
      keys.length === this.state.length &&
      keys.every((k, i) => k === this.state[i])
    )
      return;
    this.state = keys;
    this.listeners.forEach((listener) => {
      listener();
    });
  };
}

export const visualEditorKeysManager = new DisplayedKeysObservable();

export const useVisualEditorKeys = (): string[] =>
  useSyncExternalStore(
    visualEditorKeysManager.subscribe,
    visualEditorKeysManager.getSnapshot,
    visualEditorKeysManager.getServerSnapshot
  );
