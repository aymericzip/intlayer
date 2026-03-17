import { DestroyRef, inject, type Signal, signal } from '@angular/core';
import { CrossFrameStateManager, type MessageKey } from '@intlayer/editor';
import { getEditorStateManager } from './installIntlayerEditor';

export type CrossFrameStateOptions = {
  emit?: boolean;
  receive?: boolean;
};

export const useCrossFrameState = <S>(
  key: `${MessageKey}`,
  initialState?: S,
  options: CrossFrameStateOptions = { emit: true, receive: true }
): [Signal<S | undefined>, (value: S) => void, () => void] => {
  const manager = getEditorStateManager();
  const { emit = true, receive = true } = options;
  const stateSignal = signal<S | undefined>(initialState);

  if (manager) {
    const stateManager = new CrossFrameStateManager<S>(key, manager.messenger, {
      emit,
      receive,
      initialValue: initialState,
    });
    stateManager.start();

    const handler = (e: Event) => {
      stateSignal.set((e as CustomEvent<S>).detail);
    };
    stateManager.addEventListener('change', handler);

    try {
      const destroyRef = inject(DestroyRef, { optional: true });
      destroyRef?.onDestroy(() => {
        stateManager.removeEventListener('change', handler);
        stateManager.stop();
      });
    } catch {}

    const setState = (value: S) => stateManager.set(value);
    const postState = () => stateManager.postCurrentValue();

    return [stateSignal.asReadonly(), setState, postState];
  }

  return [
    stateSignal.asReadonly(),
    (value: S) => stateSignal.set(value),
    () => {},
  ];
};
