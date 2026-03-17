import { CrossFrameStateManager, type MessageKey } from '@intlayer/editor';
import { onDestroy } from 'svelte';
import { readable, writable } from 'svelte/store';
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
  const manager = getEditorStateManager();
  const { emit = true, receive = true } = options;

  const stateManager = new CrossFrameStateManager<S>(key, manager.messenger, {
    emit,
    receive,
    initialValue: initialState,
  });
  stateManager.start();

  const store = writable<S | undefined>(stateManager.value);

  const handler = (e: Event) => store.set((e as CustomEvent<S>).detail);
  stateManager.addEventListener('change', handler);

  try {
    onDestroy(() => {
      stateManager.removeEventListener('change', handler);
      stateManager.stop();
    });
  } catch {
    // Outside component context
  }

  const setState = (value: S) => {
    stateManager.set(value);
  };

  return [store, setState];
};
