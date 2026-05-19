import { useSyncExternalStore } from 'react';

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
    () => []
  );
