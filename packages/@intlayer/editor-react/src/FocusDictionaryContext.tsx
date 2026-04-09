'use client';

import type { FileContent } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useEditorStateManager } from './EditorStateContext';

export type { FileContent } from '@intlayer/editor';

export type FocusDictionaryState = {
  focusedContent: FileContent | null;
};

export type FocusDictionaryActions = {
  setFocusedContent: (value: FileContent | null) => void;
  setFocusedContentKeyPath: (keyPath: KeyPath[]) => void;
};

type FocusDictionaryContextType = FocusDictionaryState & FocusDictionaryActions;

// Create native React context fallback
const FocusDictionaryReactContext = createContext<
  FocusDictionaryContextType | undefined
>(undefined);

// Create the Provider
export const FocusDictionaryProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const manager = useEditorStateManager();
  const [fallbackContent, setFallbackContent] = useState<FileContent | null>(
    null
  );

  const setFocusedContent = useCallback(
    (value: FileContent | null) => {
      if (manager) {
        manager.focusedContent.set(value);
      } else {
        setFallbackContent(value);
      }
    },
    [manager]
  );

  const setFocusedContentKeyPath = useCallback(
    (keyPath: KeyPath[]) => {
      if (manager) {
        manager.setFocusedContentKeyPath(keyPath);
      } else {
        setFallbackContent((prev) => {
          if (!prev) return null;
          const filtered = keyPath.filter(
            (key) => key.type !== NodeTypes.TRANSLATION
          );
          return { ...prev, keyPath: filtered };
        });
      }
    },
    [manager]
  );

  return (
    <FocusDictionaryReactContext.Provider
      value={{
        focusedContent: manager?.focusedContent.value ?? fallbackContent,
        setFocusedContent,
        setFocusedContentKeyPath,
      }}
    >
      {children}
    </FocusDictionaryReactContext.Provider>
  );
};

// 3. Update the hook to consume the fallback context
export const useFocusDictionary = (): FocusDictionaryState &
  FocusDictionaryActions => {
  const manager = useEditorStateManager();
  const reactContext = useContext(FocusDictionaryReactContext);

  const [focusedContent, setFocusedContentState] = useState<FileContent | null>(
    manager?.focusedContent.value ?? reactContext?.focusedContent ?? null
  );

  useEffect(() => {
    if (!manager) {
      setFocusedContentState(reactContext?.focusedContent ?? null);
      return;
    }

    const handler = (e: Event) =>
      setFocusedContentState((e as CustomEvent<FileContent | null>).detail);
    manager.focusedContent.addEventListener('change', handler);

    return () => manager.focusedContent.removeEventListener('change', handler);
  }, [manager, reactContext?.focusedContent]);

  return {
    focusedContent,
    setFocusedContent: reactContext?.setFocusedContent ?? (() => {}),
    setFocusedContentKeyPath:
      reactContext?.setFocusedContentKeyPath ?? (() => {}),
  };
};

export const useFocusDictionaryActions = (): FocusDictionaryActions => {
  const { setFocusedContent, setFocusedContentKeyPath } = useFocusDictionary();
  return { setFocusedContent, setFocusedContentKeyPath };
};
