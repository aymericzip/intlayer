import { MessageKey } from '@intlayer/editor';
import { App, computed, inject, onMounted, ref, Ref } from 'vue';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

/* ------------------------------------------------------------------ */
/*  public type – identical to the React version                       */
/* ------------------------------------------------------------------ */
export type EditorEnabledStateProps = {
  wrapperEnabled: Ref<boolean>;
  isInIframe: Ref<boolean>;
  enabled: Ref<boolean>;
};

/**
 * Singleton instance
 */
let instance: EditorEnabledStateProps | null = null;

const INTLAYER_EDITOR_ENABLED_SYMBOL = Symbol('EditorEnabled');

/**
 * Creates an editor wrapperEnabled client
 */
export const createEditorEnabledClient = () => {
  if (instance) return instance;

  const wrapperEnabled = ref(false);
  const isInIframe = ref(false);
  const enabled = computed(() => wrapperEnabled.value && isInIframe.value);

  instance = {
    wrapperEnabled,
    isInIframe,
    enabled,
  };

  return instance;
};

/**
 * Helper to install the editor wrapperEnabled state into the app
 */
export const installEditorEnabled = (app: App) => {
  const client = createEditorEnabledClient();

  app.provide(INTLAYER_EDITOR_ENABLED_SYMBOL, client);
};

export const useEditorEnabled = createSharedComposable(() => {
  const client = inject<EditorEnabledStateProps>(
    INTLAYER_EDITOR_ENABLED_SYMBOL
  );

  if (!client) {
    throw new Error('EditorEnabled state not found');
  }

  // Listen for the iframe parent if the editor send a message `INTLAYER_EDITOR_ENABLED`
  useCrossFrameMessageListener<boolean>(
    `${MessageKey.INTLAYER_EDITOR_ENABLED}/post`,
    (data) => {
      client.wrapperEnabled.value = data;
    }
  );

  onMounted(() => {
    client.isInIframe.value = window.self !== window.top;
  });

  return client;
});
