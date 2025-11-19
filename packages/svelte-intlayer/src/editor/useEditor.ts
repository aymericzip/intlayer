import { MessageKey } from '@intlayer/editor';
import { onDestroy } from 'svelte';
import { get } from 'svelte/store';
import { useDictionariesRecord } from './dictionariesRecord';
import { useEditorEnabled } from './editorEnabled';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';
import { useIframeClickMerger } from './useIframeClickInterceptor';

let initialized = false;
let unsubscribeIsInIframe: (() => void) | null = null;

export const useEditor = () => {
  if (typeof window === 'undefined') return;
  if (initialized) return;
  initialized = true;

  const editorEnabled = useEditorEnabled();

  useDictionariesRecord();

  useIframeClickMerger();

  // Listen for editor enabled
  useCrossFrameMessageListener<boolean>(
    `${MessageKey.INTLAYER_EDITOR_ENABLED}/post`,
    (data) => {
      editorEnabled.wrapperEnabled.set(data);
    },
    false
  );

  const getEditorEnabled = useCrossFrameMessageListener<boolean>(
    `${MessageKey.INTLAYER_EDITOR_ENABLED}/get`,
    (data) => {
      editorEnabled.wrapperEnabled.set(data);
    },
    false
  );

  // Initial check
  const checkEnabled = () => {
    const inIframe = get(editorEnabled.isInIframe);
    const setting = get(editorEnabled.settingEnabled);
    if (inIframe && setting) {
      getEditorEnabled();
    }
  };

  checkEnabled();

  // Subscribe to changes
  editorEnabled.isInIframe.subscribe(() => checkEnabled());

  // Keep track of unsubscribe so we *could* clean up if we ever wanted
  unsubscribeIsInIframe = editorEnabled.isInIframe.subscribe(() =>
    checkEnabled()
  );

  onDestroy(() => {
    initialized = false;

    if (unsubscribeIsInIframe) {
      unsubscribeIsInIframe();
      unsubscribeIsInIframe = null;
    }
  });
};
