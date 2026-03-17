import type { MessageKey } from '@intlayer/types/messageKey';
import { onDestroy } from 'svelte';
import { writable } from 'svelte/store';
import { getEditorStateManager } from './communicator';

export type CrossFrameStateOptions = {
  emit?: boolean;
  receive?: boolean;
};

export const useCrossFrameState = <S>(
  key: `${MessageKey}`,
  initialState?: S,
  options: CrossFrameStateOptions = { emit: true, receive: true }
): [ReturnType<typeof writable<S | undefined>>, (value: S) => void] => {
  const { emit = true, receive = true } = options;
  const store = writable<S | undefined>(initialState);

  let disposed = false;
  let cleanupFn: (() => void) | null = null;
  let externalSet: (value: S) => void = (value: S) => store.set(value);

  const manager = getEditorStateManager();

  if (manager) {
    import('@intlayer/editor').then(({ CrossFrameStateManager }) => {
      if (disposed) return;

      const stateManager = new CrossFrameStateManager<S>(
        key,
        manager.messenger,
        {
          emit,
          receive,
          initialValue: initialState,
        }
      );
      stateManager.start();

      const handler = (e: Event) => store.set((e as CustomEvent<S>).detail);
      stateManager.addEventListener('change', handler);

      externalSet = (value: S) => stateManager.set(value);

      cleanupFn = () => {
        stateManager.removeEventListener('change', handler);
        stateManager.stop();
      };

      if (disposed) {
        cleanupFn();
        cleanupFn = null;
      }
    });
  }

  try {
    onDestroy(() => {
      disposed = true;
      cleanupFn?.();
    });
  } catch {
    // Outside component context
  }

  const setState = (value: S) => externalSet(value);

  return [store, setState];
};
