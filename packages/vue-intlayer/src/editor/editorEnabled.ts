import configuration from '@intlayer/config/built';
import { MessageKey } from '@intlayer/editor';
import {
  type App,
  computed,
  inject,
  nextTick,
  onMounted,
  type Ref,
  ref,
  watch,
} from 'vue';
import { createSharedComposable } from './createSharedComposable';
import { useCrossFrameMessageListener } from './useCrossFrameMessageListener';

/* ------------------------------------------------------------------ */
/*  public type – identical to the React version                      */
/* ------------------------------------------------------------------ */
export type EditorEnabledStateProps = {
  settingEnabled: Ref<boolean>;
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
 * Helper to detect if we're in an iframe (client-side only)
 */
const detectIframe = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.self !== window.top;
};

/**
 * Creates an editor wrapperEnabled client
 */
export const createEditorEnabledClient = () => {
  if (instance) return instance;

  const settingEnabled = ref(configuration.editor.enabled);
  const wrapperEnabled = ref(false);
  // Initialize as false on server, will be updated on client
  const isInIframe = ref(false);
  const enabled = computed(
    () => settingEnabled.value && wrapperEnabled.value && isInIframe.value
  );

  instance = {
    settingEnabled,
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

  // Only set iframe detection on client-side to avoid SSR mismatches
  if (typeof window !== 'undefined') {
    client.isInIframe.value = detectIframe();
  }

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

  const getEditorEnabled = useCrossFrameMessageListener<boolean>(
    `${MessageKey.INTLAYER_EDITOR_ENABLED}/get`,
    (data) => {
      client.wrapperEnabled.value = data;
    }
  );

  // Set up the watch immediately so it catches initial and all subsequent changes
  watch(
    () => client.isInIframe.value && client.settingEnabled.value,
    (_value) => {
      getEditorEnabled();
    },
    { immediate: true }
  );

  onMounted(() => {
    // Ensure iframe detection happens on client after mount
    nextTick(() => {
      const isIframe = detectIframe();
      client.isInIframe.value = isIframe;
    });
  });

  return client;
});
