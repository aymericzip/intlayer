import { MessageKey } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types';
import {
  type Component,
  createContext,
  type ParentProps,
  type Setter,
  useContext,
} from 'solid-js';
import { useCrossFrameState } from './useCrossFrameState';

type DictionaryPath = string;

export type FileContent = {
  dictionaryKey: string;
  keyPath?: KeyPath[];
  dictionaryPath?: DictionaryPath;
};

type FocusDictionaryState = {
  focusedContent: FileContent | null;
};

type FocusDictionaryActions = {
  setFocusedContent: Setter<FileContent | null>;
  setFocusedContentKeyPath: (keyPath: KeyPath[]) => void;
};

const FocusDictionaryStateContext = createContext<
  FocusDictionaryState | undefined
>(undefined);
const FocusDictionaryActionsContext = createContext<
  FocusDictionaryActions | undefined
>(undefined);

export const FocusDictionaryProvider: Component<ParentProps> = (props) => {
  const [focusedContent, setFocusedContent] =
    useCrossFrameState<FileContent | null>(
      MessageKey.INTLAYER_FOCUSED_CONTENT_CHANGED,
      null
    );

  const setFocusedContentKeyPath = (keyPath: KeyPath[]) => {
    setFocusedContent((prev) => {
      if (!prev) {
        return prev; // nothing to update if there's no focused content
      }
      return { ...prev, keyPath };
    });
  };

  return (
    <FocusDictionaryStateContext.Provider
      value={{ focusedContent: focusedContent() }}
    >
      <FocusDictionaryActionsContext.Provider
        value={{
          setFocusedContent: setFocusedContent as Setter<FileContent | null>,
          setFocusedContentKeyPath,
        }}
      >
        {props.children}
      </FocusDictionaryActionsContext.Provider>
    </FocusDictionaryStateContext.Provider>
  );
};

export const useFocusDictionaryActions = () => {
  const context = useContext(FocusDictionaryActionsContext);
  if (context === undefined) {
    throw new Error(
      'useFocusDictionaryActions must be used within a FocusDictionaryProvider'
    );
  }
  return context;
};

export const useFocusDictionary = () => {
  const actionContext = useFocusDictionaryActions();
  const stateContext = useContext(FocusDictionaryStateContext);

  if (stateContext === undefined) {
    throw new Error(
      'useFocusDictionaryState must be used within a FocusDictionaryProvider'
    );
  }

  return { ...stateContext, ...actionContext };
};
