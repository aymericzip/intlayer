import { MessageKey } from '@intlayer/editor';
import type { DictionaryKeys, KeyPath } from '@intlayer/types';
import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { useCrossFrameState } from './useCrossFrameState';

export type FocusedContent = {
  dictionaryKey: DictionaryKeys;
  keyPath: KeyPath[];
} | null;

export type FocusDictionaryStateProps = {
  focusedContent?: Writable<FocusedContent | undefined>;
  setFocusedContent: (content: FocusedContent) => void;
};

const FOCUS_DICTIONARY_KEY = Symbol('FOCUS_DICTIONARY');

export const createFocusDictionaryClient = () => {
  const [focusedContent, setFocusedContent] =
    useCrossFrameState<FocusedContent>(
      MessageKey.INTLAYER_FOCUSED_CONTENT_CHANGED,
      null
    );

  setContext(FOCUS_DICTIONARY_KEY, { focusedContent, setFocusedContent });

  return { focusedContent, setFocusedContent };
};

export const useFocusDictionary = (): FocusDictionaryStateProps => {
  let context: FocusDictionaryStateProps | undefined;

  try {
    context = getContext<FocusDictionaryStateProps>(FOCUS_DICTIONARY_KEY);
  } catch {
    // called outside component -> ignore, we’ll use global store
  }

  if (!context) {
    return createFocusDictionaryClient();
  }

  return context;
};
