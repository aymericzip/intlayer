import type { MessageKey } from '@intlayer/types/messageKey';
import { type Accessor, createSignal, onCleanup } from 'solid-js';
import { useEditorStateManager } from './EditorProvider';

export type CrossFrameStateOptions = {
  emit?: boolean;
  receive?: boolean;
};

export const useCrossFrameState = <S,>(
  key: `${MessageKey}`,
  initialState?: S,
  options?: CrossFrameStateOptions
): [Accessor<S>, (value: S | ((prev: S) => S)) => void, () => void] => {
  const manager = useEditorStateManager();
  const { emit = true, receive = true } = options ?? {};

  const [value, setSignal] = createSignal<S>(initialState as S, {
    equals: false,
  });

  let disposed = false;
  let cleanupFn: (() => void) | null = null;
  let externalSet: (newValue: S) => void = () => {};
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
        setSignal(() => (e as CustomEvent<S>).detail);
      };
      stateManager.addEventListener('change', handler);

      externalSet = (newValue: S) => stateManager.set(newValue);
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

  onCleanup(() => {
    disposed = true;
    cleanupFn?.();
  });

  const setValue = (valueOrUpdater: S | ((prev: S) => S)) => {
    const newValue =
      typeof valueOrUpdater === 'function'
        ? (valueOrUpdater as (prev: S) => S)(value())
        : valueOrUpdater;
    setSignal(() => newValue);
    externalSet(newValue);
  };

  const postState = () => externalPost();

  return [value, setValue, postState];
};
