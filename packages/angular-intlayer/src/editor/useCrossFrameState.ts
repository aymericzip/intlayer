import { DestroyRef, inject, type Signal, signal } from '@angular/core';
import type { MessageKey } from '@intlayer/types/messageKey';
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

  let disposed = false;
  let cleanupFn: (() => void) | null = null;
  let externalSet: (value: S) => void = (value: S) => stateSignal.set(value);
  let externalPost: () => void = () => {};

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

      const handler = (e: Event) => {
        stateSignal.set((e as CustomEvent<S>).detail);
      };
      stateManager.addEventListener('change', handler);

      externalSet = (value: S) => stateManager.set(value);
      externalPost = () => stateManager.postCurrentValue();

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
    const destroyRef = inject(DestroyRef, { optional: true });
    destroyRef?.onDestroy(() => {
      disposed = true;
      cleanupFn?.();
    });
  } catch {}

  return [
    stateSignal.asReadonly(),
    (value: S) => externalSet(value),
    () => externalPost(),
  ];
};
