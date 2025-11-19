import configuration from '@intlayer/config/built';
import { getContext, setContext } from 'svelte';
import { derived, type Readable, type Writable, writable } from 'svelte/store';

export type EditorEnabledStateProps = {
  settingEnabled: Writable<boolean>;
  wrapperEnabled: Writable<boolean>;
  isInIframe: Writable<boolean>;
  enabled: Readable<boolean>;
};

const EDITOR_ENABLED_KEY = Symbol('EDITOR_ENABLED');

const detectIframe = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.self !== window.top;
};

export const createEditorEnabledClient = () => {
  const settingEnabled = writable(configuration.editor.enabled);
  const wrapperEnabled = writable(false);
  const isInIframe = writable(false);

  const enabled = derived(
    [settingEnabled, wrapperEnabled, isInIframe],
    ([$setting, $wrapper, $iframe]) => $setting && $wrapper && $iframe
  );

  if (typeof window !== 'undefined') {
    isInIframe.set(detectIframe());
  }

  const state = {
    settingEnabled,
    wrapperEnabled,
    isInIframe,
    enabled,
  };
  setContext(EDITOR_ENABLED_KEY, state);
  return state;
};

export const useEditorEnabled = (): EditorEnabledStateProps => {
  let context: EditorEnabledStateProps | undefined;

  // `getContext` must only run inside a component.
  // If this is called in plain JS, we catch the error and fallback.
  try {
    context = getContext<EditorEnabledStateProps>(EDITOR_ENABLED_KEY);
  } catch {
    // called outside component -> ignore, we’ll use global store
  }

  if (!context) {
    return createEditorEnabledClient();
  }

  return context;
};
