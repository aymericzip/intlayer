import { CrossFrameStateManager, type MessageKey } from '@intlayer/editor';
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

  if (manager) {
    const stateManager = new CrossFrameStateManager<S>(key, manager.messenger, {
      emit,
      receive,
      initialValue: initialState,
    });
    stateManager.start();

    const handler = (e: Event) => {
      stateRef.value = (e as CustomEvent<S>).detail;
    };
    stateManager.addEventListener('change', handler);

    onScopeDispose(() => {
      stateManager.removeEventListener('change', handler);
      stateManager.stop();
    });

    const setState = (value: S) => {
      stateManager.set(value);
    };

    const postState = () => stateManager.postCurrentValue();

    return [stateRef, setState, postState];
  }

  return [
    stateRef,
    (value: S) => {
      stateRef.value = value;
    },
    () => {},
  ];
};
