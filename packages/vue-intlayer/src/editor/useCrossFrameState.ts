import type { MessageKey } from '@intlayer/types/messageKey';
import { inject, onScopeDispose, type Ref, ref } from 'vue';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

export type CrossFrameStateOptions = {
  emit?: boolean;
  receive?: boolean;
};

export const useCrossFrameState = <S>(
  key: `${MessageKey}`,
  initialState?: S,
  options: CrossFrameStateOptions = { emit: true, receive: true }
): [Ref<S | undefined>, (value: S) => void, () => void] => {
  const manager =
    inject<ReturnType<typeof getEditorStateManager>>(
      INTLAYER_EDITOR_MANAGER_SYMBOL
    ) ?? getEditorStateManager();

  const { emit = true, receive = true } = options;
  const stateRef = ref<S | undefined>(initialState) as Ref<S | undefined>;

  let disposed = false;
  let cleanupFn: (() => void) | null = null;
  let externalSet: (value: S) => void = (value: S) => {
    stateRef.value = value;
  };
  let externalPost: () => void = () => {};

  if (manager) {
    import('@intlayer/editor').then(({ CrossFrameStateManager }) => {
      if (disposed) return;

      const stateManager = new CrossFrameStateManager<S>(
        key,
        (manager as any).messenger,
        {
          emit,
          receive,
          initialValue: initialState,
        }
      );
      stateManager.start();

      const handler = (e: Event) => {
        stateRef.value = (e as CustomEvent<S>).detail;
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

  onScopeDispose(() => {
    disposed = true;
    cleanupFn?.();
  });

  return [stateRef, (value: S) => externalSet(value), () => externalPost()];
};
