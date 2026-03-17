import { CrossFrameStateManager, type MessageKey } from '@intlayer/editor';
import {
  type Dispatch,
  type StateUpdater,
  useEffect,
  useRef,
  useState,
} from 'preact/hooks';
import { useEditorStateManager } from './EditorStateContext';

export type CrossFrameStateOptions = {
  emit?: boolean;
  receive?: boolean;
};

export type SetStateAction<S> = S | ((prevState: S) => S);
export type CrossFrameStateUpdater<S> = (value: SetStateAction<S>) => void;

export const useCrossFrameState = <S,>(
  key: `${MessageKey}`,
  initialState?: S | (() => S),
  options?: CrossFrameStateOptions
): [S, CrossFrameStateUpdater<S>, () => void] => {
  const manager = useEditorStateManager();

  const resolvedInitial =
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState;

  const [value, setValueState] = useState<S>(resolvedInitial as S);
  const stateManagerRef = useRef<CrossFrameStateManager<S> | null>(null);

  useEffect(() => {
    const { emit = true, receive = true } = options ?? {};
    const stateManager = new CrossFrameStateManager<S>(key, manager.messenger, {
      emit,
      receive,
      initialValue: resolvedInitial,
    });
    stateManagerRef.current = stateManager;

    const handler = (e: Event) => {
      setValueState((e as CustomEvent<S>).detail);
    };
    stateManager.addEventListener('change', handler);
    stateManager.start();

    return () => {
      stateManager.removeEventListener('change', handler);
      stateManager.stop();
      stateManagerRef.current = null;
    };
  }, [key, manager.messenger, options?.emit, options?.receive]);

  const setValue: CrossFrameStateUpdater<S> = (valueOrUpdater) => {
    setValueState((prev) => {
      const newValue =
        typeof valueOrUpdater === 'function'
          ? (valueOrUpdater as (prev: S) => S)(prev)
          : valueOrUpdater;
      stateManagerRef.current?.set(newValue);
      return newValue;
    });
  };

  const postState = () => stateManagerRef.current?.postCurrentValue();

  return [value, setValue, postState];
};
