import { CrossFrameStateManager, type MessageKey } from '@intlayer/editor';
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

  const stateManager = new CrossFrameStateManager<S>(key, manager.messenger, {
    emit,
    receive,
    initialValue: initialState,
  });
  stateManager.start();
  onCleanup(() => stateManager.stop());

  const [value, setSignal] = createSignal<S>(stateManager.value as S, {
    equals: false,
  });

  const handler = (e: Event) => {
    setSignal(() => (e as CustomEvent<S>).detail);
  };
  stateManager.addEventListener('change', handler);
  onCleanup(() => stateManager.removeEventListener('change', handler));

  const setValue = (valueOrUpdater: S | ((prev: S) => S)) => {
    const newValue =
      typeof valueOrUpdater === 'function'
        ? (valueOrUpdater as (prev: S) => S)(value())
        : valueOrUpdater;
    stateManager.set(newValue);
  };

  const postState = () => stateManager.postCurrentValue();

  return [value, setValue, postState];
};
